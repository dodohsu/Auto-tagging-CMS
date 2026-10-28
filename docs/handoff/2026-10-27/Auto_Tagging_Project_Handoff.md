# StreamAI｜B2B OTT Auto-Tagging 專案交接文件

> **用途**：將本帳號的 Auto-tagging 專案研究、產品決策、UI/UX 討論及待辦移交至另一個 ChatGPT 帳號。  
> **整理日期**：2026-10-27  
> **狀態**：根據既有對話整理；此文件不是原始聊天逐字匯出。  
> **重要**：設計示意圖中的產品資料、信心度、時間碼及影片畫面多屬 Mock，除非另有正式來源，不可視為真實授權內容或 AI 實際分析結果。

## 0. 專案一句話定位

**StreamAI / OTT Content Intelligence** 是面向 OTT、VOD、直播／廣播平台的 B2B SaaS 概念，透過 AI 分析影片、產生多層級 Metadata，讓內容營運團隊在 CMS 中審核、調整與發布，最終支援 C 端自然語言 AI Search、AI Chapter、片段搜尋及個人化封面。

**核心產品原則**：先以可展示的 CMS Demo 驗證 B2B 價值，再逐階段擴充；AI 的產出需要人工可審核、可編輯、可追溯；不急於取代 OTT 既有 CMS，而是提供可整合的 Metadata Enrichment Layer。

## 1. 使用者背景與設計偏好

- 專案主導視角：資深 Product / UIUX Designer，重視 B2B SaaS 的資訊架構、可操作 Demo、企業導入與視覺品質。
- 目標客戶：優先 OTT／串流平台，其次媒體資產管理、廣播、體育、影音內容平台。
- 希望初期快速驗證方向，產品需求可能與 PO 共編，每週迭代；先 Local-first，未來再以 GitHub 協作。
- 介面偏好：極簡、時尚、具科技感，但避免過度花俏、過多 icon、重度玻璃裝飾。
- **最後確認的視覺基準**：英文版 StreamAI AI Metadata UI 參考圖；柔和灰藍／淺灰漸層背景、白色或半透明柔和 Panel、圓角 Pill、低對比陰影、清晰排版；**品牌強調色保留藍色**（不是紫色）；側欄避免厚重深色背板。
- 設計系統應可跨 Home、Library、Video Detail、AI Chapter、Scenes、AI Search 等模組一致使用。

## 2. 競品研究（全球 → 日本 → 台灣）

### 全球：優先研究

| 競品 | 產品角色／典型情境 | 對 StreamAI 的參考價值 | 客戶與案例注意事項 |
|---|---|---|---|
| **Moments Lab (MXT)** | AI MAM、影片索引、時間碼搜尋、內容檢索、Metadata | Shot／Segment 描述、時間碼、人工審核、MAM 串接 | 過去研究提及 M6 Group、Asharq News、LNR、Brut. 等；移交後需逐案重新核對官方案例 |
| **AnyClip (Genius / Genius+)** | AI Video Intelligence、內容標籤、管理、廣告與影片分發 | Metadata 分類、內容營運工作台、品牌安全／變現 | 過去研究提及 Graham Media Group、Fandom；務必區分直接客戶、合作夥伴與歷史案例 |
| **TwelveLabs** | Multimodal Video Understanding API、自然語言影片搜尋、時間戳結果 | AI Search 技術底座、影片理解、Semantic Retrieval | API-first；CMS 人工審核、taxonomy、同步通常需由採用方自行設計 |
| **Magnifi / VideoVerse** | 自動精華剪輯、片段標籤、媒體工作流程 | Auto-Clip、精彩片段產生、Live／Sports 流程 | 特別適合體育、新聞、直播類情境 |
| **WSC Sports** | 體育賽事事件辨識、自動精華影片 | 事件驅動的 Clip、Sports OTT、規模化內容營運 | 主要為體育垂直領域，與一般影劇 OTT 的需求不同 |
| **Grabyo** | 雲端直播剪輯、分發 | Live Clip Workflow、製作與發布 | 不宜直接等同完整 AI Auto-Tagging 平台 |
| **OpusClip Business** | AI 短影音剪輯與再利用 | 快速示範 Auto-Clip 的可理解價值 | 偏 Creator／Marketing，並非最直接的 OTT CMS 競品 |

