# さかさま不動産クエスト MVP0.1

## 実装済み
- `/profile`: プロフィール入力と保存
- `/status`: 保存済みプロフィール表示（未保存時は `/profile` へ誘導）
- `/quest`: プロフィール保存チェックの上で開始/再開、進行ID保存、リセット

## localStorage キー
- `sakasama.profile`
- `sakasama.profile.savedAt`
- `sakasama.quest.currentId`

## 起動手順
```bash
npm install
npm run dev
```

## 動作確認
1. `http://localhost:3000/profile` でプロフィールを入力して保存
2. `http://localhost:3000/status` で保存内容と保存時刻が表示される
3. `http://localhost:3000/quest` で開始/再開し、IDが進むことを確認
4. リセットで `currentId` が 1 に戻ることを確認

> 環境で npm レジストリへのアクセス制限がある場合、`npm install` は失敗することがあります。


## ターミナル不要で試す方法（ブラウザのみ）
1. ファイルエクスプローラーで `browser-prototype.html` をダブルクリック
2. ブラウザで開いた画面の `Profile / Status / Quest` タブを操作
3. 保存データはブラウザの localStorage に保存されます（キーは Next.js 版と同一）

> このプロトタイプは依存インストール不要のプレーンHTML版です。Terminalが難しい場合はこちらを先に体験できます。
