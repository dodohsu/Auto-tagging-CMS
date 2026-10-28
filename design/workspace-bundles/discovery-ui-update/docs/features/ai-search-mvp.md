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


### 2026-10-27 | AI Discovery 直接入口與 shadcn/ui

- 點擊側欄 AI Discovery 直接導航到 Demo List（#search），不再使用展開／收合選單。
- 選擇 Demo 後於內容區使用 shadcn Tabs 切換 Settings、Searchable Content、Playground、Conversations、Analytics。保留獨立網址及歷史返回。
- 表格、容器、狀態、下拉、輸入與操作使用專案既有 shadcn Table、Card、Badge、Select、Input、Button；補 Checkbox、Textarea、Label 元件。
- 多 Demo 資料沿用既有 localStorage keys。
- 驗證：TypeScript／Vite build、變更檔案 ESLint、17 項搜尋與真實 shadcn 元件伺服器渲染檢查。尚未完成瀏覽器點擊檢查。


### 2026-10-27 | AI Discovery 與其他後台頁面樣式對齊

- 對照 Video 頁統一 overline、標題、副標、主按鈕、表格工具列、列距與表頭。
- 搜尋與篩選併入表格卡片；詳細頁 tabs 採相同底線樣式。
- 採主題 tokens 取代模組獨立的藍色與 slate 色階，保留 shadcn/ui。
- 建置、ESLint 與 17 項既有檢查通過。已更新工作區 8000/discovery-ui-update/demo 預覽。


### 2026-10-27 | Demo List 對齊 Video List

- 使用相同縮圖尺寸、名称／ID、列高、淡底表頭、響應式欄位及整列點擊／鍵盤開啟。
- 用途獨立成欄；狀態呈現為淡色圓點 Badge；操作改為圖示按鈕並避免冒泡誤開啟。
- 空結果採 Video List 相同布局與清除篩選操作。
- ESLint、TypeScript／Vite build 通過；已更新工作區預覽。


### 2026-10-27 | User Profile 客群模擬與四組初始 Demo

- 依使用者圖示建立 General、User A 戀愛、User B 動畫、User C 搞笑四組初始 Demo。
- 可選分類共 8 類：General、戀愛、動畫、搞笑／綜藝、推理刑偵、美食療癒、家庭共看、特攝英雄。Audience Profiles 提供需求、模擬訊號與測試問題。
- 分類依內容偏好與情境，不推定年齡／性別；非 TELASA 真實分群、占比或已驗證使用者行為。
- 各組共用候選片庫；Profile 的示意 tag／類型加權影響排序，明確查詢條件、內容範圍與索引資格優先。
- Settings 可修改 Profile；建立與複製保留 Profile；發布快照包含 Profile；搜尋事件記錄當時 Profile。
- 未編輯的三筆舊範例替換為四筆新範例；自建或修改過的 Demo、案例、Review 與事件保留；遷移不重複建立 Profile Demo。
- 驗證：建置與 ESLint 通過；24 項搜尋、排序、內容範圍、遷移與 shadcn 畫面渲染檢查通過。


### 2026-10-27 | 助手切換器與情境側欄試作

- AI Discovery 下提供所有推薦助手、可搜尋的目前助手切換器與設定／可搜尋內容／搜尋測試／搜尋對話／搜尋分析。
- 選擇不同助手時保留目前功能頁；頁面標題與 breadcrumb 顯示助手名稱。
- 初始三組為 TELASA 推薦助手、新用戶入門助手、活動專區助手。General 與七類偏好規則在同一助手內管理，不再各自形成助手。
- Settings 支援 General 精選、Profile 規則啟用與示意權重（1–5）。Playground 切換模擬 Profile，顯示命中規則或 General fallback。
- 案例保存當時 Profile，重跑還原；搜尋／播放／回饋事件記錄當時 Profile，分析可依 Profile 篩選。
- 新版本機儲存 general-assistants-v2。舊版 general-multi-demos-v1 保留不覆寫，比較頁 /discovery-ui-update/variants/profile-demo-list/#search。
- 建置、ESLint 與 17 項助手規則／範圍／fallback／元件渲染檢查通過。未進行真實瀏覽器點擊檢查。


