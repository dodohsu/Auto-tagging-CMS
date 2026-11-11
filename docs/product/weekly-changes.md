# 每週變更

## 2026-W45

- YouTube 播放器接上 IFrame Player API，支援章節／Clip 跳轉與播放進度同步時間軸。
- 線上版未附本機 MP4 時，Comedy Highlight 播放器會改用指定 YouTube 嵌入影片；本機與建置輸出的 MP4 均排除版本控制。
- Comedy Highlight 表演者篩選加入最多 10 張可點選的本機影片演出畫面縮圖，依 Clip 數排序；其餘表演者仍可透過下拉選單選取。
- 人物縮圖改為隨網站部署的小型 JPEG 資產，線上版不依賴本機 MP4 才能顯示。
- Comedy Highlight 主題 Filter 合併笑點類型與段子題材，依 Clip 出現次數排序並顯示前 10 個；題材為待複核的編輯候選。
- Comedy Highlight 主題 Filter 依使用者選擇，改為六種笑點類型；片段依現有笑點手法暫分並保留待複核標示，沿用 Detail page 共用篩選樣式。
- Comedy Highlight 的前 10 個標籤改套用 Detail page 共用 `ChapterTopicFilter` 樣式與多選行為，不再使用獨立繪製的標籤列。
- Comedy Highlight 主題 Filter 新增按現有笑點手法關鍵詞統計的前 10 個標籤及 Clip 次數，可與表演者、Punchline 條件一起篩選。
- Comedy Highlight 的主題 Filter 改為表演者／組合與笑話 Punchline 兩個條件；表演者依字幕自我介紹建立候選，未確認者保留待確認標示。
- Comedy Highlight 本機預覽改用使用者提供的 480p MP4；原生播放器進度與時間軸同步，點選 Clip 可跳至該片段。影片檔保留本機、排除版本控制。
- Comedy Highlight 改為 10 個連續大章節，保留 47 個 Punchline 候選 Clip；共用預覽元件新增指定 YouTube 影片的嵌入模式，點選時間軸或 Clip 可從對應時間載入。

### 本週目標

- 提出 AI Chatbot Settings 的手機即時預覽 Demo，先供本機檢視。

### 已完成

- Settings 新增手機開場與無結果示意，連動左側草稿設定，並可切換已發布的本機設定快照。
- 推薦問題可帶入 Playground；保留既有測試與發布流程。
- 詳細範圍及待確認事項記錄於 `features/chatbot-mobile-preview.md`。
- 側欄新增 Examples 情境入口，分為 AI Chapter、AI Genre、AI Search 三個 Tab；卡片暫連至《孤独のグルメ SP》詳情頁。提案範圍見 `features/examples.md`。
- Examples 八張卡片加上「預計使用技術」標籤；依使用者修正，僅使用參考截圖中的 video understanding 詞彙。
- Comedy Highlight 新增 M-1 影片專屬內頁，沿用 Content detail 結構並展示四段有自動字幕時間點的候選片段；詳見 `features/examples.md`。
- Actor Discovery 新增共用 Content detail 版型內頁；現有詳情頁與 Actor 頁使用同一個 `ContentDetailTemplate`，Actor 專屬內容標明待驗證。

### 驗證

- TypeScript／Vite build 與變更檔案 ESLint 通過；本機瀏覽器確認開場文案即時連動及無結果狀態切換。
- Examples 已在本機瀏覽器檢查 Tab、卡片前往詳情頁與返回路徑。

### 待確認與風險

- 正式 C 端視覺及防劇透行為待確認；此版仍為 localStorage Demo。
- AI Action & Skill Detection 題材及 AI Genre／AI Search 卡片內容待確認。

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


### 2026-10-28 | 部署來源修正

- 主 app 同步 discovery-ui-update 的 Chatbot 切換器、Settings、Searchable Content 表格與 Profile 規則版本。
- 詳情頁連結沿用 #detailpage。
- Add Video 新版來源待確認。


### 2026-10-28 | 昨晚版本來源補齊

