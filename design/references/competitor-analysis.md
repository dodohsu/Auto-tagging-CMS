# B2B AI Video Auto-Tagging & Auto-Clip｜串流產業競品分析報告

> 文件狀態：初版整理（2026-10-25）  
> 用途：OTT CMS 的競品研究、UI/UX 參考與產品機會盤點；不等同已確認產品需求。

## 研究說明與查證界線

- 本文件延續先前對話中的報告主題；目前可讀取的對話紀錄只保留內容引用，未能直接展開完整原文。
- 以下僅保留可由廠商官方網站或官方文件確認的能力。價格、客戶實際使用範圍、模型準確率、處理速度與合約條件若無可靠公開資料，均列為「待查證」。
- 「競品」包含兩類：提供完整媒體工作流程的產品，以及可被用來自建流程的 Video AI API；兩者不宜直接用同一採購標準比較。

## 市場能力地圖

B2B 串流與媒體團隊的需求可拆成五段：

1. **Ingest／Index**：匯入直播或檔案、建立索引、顯示處理狀態。
2. **Understand／Tag**：由影像、語音、音訊與畫面文字產生標籤、逐字稿、人物、物件、場景或主題。
3. **Find／Review**：以關鍵字或自然語言找出時間片段，由編輯確認或修正結果。
4. **Clip／Package**：設定 In/Out、建立粗剪、改變比例、加入字幕或品牌元素。
5. **Publish／Measure**：輸出至 CMS、App 或社群，追蹤發布結果與成效。

競品差異通常不只在辨識模型，而在「能否把 AI 結果轉成可控、可追溯的編輯與發布工作流」。

## 可確認的競品與替代方案

### 1. Moments Lab