### 日本

| 競品／供應商 | 主要方向 | 與 OTT 的關聯 |
|---|---|---|
| **PLAY CLOUD / KRONOS** | OTT Catalog／Content Management、發佈／交付 | 偏下游 CMS 與 Metadata Mapping，不應稱作完整 AI Auto-Tagging 競品 |
| **DataStadium Sports AI Editor** | 體育事件分析與精彩片段 | Sports OTT／賽事剪輯 |
| **NEC Multimedia OLAP** | 影片分析與內容檢索 | 曾討論 Lemino 拳擊精華相關概念／驗證；需查證實際導入範圍 |
| **NTT DATA Video AI** | 影片 AI 分析與企業整合 | 可能屬解決方案／客製導入，需核實產品化程度 |
| **Toshiba 相關影像 Metadata 技術** | 廣播影音辨識／索引 | 偏技術與企業整合，需核實 SaaS 可用性 |

### 台灣

| 競品／供應商 | 主要方向 | 注意事項 |
|---|---|---|
| **Viscovery** | 影像辨識、影片內容理解與標籤 | 優先確認真實 OTT 客戶、CMS UI、產品化／API 能力 |
| **KKCompany OTT 技術方案** | OTT 平台與 CMS 技術 | 屬相鄰生態，不應未經查證宣稱有獨立 Auto-Tag SaaS |
| **其他 AI 影音服務商** | 內容生成／影片處理 | 需區分生成式剪輯、影音搜尋、Metadata 管理三種不同產品定位 |

### 競品研究結論

- 優先深挖：**Moments Lab、AnyClip、TwelveLabs**。
- 次要參考：**PLAY CLOUD、Magnifi**；區域性參考：**Viscovery**。
- 比較軸線：Metadata Schema、Asset/Chapter/Clip/Scene 層級、Timeline、Review、Taxonomy、API、CMS Mapping、版本／Audit、Enterprise Customer、UI 操作流程。
- **流量與營收**：先前討論希望依知名度／高營收／高流量選擇競品，但未取得可信且同口徑的各家 SaaS 月流量與營收數據；**不得虛構排名或數字**。B2B 官網流量也不等同企業客戶採用率。

### 參考網站（需重新驗證更新）

- Moments Lab：https://www.momentslab.com/product-tours/mxt
- Moments Lab API：https://api.momentslab.com/
- AnyClip：https://anyclip.com/products/genius-video-platform/
- TwelveLabs：https://www.twelvelabs.io/
- TwelveLabs Docs：https://docs.twelvelabs.io/
- PLAY CLOUD：https://cloud.play.jp/en/catalog-management/
- TELASA 範例作品：https://telasa.jp/series/6825

## 3. OTT 客戶六大痛點（由案例與產品機會推導，屬產品假設）

1. **Metadata 不足與不一致**：僅有片名、類型、演員等粗粒度欄位，難以支援語意搜尋與細緻推薦。
2. **人工看片與標記成本高**：長影片需要大量人工檢視、標記時間碼、輸入描述。
3. **長影片難以被發現**：內容埋藏在長時數影集／節目中，缺少可供 AI Search 與 AI Chapter 使用的段落索引。
4. **AI 結果缺乏治理**：標籤準確性、信心度、Taxonomy、多語系、來源證據、人工覆核與 Audit 不清楚。
5. **難整合既有 CMS**：供應商 Metadata Schema、權限、狀態、ID 與下游 OTT Catalog 欄位不同。
6. **難驗證商業效果**：AI Search、Chapter、封面個人化是否提高發現率、CTR、觀看時長／轉換率，缺少測試與量測機制。

## 4. 產品機會排序（建議）