- 主 app 改用 ChatGPT/hi/add-video-flow 的完整 src：AddVideo 00:06、StreamAIDemo 00:10、AISearchMVP 00:02、AIChapter 00:17。
- 完整方案另存 design/workspace-bundles/add-video-flow，保留其他 UI 方案。
- 詳情页新連結保留 #detailpage；舊編號路徑可讀取。

### 2026-11-03 | AI Chapter 共用頁內架構

- 依 Content detail 畫面，把 AI Chapter 的標題與模式、Filter、左側預覽／時間軸／編輯區及右側清單整理為共用版型。
- Actor Discovery 改套此架構；人物辨識與出場時間碼仍為待驗證資料，不顯示虛構結果。
- TypeScript／Vite build 通過。瀏覽器重新整理驗證因自動審核服務錯誤未能完成。

### 2026-11-03 | AI Chapter 右側章節層級

- 依參考截圖，Content detail、Actor Discovery 與 Comedy Highlight 共用右側章節與片段面板的搜尋、收合及章節內 Clip 層級。
- Comedy Highlight 的四個示範片段各放在待確認的表演章節；Actor Discovery 顯示尚無已驗證片段。
- TypeScript／Vite build 與變更檔案 ESLint 通過；瀏覽器自動審核服務錯誤，未能完成畫面驗證。

### 2026-11-03 | Comedy Highlight Filter 與預覽沿用 Detail page

- Content detail 與 Comedy Highlight 共用 `ChapterTopicFilter`、`ChapterVideoPreview`，統一主題標籤及可調整大小的深色示意播放器樣式。
- Comedy Highlight 保留 YouTube 原片時間點連結；示意播放不宣稱嵌入或播放原片。
- TypeScript／Vite build 與變更檔案 ESLint 通過。

### 2026-11-03 | Comedy Highlight 共用時間軸與候選內容

- Content detail 與 Comedy Highlight 共用 `ChapterTimelineView`，包含模式切換、章節列、片段列、拖曳播放位置及刻度樣式。
- 右側四段字幕候選補上暫定起訖、標題和摘要；僅在字幕有 `[笑い]` 的第二、四段標註待核對笑聲。完整笑話邊界及掌聲待確認。
- TypeScript／Vite build 與變更檔案 ESLint 通過。瀏覽器畫面檢查被自動審核服務的模型設定錯誤攔下。

### 2026-11-03 | Comedy Highlight 章節連續性與標題

- 將原本四個相隔甚遠的暫定 Chapter 改為一個 00:00:00–01:46:29 全片 Chapter，四處候選保留為 Clip；正式演出分章待核對。
- 四段候選標題改以對話中的反差、錯位及雙關命名；摘要保留字幕依據與待複核狀態。
- TypeScript／Vite build 通過。

### 2026-11-03 | Comedy Highlight 四個連續示意章節

- 依使用者要求，Comedy Highlight 改成四個連續 Chapter，各含一個現有候選 Clip；無 Clip 的章節不顯示。
- 章節分界暫取相鄰候選片段間距中點，覆蓋全片且不留空隙。此為 Demo 示意邊界，非已核對的表演分段。
- TypeScript／Vite build 通過。

### 2026-11-03 | Comedy Highlight 依完整字幕重整

- 依使用者提供的日文自動產生 SRT，將多組漫才合集整理成 45 個連續段子章節與 47 個 Punchline 候選 Clip，取代先前四段示意資料。
- 每個 Clip 補上暫定起訖、標題、摘要、笑點手法；`[笑い]`／`[拍手]` 僅依 SRT 註記顯示。播放器、時間軸及右側清單沿用 AI Chapter 共用元件。
- 資料驗證：章節數 45、Clip 數 47、章節時間連續、全部 Clip 落在其章節內；TypeScript／Vite build 與 ESLint 通過。
- 瀏覽器畫面檢查被自動審核服務的模型設定錯誤攔下；尚待人工檢視段子交界和笑點切點。
### 2026-11-04 | YouTube 備援播放器排版修正

- GitHub Pages 缺少本機 MP4 時改用 YouTube；API 原本產生固定 640 × 360 iframe，造成預覽容器裁切。
- 改為穩定的外層容器及寬高 100% iframe；載入失敗提示使用獨立覆蓋層，避免殘留播放器擠壓提示排版。
- TypeScript／Vite 正式建置及變更檔案 ESLint 通過；使用不含 MP4 的正式建置模擬部署檢查尺寸。

