# さかさま不動産クエスト RPG再設計案（借りたい人向け）

## 0. 世界観とルール（このゲームの前提）
- 本作は**勝敗のないロールプレイング体験**。
- クエストは「問題」ではなく**問い**であり、正解はない。
- 成長はレベルやステータスの優劣ではなく、次の3つの変化で表現する。
  - **覚悟**: 何を引き受けて進むか
  - **言語化**: 想いと条件を伝わる言葉にできるか
  - **関係性**: まち・大家さん・仲間との距離の変化
- 大家さんは操作できない**NPC（Non-Playable Character）**として存在する。
- プレイヤーは「借りるために勝つ」のではなく、「待ちながら整える」旅を続ける。

---

## 1) RPGとしてのクエスト構造

### 第1章: プロローグ「旅立ちの想い」
目的: 主人公（借りたい人）の原体験と願いを言葉にする。

### 第2章: 拠点づくり「待つモードに入る」
目的: すぐ契約を目指すのでなく、待つ時間を育成時間として設計する。

### 第3章: 作戦会議「小さな経営仮説を置く」
目的: 正解を当てる計画ではなく、試すための仮説を複数持つ。

### 第4章: フィールドイベント「まちで出来事に出会う」
目的: 経済イベントと社会イベントに遭遇し、解釈を深める。

### 第5章: NPC章「大家さんの心が動く」
目的: 大家さんを審査者でなく、気にかける存在として描く。

### 第6章: クエストログ更新「物語を編み直す」
目的: 出来事を通して、覚悟・言語化・関係性を更新する。

### 第7章: エンドレスループ「待ちながら進む」
目的: 反応の有無に依存せず、問いを持って旅を継続する。

---

## 2) 初期プロフィール→初期ステータス生成（新規）

## 2-1. 入力項目（事実入力）
- 年齢
- 経験（仕事・活動）
- DIYスキル
- お金・時間の余裕感
- 関わってくれそうな人の有無

## 2-2. 出力ステータス（評価ではなく傾向）
- 始まりやすさ（難易度）
- 自走力
- 巻き込み耐性
- 継続力
- 余白力

設計原則:
- 成功確率や合否に変換しない。
- 数値は「人格評価」ではなく、**初期の傾向メモ**として使う。
- 低い値は弱点ではなく「イベント設計上の配慮点」として扱う。

## 2-3. 変換ロジック案（MVP簡易）
※ 0〜100の傾向値を出すが、UIは「低/中/高」+ コメント表示を基本とする。

- **始まりやすさ**
  - 影響: 経験、DIY、余裕感
  - ルール例: 準備に使える時間と最低限の実務経験があるほど高め
- **自走力**
  - 影響: 経験、時間余裕
  - ルール例: 単独で小さく回した経験があるほど高め
- **巻き込み耐性**
  - 影響: 関わってくれそうな人の有無、活動経験
  - ルール例: 協力者候補あり + 対外活動経験で高め
- **継続力**
  - 影響: 時間余裕、経験の継続年数
  - ルール例: 生活に無理のない時間設計があるほど高め
- **余白力**
  - 影響: お金余裕、時間余裕
  - ルール例: 急な変化に耐えられる余地があるほど高め

補正ルール（重要）:
- 年齢は直接の優劣に使わず、イベント文脈の言い換えにのみ使う（例: 体力配慮/ライフステージ配慮）。
- どの入力でも0点/満点を作らない（極端判定を避ける）。

## 2-4. プレイヤーへの返し方
- 数値の羅列ではなく、次の形式で返す。
  - 傾向サマリー（例: 「今は“始める準備”がしやすい状態」）
  - 配慮ポイント（例: 「余白力が少なめなので予定詰め込みに注意」）
  - 最初の1歩（例: 「週1回の小実験から開始」）

---

## 3) 成長表現（レベルなし）

## 3-1. 成長の3軸
- **覚悟の変化**
  - 例: 「できたらやる」→「この条件なら引き受ける」
- **言語化の変化**
  - 例: 「なんとなくやりたい」→「誰にどんな変化を届けるか説明できる」
- **関係性の変化**
  - 例: 「一人で抱える」→「大家さん・地域と対話しながら進める」