| 優先 | 模組／機會 | 為何優先 | 對應 C 端價值 |
|---|---|---|---|
| P0 | **Content-level Auto-Tagging + Human Review** | 最容易讓 OTT 內容營運理解與驗證，且可成為其他功能基礎 | AI Search、推薦、內容分類 |
| P0 | **Chapter / Clip 分段與 Metadata** | 讓長影片可搜尋、可導覽，人工可微調 AI 分段 | AI Chapter、片段命中 |
| P0 | **AI Search Playground（CMS 模擬）** | 提案 Demo 最能直接展示 Metadata 如何轉成 C 端價值 | 自然語言搜尋推薦 |
| P1 | **Taxonomy / Metadata Mapping / CMS Sync** | Enterprise 導入關鍵，需依客戶 CMS 結構設計 | 穩定發佈與搜尋品質 |
| P1 | **AI Cover / Thumbnail Recommendation** | 利用畫面與 Metadata 推不同封面，驗證 CTR | 個人化封面 |
| P2 | **Auto-Clip Publishing / Advanced Analytics** | 需更多編輯、版權、渠道與量測流程 | 社群／精華片段／效益追蹤 |

以上為設計提案排序，並非已確認的 PO Roadmap。

## 5. 資料層級與術語（重要決策）

```text
Content / Video Asset
├── Content-level Metadata（Genre / Theme / Mood / Style / Audience）
├── Chapter 1（可對 C 端顯示）
│   ├── Clip 1-1（Clip-level Tags、Timecode、Evidence）
│   ├── Clip 1-2
│   └── Clip 1-3
├── Chapter 2
│   └── ...
└── Scene / Visual Evidence（可與一或多個 Clip 關聯）
```

- **Content-level Tags**：整部影片是什麼；用於 AI Search、推薦、個人化。
- **Chapter**：具敘事或主題意義的段落；可在 C 端 Detail Page 形成 AI Chapter。
- **Clip**：Chapter 內較細的時間片段，每個 Clip 都有獨立 Tags、信心度與審核狀態；一支長影片可能有 10 個 Chapter，每章多個 Clip。
- **Scene**：AI 觀察到的視覺／敘事情境或辨識證據（如餐廳、料理特寫、街景）；**不必強制與 Chapter 或 Clip 形成同一種分段邊界**。
- **重要 UX 決策**：不應把「場景與章節」與「分段＆章節」設計成完全重複的操作；Scene 可以是 Clip Detail 的 Visual Evidence，或獨立的 Scene Analysis 視圖，但需明確區別用途。
- **AI 章節邊界必須可人工微調**：AI 初次切分後，營運人員可用類似 IG／簡易剪輯器的 timeline 拖曳起迄點，必要時同步更新相鄰段落，並保留版本／變更記錄。
- **時間軸顏色要有清楚語意與 legend**：不可同時用同一色表示 Chapter、Clip 與 Tag 分布而無法對應 UI。

## 6. 建議 Metadata Schema（概念設計，非競品原生 Schema）

```json
{
  "asset": {
    "asset_id": "TELA-6825",
    "title": "《孤独のグルメ SP》",
    "content_type": "special",
    "language": "ja",
    "duration_ms": 7103000,
    "content_tags": [
      {"category": "theme", "label": "美食文化", "confidence": 0.96, "review_status": "approved"}
    ]
  },
  "chapters": [
    {
      "chapter_id": "ch-01",
      "title": "示意章節名稱",
      "start_ms": 0,
      "end_ms": 900000,
      "clips": [
        {
          "clip_id": "clip-01-01",
          "start_ms": 0,
          "end_ms": 180000,
          "tags": [{"category": "scene", "label": "餐廳內景", "confidence": 0.91}],
          "review_status": "pending",
          "evidence": ["visual", "transcript"]
        }
      ]
    }
  ],
  "audit": {
    "model_version": "demo-model",
    "taxonomy_version": "draft",
    "cms_sync_status": "not_synced"
  }
}
```

> 所有 ID、時間碼、信心度與資料內容僅為結構示意；不得當作 TELASA 作品的真實 Metadata。

## 7. MVP 流程與 Phase 整合

### Phase 1｜單片分析與可視化（最小可售 Demo）