### 2026-11-04 | Comedy 主題與 Clip 對應修正

- 補上寶可夢、戰隊題材；移除缺乏摘要依據的動漫分類；中華餐館歸入餐廳題材，Bolt 字義笑點歸入語言雙關。
- Clip 清單與詳情直接顯示主題標籤；搜尋納入主題文字。
- 主題計數隨表演者、Punchline 與搜尋更新；原 Clip 被排除時定位第一個符合的 Clip，無結果時隱藏播放器與摘要。
- TypeScript、ESLint 與資料映射檢查通過；正式 Vite 建置及瀏覽器驗證被自動核准服務的模型設定錯誤阻擋，尚待重試。

### 2026-11-04 | Comedy Clip 主題標籤樣式

- 主題標籤套用 Detail page Clip 清單的細框、小圓角、10px 字級與淡色底；選取中的主題使用對應較深底色。
- 同步更新 Clip 清單及目前片段摘要的主題標籤。

### 2026-11-04 | Comedy Clip 標籤精簡

- Clip 清單與摘要移除表演者、笑點手法、字幕反應及待複核 Badge，保留 Detail page 樣式的主題標籤；原有篩選資料與複核說明保留。


## 2026-11-10
- Add Content 依框架圖調整：字幕拆分輸入與輸出語言，AI Analysis 整合分類、Prompt、標籤與新增分類操作，沿用 shadcn/ui。此為本機 Demo。

## 2026-11-10：Template Setting
- 左側選單新增 Template Setting，可建立 Template、編輯預設 Tag Categories 與 Tags，按 Save 儲存至本機瀏覽器，Add Content 讀取相同設定。
- 左側選單隱藏 Home、Library、AI Chatbot。
- Examples 頁移除原本 AI Chapter／AI Genre／AI Search Tab，改為 Concert 與 Comedy Show 兩個情境卡片；Comedy Show 保留既有示意頁入口。
- Video Content 的 AI Metadata 分類依 Concert、Reality Show、Comedy Show、Nostalgia Collection、Sports Event 模板顯示，並讀取各分類預設 Tags；《孤独のグルメ SP》保留原示意資料。
- Concert 與 Reality Show 對應兩支使用者提供的原片，更新縮圖與片長；本機使用原片播放，線上完整播放待接 NAS HTTPS 網址。
- Concert 線上影片入口連至已確認可用的 NAS Shared link；Reality Show 仍待不含 SynoToken 的公開分享網址。
- Concert 依 Concert.srt 時間碼輸出五段 MP4 Clip，於五個 Tag Categories 下顯示字幕依據與播放入口；團名、Performance Type、Music Genre 保留人工確認標示，Concert 內頁摘要改為字幕內容。

### 2026-11-10 | List 縮圖移除黃色圈圈

- Video Content List 的所有縮圖移除黃色圓形裝飾，保留縮圖圖片與時長標示。

### 2026-11-10 | AI Analyze 獨立入口

- Side menu 新增 AI Analyze，開啟與 Add Content 相同的上傳、字幕及 AI Analysis 設定頁，頁面標題顯示為 AI Analyze。

### 2026-11-10 | Video Assets 導覽命名

- 導覽與影片清單頁的 Content 改名為 Video Assets；Examples 改用與 AI Analyze 不同的格狀圖示。

### 2026-11-10 | AI Analyze V3