## 3-2. 進行表示のUI方針
- 数値バーやランクは使わない。
- 代わりに「前回の自分との違い」を短文ログで表示する。
- 例:
  - 覚悟ログ: 「固定費の上限を自分で決めた」
  - 言語化ログ: 「大家さん向け説明文を200字で書けた」
  - 関係性ログ: 「地域イベントで最初の対話が生まれた」

---

## 4) フェーズごとの入力とAIロール（RPG演出）

## フェーズA: プロローグ入力
プレイヤー入力:
- やりたいこと
- 原体験
- 失いたくない価値
- 初期プロフィール（2章入力）

AIロール（語り部）:
- 想いを受け止める導入ナレーション
- プロフィール由来の初期傾向をやわらかく要約
- 世界観に接続する問いを2〜3個返す

## フェーズB: 待つモード設定
プレイヤー入力:
- 待つ期間（例: 1〜3か月）
- 待つ間に行う行動（発信、実験、関係づくり）
- 物件条件（必須/希望/柔軟）

AIロール（コンパニオン）:
- 期間中の「週次クエスト」を提案
- ステータスに応じて負荷調整（例: 余白力低→タスクを少なく）
- 大家さんへ伝わる自己紹介文の草案を生成

## フェーズC: 経営の思考実験
プレイヤー入力:
- 提供サービス
- 価格と件数の仮置き
- 費用（固定/変動/初期）
- 稼働制約

AIロール（戦略家）:
- 計算を採点せず「if-then」形式で示す
- 3つの作戦（慎重/標準/挑戦）を提示
- ステータスに応じて語り口調整（例: 継続力低→短期反復の提案）

## フェーズD: ランダムイベント対処
プレイヤー入力:
- 選んだ行動
- その理由
- 感情の変化

AIロール（記録者）:
- イベント結果をクエストログ化
- 結果を良し悪し判定しない
- ステータスに応じて次の問いを1つ提示

## フェーズE: NPC大家さんとの接点
プレイヤー入力:
- 伝えたいこと
- 受け取った反応
- 次の接点希望

AIロール（翻訳者）:
- すれ違いをやわらかく翻訳
- 非審査的な表現に整える
- ステータスに応じて接点頻度を提案

---

## 5) ランダムイベント設計（経済イベント + 社会イベント）

## 5-1. イベント発火ルール（MVP）
- ターンごとにランダムで1件発火。
- 種別は次の2カテゴリ。
  - **経済イベント**: 収支や運営条件が揺れる
  - **社会イベント**: 人との関係や意味づけが揺れる
- 同じイベントでも選択で結果は分岐するが、勝敗は出さない。

## 5-2. ステータス影響ルール
- 始まりやすさが低め: 初期は小規模イベントが出やすい
- 自走力が高め: 単独解決イベントが増える
- 巻き込み耐性が高め: 協力者出現イベントの比率が上がる
- 継続力が低め: 連続高負荷イベントの発生率を下げる
- 余白力が低め: 緊急対応イベントの後に回復ターンを入れる

重要:
- ステータスで「有利不利」を決めるのでなく、体験のリズムを調整するために使う。

## 5-3. 経済イベント例
- 想定より家賃が高い物件情報が届く
- 初期費用の一部が予想より増える
- 少数だが継続率の高い顧客が現れる

## 5-4. 社会イベント例
- 地域団体から協力の声がかかる
- 近隣住民から用途について質問を受ける
- 想いに共感する協力者が1人現れる

---

## 6) 大家さんNPC設計（操作不可）

## 6-1. 役割定義
- 大家さんはプレイヤーが操作できないNPC。
- 立場は「審査」ではなく「気にかけ・見守り」。
- プレイヤーの行動履歴と言語化の変化に応じて反応が変わる。
- ステータス値は**大家さん画面に直接表示しない**。

## 6-2. 感情遷移（NPC内部状態の物語化）
1. 関心: 「どんな人だろう」
2. 理解: 「背景が少しわかってきた」
3. 安心: 「急がず準備している」
4. 応援: 「この人の挑戦を見守りたい」
5. 伴走: 「場を一緒に育てたい」