`Upload / Select Video → AI Analysis（STT／字幕／視覺）→ Content Tags → Chapter / Clip Detection → Review / Timecode Adjustment → Save Version`

展示重點：一支影片經分析後能產生可審核的整片標籤、章節與片段，人工能快速修正。

### Phase 2｜搜尋價值展示

`Approved Metadata → Search Index → AI Search Playground in CMS → Natural-language Query → Results / Relevant Clips → Explain Match`

展示重點：在 CMS 內模擬 C 端 AI Search 對話／搜尋視窗，看到推薦影片、片段、理由與對應時間碼；與真正對外發布的 Search UI 分開。

### Phase 3｜企業化與營運

`Taxonomy Governance → Field Mapping → CMS Sync / Publish → Cover Variant Management → Experiment / Analytics`

展示重點：整合客戶既有 CMS、管理不同封面候選、按受眾或偏好建立測試、追蹤 CTR 等指標。**Netflix 個人化封面僅作產品策略參考，不可聲稱知道其內部 CMS 實際設計。**

## 8. 主要 CMS 模組與關鍵 UI

### 初期主導航（最新簡化決策）

```text
StreamAI
├── Home
├── Library
│   ├── Video List
│   └── Video Detail
│       ├── AI Metadata / Content-level Tags
│       ├── Content Info
│       ├── Chapters & Scenes（可延伸 Chapter → Clip）
│       ├── Cast & Crew
│       ├── Subtitles
│       └── Similar Content
└── AI Search
    ├── AI Search List
    └── AI Search Detail
        ├── Greeting / Assistant Name / Prompt
        ├── Appearance / Theme
        ├── Data Sources / Index Management
        └── Playground / Preview
```

**最新 HTML Demo 指令**：Side Menu **只保留 Home、Library、AI Search**；先完成 Library Video List，Home 與 AI Search 可先為可切換 placeholder。Library 的 Mock Video 欄位：縮圖、名稱、ID、類型、片長、年份、AI 分析狀態；有搜尋、篩選、點選影片等基本互動。

### Video Detail｜AI Metadata（最後指定 UI 版本）

- 頂部：返回 Library、影片縮圖與播放入口、日文片名／中文翻譯、ID、類型、年份、片長、SP、Completed Analysis、版本、Re-analyze、Save。
- 上方 Pills：AI Metadata、Content Info、Chapters & Scenes、Cast & Crew、Subtitles、Similar Content。
- 左主欄：AI Metadata 描述與「AI Generate from Clip」；分類卡 **Genre、Theme、Mood、Style、Audience**，每列有分類說明、候選 Tags、已選數、confidence、more actions；最下方 AI Generated Metadata Summary。
- 右側：**Content Overview**（影片劇情簡介、語言／字幕／集數／片長／年份／地區）、**AI Metadata Sources and Basis**（Synopsis、Scene Analysis、Transcript Text、Visual Analysis 分頁）、**Relevant Similar Content**（縮圖列）。
- Tag UI：選取與未選取明確區分；confidence 為模型分數，不等同人工批准。Genre 類型可能是受控 taxonomy，不能僅因畫面使用圓形勾選圖案就斷定所有分類為單選。

### Chapters / Clips / Scene UI

- Chapter 列表（可展開）→ Clip 列表（每章多 Clip）→ Player / Timeline → 右側 Clip Detail。
- Clip Detail：開始／結束時間、標題、主要／次要 Tags、信心度、人工審核狀態、AI 描述、關鍵畫面、字幕／語音 Evidence。
- Chapter 邊界可拖曳調整，採用**簡單剪輯工具／IG 風格**，不做複雜專業剪輯器。
- Scene／Visual Evidence 應有時間碼與可追溯來源；必要時在「Chapters & Scenes」中提供切換視圖，而不是重複管理資料。

### AI Search 管理