- AI Analyze 的 Subtitle Card 僅保留 Input language，預設為 Auto；移除 Output language。
- AI Analysis 將 Template 與 Tag Categories 整合為單一父子容器，以分隔線呈現層級，並統一標題、說明與按鈕字級。
- Upload File 暫時僅支援 From Local，移除 From Cloud／S3 流程與標題旁資訊圖示。
- Subtitle 說明改為選擇影片口語語言可提升 AI 分析準確度。
- Upload File 保留大型拖放框，Choose videos 以小選單快速選擇 From Local 或 From Assets；現階段一次僅能選一支影片，Assets 視窗使用影片縮圖單選。
- AI Analysis 拆成 AI Chapter 與 Metadata 子卡片；原 Tag Categories 設定移入 AI Chapter，Metadata 可選擇產生整支影片 Tags 的分類，Description 支援手動輸入或 AI 生成。
- AI Analysis 標題與說明移到卡片外，AI Chapter 與 AI Metadata 改為兩張獨立卡片。
- AI Metadata 內的 Description 移到 Video-level tags 上方。
- 移除卡片外的 AI Analysis 標題與說明，只保留 AI Chapter 與 AI Metadata 兩張卡片。
- AI Chapter 的 Tag Categories 說明明確標示其用途為產生 clip-level tags。
- Tagging Focus 標題字級調整為與其他欄位標籤一致。
- Tag Category 展開內容的淡灰暈染移至右上角，範圍擴大但維持低對比。
- 展開中的 Tag Category 加入輕微浮起陰影與陰影過渡。
- Subtitle、AI Chapter、AI Metadata 的圖標、標題與描述統一排版；圖標放大並使用淡灰底深灰圖示，降低視覺重量。
- AI Chapter 的 Template 選擇由 Dropdown 改為可橫向滑動的小卡片，顯示 Template 名稱與 Tag Categories 數量。
- Template 小卡片移除 Tag Categories 數量描述，只保留名稱與選中狀態。
- 每張 Template 小卡片右上角加入低對比灰色漸層。
- AI Chapter 的 Template UI 命名改為 Video Type；小卡片右上角改為無明確邊界的清透光暈，並略微加粗選中外框。
- 移除 Video Type 與 Tag Categories 之間的分隔線，改以留白呈現層級。
- Video Type 預設顯示位置固定的常用小卡片；超過四個時提供 View all，展開後可搜尋完整清單並以 Show less 收合，切換選項時不重新排序卡片。
- Tag Categories 的新增按鈕文案由 Add Category 簡化為 Add。
- AI Chapter 的 Video Type 命名統一改為 Video Template，包含搜尋與相關說明文案。
- Video Template 目前直接顯示全部五個項目，超過五個時才顯示 View all。
- Video Template 卡片改用細外框，選中時加入輕微上浮與柔和陰影。
- Video Template 卡片在 Hover 時同步輕微上浮並顯示柔和陰影。
- 移除 Video Template 卡片右上角的漸層光暈，改為乾淨純色底。
- AI Chapter 描述改為引導使用者選擇 Template 並調整 AI 分析影片所使用的 Categories。
- Video Template 橫向容器增加上方與側邊緩衝，避免浮起卡片及陰影被裁切。
- Video Template 橫向列右側加入白色漸層與向右箭頭，提示並支援滑動查看更多項目。
- 選中的 Video Template 改為深灰底白字，並略微降低所有 Template 卡片高度。
- 隱藏 Video Template 的橫向捲軸，保留觸控板、手勢與箭頭捲動。
- Video Template 選中狀態由深灰改為淺灰底與深灰字，降低邊框及陰影重量。
- Video Template 選中狀態簡化為深灰邊框，移除底色、勾選圖示與常駐浮起效果。
- Choose videos 改為單一大型 Popup，並在同一視窗內切換 From Local 與 From Assets。
- Tag Categories 的啟用控制由 Toggle 改為 Checkbox。
- AI Metadata 的 Video-level tags Checkbox 移至每張選項卡右側。
- AI Analyze 頁面移除 Back to Video Assets 返回連結；其他共用流程維持原有返回操作。
- Upload File 大型虛線框改為整區可點擊並支援鍵盤操作，Hover 時呈現邊框、底色、陰影與圖示浮起回饋。
- Upload File 點擊區改為極簡呈現：縮短高度，移除圖示容器與獨立按鈕，只保留操作句與精簡格式說明。
- Upload File Hover 時上傳圖示維持固定位置，只調整顏色。
- Upload File 格式描述簡化為 MP4。
- Popup 內 From Local 同步使用極簡上傳區樣式、整區點擊與 MP4 格式說明。
- Video Assets 右上角按鈕改名為 Add Assets；點擊後保留原頁清單，直接疊加預設為 From Local 的上傳 Popup。
- Video Assets 的 Add Assets Popup 僅保留 From Local 上傳，不提供 From Assets 切換。
- Upload Asset Popup 加寬至大型視窗，並增加拖放區高度。
- Upload Asset Popup 再放大至 1100px 最大寬度，拖放區高度增加至 420px。
- Upload Asset Popup 調整為中型尺寸：880px 最大寬度、320px 拖放區高度。
- Video Assets 列表的 AI analysis 欄位改名為 Status，狀態統一為 Uploading、Analyzing、Failed、Completed。
- Video Assets 右上角新增按鈕文案由 Add Assets 改為 Add Asset。
- 頁首右上角新增 EN／中文／日文即時語系切換，預設 EN；共用導覽、Video Assets、狀態與 Add Asset Popup 支援機器翻譯文案。
- Video Assets 內頁的 Metadata Summary 與 Synopsis 內容支援語系切換；內頁縮圖移除黃色圓形遮罩。
- 語系切換簡化為 EN／中／日純文字，移除容器外框與底色，選中狀態以細底線標示。
- Metadata Tags 支援 EN／中／日顯示翻譯；原始 Tag 值保持不變，避免影響資料鍵值與搜尋。
- 語系選中狀態移除底線，只保留字重與文字深淺；全站未預先定義的內容改用瀏覽器內建機器翻譯，涵蓋 AI Chapter 與其他頁面動態文案。
- 修正全站翻譯監聽器重複寫入相同文字造成的循環觸發，確保語系按鈕點擊後正常切換。