## 6-3. 行動遷移（プレイヤーに見える形）
- プロフィール閲覧
- 近況へのリアクション
- 短いメッセージ送信
- 内見提案
- 継続対話

UI方針:
- 「合格/不合格」は表示しない
- 代わりに「気にかけアクション」として表示する

---

## 7) 経営シミュレーションを思考実験化する最低設計

## 7-1. 入力
- 売上仮説（単価 × 件数）
- 固定費
- 変動費
- 初期費用
- 稼働時間

## 7-2. 出力（判定なし）
- 月次収支の見通し
- 損益分岐の目安
- 手元資金の見通し
- 次に試す問い（3つ）

## 7-3. シナリオ
- 慎重ルート（負荷低め）
- 標準ルート（中庸）
- 挑戦ルート（負荷高め）

提示方法:
- どれが正しいかは示さない
- それぞれのルートで起こりやすい現実を記述
- プレイヤーに「なぜそのルートを選ぶか」を書いてもらう

---

## 8) MVP（最初に作る範囲）
1. プロフィール入力5項目 + 初期ステータス5指標の生成
2. ステータス表示は「低/中/高 + コメント」のみ（生数値は内部保持）
3. プロローグ〜公開草案までの一直線プレイ
4. 成長ログ（覚悟・言語化・関係性）の短文記録
5. ランダムイベント（経済3種 + 社会3種）
6. ステータス連動イベント重み調整（簡易ルールのみ）
7. NPC大家さんの気にかけアクション表示（3段階）
8. 思考実験ボード（3ルート + 問い返し）

除外:
- 成功確率表示
- 合否判定
- 複雑なパーソナライズモデル
- レベル・ランキング・バトル

---

## 9) 将来拡張の余地

## 9-1. ステータス進化
- 初期値固定ではなく、イベントや選択で「傾向ラベル」が変化する設計。
- 例: 巻き込み耐性「中」→「協働に慣れてきた」に変わる。

## 9-2. イベントAI拡張
- プレイヤー履歴に応じたイベント生成（ただし難化ではなく学び多様化）。
- 経済/社会イベントの連鎖（1件の社会イベントが後の経済条件を動かす）。

## 9-3. NPC拡張
- 大家さんNPCのタイプ追加（見守り型、対話型、地域連携型）。
- ただし審査・点数化は導入しない。

## 9-4. 表示拡張
- 数値を見せる代わりに「物語タグ」で状態を可視化。
- 例: 「準備が整ってきた」「仲間が増えてきた」「余白を守れている」

---

## 10) 画面単位の実装順序

### スプリント1（プロフィールと導入）
1. 世界観オンボーディング（勝敗なし・問い中心）
2. プロフィール入力（5項目）
3. 初期ステータス要約表示（低/中/高 + コメント）
4. プロローグ入力

### スプリント2（思考実験）
5. 思考実験ボード入力
6. 3ルート表示
7. 次に試す問い表示

### スプリント3（イベント&NPC）
8. ランダムイベント画面
9. 出来事カード画面
10. 大家さん気にかけアクション画面

### スプリント4（統合）
11. クエストログ編集
12. 公開ページプレビュー
13. 週次更新ループ

実装原則:
- まず最後まで遊べる直列構造を作る
- 評価語彙をUIから排除する
- すべての出力を「次の問い」につなげる

---

## 11) AIトーンガイド
- 禁止: 採点、断定的不合格、人格否定
- 推奨: 受容 → 整理 → 選択肢提示 → 小さな次の問い
- 口調: 「一緒に試す」「まだ途中」「仮置きで進む」

例:
- NG: 「その計画は無理です」
- OK: 「この条件だと負荷が高そうです。負荷を下げる仮置き案も並べてみましょう」

---

## 12) イベントカード発火エンジン実装案（TypeScript）

> 前提: クエスト完了時に1枚だけ引く。章遷移/シミュレーション時は例外ルールで追加抽選または強制カードを許可する。

### 12-1. データ構造（state / events）