### 2026-10-27 | AI Chatbot 選單命名

- 模組名稱改為 AI Chatbot；列表入口 All Chatbot；預設名稱 General Chatbot。
- 側欄功能改為 Settings、Searchable Content、Playground、Conversations、Analytics。
- 列表、標題與 breadcrumb 同步命名；僅遷移舊預設助手名稱，自訂名稱與設定維持。
- TypeScript／Vite build 通過；已更新工作區預覽。


### 2026-10-27 | 優先完善多機器人管理架構

- 依使用者最新指示，先完善全域列表、建立與複製、側欄切換、獨立資料與版本管理。
- New Chatbot 可從空白或 General／新用戶／活動用途範本建立；新機器人從 Draft 開始，不複製對話、事件、案例與發布版本。
- 名稱不可空白或重複；複製自動加上序號。Published 與草稿設定不同時提示未發布更新。
- 封存機器人後側欄最近選擇會回到可用機器人，避免選單殘留不存在的選項。
- Settings 保持先前版本；五步驟 No Code 設定設計暫未套用，原始提案保留 variants/no-code-settings-source/AISearchMVP.tsx。
- 建置與 ESLint 通過，17 項規則／資料／元件渲染檢查通過。


### 2026-10-27 | Profile Rules 說明與排序示意

- 補充「當使用者符合某種偏好時，提高對應內容的推薦排序」。
- 規則改為使用者偏好 → 優先推薦內容 → 推薦程度；以稍微／一般／強烈優先取代數字輸入。
- 停用規則時停用程度控制，清楚呈現規則狀態。
- 新增同句查詢的 General／選定 Profile 排序對照，使用目前草稿與索引實際計算，顯示 fallback 原因。
- 建置、ESLint 與 17 項既有檢查通過；已更新目前工作區預覽。


### 2026-10-27 | Personalization 獨立分頁

- 側欄 Settings 下新增 Personalization；每個 Chatbot 有獨立路由 #search/<id>/personalization。
- 偏好規則與 General／Profile 排序示意移至 Personalization；Settings 保留基本設定、General 精選與統一發布。
- Personalization 變更仍屬於同一份草稿與發布版本，提供 Playground 驗證及 Settings 發布入口。
- 建置、ESLint 與 18 項檢查通過，已更新工作區預覽。


### 2026-10-27 | Searchable Content 大量資料管理

- 將逐筆卡片改為緊湊表格，提供名稱／ID／Tags／摘要搜尋、已納入／未納入、類型、索引狀態篩選與名稱／ID／需處理優先排序。
- 每頁 25／50／100 筆；Metadata 編輯與索引操作按需展開，避免一次渲染全部表單。
- 顯示候選片庫、已納入、可搜尋、已納入但需處理數量。只有 Indexed 且 Metadata／Index 版本一致才算可搜尋。
- 表格勾選代表批次操作選取，搜尋範圍另以 Badge 顯示。支援選取本頁、全部符合結果及跨頁保留；變更篩選或 Chatbot 清除選取。
- 批次納入／移除只修改目前 Chatbot 草稿，移除提供筆數確認；Metadata 與索引仍共用，發布流程沿用 Settings／Playground。
- Demo 仍使用本機資料與前端篩選，沒有新增數千筆假內容至使用者資料。正式版本建議後端搜尋／篩選／排序／分頁、批次工作佇列與權限／操作紀錄；需求與 API 待確認。
- 正式版「全選符合結果」應保存查詢條件與資料快照，不下載所有 ID；大量重新索引應提供進度、失敗清單、重試及取消，而非同時送出數千請求。新增內容是否自動納入、規則式範圍與人工排除優先序待確認，現階段仍採明確 ID 範圍。
- 驗證：TypeScript、變更檔案 ESLint；2,500 筆伺服器渲染驗證每頁只建立 25 列、100 頁且詳情延遲渲染，並驗證失敗／舊版本索引狀態。瀏覽器互動驗證被自動審核模型設定錯誤阻擋。