### 2026-11-11 | AI Analyze V4

- AI Metadata 暫時移除 Video-level tags 區塊，保留 Description 設定。
- 卡片順序維持 Subtitle、AI Chapter、AI Metadata。
- Cancel 與 AI Generate 操作移至頁面大標題右側，移除獨立 Toolbar Panel 與選取數量說明。
- 標題區與右側操作按鈕改為垂直置中對齊。
- Selected video 清單改為顯示影片縮圖；本機檔案使用影片預覽，Video Assets 沿用素材縮圖。
- Selected video 標題移除影片數量標記。
- 頁面標題操作捲出畫面後，頂部顯示透明毛玻璃 Action Bar，持續提供 Cancel 與 AI Generate 操作。
- Analyze name Card 暫時隱藏；系統仍以 `AI Analysis_V1 · YYYY-MM-DD HH:mm` 產生預設名稱供固定 Action Bar 顯示。
- 下捲後的固定 Action Bar 左側提供可直接編輯的名稱 Text field，不顯示欄位標題。
- 更新 V4 Video Template 預設 Tags：Concert 的 Performance Type 與 Music Genre、Comedy Show 的 Highlight Type、Sports Event 的 Event Type。
- Reality Show 的 Highlight Type 新增 Challenge、Reveal、Reaction、Conflict、Elimination、Heartwarming Moment。
- Nostalgia Collection 的 Highlight Type 新增 Archive Footage、Then and Now、Reunion、Tribute、Milestone、Memory Lane；Sports Event 的 Highlight Type 維持待確認。
- Sports Event 新增 Scoring Type Tag Category：Three-pointer、Free Throw、Goal、Home Run、Ace。
- Choose a video Popup 改為單頁排列：上方 From Local 上傳區，下方直接顯示 Existing Video Assets，移除來源分頁切換。
- Existing Video Assets 改為 16:9 縮圖為主的 Video Grid，桌面版每排四支影片；名稱與 ID 顯示於縮圖下方，選中狀態僅使用縮圖外框與勾選圖示。
- From Local 選取影片後，Selected video 顯示較大的影片縮圖、Uploading 狀態與進度條，完成後切換為 Upload complete。
- 左側影片選擇卡片標題由 Upload File 改為 Choose a video。
- Choose a video 主操作文案明確標示可從 Local 上傳或從 Video Assets 選取，並強調 Video Assets 入口。
- From Local 影片上傳期間停用 AI Generate；上傳完成後才開放操作，標題列與固定 Action Bar 狀態同步。
- 點擊 AI Generate 後返回 Video Assets，右下角 Panel 顯示 AI 分析進度；完成後切換為完成 Panel，並提供 View Asset 直接開啟對應影片。
- From Local 來源在 Demo 中建立暫存 Video Asset；此流程為前端模擬，尚未連接正式分析服務。
- AI Generate 進度 Panel 的毛玻璃效果與上方固定 Action Bar 統一：70% 白底、中度背景模糊、淡灰邊框與輕陰影。