- AI Search List：多個 Search Experience / Assistant 配置、狀態、資料範圍、最後更新時間。
- AI Search Detail：招呼語、助理名稱、外觀（顏色、頭像／主題、氣泡）、推薦問題、資料來源／索引管理、預覽與測試。
- Playground：自然語言提問 → 推薦影片／片段 → 命中原因、Metadata Evidence、時間碼；可測不同設定而不直接影響 C 端正式服務。

### Cover Management（後續）

- AI 根據片段、人物、情緒與受眾產生候選封面；人工審核。
- 可為不同受眾設定封面 Variant 與測試；需設計權限、發布、實驗組、CTR 與統計顯著性等概念。

## 9. Design System：最新確認版

### 視覺方向

- 參考圖：**英文版 StreamAI AI Metadata 畫面**（最後更新版），不是較早的深色 Sidebar 中文版。
- 風格：**Minimal / Contemporary / Soft Tech**；背景柔和的灰藍／白色漸層、少量模糊柔光、白色低對比浮層；重視資訊密度與閱讀清晰度。
- 強調色：**Blue**；參考圖若使用紫色 Selected Chips，應轉為藍色。
- 深色接近黑／深海軍藍：用於主要 CTA、Active Tab；不使用大面積深色 Sidebar。
- 卡片：柔和圓角、細微陰影／邊界；選單與 Tab 使用 Pill；避免大量彩色 Icon。

### 建議 Tokens（待實作確認，非圖片精確取色）

| Token | 建議值／原則 |
|---|---|
| `color.primary` | `#2563EB` 或相近科技藍 |
| `color.primarySoft` | `#E8F0FF` |
| `color.ink` | `#111827` |
| `color.textSecondary` | `#64748B` |
| `color.surface` | `rgba(255,255,255,0.78)` |
| `color.background` | 淺灰藍、淡白漸層；避免飽和色塊 |
| `radius.card` | 建議 20–24px |
| `radius.pill` | 999px |
| `spacing` | 4/8/12/16/24/32px scale |
| `shadow.card` | 非常輕柔的環境陰影 |
| `typography` | 現代無襯線字體，需支援繁中、日文、英文 |

### 共用 Components

- `AppShell`、`SidebarNav`、`Breadcrumb`、`VideoHeader`、`VideoThumbnail`
- `PillTabs`、`Button`、`IconButton`、`StatusBadge`、`SearchInput`、`FilterSelect`
- `PanelCard`、`MetadataCategoryRow`、`TagChip`、`ConfidenceLabel`、`SelectedCounter`
- `EvidenceTabs`、`VideoListTable`、`ChapterAccordion`、`ClipTimeline`、`ClipDetailPanel`
- `SearchAssistantSettings`、`SearchPlayground`、`CoverVariantCard`

### UI States

Default、Hover、Focus、Selected、Disabled、Loading、Processing、Completed、Pending Review、Approved、Failed；視覺狀態不能只靠顏色區分，應有文字／圖形輔助。

## 10. 示例影片與資料注意事項

- 主要 UI 示範作品：**《孤独のグルメ SP》／《孤獨的美食家 特別篇》**，參考 TELASA 頁面：https://telasa.jp/series/6825
- 曾在設計稿出現 `TELA-6825`、`2024`、`1:58:23`、劇情描述、場景、日文 Tags 等：**視為設計稿示意資料**，未驗證前不可作正式內容資料。
- 影片劇照與第三方作品視覺涉及著作權與授權；正式商用 Demo 建議改用有權使用的素材或標註僅供內部示意。

## 11. 專案結構與交接狀態

先前討論的 `ott-cms` Local-first → GitHub Collaboration 架構：

```text
ott-cms/
├── README.md
├── AGENTS.md
├── docs/
│   └── product/
│       ├── overview.md
│       ├── feature-map.md
│       ├── features/
│       │   ├── dashboard.md
│       │   ├── content-management.md
│       │   └── category-management.md
│       ├── decisions.md
│       └── weekly-changes.md
├── design/
│   ├── design-principles.md
│   ├── design-system.md  # 曾要求新增／更新，實際狀態待驗證
│   ├── references/
│   └── variants/
└── src/
    ├── components/
    ├── features/
    ├── layouts/
    ├── themes/
    └── mock-data/
```

