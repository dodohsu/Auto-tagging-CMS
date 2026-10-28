# OTT CMS

OTT CMS 的 Local-first 協作專案。先在本機整理產品文件、設計方向與 CMS Demo；內容確認後，再透過 GitHub 與 PO 及團隊共編。

## 工作方式

1. 每週開始前，在 `docs/product/weekly-changes.md` 列出本週目標與待確認事項。
2. 產品範圍以 `docs/product/overview.md` 與 `feature-map.md` 為準；未確認內容一律標記「待確認」。
3. 功能細節放在 `docs/product/features/`，決策記錄於 `docs/product/decisions.md`。
4. UI Style 與 Layout 採多版本探索：參考資料放 `design/references/`，提案放 `design/variants/`。
5. `src/` 用於可操作的 CMS Demo；Mock data 不代表正式商業規則。

## 目錄

- `docs/product/`：產品範圍、功能與迭代記錄
- `design/`：設計原則、參考與多版本提案
- `demo/index.html`：StreamAI 靜態 Demo；目前以 shadcn/ui 的設計基礎呈現，可直接用瀏覽器開啟
- `app/`：React／Vite 前端，已安裝 shadcn/ui 元件；在此目錄執行 `npm run dev` 可啟動開發預覽
- `src/`：Demo 元件、功能、版型、主題與假資料

## GitHub Collaboration（未啟用）

目前只初始化本機 Git，不建立 remote。待團隊確認 repository、權限與分支策略後，再加入 GitHub remote。