### 2026-11-11 | Assets Detail Component V1

- Assets Detail Tab 順序調整為 AI Chapter、AI Metadata。
- AI Chapter 與 AI Metadata 使用獨立網址：`#detail/{Asset ID}/ai-chapter`、`#detail/{Asset ID}/ai-metadata`，支援分享、重新整理與瀏覽器返回。
- AI Metadata 採左右雙欄：左側保留 Content Overview，右側顯示 Tag Categories。
- Tag Categories 僅顯示在 AI Chapter 片段中出現至少三次的 Tags，並以小型 Tag 呈現出現次數。
- 移除 AI Metadata 標題與說明、AI Metadata Sources and Basis、Relevant Similar Content。
- Assets Detail 頂部操作列捲出畫面後顯示 Sticky Action Bar，保留 Breadcrumb、版本、Re-analyze、Save 與更多操作，並沿用 AI Analyze 的毛玻璃效果。
- Assets Detail V1 暫時移除頂部影片摘要卡，保留操作列、Tabs 與頁籤內容。
- Concert 的 AI Chapter 移除重複標題、摘要文案與獨立來源 Badge；將 Concert.srt、Clip 數量與 Tag Categories 整合至單一篩選工具列。
- Concert AI Chapter 篩選工具列標題簡化為 Tag Categories。
- Assets Detail 操作列左側新增精簡影片摘要卡，以縮圖為主並顯示影片名稱、狀態、Asset ID、類型與長度；右側維持版本與操作按鈕。
- Assets Detail 的 Asset 名稱與分析版本名稱分離：摘要／列表使用影片名稱；版本選單顯示 `AI Analysis_V1 · YYYY-MM-DD HH:mm`。
- Assets Detail 摘要中的影片名稱改為可編輯輸入框；分析版本名稱維持獨立。下捲後 Sticky Action Bar 左側只顯示 Breadcrumb，並同步使用修改後的影片名稱。
- 影片名稱輸入框恢復清楚的外框與白底，加入 Hover／Focus 回饋，避免外觀被誤認為靜態文字。
- 影片摘要區重新整理為兩層：第一層顯示名稱輸入框，第二層顯示 Asset 資訊。
- 影片摘要縮圖放大；Status 移至整條 Detail Toolbar 右上角，版本與操作按鈕排列於其下方，平衡左右視覺重量。
- Assets Detail 移除 Save 與更多操作；影片名稱改為離開欄位或按 Enter 自動儲存，短暫顯示 Saved，並保存在瀏覽器本機。
- Assets Detail 的 Re-analyze 改為主要按鈕樣式，並同步套用至 Sticky Action Bar。
- Concert Player Review 預設載入完整影片；播放器預設縮小為 760px 內的 16:9 尺寸，可從右下角等比例調整寬度，並提供 Reset size 恢復預設大小。
- Concert Player Review 移除 Selected clip 與 Full video 切換按鈕；預設顯示完整影片，點選 Clip 清單時直接切換片段。
- Assets Detail 的 Sticky Action Bar 右側顯示目前分析版本選單，排列於 Re-analyze 左側；左側維持 Breadcrumb。
- Assets Detail 摘要與 Tabs 合併為平面白色工作區，移除卡片圓角、外框與陰影，只保留底部分隔與內容留白。
- Assets Detail 平面工作區改用自然雙欄對齊：左側摘要垂直置中，右側 Status 與操作上下排列，移除絕對定位與額外上方位移，縮短 Tabs 間距。
- 增加摘要區底部至 Tabs 分隔線的留白，使影片縮圖上下間距一致。
- Assets Detail 摘要區移除影片縮圖，縮減上下內距與右側操作間距，使頂部白色工作區更窄。
- 依設計確認恢復 Assets Detail 有影片縮圖的摘要版本，並還原其上下留白與操作間距。
- Assets Detail 右側 Status、版本選單與 Re-analyze 收攏為同一組，改為靠右垂直集中排列。
- Assets Detail Tabs 從白色摘要工作區拆出，改放在頁面淺灰背景上，移除 Tabs 白底與上方框線。
- 增加 Tabs 與上方白色摘要區的間距，讓頁籤位置稍微下移。
- 補足白色摘要區底部內距，使縮圖與內容距離上下邊界一致。
- Assets Detail 將影片摘要、AI Analysis Name、版本與操作按鈕整合為單一 Toolbar，移除摘要區塊的獨立卡片外框。
- Assets Detail 的返回箭頭與 Breadcrumb 整合至全站頂部 Header，移除內容區重複導覽列；Detail 操作列只保留版本與操作按鈕。
- Concert Player Review 的完整影片改接 YouTube 不公開影片，使用標準嵌入播放器並帶入網站來源識別，不再依賴 NAS 或以短 Clip 作為完整影片備援；實際完整時長更新為 20:37。
- Concert Player Review 固定使用完整 20:37 影片；選取右側 Clip 或 Timeline 時僅跳至完整影片的對應時間點，不再切換成 13–44 秒的短片檔案。
- Concert 時間軸移除章節模式／場景模式切換，固定呈現章節與 Clip 雙層時間軸。
- Concert Player Review 進入頁面後自動靜音播放完整影片；使用者可透過播放器控制開啟聲音。
- Concert AI Chapter 左欄整合為單一工作區：上方集中顯示完整影片，下方直接銜接時間軸；移除播放器標題列、調整大小說明與 Selected moment 資訊區塊。

