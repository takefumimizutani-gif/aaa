"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  INITIAL_PROFILE,
  loadProfile,
  loadProfileSavedAt,
  saveProfile,
  type Profile,
} from "../../lib/storage";

function clamp0to5(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(5, value));
}

export default function ProfilePage() {
  const [form, setForm] = useState<Profile>(INITIAL_PROFILE);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    const profile = loadProfile();
    const profileSavedAt = loadProfileSavedAt();

    if (profile) {
      setForm(profile);
    }
    if (profileSavedAt) {
      setSavedAt(profileSavedAt);
    }
  }, []);

  const updateField = (key: keyof Profile, value: number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSavedAt(null);
  };

  const onSave = () => {
    const normalized: Profile = {
      age: Math.max(0, Math.floor(form.age || 0)),
      experienceYears: Math.max(0, Math.floor(form.experienceYears || 0)),
      diySkill: clamp0to5(form.diySkill),
      timeMargin: clamp0to5(form.timeMargin),
      moneyMargin: clamp0to5(form.moneyMargin),
    };

    setForm(normalized);
    const at = saveProfile(normalized);
    setSavedAt(at || new Date().toISOString());
  };

  return (
    <main>
      <h1>プロフィール入力（MVP）</h1>
      <p>保存キー: <code>sakasama.profile</code></p>

      <label htmlFor="age">年齢</label>
      <input
        id="age"
        type="number"
        min={0}
        value={form.age}
        onChange={(e) => updateField("age", Number(e.target.value))}
      />

      <label htmlFor="experienceYears">経験年数</label>
      <input
        id="experienceYears"
        type="number"
        min={0}
        value={form.experienceYears}
        onChange={(e) => updateField("experienceYears", Number(e.target.value))}
      />

      <label htmlFor="diySkill">DIYスキル（0-5）</label>
      <input
        id="diySkill"
        type="number"
        min={0}
        max={5}
        value={form.diySkill}
        onChange={(e) => updateField("diySkill", Number(e.target.value))}
      />

      <label htmlFor="timeMargin">時間余裕（0-5）</label>
      <input
        id="timeMargin"
        type="number"
        min={0}
        max={5}
        value={form.timeMargin}
        onChange={(e) => updateField("timeMargin", Number(e.target.value))}
      />

      <label htmlFor="moneyMargin">お金余裕（0-5）</label>
      <input
        id="moneyMargin"
        type="number"
        min={0}
        max={5}
        value={form.moneyMargin}
        onChange={(e) => updateField("moneyMargin", Number(e.target.value))}
      />

      <button type="button" onClick={onSave}>保存する</button>
      {savedAt && <p>保存済み: {new Date(savedAt).toLocaleString("ja-JP")}</p>}

      <nav style={{ marginTop: 16, display: "flex", gap: 12 }}>
        <Link href="/status">/status へ</Link>
        <Link href="/quest">/quest へ</Link>
      </nav>
    </main>
  );
}
