export type EventType = "thought" | "economic" | "relationship" | "ending";

export type ChapterId =
  | "prologue"
  | "wait-mode"
  | "simulation"
  | "field"
  | "landlord"
  | "log"
  | "loop";

export type QuestState = {
  verbalization: number;
  relation: number;
  margin: number;
  commitment: number;
  selfDrive: number;
  continuity: number;
  clarity: number;
  reflection: number;
  economicResilience: number;

  age: number;
  experience: number;
  diySkill: number;
  supporterCount: number;

  publicFlag: boolean;
  waitingFlag: boolean;
  firstSimulation: boolean;
  anxietyDetected: boolean;
  fatigueDetected: boolean;
  priceSettingDone: boolean;
  scaleDecisionDone: boolean;
  fundingOptionOpened: boolean;

  chapter: ChapterId;
  timePassedDays: number;
  waitingTimeDays: number;
  simulationRepeat: number;
  questionsReceived: number;
  ideaLength: number;
  ideaConsistency: number;
  profitNegative: boolean;
};

export type TriggerOp = "lt" | "lte" | "gt" | "gte" | "eq" | "neq" | "in" | "truthy";

export type TriggerExpr = {
  key: keyof QuestState;
  op: TriggerOp;
  value?: number | boolean | string | Array<number | string>;
};

export type QuestEvent = {
  id: string;
  type: EventType;
  message: string;
  choices: string[];
  effects: Record<string, number | string | boolean>;
  triggers: TriggerExpr[];
  chapterWeights?: Partial<Record<ChapterId, number>>;
  mandatoryOn?: Array<"half-sales" | "after-publish" | "waiting-5days" | "finale">;
  cooldownTurns?: number;
};

export type EventHistory = {
  recentEventIds: string[];
  recentTypes: EventType[];
};

export type PickContext = {
  mode: "quest-complete" | "chapter-transition" | "simulation";
  milestoneFlags: {
    halfSales: boolean;
    afterPublish: boolean;
    waiting5days: boolean;
    finale: boolean;
  };
};

const CHAPTER_TYPE_RATIO: Record<ChapterId, Record<EventType, number>> = {
  "prologue": { thought: 0.6, economic: 0.15, relationship: 0.25, ending: 0 },
  "wait-mode": { thought: 0.35, economic: 0.2, relationship: 0.45, ending: 0 },
  "simulation": { thought: 0.2, economic: 0.65, relationship: 0.15, ending: 0 },
  "field": { thought: 0.3, economic: 0.35, relationship: 0.35, ending: 0 },
  "landlord": { thought: 0.2, economic: 0.15, relationship: 0.65, ending: 0 },
  "log": { thought: 0.55, economic: 0.15, relationship: 0.3, ending: 0 },
  "loop": { thought: 0.35, economic: 0.3, relationship: 0.3, ending: 0.05 },
};

export function evalTrigger(state: QuestState, expr: TriggerExpr): boolean {
  const left = state[expr.key] as unknown;
  const right = expr.value as unknown;

  switch (expr.op) {
    case "lt":
      return typeof left === "number" && typeof right === "number" && left < right;
    case "lte":
      return typeof left === "number" && typeof right === "number" && left <= right;
    case "gt":
      return typeof left === "number" && typeof right === "number" && left > right;
    case "gte":
      return typeof left === "number" && typeof right === "number" && left >= right;
    case "eq":
      return left === right;
    case "neq":
      return left !== right;
    case "truthy":
      return Boolean(left);
    case "in":
      return Array.isArray(right) && right.includes(left as never);
    default:
      return false;
  }
}

export function canFireEvent(event: QuestEvent, state: QuestState): boolean {
  return event.triggers.every((expr) => evalTrigger(state, expr));
}

function neededTypeWeight(state: QuestState, type: EventType): number {
  let weight = 1;
  if (state.verbalization < 2 && type === "thought") weight *= 1.35;
  if (state.relation < 2 && type === "relationship") weight *= 1.35;
  if (state.margin < 2 && type === "economic") weight *= 1.25;
  if (state.continuity < 2 && type === "thought") weight *= 1.15;
  return weight;
}

function streakPenalty(recentTypes: EventType[], type: EventType): number {
  if (recentTypes.length === 0) return 1;

  const firstDifferentIndex = recentTypes.findIndex((t) => t !== type);
  const streakLen = firstDifferentIndex === -1 ? recentTypes.length : firstDifferentIndex;

  if (streakLen <= 0) return 1;
  return Math.max(0.4, 1 - streakLen * 0.2);
}

function weightedPick<T>(items: T[], getWeight: (item: T) => number, random: () => number): T {
  const weights = items.map((item) => Math.max(0, getWeight(item)));
  const total = weights.reduce((sum, value) => sum + value, 0);

  if (total <= 0) {
    return items[Math.floor(random() * items.length)];
  }

  let r = random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

function findMandatoryEvent(events: QuestEvent[], context: PickContext): QuestEvent | undefined {
  if (context.milestoneFlags.finale) {
    return events.find((e) => e.mandatoryOn?.includes("finale"));
  }
  if (context.milestoneFlags.halfSales) {
    return events.find((e) => e.mandatoryOn?.includes("half-sales"));
  }
  if (context.milestoneFlags.afterPublish) {
    return events.find((e) => e.mandatoryOn?.includes("after-publish"));
  }
  if (context.milestoneFlags.waiting5days) {
    return events.find((e) => e.mandatoryOn?.includes("waiting-5days"));
  }
  return undefined;
}

function effectiveTypeWeight(chapter: ChapterId, mode: PickContext["mode"], type: EventType): number {
  const ratio = CHAPTER_TYPE_RATIO[chapter][type] ?? 0.01;
  if (mode !== "simulation") return ratio;
  if (type === "economic") return Math.max(ratio, 0.45);
  return ratio;
}

export function pickEvent(params: {
  state: QuestState;
  events: QuestEvent[];
  history: EventHistory;
  context: PickContext;
  random?: () => number;
}): QuestEvent {
  const { state, events, history, context } = params;
  const random = params.random ?? Math.random;

  const forced = findMandatoryEvent(events, context);
  if (forced) return forced;

  let candidates = events.filter((e) => canFireEvent(e, state));
  const recentIdSet = new Set(history.recentEventIds.slice(0, 3));

  candidates = candidates.filter((e) => !recentIdSet.has(e.id));

  if (candidates.length === 0) {
    candidates = events.filter((e) => !recentIdSet.has(e.id));
  }
  if (candidates.length === 0) {
    candidates = events;
  }

  const scored = candidates.map((event) => {
    const chapterTypeWeight = effectiveTypeWeight(state.chapter, context.mode, event.type);
    const neededWeight = neededTypeWeight(state, event.type);
    const typePenalty = streakPenalty(history.recentTypes.slice(0, 3), event.type);
    const chapterBoost = event.chapterWeights?.[state.chapter] ?? 1;

    return {
      event,
      weight: chapterTypeWeight * neededWeight * typePenalty * chapterBoost,
    };
  });

  return weightedPick(scored, (x) => x.weight, random).event;
}