### 2026-11-11 | Concert AI Chapter 影片與時間軸調整

- 依附圖將影片預設寬度調整為灰色工作區約 72%，維持 16:9 並置中。
- 移除 Concert 時間軸整排 Chapter 區段，保留彩色 Clip、播放游標與時間刻度。
- 灰色區域右下角加入縮放按鈕；支援點擊放大／縮小、拖曳與方向鍵等比例 Resize，放大後仍可調整大小。
- Concert 右側 Clip 清單加入對應片段實際畫面縮圖，移除 Review tag Badge；灰色區域縮放圖示縮小為 16px。
- Concert Clip List 僅顯示 Categories 下的 Tag，不顯示 Categories 名稱；無 Tag 的片段不保留標籤空白列。
- Concert 右側清單標題改為 AI Chapter，移除搜尋框與全部收合操作，維持片段清單直接展開。
- 依使用者確認的字幕方案，Concert 改為 10 個首尾相接的 Clip，完整涵蓋 00:00–20:37；每段附 1–2 行短描述與本機完整影片對應縮圖。
- 播放進度跨越 Clip 邊界時，同步切換時間軸與右側清單選中狀態。

- Concert 的 10 個 Clip 改為各帶 1–3 個相關 Tag（跨分類合計），以多標籤資料取代單一 Tag；清單與時間軸同步顯示所有 Tag。分類篩選與數量改依任一 Tag 所屬分類匹配，同一 Clip 在單一分類僅計一次；Tag 依字幕內容選取，未辨識的團名、曲名、表演型態與曲風不補入。

- 依使用者要求，Concert 展示資料的五個 Tag Categories 平均分散，各涵蓋 4 個 Clip；每段仍維持 1–3 個 Tag。此次標籤為介面展示用 Mock 分配，曲風、表演型態與 Title 類型尚未經影音驗證；不視為真實 AI 分析或正式內容判定。

- Concert 時間軸的多分類 Clip 色塊改為由左至右的平滑漸層，依各 Tag 所屬分類色等距混合；單一分類維持純色。同分類不重複加入色階，分類篩選時保留完整漸層並沿用非相符片段淡化效果。

