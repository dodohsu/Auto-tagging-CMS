# 每週變更

## 2026-W44

### 本週目標

- 依 KK lab CMS UI 參考圖整理可供後續頁面共用的設計系統。

### 已完成

- 新增 `design/design-system.md`，整理視覺風格、Design Tokens、Layout、導覽與基礎元件。
- 拆解 Content-level Tag 畫面，並補充 AI Chapter、場景與章節、AI Search 的一致性原則。

### 變更摘要

- UI Style／Layout：記錄暖灰漸層、浮層卡片、深藍主操作及多語意輔助色方向。
- 元件：補充 Sidebar、Header、Tab、Card、Button、Tag／Chip、Checkbox、Badge、縮圖與表單規則。
- 規格可信度：未從原始設計檔精確量測的數值均標為「建議值」，未知行為列為「待確認」。

### 待確認與風險

- 品牌正式色票、字型、響應式斷點、完整狀態與 AI 分析生命週期仍待 PO／設計確認。

### 下週候選

- 依設計系統建立 Token 與共用元件 Demo，並以關鍵頁面驗證多語系與資訊密度。

## YYYY-Www

### 本週目標

- 待與 PO 確認。

### 已完成

- 待填。

### 變更摘要

- 產品文件：待填。
- UI Style／Layout：待填。
- CMS Demo：待填。

### 待確認與風險

- 待填。

### 下週候選

- 待填，不代表承諾。



---

## 2026-10-27｜補入先前 Demo 專案紀錄

以下保留先前工作目錄的歷史紀錄；不代表本次新增需求或重新確認產品決策。


## 2026-W44

### 本週目標

- 以新版英文 UI 的藍色風格建立暫行 Demo 設計基礎。

### 已完成

- 「預覽模式」更名為「應用模式」，Hover／Focus 時顯示應用面板；目前提供 C 端 Player 應用縮圖與說明，點擊後另開分頁，後續可擴充其他應用。

- Chapter 校正區改為扁平層級，標題使用 `Chapter N | 名稱`；移除以播放位置設定章節起點／終點的快捷按鈕，保留直接輸入與套用時間。

- Chapter 時間校正維持主要層級；Clip 的時間、場景描述與切點調整改為預設收合的「進階調整 Clip」，降低畫面層級與資訊密度。

- Sidebar 將原 Library 影片清單改名為 Video，新增 Library 作為 Highlight 素材庫規劃入口；Detail 返回與麵包屑同步使用 Video。

- Filter 增加 Highlight 生成流程：選取主題後可設定、確認 Clip 數量與預估長度，執行本地 Mock 生成狀態；後續可接實際剪輯服務、轉場、輸出與分享連結。
- Highlight 生成降為時間軸下方的次要卡片，主題 Filter 保持聚焦在篩選操作。

- 第一支 Mock Video 已對齊使用者提供的 TELASA `series/6825` 參考，標題改為《孤独のグルメ SP》、保留 ID `TELA-6825` 作為 Demo 識別；實際 TELASA 受保護串流不直接嵌入本機示意播放器。

- 預覽模式改為另開新分頁；網址攜帶目前已套用章節與播放位置快照，編輯頁保留原狀，預覽播放獨立運作。

- 「儲存章節」操作改為「儲存」，新增編輯／預覽模式。C 端 Player 依參考採黑底、橘色進度、右側「見どころ」章節清單；使用目前已套用的章節時間，支援章節跳轉、播放同步、前後 10 秒、下一章、列表收合與全螢幕。影音素材仍為示意，未接實際串流。

- 新增章節起訖時間微調及播放位置設為章節邊界；同步更新相鄰章節的邊界 Clip，保留內部分段，並驗證邊界兩側至少 1 秒與影片首尾完整覆蓋。

- Video 預覽支援右下角滑鼠／觸控拖曳調整寬高、方向鍵調整及重設 16:9；最大寬度限制在內容欄內，避免遮擋章節清單。

- 時間軸播放紅線支援滑鼠／觸控拖曳與刻度跳轉，限制在影片起訖範圍內並同步預覽時間；支援方向鍵、Shift 與 Home／End 定位，不改動章節邊界。

- 主題色調整為低飽和淡色，搭配深灰文字；時間軸多主題 Clip 改為平滑漸層，取代原本分色帶。

- 主題 Filter 改為多選（任一主題符合即顯示），每個主題有固定色彩，與 Clip 標籤、章節／場景時間軸同步；多重主題使用分色帶，可個別取消或透過「全部主題」清除選取。