- 目標是初期本機開發、之後 PO 共編、每週迭代；不要自行建立遠端 Git repository。
- 曾多次把 Design System MD 更新與 HTML Demo 製作交由 **ChatGPT Work** 執行；**目前這份交接文件無法驗證 Work 是否完成、是否真的寫入 Mac Desktop 或專案目錄**。新帳號需先檢查檔案。
- 最新 HTML Demo 需求：靜態 HTML/CSS/JS；保留 Home／Library／AI Search 三項側欄，先完成 Library Video List，能搜尋、篩選、點擊；未來接 Video Detail。

## 12. 未定案事項／下一輪應先確認

1. **Demo 交付形式**：純靜態 HTML 還是既有 React／Vite 架構？以實際專案為準。
2. **Content / Chapter / Clip / Scene**：Scene 是否獨立 UI 視圖？章節切分與 Scene Detection 的關係、重疊段落規則。
3. **Tag Governance**：每類 Tag 的單選／多選限制、人工審核門檻、信心度閾值、taxonomy 與同義詞／多語系。
4. **AI Search**：索引範圍（Content vs Clip）、資料更新頻率、召回與排序、Explainability、權限／版權過濾。
5. **CMS Sync**：客戶現有 CMS 欄位映射、發佈流程、版本回滾、權限與 Audit。
6. **Cover Personalization**：受眾定義、實驗分流、CTR／觀看指標、發布策略。
7. **競品實證**：企業客戶案例、營收／流量、實際 CMS UI 截圖需再用官方來源確認。

## 13. 建議下一步

**第一優先：** 確認 `ott-cms` 專案與 `design-system.md`、HTML Demo 實際檔案，並以最新英文版 StreamAI UI 基準完成可操作的 **Library List → Video Detail / AI Metadata** 流程。

**第二優先：** 製作 Chapters & Scenes 的簡單可編輯 Timeline，示範 AI 先分段、人工拖曳微調、Clip Tags 審核。

**第三優先：** 將 Approved Metadata 連接到 AI Search Playground，展示自然語言搜尋與命中影片／片段。

---

## 14. 可直接貼到新帳號的「繼續專案指令」

> 我正在規劃一個名為 StreamAI 的 B2B OTT Content Intelligence SaaS，核心是 Auto-Tagging、AI Chapter／Clip、AI Search 與 CMS 管理。請先完整閱讀我附上的 `Auto_Tagging_Project_Handoff.md`，把它視為本專案的歷史背景與目前設計決策，但**不要將尚未驗證的示意數據當成正式產品規格**。我們已確立 Content-level Metadata → Chapter → Clip → Tags 的概念架構，AI 分段後需要人工可調整時間，Scene 作為視覺辨識／Evidence，AI Search Playground 在 CMS 中展示 C 端自然語言搜尋。UI 請遵守最後確認的英文版 StreamAI 設計方向：灰藍柔和漸層、極簡白色卡片、圓角 Pill、低對比陰影、**藍色主色**，避免重度玻璃擬態與大量 icon。主導航暫時只有 Home、Library、AI Search。當前優先工作是完成 Library Video List 的可操作 HTML Demo，再串接 Video Detail / AI Metadata；請先檢查我上傳的專案檔案和 Design System，再提出下一步，不要自行改寫已確認的 IA 或假設不存在的檔案已完成。

## 15. 跨帳號移交操作

1. 在原帳號下載本 Markdown 文件。
2. 於新帳號建立專案（建議名稱：**Auto-tagging / StreamAI**），上傳本 Markdown。
3. 同時上傳最新 **英文版 StreamAI AI Metadata UI 參考圖**、`design-system.md`（若已生成）及 `ott-cms` 專案程式碼／ZIP（若需要繼續實作）。
4. 把第 14 節的「繼續專案指令」貼到新對話，要求先盤點現有檔案與待辦。
5. 若需要逐字歷史聊天，請另外透過原帳號 ChatGPT 資料匯出功能取得原始對話；本文件是**整理版交接摘要**，不是原始聊天紀錄。