```ts
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
  // 成長・状態
  verbalization: number;
  relation: number;
  margin: number;
  commitment: number;
  selfDrive: number;
  continuity: number;
  clarity: number;
  reflection: number;
  economicResilience: number;

  // 事実系
  age: number;
  experience: number;
  diySkill: number;
  supporterCount: number;

  // フラグ系
  publicFlag: boolean;
  waitingFlag: boolean;
  firstSimulation: boolean;
  anxietyDetected: boolean;
  fatigueDetected: boolean;
  priceSettingDone: boolean;
  scaleDecisionDone: boolean;
  fundingOptionOpened: boolean;

  // 進行系
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
  id: string; // E01 ...
  type: EventType;
  message: string;
  choices: string[];
  effects: Record<string, number | string | boolean>;
  triggers: TriggerExpr[];

  // 発火制御
  chapterWeights?: Partial<Record<ChapterId, number>>;
  mandatoryOn?: Array<"half-sales" | "after-publish" | "waiting-5days" | "finale">;
  cooldownTurns?: number; // デフォルト3
};

export type EventHistory = {
  recentEventIds: string[];     // 直近順、最大3
  recentTypes: EventType[];     // 直近順、最大3
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
```

### 12-2. trigger評価の簡易実装方針

- 入力JSONの `trigger: ["idea_length < 100"]` 形式は、MVPでは**起動時にパースして `TriggerExpr` 化**。
- 実行時は `every()` でAND判定（将来 `any` を追加可能）。
- 未知キーや不正演算子は `false` 扱い（安全側）。
- `public_flag = true` のような式は `eq` に正規化する。

```ts
export function evalTrigger(state: QuestState, expr: TriggerExpr): boolean {
  const left = state[expr.key] as unknown;
  const right = expr.value as unknown;

  switch (expr.op) {
    case "lt": return typeof left === "number" && typeof right === "number" && left < right;
    case "lte": return typeof left === "number" && typeof right === "number" && left <= right;
    case "gt": return typeof left === "number" && typeof right === "number" && left > right;
    case "gte": return typeof left === "number" && typeof right === "number" && left >= right;
    case "eq": return left === right;
    case "neq": return left !== right;
    case "truthy": return Boolean(left);
    case "in": return Array.isArray(right) && right.includes(left as never);
    default: return false;
  }
}

export function canFireEvent(event: QuestEvent, state: QuestState): boolean {
  return event.triggers.every((expr) => evalTrigger(state, expr));
}
```

### 12-3. `pickEvent()` 実装案（TypeScript）

実装要件を順番に適用する:
1. 強制カード判定（売上半分 / 公開直後 / 待機5日 / ラスト）
2. triggerで候補を絞る
3. 直近3枚の同一イベントID除外
4. 章ごとの `type` 比率重みを適用
5. stateに応じた「必要タイプ」重みを適用
6. type連続ペナルティ適用
7. 重み付き抽選