- AI Chapter：僅保留 AI Metadata、Chapters & Scenes 分頁；主色暫按使用者五位色碼 `#33333` 解讀為 `#333333`。
- 新增 5 個 Mock 章節及 15 個 Clips、AI tags 主題篩選、可搜尋／收合列表、連續章節與非連續場景時間軸、示意播放及起訖時間微調。編輯同步相鄰邊界並驗證完整覆蓋；可儲存至瀏覽器 localStorage。
- 已以瀏覽器驗證篩選、模式切換、邊界同步、非法時間阻擋及儲存重載；lint 與 build 通過。影片與 AI 分析均為 Demo 示意。

- 新增 `design/variants/blue-demo-design-system.html`，展示色彩、字級、按鈕、狀態、導覽、tabs 與 AI metadata chips。
- 新增 `demo/index.html` 靜態 Demo；以 Library 為預設頁，含影片 mock 列表、搜尋、類型／AI 狀態篩選、影片選取，以及 Home／AI Search placeholder 切換。
- 依使用者最新指定，將 Demo 暫行設計基礎改為 shadcn/ui，更新語意 token 與主要控制項外觀；保留單檔 HTML 可直接開啟。
- 於 `app/` 建立 React／Vite 專案，實際安裝 shadcn/ui 的 Button、Sidebar、Card、Input、Select、Table、Badge、Breadcrumb、Separator、Avatar，以及 Sidebar 所需附屬元件。
- 移除 Library 的摘要統計卡；影片列維持搜尋與篩選，點選或鍵盤 Enter／Space 會開啟對應的 AI Metadata Detail 頁。
- 新增可由 `#detail/<video-id>` 直接開啟的 Detail 頁，依參考畫面完成影片摘要、分頁、AI Metadata tags、Content Overview、來源依據與相似內容；全站圖示採 shadcn/ui 預設的 Lucide 圖示。

### 變更摘要

- UI Style／Layout：此 HTML 為可替換的 Demo 提案，連結至 `design/design-system.md`；未標記為定稿。
- CMS Demo：沿用灰藍柔和漸層、白色輕量卡片、pill 控制與藍色選取態，並提供桌面及行動版基礎響應式版面；`demo/index.html` 為 React build 產物。

### 待確認與風險

- 正式 token、響應式規則、選取限制與後續 Demo 所採用的設計版本待確認。

## YYYY-Www

### 本週目標

- 待與 PO 確認。

### 已完成

- 待填。

### 變更摘要

- 產品文件：待填。
- UI Style／Layout：待填。
- CMS Demo：待填。

### 待確認與風險

- 待填。

### 下週候選

- 待填，不代表承諾。


### 2026-10-27｜專案目錄整合

- 將 staging 的 React／Vite 原始碼、build Demo 與設計提案整合至 Desktop `ai-tagger`。
- 保留原產品與設計文件，補入歷史迭代紀錄，保存兩側有差異文件及交接摘要。
- 本次未變更產品功能；依賴未複製，開發前需執行 `npm install`。

### 2026-10-27｜AI Search MVP Demo 提案

- 新增搜尋與推薦設定、Playground、對話 Review 三個操作入口。
- 分開草稿／發布版本與人工 Review，加入本機保存、測試後發布及重測流程。
- 使用虛構偶像表演、模糊推薦與無結果情境示範資料依據；未連接真實 AI。
- 原 AI Search 提案原始碼與 build 保存於 `design/variants/ai-search-before-mvp/`。
- 詳細提案與待確認限制：`features/ai-search-mvp.md`。
- 驗證：TypeScript／Vite build 與 ESLint 通過；瀏覽器已驗證追問、表演命中、無結果、Review 保存與重測、草稿測試後發布及重載保存。

### 2026-10-27｜以 General CMS conversational search 取代 AI Search 模組

- 使用者明確指定取代既有 #search；保留原 CMS 導覽與其他頁面。
- 新增內容資格／Metadata／索引管理、搜尋分析、追問 Playground、相關性回饋／案例重跑與基本隱私／劇透設定。
- 此模組 catalog 為獨立示意資料，未串接主 Library；以 Searchable Content 命名避免混淆。
- 採用隔離樣式的本機互動模組，避免影響其他 CMS 畫面。
- 舊版保存於 design/variants/ai-search-before-general-20261027。
- Netflix 文章已核對；Ask YouTube 依提供討論稿描述，官方搜尋功能待核實。
