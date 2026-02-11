export type Profile = {
  age: number;
  experienceYears: number;
  diySkill: number;
  timeMargin: number;
  moneyMargin: number;
};

export const STORAGE_KEYS = {
  profile: "sakasama.profile",
  profileSavedAt: "sakasama.profile.savedAt",
  questCurrentId: "sakasama.quest.currentId",
} as const;

export const INITIAL_PROFILE: Profile = {
  age: 30,
  experienceYears: 0,
  diySkill: 0,
  timeMargin: 0,
  moneyMargin: 0,
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadProfile(): Profile | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(STORAGE_KEYS.profile);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as Profile;
  } catch {
    return null;
  }
}

export function saveProfile(profile: Profile): string {
  if (!isBrowser()) return "";

  const savedAt = new Date().toISOString();
  window.localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
  window.localStorage.setItem(STORAGE_KEYS.profileSavedAt, savedAt);
  return savedAt;
}

export function loadProfileSavedAt(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(STORAGE_KEYS.profileSavedAt);
}

export function hasSavedProfile(): boolean {
  return Boolean(loadProfile() && loadProfileSavedAt());
}

export function loadQuestCurrentId(): number {
  if (!isBrowser()) return 1;

  const raw = window.localStorage.getItem(STORAGE_KEYS.questCurrentId);
  const id = raw ? Number(raw) : 1;
  return Number.isFinite(id) && id > 0 ? id : 1;
}

export function saveQuestCurrentId(id: number): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEYS.questCurrentId, String(id));
}

export function resetQuestProgress(): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEYS.questCurrentId, "1");
}