- **定位**：面向媒體、廣播、運動與內容團隊的影音索引、搜尋及剪輯工作流。
- **已確認能力**：官方 Live Asset Manager 說明其多模態 AI 可處理直播與檔案資產，協助搜尋並建立重點片段與 rough cut；亦提供雲端 clipping 與 Speech-To-Cut。
- **OTT CMS 參考**：同一介面串接直播索引、搜尋結果、播放器時間軸與剪輯動作；適合研究「找素材 → 看證據 → 建立片段」的連續操作。
- **待查證**：實際標籤 taxonomy 管理、人工覆核權限、API／webhook 完整度、繁體中文表現、計價與部署選項。
- **官方來源**：[Live Asset Manager](https://www.momentslab.com/products/live-asset-manager)、[MXT-1 產品公告](https://www.momentslab.com/blog/newsbridge-unleashes-mxt1-ibc2023)

#### Discovery Agent 與資訊架構（2026-10-25 補充）

- **解決的 ToB 問題**：大型片庫中的片段難以定位；Discovery Agent 讓編輯以自然語言或文字搜尋，配合作品／季／集／角色篩選，取得帶時間碼、可在播放器核對的片段候選，而非只取得整支影片。[官方功能頁](https://www.momentslab.com/products/search-and-discovery)
- **官方產品能力層級**：Centralize → Index → Discover → Create → Publish；這是產品流程，**不是已驗證的登入後側邊選單 IA**。[官方首頁](https://www.momentslab.com/)
- **與本專案的落差**：官方頁面的素材核准指下載／分享權限，不是 AI 正確率審核；Discovery 亦非自動剪輯。若用於 AI Tagger CMS，標籤人工覆核、核准發布及 C 端不暴雷的完整作品推薦仍需自行設計。[Centralize](https://www.momentslab.com/products/centralize-your-footage)、[Discovery FAQ](https://www.momentslab.com/products/search-and-discovery)
- **日文限制**：官方 Discovery FAQ 目前未列日文支援。需以日本節目素材驗證搜尋效果並向廠商確認最新狀態。[官方 FAQ](https://www.momentslab.com/products/search-and-discovery)

詳細功能、公開 IA 與 AI Tagger 對照見 [Discovery Agent／IA 研究](Moments%20Lab%202.0/discovery-agent-ia.md)。

#### 影片補充｜Introducing Moments Lab 2.0（2026-09-23）

來源：[Moments Lab 官方影片（1:08）](https://www.youtube.com/watch?v=gWhoQ6o5aSQ)、[官方 2.0 產品文章](https://www.momentslab.com/blog/introducing-moments-lab-2-0)。以下為影片說明、逐字稿與產品文章所述的**廠商宣稱能力**，並非本專案實測結果。

官方文章的三張產品畫面與 UI 觀察整理於 [Moments Lab 2.0 圖片參考](Moments%20Lab%202.0/README.md)。

- **從片庫到社群發布的單一流程**：連接既有儲存位置，原始高畫質檔案可留在原處；透過 AI 找出片段，在 Studio 剪輯後直接發布，減少下載、轉存與重新上傳。影片約 **0:00–0:24** 交代片庫再利用的情境，產品文章補足儲存整合方式。
- **理解節目脈絡的搜尋**：Discovery Agent 接受自然語言要求，例如找某角色的台詞、實境節目的挑戰或符合當前話題的舊素材。官方稱 MXT-3 會辨識角色、故事線與動作脈絡，並改善轉錄、說話者分離及畫面分析。影片約 **0:24–0:48** 展示這個搜尋主張；具體召回率與準確度未提供。
- **Studio 剪輯與社群格式**：搜尋得到的片段可進入 Studio，調整鏡頭順序與裁切；16:9 轉 9:16 的 AI reframe、字幕／翻譯，以及節目品牌預設（Logo、字型、字幕樣式）由官方文章進一步說明。影片約 **0:48–1:00** 提到直式重構、字幕與品牌一致性。
- **發布管理**：官方影片說明可由同一處發布；說明欄列出 TikTok、Instagram、YouTube、Facebook。產品文章另提到各平台預覽、安全區、排程與發布紀錄。影片約 **0:54–1:08** 介紹發布結果。

**對 AI Tagger／CMS 的 UI/UX 啟發（研究推論，待驗證）**：可將「以自然語言找片段 → 檢視命中的時間點 → 建立候選 clip → 調整比例、字幕與品牌 → 預覽發布」視為一條可走通的編輯旅程；同時比較「AI 自動建議」與「編輯手動覆核」在各步驟的切換。這是競品體驗參考，**不是目前 POC 已確認的功能清單**。

**仍待查證**：影片沒有展示詳細的標籤 taxonomy 編修、account 隔離、權限／審核、feedback 蒐集、TELASA BE 串接或實測成效；也不能由「字幕支援多語」推論繁體中文品質符合需求。若要評估採用，需用自有影片實測搜尋、tagging、剪輯輸出與權限流程。

### 2. WSC Sports

- **定位**：以運動內容為核心的即時自動化精華產生與分發平台。
- **已確認能力**：官方案例顯示其可自動建立與分發即時賽事 highlights；NASCAR 案例亦描述將特定事件建立成片段並分發至多個數位／社群管道。
- **OTT CMS 參考**：以事件類型、球隊／選手等條件形成自動規則，並將「片段產生」和「發布目的地」放在同一流程；可作為規則式 Auto-Clip 與多渠道輸出的參考。
- **待查證**：非運動內容的適用性、後台 UI 的一般可用性、人工精修深度、標籤匯出格式、價格與整合限制。
- **官方來源**：[Cleveland Cavaliers 案例](https://wsc-sports.com/case/cleveland-cavaliers/)、[NASCAR 案例（PDF）](https://wsc-sports.com/wp-content/uploads/2024/01/NASCAR-Case-Study.pdf)

### 3. TwelveLabs

- **定位**：可嵌入自有產品的多模態 Video Understanding API，而非完整 OTT CMS。
- **已確認能力**：可對視覺、非語音音訊與逐字稿做自然語言搜尋，回傳符合條件的時間片段；官方 quickstart 也列出分析、分段與自訂 metadata 擷取。
- **OTT CMS 參考**：自然語言搜尋、片段級結果、時間範圍與相關性，是「AI 搜尋 → 片段候選」介面的良好基礎；需自行補上覆核、剪輯、權限與發布層。
- **待查證**：繁體中文與特定內容類型準確率、長片成本、資料留存／區域、SLA，以及自訂 taxonomy 對實際內容庫的表現。
- **官方來源**：[Search 指南](https://docs.twelvelabs.io/docs/guides/search)、[Quickstart](https://docs.twelvelabs.io/v1.3/docs/get-started/quickstart)

### 4. Azure AI Video Indexer

- **定位**：雲端／部分 Edge 情境的影音分析與索引服務，兼具 Portal 與 API。
- **已確認能力**：官方文件列出逐字稿、OCR、臉部、物件、標籤、場景／shots／keyframes、關鍵字與主題等帶時間範圍的 insights；亦提供搜尋與部分內容編輯用途。
- **OTT CMS 參考**：將不同 insight 類型分類呈現，點擊項目即可定位播放時間；適合參考「AI 結果總覽 + 時間證據 + 篩選」架構。
- **待查證**：各功能區域可用性、受限模型申請條件、成本、繁中品質、臉部辨識法遵，以及既有 CMS 的整合工作量。
- **官方來源**：[Insights overview](https://learn.microsoft.com/en-us/azure/azure-video-indexer/insights-overview)、[Video Indexer overview](https://learn.microsoft.com/en-us/azure/azure-video-indexer/video-indexer-overview)

### 5. Google Cloud Video Intelligence API

- **定位**：供開發團隊自建影音分析流程的 API 元件，不是現成編輯型 CMS。
- **已確認能力**：支援 frame／shot／segment 層級 label detection，另有 shot change、人物／臉部、物件追蹤、Logo、OCR、語音轉錄與 explicit content 等功能。
- **OTT CMS 參考**：資料結構可協助設計「標籤 + 信心值 + 時間範圍 + 層級」；產品端仍須自行建立 job 狀態、人工校正、剪輯與發布體驗。
- **待查證**：各功能語系與區域限制、長片成本、即時處理能力，以及跨模型結果如何合併成單一 taxonomy。
- **官方來源**：[Label detection](https://docs.cloud.google.com/video-intelligence/docs/analyze-labels)、[How-to guides](https://docs.cloud.google.com/video-intelligence/docs/how-to)

### 6. Amazon Rekognition Video

- **定位**：AWS 生態中的非同步影片分析 API，可作為自建 Auto-Tagging 的底層服務之一。
- **已確認能力**：可偵測影片中的 objects、events、concepts 與 activities，回傳 confidence 與 timestamp；可依 timestamp 或 segment 聚合。官方也提供 shot 與 technical cue detection，包含 black frames、credits、color bars 等媒體工作流訊號。
- **OTT CMS 參考**：適合把非同步任務、處理進度、標籤信心值與片段聚合設計成可檢查的操作介面；technical cues 亦可支援節目段落或 VOD 包裝流程。
- **待查證**：語意層級是否符合內容編輯需求、跨語言能力、費用、內容資料治理與端到端剪輯功能（Rekognition 本身並非完整剪輯 CMS）。
- **官方來源**：[Video label detection](https://docs.aws.amazon.com/rekognition/latest/dg/labels-detecting-labels-video.html)、[Rekognition Developer Guide（PDF）](https://docs.aws.amazon.com/rekognition/latest/dg/rekognition-dg.pdf)

## 比較結論

- **完整工作流型**：Moments Lab、WSC Sports。評估重點應放在編輯流程、規則、分發與人工覆核，而非只比模型清單。
- **平台／API 型**：TwelveLabs、Azure AI Video Indexer、Google Cloud Video Intelligence、Amazon Rekognition Video。可塑性較高，但 CMS 體驗、權限、版本、剪輯與發布需自行建置或整合。
- **垂直領域差異**：WSC Sports 的公開證據集中於運動；不宜直接推論到戲劇、新聞或一般娛樂內容。
- **共同產品模式**：AI 先產生候選結果，人員以時間軸與播放器確認，再進入剪輯或發布。這比「全自動、無覆核」更適合初期 CMS Demo。

## OTT CMS UI/UX 參考

以下為從已確認能力推導出的設計參考，屬於研究假設，**尚非產品需求**：

1. **資產列表**：顯示縮圖、時長、來源、處理狀態、標籤數、片段數、錯誤與最後更新時間。
2. **分析詳情**：中央播放器；下方多軌時間軸；側欄以人物、物件、場景、逐字稿、OCR、主題等分類呈現 insights。
3. **可追溯 AI 結果**：每個標籤保留時間範圍、信心值、模型／版本、建立時間及人工修改狀態。
4. **人工覆核佇列**：支援接受、修改、合併、拒絕與批次操作，並能辨識「AI 產生」和「人工確認」。
5. **片段工作區**：從搜尋結果或標籤定位時間點，調整 In/Out，建立多個候選 clip；原始資產與 clip 保持關聯。
6. **規則建立器**：以內容條件、事件／標籤、最低信心值、長度、比例與輸出渠道組合 Auto-Clip 規則；提供試跑與結果預覽。
7. **非同步回饋**：清楚顯示 queued／processing／ready／failed，錯誤可重試，避免讓使用者猜測背景處理是否完成。
8. **搜尋體驗**：同時支援結構化 filter 與自然語言查詢；結果需直接顯示命中的時間範圍與預覽。

## 產品機會（待驗證）

1. **Human-in-the-loop 作為核心差異**：與其承諾全自動，不如優先縮短「發現 → 核對 → 修正 → 建立片段」時間。
2. **統一 taxonomy 與治理**：把多個模型輸出的 labels 映射到企業自有分類，保留同義詞、語系、來源與版本。
3. **Tag-to-Clip 的可解釋鏈路**：每個自動片段都能回答「因何規則、哪些標籤、哪段證據而產生」。
4. **針對 OTT 的批次營運**：提供節目、季、集與素材層級的批次覆核，並處理海量舊片庫，而非只聚焦單支影片。
5. **跨渠道版本化**：同一內容片段可衍生橫式、直式、方形等版本，但比例、字幕、品牌模板與發布規則仍待確認。
6. **品質回饋閉環**：記錄誤標、漏標、人工修正與片段採用率，作為模型／規則調整依據。
7. **在地化**：繁體中文、混合語言、專有名詞與台灣內容類型可能形成差異化；實際準確率需以自有素材 benchmark 驗證。

## 建議的 CMS Demo 範圍（討論草案）

此段僅供後續與 PO 討論，不表示已確認：

- 以假資料展示「資產列表 → AI 分析詳情 → 人工覆核 → 建立 clip」主流程。
- 先模擬標籤與片段結果，不預設選用任何特定 AI 供應商。
- 保留空白、處理中、失敗、低信心與無結果狀態。
- 把模型輸出與 CMS domain model 解耦，以便日後替換或並用多個服務。

## 待查證清單

- 先前報告原文能否從對話匯出或附件補回，並逐段比對本版是否有遺漏。
- 各供應商 2026 年的方案名稱、價格、SLA、資料區域、資安與內容留存政策。
- 繁體中文、台灣人名／節目名、混合中英語音、字幕與 OCR 的實測結果。
- 直播延遲、長片吞吐、API rate limit、錯誤重試與 webhook 行為。
- 自訂 taxonomy、模型版本與人工修正是否可匯入／匯出。
- 權利管理、人物辨識同意、未成年人與敏感內容的法遵需求。