```ts
const CHAPTER_TYPE_RATIO: Record<ChapterId, Record<EventType, number>> = {
  "prologue":   { thought: 0.60, economic: 0.15, relationship: 0.25, ending: 0.00 },
  "wait-mode":  { thought: 0.35, economic: 0.20, relationship: 0.45, ending: 0.00 },
  "simulation": { thought: 0.20, economic: 0.65, relationship: 0.15, ending: 0.00 },
  "field":      { thought: 0.30, economic: 0.35, relationship: 0.35, ending: 0.00 },
  "landlord":   { thought: 0.20, economic: 0.15, relationship: 0.65, ending: 0.00 },
  "log":        { thought: 0.55, economic: 0.15, relationship: 0.30, ending: 0.00 },
  "loop":       { thought: 0.35, economic: 0.30, relationship: 0.30, ending: 0.05 },
};

function neededTypeWeight(state: QuestState, type: EventType): number {
  let w = 1.0;
  if (state.verbalization < 2 && type === "thought") w *= 1.35;
  if (state.relation < 2 && type === "relationship") w *= 1.35;
  if (state.margin < 2 && type === "economic") w *= 1.25;
  if (state.continuity < 2 && type === "thought") w *= 1.15;
  return w;
}

function streakPenalty(recentTypes: EventType[], currentType: EventType): number {
  if (recentTypes.length === 0) return 1;
  const sameStreak = recentTypes.findIndex((t) => t !== currentType);
  const streakLen = sameStreak === -1 ? recentTypes.length : sameStreak;
  if (streakLen <= 0) return 1;
  // 同type連続: 1回目0.8, 2回目0.6, 3回目0.4
  return Math.max(0.4, 1 - streakLen * 0.2);
}

function weightedPick<T>(items: T[], getWeight: (v: T) => number, random = Math.random): T {
  const weights = items.map((v) => Math.max(0, getWeight(v)));
  const total = weights.reduce((a, b) => a + b, 0);
  if (total <= 0) return items[Math.floor(random() * items.length)];

  let r = random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

function findMandatoryEvent(events: QuestEvent[], ctx: PickContext): QuestEvent | undefined {
  if (ctx.milestoneFlags.finale) {
    return events.find((e) => e.mandatoryOn?.includes("finale"));
  }
  if (ctx.milestoneFlags.halfSales) {
    return events.find((e) => e.mandatoryOn?.includes("half-sales"));
  }
  if (ctx.milestoneFlags.afterPublish) {
    return events.find((e) => e.mandatoryOn?.includes("after-publish"));
  }
  if (ctx.milestoneFlags.waiting5days) {
    return events.find((e) => e.mandatoryOn?.includes("waiting-5days"));
  }
  return undefined;
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

  // 1) 節目強制カード
  const forced = findMandatoryEvent(events, context);
  if (forced) return forced;

  // 2) trigger判定
  let candidates = events.filter((e) => canFireEvent(e, state));

  // 3) 直近3枚ID除外
  const recentIds = new Set(history.recentEventIds.slice(0, 3));
  candidates = candidates.filter((e) => !recentIds.has(e.id));

  // fallback
  if (candidates.length === 0) {
    candidates = events.filter((e) => !recentIds.has(e.id));
  }
  if (candidates.length === 0) {
    candidates = events;
  }

  // 4~6) 重み計算
  const ratio = CHAPTER_TYPE_RATIO[state.chapter];

  const scored = candidates.map((e) => {
    const baseTypeWeight = ratio[e.type] ?? 0.01;
    const needWeight = neededTypeWeight(state, e.type);
    const typePenalty = streakPenalty(history.recentTypes.slice(0, 3), e.type);
    const chapterBoost = e.chapterWeights?.[state.chapter] ?? 1;
    const finalWeight = baseTypeWeight * needWeight * typePenalty * chapterBoost;
    return { event: e, weight: finalWeight };
  });

  // 7) 重み付き抽選
  return weightedPick(scored, (x) => x.weight, random).event;
}
```

### 12-4. 例外ルール（章遷移 / シミュレーション）

- 通常モード（`quest-complete`）: 常に1枚だけ。
- `chapter-transition`: 章固有の導入カードを優先し、なければ通常抽選。
- `simulation`: 経済typeの最低重みを底上げ（例: `economic >= 0.45`）し、`firstSimulation` 時はE06系を強制候補化。

### 12-5. テスト観点

1. **強制カード優先**
   - `halfSales=true` なら必ず半売上カードが返る。
2. **triggerフィルタ**
   - `ideaLength<100` の時だけ E01 が候補化される。
3. **直近3枚除外**
   - 直近3件IDと同一IDが抽選結果に出ない。
4. **同type連続ペナルティ**
   - `thought, thought` の後は `thought` 当選率が下がる。
5. **章比率反映**
   - simulation章で economic比率が thoughtより高くなる（統計テスト）。
6. **必要タイプ補正**
   - `relation<2` で relationship当選率が上がる。
7. **候補ゼロ時fallback**
   - trigger全落ちでも必ず1件返る。
8. **再現性**
   - `random` 注入で決定論テスト可能。

### 12-6. 既存30枚イベントカードとのマッピング補足

- 提示済みのE01〜E30はそのまま `QuestEvent[]` 化できる。
- `trigger` 文字列を `TriggerExpr[]` に変換するだけでMVP運用可能。
- 節目強制カードの推奨割当:
  - `half-sales` → E06
  - `after-publish` → E11
  - `waiting-5days` → E29
  - `finale` → E30
