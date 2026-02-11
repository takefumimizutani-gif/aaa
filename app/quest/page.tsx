"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  hasSavedProfile,
  loadQuestCurrentId,
  resetQuestProgress,
  saveQuestCurrentId,
} from "../../lib/storage";

export default function QuestPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [profileReady, setProfileReady] = useState(false);
  const [currentId, setCurrentId] = useState(1);

  useEffect(() => {
    const ready = hasSavedProfile();
    setProfileReady(ready);

    if (!ready) {
      router.replace("/profile");
      setChecked(true);
      return;
    }

    setCurrentId(loadQuestCurrentId());
    setChecked(true);
  }, [router]);

  const startOrResume = () => {
    const next = Math.max(1, currentId);
    saveQuestCurrentId(next);
    setCurrentId(next);
  };

  const moveNext = () => {
    const next = currentId + 1;
    saveQuestCurrentId(next);
    setCurrentId(next);
  };

  const onReset = () => {
    resetQuestProgress();
    setCurrentId(1);
  };

  if (!checked) {
    return (
      <main>
        <h1>クエスト</h1>
        <p>読み込み中...</p>
      </main>
    );
  }

  if (!profileReady) {
    return (
      <main>
        <h1>クエスト</h1>
        <p>プロフィール未保存のため開始できません。先に /profile で保存してください。</p>
        <Link href="/profile">/profileへ移動</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>クエスト</h1>
      <p>
        現在のクエストID: <strong>{currentId}</strong>
      </p>
      <p>保存キー: <code>sakasama.quest.currentId</code></p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button type="button" onClick={startOrResume}>開始/再開</button>
        <button type="button" onClick={moveNext}>次へ進む（+1）</button>
        <button type="button" onClick={onReset}>リセット</button>
      </div>

      <nav style={{ marginTop: 16, display: "flex", gap: 12 }}>
        <Link href="/status">/statusへ</Link>
        <Link href="/profile">/profileへ</Link>
      </nav>
    </main>
  );
}
