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

### 2026-11-03 | AI Chapter 作為情境共用架構

- Content detail 與 Actor Discovery 的 AI Chapter 內容區共用 `AIChapterLayout` 元件及欄位配置；後續情境頁沿用此架構，再替換各情境的 Filter、時間軸資料及右側清單。
- 人物出場辨識與時間碼尚未有可核對資料，Actor Discovery 先顯示空狀態與待驗證人物候選。

### 2026-11-03 | AI Chapter 右側清單共用

- `ChapterListPanel` 統一章節／片段清單的標題、搜尋、收合及捲動容器。各情境頁提供自己的章節和 Clip 資料。
- 尚未核對的 Comedy Highlight 表演章節與 Actor Discovery 出場章節均標「待確認」，不視為實際分析結果。

### 2026-11-03 | AI Chapter 時間軸共用

- Content detail 與 Comedy Highlight 共用 `ChapterTimelineView` 的外觀與播放定位操作；各頁提供自己的章節／片段資料。
- Comedy Highlight 只在有字幕候選的時段顯示章節及片段，不以示範資料推定整支影片的章節切分。

### 2026-11-03 | Comedy Highlight 暫不推定演出邊界

- 現有四段字幕候選無法證明各組演出的完整起訖，因此以一個全片 Chapter 保持時間連續，將四段保留為 Clip；取得可核對的演出邊界後再拆分多個連續 Chapter。

### 2026-11-03 | Comedy Highlight 四章示意邊界

- 依使用者指定展示四個大章節，時間軸完整且連續。可核對資料僅有四段候選 Clip，故三個章節分界暫取候選片段間距中點（00:03:12、00:32:50、01:15:26），於 UI 標為示意邊界；取得正式表演時間後須替換。

### 2026-11-03 | Comedy Highlight 改依每組段子分章

- 使用者確認依每組完整段子拆章節，取代先前四個大章節示意。字幕中的登場與收尾用於推定章節邊界；Punchline Clip 保留較短的鋪陳與笑點時段。
- 日文自動字幕資料衍生為本機 Demo 內容，不納入原始 SRT。所有字幕標記、標題與切點須以原片複核後才可用於正式內容。

### 2026-11-03 | Comedy Highlight 改為十個大章節並嵌入原片

- 依使用者最新指示，將先前的 45 個段子候選合併為 10 個連續大章節，保留 47 個 Punchline 候選 Clip；章節邊界仍對齊段子交接點。
- 共用 `ChapterVideoPreview` 加入選用的 YouTube 嵌入模式，Comedy 頁使用指定影片；其他頁維持原有示意模式。
- YouTube 播放進度未與介面時間軸同步；章節與 Clip 點選會重新載入所選時間點，另保留原片連結。

### 2026-11-03 | Comedy Highlight 本機改用提供的 MP4

- 使用者提供 480p MP4 後，本機預覽改為 HTML 影片播放器，播放進度與時間軸同步；YouTube 連結保留備援。
- 影片約 401 MB，僅放在本機靜態檔目錄並排除版本控制；其他環境若要預覽原片，須另行提供媒體檔。

### 2026-11-03 | Comedy Highlight 以表演者與 Punchline 篩選

- 主題 Filter 改為表演者／組合及笑話 Punchline，兩條件交集顯示結果。表演者名稱來自日文自動字幕，屬待複核候選；無法辨識者以組別標示待確認。

### 2026-11-03 | Comedy Highlight 主題改依笑點類型

- 使用者選擇「依笑點類型找」，取代前 10 個高頻關鍵詞標籤。主題 Filter 使用 Detail page 共用 `ChapterTopicFilter`，呈現六種觀眾可理解的笑點類型。
- 類型依現有字幕候選的笑點手法暫分，尚待對照影片複核；表演者與 Punchline 篩選保留。

### 2026-11-03 | Comedy Highlight 合併笑點類型與段子題材

- 依使用者最新指示，主題 Filter 合併兩類標籤、按符合的 Clip 數排序並最多顯示 10 個；同數量採固定順序。題材依既有摘要暫分，待影片核對。

### 2026-11-03 | YouTube 影片與章節時間軸雙向同步

- YouTube 備援播放器使用 IFrame Player API。選取時間軸片段會呼叫播放器跳轉；播放中的影片時間會更新章節時間軸。