- 中文切換統一使用臺灣繁體：全站機器翻譯輸出經繁體與臺灣詞彙轉換，補齊 Concert Clip 標題、描述、分類與曲風的繁體對照。
- 依使用者調整取消 Concert 時間軸漸層，改以每段第一個 Tag 所屬分類的固定純色呈現；多分類 Tag 保留。
- Concert 的 Tag Categories 支援 Hover 與鍵盤 Focus 浮層，列出範本設定中該分類的全部子 Tag；點擊分類仍維持片段篩選。

- 分類浮層移除重複分類標題，改用可互動 Popover；支援游標移入與鍵盤聚焦，移入浮層可繼續操作。子 Tag 可多選，右側 Clip 清單、命中 Tag 樣式、數量與時間軸淡化同步連動。同分類子 Tag 使用 OR，跨分類以 OR 合併；再次點選取消，取消全部子 Tag 恢復該分類篩選，「全部分類」清除全部條件；零結果顯示提示。

- 分類 Popover 的每個子 Tag 加入符合 Clip 數量，以「Tag (數量)」顯示；統計以完整 10 段資料為基準，零命中顯示 (0)。修正翻譯監聽器沿用舊文字造成動態 Clip 數量回復的問題，篩選數量隨列表更新。

### 2026-11-11 | V4 發布整理

- 將本次 Concert、Assets Detail、AI Generate 流程與標籤互動調整納入 V4；更新版本摘要與 Concert 線上預覽網址。
- 修正 Detail 導覽拆分後的重複條件判斷，確保正式 TypeScript 建置可通過。

### 2026-11-11 | Reality Show 共用 Concert 內頁

- Reality Show 接上使用者提供的 YouTube 完整影片，時長 52:41；以提供的日文字幕按內容轉折切為 10 個連續 Clip，每段帶 1–3 個 Reality Show 範本 Tag。
- 抽出共用 TaggedChapter，Concert 與 Reality 共用版面、完整影片與時間軸同步、灰色工作區 Resize、分類純色、子 Tag Popover 數量及列表篩選。
- Reality 縮圖取自相同本機原片，補齊繁體標題、描述及 Highlights 翻譯；AI Metadata 摘要改為 Reality 字幕內容，分類 Tag 計數採實際 Clip 命中數。

### 2026-11-11 | 綜藝節目範本命名

- 依使用者指定，原 Reality Show 範本與影片名稱統一改為 Variety Show，中文為「綜藝節目」，日文為「バラエティ番組」。
- 舊版瀏覽器儲存的範本名稱自動對應新名稱，保留使用者的分類、Tag 與 Prompt；影片名稱僅遷移舊預設名稱，自訂名稱仍保留。既有影片 ID、播放連結與片段資料沿用。


### 2026-11-11 | Comedy Show 套用新版 Video 內頁

- Comedy Show（MOV-7310）套用 Concert／Variety Show 共用內頁，接上指定 YouTube 影片，片長修正為 1:46:29。
- 沿用既有字幕分析的十個連續章節作為新版 Clip；各段帶 3 個 Comedy 範本 Tag，支援分類色塊、子 Tag Popover、數量、篩選與播放連動。縮圖取自使用者提供的原片。
- 保留原 Comedy Highlight 範例與 47 個 Punchline 候選；新版標籤與切點仍為字幕編輯草稿，待影音複核。


### 2026-11-11 | 縮圖遮罩與 Comedy 播放備援

- 移除 Video 縮圖的裝飾偽元素遮罩，保留片長標示。
- Comedy 的 YouTube 嵌入回傳錯誤 150；本機遇到嵌入錯誤時自動播放使用者已提供的 MP4，維持 Clip 與時間軸同步。YouTube 仍為線上來源，原片不加入 Git。


### 2026-11-11 | Comedy Show 更新播放連結

- Comedy Show Video 內頁及既有 Comedy Highlight 範例改接使用者提供的新 YouTube 影片 qrdyfziYyHk；既有字幕切點與 Tag 沿用。
- 更新時 YouTube 回報影片處理中；本機維持原片播放備援。


### 2026-11-11 | 暫時精簡 Video Assets 列表

- 依使用者指定，列表暫時隱藏《孤独のグルメ SP》、Nostalgia Collection、Sports Event，保留資料與既有內頁入口；列表數量與類型篩選依可見影片計算。
