"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  hasSavedProfile,
  loadProfile,
  loadProfileSavedAt,
  type Profile,
} from "../../lib/storage";

export default function StatusPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (!hasSavedProfile()) {
      router.replace("/profile");
      return;
    }

    setProfile(loadProfile());
    setSavedAt(loadProfileSavedAt());
  }, [router]);

  if (!profile) {
    return (
      <main>
        <h1>ステータス</h1>
        <p>プロフィールが未保存です。先に /profile で保存してください。</p>
        <Link href="/profile">/profileへ移動</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>ステータス（保存済みプロフィール）</h1>
      <ul>
        <li>年齢: {profile.age}</li>
        <li>経験年数: {profile.experienceYears}</li>
        <li>DIYスキル: {profile.diySkill}</li>
        <li>時間余裕: {profile.timeMargin}</li>
        <li>お金余裕: {profile.moneyMargin}</li>
      </ul>
      {savedAt && <p>保存時刻: {new Date(savedAt).toLocaleString("ja-JP")}</p>}

      <nav style={{ marginTop: 16, display: "flex", gap: 12 }}>
        <Link href="/profile">/profileへ戻る</Link>
        <Link href="/quest">/questへ進む</Link>
      </nav>
    </main>
  );
}
