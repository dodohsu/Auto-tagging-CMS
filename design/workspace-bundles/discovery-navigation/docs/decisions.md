# 決策記錄

重大決策一則一段，保留背景、選項與原因，方便 PO 與團隊日後追溯。

## 範本

### YYYY-MM-DD｜決策標題

- 狀態：提案／已確認／已取代
- 背景：待填
- 選項：待填
- 決定：待確認
- 原因：待確認
- 影響範圍：待確認
- 參與者：待填



---

## 2026-10-27｜補入先前 Demo 專案紀錄

以下保留先前工作目錄的歷史紀錄；不代表本次新增需求或重新確認產品決策。


重大決策一則一段，保留背景、選項與原因，方便 PO 與團隊日後追溯。

### 2026-10-26｜KK lab Demo 暫行使用 shadcn/ui 設計基礎

- 狀態：已確認（Demo 暫行）
- 背景：使用者指定 Design system 先使用 shadcn/ui，並要求實際安裝元件；現有交付物是可直接開啟的靜態 HTML。
- 決定：在 `app/` 建立 React／Vite 專案並安裝 shadcn/ui 元件，保留 KK lab 藍色主色；靜態 HTML 繼續作為可獨立開啟的比較版。
- 原因：讓後續 Library 頁面可直接採用已安裝元件，同時保存原 Demo 供比較。
- 影響範圍：`app/`、`design/design-system.md`、`demo/index.html`。
- 待確認：正式 theme preset、Library 頁面移植範圍與暗色模式。

## 範本

### YYYY-MM-DD｜決策標題

- 狀態：提案／已確認／已取代
- 背景：待填
- 選項：待填
- 決定：待確認
- 原因：待確認
- 影響範圍：待確認
- 參與者：待填


### 2026-10-27｜AI Search MVP Demo 範圍

- 狀態：Demo 提案（使用者授權製作；正式產品規則待確認）。
- 決定：先做單一搜尋服務設定、Playground 與事後對話 Review。
- 原因：驗證自然語言找片、預設推薦與人工改善的最小閉環。
- 人工建議不自動回覆使用者、不自動發布為規則；草稿測試與發布分開。
- 影響範圍：AI Search 模組與提案文件；原提案保存以供比較。

### 2026-10-27｜General CMS AI Search 替換提案

- 狀態：使用者已授權取代 Demo AI Search 模組；正式產品規格待確認。
- 決定：入口保持 #search，整合 Searchable Content、Analytics、Playground、Settings 與 Benchmark 必要功能推導。
- 理由：驗證搜尋需求 → 內容修正 → 重新索引 → 搜尋重測的營運閉環。
- 原草稿發布／對話 Review 方案保存，不保留在新模組操作入口。
- 資料界線：新模組使用獨立示意 catalog，未連接主 Library 與正式服務；iframe 隔離模組樣式。
- 正式版待確認：共用 catalog、語意服務、結構化情緒強度、完整意圖更新、RBAC、授權排程、資料生命週期與埋點。


### 2026-10-27｜AI Discovery 一階與二階導覽

- 使用者授權採用 AI Discovery，二階為 Search Settings（搜尋設定）、Searchable Content、Playground、Conversations、Analytics。
- 二階入口支援獨立 #search/<section> 網址、重新整理及歷史返回；移除模組內重複 tabs。
- 新增開場／推薦問題／無結果文案設定並套用至 Playground；Conversations 提供示意歷史、篩選、人工 Review 本機保存與重測。
- 內容 catalog 與事件仍為示意，未串接主 Library 或正式 AI；沒有對真實使用者發送訊息。
- 驗證：TypeScript／Vite build、15 項模組流程與畫面檢查。瀏覽器檢視受審核服務設定錯誤阻擋，尚未完成實機 UI 驗證。
