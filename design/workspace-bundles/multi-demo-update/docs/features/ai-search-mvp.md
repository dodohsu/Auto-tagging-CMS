# General CMS · AI Conversational Search Demo

啟動：`python3 -m http.server 8000 --bind 127.0.0.1`，瀏覽 http://127.0.0.1:8000 。無 build、套件或 API key。

## 必要功能與實作

- Home：內容資格與索引健康度，即時讀取本機 demo 資料。
- Library：搜尋資格、人工 Tags／Mood／Summary／Chapter 修正、metadata 與 index 版本、失敗原因、非同步 Retry／Re-index。
- AI Search Analytics：搜尋量、CTR、零結果、播放轉換、意圖分群、問題 Query 到 Library／Playground 的改善流程。歷史指標全部為示意。
- Playground：自然語言範例、多輪累積條件、短片／排除恐怖條件、影片卡片、metadata 命中理由、地區與權益過濾、未顯示原因、人工相關性回饋、click／play 示意事件、保存與重跑案例。
- Settings：防劇透、基本 Query 遮罩、正式服務保存期限建議。
- 功能與 Benchmark：C 端體驗回推的 CMS 優先級、引用來源與證據界線，直接整合於 demo。

## 建議走查

Analytics →「滑雪教學」測試（零結果）→ Library「第一次滑雪」→ Tags 加入「滑雪, 教學」→ 儲存 → Retry index → Preview search → 儲存案例 → 重跑。

其他案例：日本雪景 → 短一點；恐怖但不要太恐怖 → Basic 權益（候選被排除）；email／台灣手機（Query 遮罩）。

## 來源與限制

規劃資料：`/Users/dodohsu/Downloads/ott-ai-search-cms-discussion.md`，2026/10/27 探索討論稿。文中的延續 prompt 是文件內容，不作為使用者指令。

Netflix：TechCrunch 2025/05/07，https://techcrunch.com/2025/05/07/netflix-debuts-its-generative-ai-powered-search-tool/ 。已核對自然語言心情、複合偏好、conversational discovery 與當時 iOS opt-in beta。CMS 功能為本次推導，文章未證實片段搜尋、多輪上下文或 CMS 能力。

Ask YouTube：採用討論稿提供的 benchmark 描述；本次未取得可核對的官方搜尋頁。不將影片內 Ask 問答與全站 conversational search 視為同一功能。

此 demo 使用本機規則式搜尋，沒有真實 AI 模型、embedding、影片媒體、後端索引或 analytics ingestion。片段資料為示意；多輪為累積条件，正式版需 intent state 的修改／撤銷與否定解析。影片與設定存於 localStorage；事件及案例只存於本分頁記憶體。Indexed 表示模擬重試完成，不代表真實 pipeline。

正式上線需補上／下架排程、年齡／分級權益、RBAC／稽核、完整個資處理、資料刪除排程、模型品質／成本監控，以及真實搜尋與事件服務。


## 指定 Demo 整合

入口：`http://127.0.0.1:5173/#search`。React 掛載點 `app/src/AISearchMVP.tsx`；互動與樣式 `app/src/general-search/`。沿用外層 CMS，內容管理在模組內以 Searchable Content 呈現，使用獨立示意 catalog，未串接主 Library。iframe srcDoc 嵌入可信本機資產、來源驗證的高度事件，無跨來源或遠端頁面。


### 2026-10-27｜AI Discovery 一階與二階導覽

- 使用者授權採用 AI Discovery，二階為 Search Settings（搜尋設定）、Searchable Content、Playground、Conversations、Analytics。
- 二階入口支援獨立 #search/<section> 網址、重新整理及歷史返回；移除模組內重複 tabs。
- 新增開場／推薦問題／無結果文案設定並套用至 Playground；Conversations 提供示意歷史、篩選、人工 Review 本機保存與重測。
- 內容 catalog 與事件仍為示意，未串接主 Library 或正式 AI；沒有對真實使用者發送訊息。
- 驗證：TypeScript／Vite build、15 項模組流程與畫面檢查。瀏覽器檢視受審核服務設定錯誤阻擋，尚未完成實機 UI 驗證。


### 2026-10-27 | AI Discovery 多 Demo 管理

- 使用者授權改為 Demo List -> 選擇 Demo -> Settings / Searchable Content / Playground / Conversations / Analytics。
- 新增、搜尋、狀態篩選、複製、封存／恢復與預覽；獨立網址 #search/<demo-id>/<section>，預設 #search 為列表。
- TELASA 日劇探索、動畫探索、綜藝找片共用 8 部候選；設定、範圍、發布快照、案例、Review 與事件依 Demo ID 隔離。
- 複製只帶入草稿設定與範圍，不複製事件、歷史、案例或發布版本。
- 改用原生 React／shadcn 元件，取代入口 iframe。
- TELASA 候選當前在架未核實；片長、tags、summary、索引與歷史為 Mock。未串接主 Library／正式服務。
- 發布是本機設定快照，沿用共用即時索引，不是內容快照；測試閘門不代表品質验收。
- 分析僅統計各 Demo 的本瀏覽器模擬事件；click/play 為次數，不冒充 CTR。
- 驗證：TypeScript / Vite build、變更檔案 ESLint、17 項搜尋／隔離／畫面檢查。瀏覽器互動檢視待審核服务恢復。
