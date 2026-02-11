import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>さかさま不動産クエスト MVP0.1</h1>
      <p>プロフィール → ステータス → クエストの最小導線です。</p>
      <ul>
        <li><Link href="/profile">/profile</Link></li>
        <li><Link href="/status">/status</Link></li>
        <li><Link href="/quest">/quest</Link></li>
      </ul>
    </main>
  );
}
