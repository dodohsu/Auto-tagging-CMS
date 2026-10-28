# KK lab CMS Design System（新版英文 UI）

> **目前 Demo 的暫行實作基礎（2026-10-26）：[shadcn/ui](https://ui.shadcn.com/)。** 以其語意 token 與 Sidebar、Card、Button、Input、Select、Table、Badge 等元件作為優先參考；主色維持 KK lab 藍色。React／Vite 原始碼與已安裝元件位於 `app/`，`demo/index.html` 則是可直接開啟的建置產物。舊版單檔靜態參考保留於 `design/variants/KK lab-static-library.html`。下列參考圖觀察與舊版建議 token 保留作為畫面需求與比較資料；若與本段的元件基礎衝突，以 shadcn/ui 基礎為準。

## 暫行元件對照

2026-10-26 更新：現行互動 Demo 主色採深灰 `#333333`（使用者輸入 `#33333`，先按六位色碼解讀）；舊版藍色提案保留作為比較。Detail 僅保留 AI Metadata 與 Chapters & Scenes 分頁。

| Demo 區塊 | shadcn/ui 參考元件 |
| --- | --- |
| 側欄與選取態 | Sidebar |
| 摘要數字與影片詳情 | Card |
| 主要／次要操作 | Button |
| 關鍵字與篩選 | Input、Select |
| 影片清單 | Table；未來資料量增加再評估 Data Table |
| AI 分析狀態 | Badge |

顏色使用 `background`、`foreground`、`card`、`primary`、`muted`、`accent`、`border`、`input`、`ring`、`sidebar` 等語意名稱；以 10px 基礎圓角及淡邊線呈現。這是暫行 Demo 選型，正式主題色與 React 實作仍待確認。

> 狀態：依最新參考圖整理，供設計與工程對齊；尚非完整產品規格  
> 唯一 UI layout／component 參考：`image(20261025-163525).png`（2048 × 1365）  
> 實際讀取附件：`/var/folders/yt/d2bs29rn5v934c5d9__7jd7w0000gn/T/codex-file-preview-4eAnmT/image(20261025-163525).png`  
> 指定調整：以藍色取代圖中的紫色主色；維持淺灰藍漸層、極簡、輕量通透  
> 最後更新：2026-10-26

## 1. 判讀原則

本文件取代先前依中文介面整理的結構，且不以其他圖片推導新版 UI。

- **畫面觀察**：圖片可直接確認的文字、結構、層級、元件或狀態。
- **需求指定**：使用者明確要求；本版為藍色主色替換。
- **建議 token**：方便實作的起始值，非設計原檔量測或定案規格。
- **待確認**：靜態圖無法判斷的行為、規則、例外、斷點與權限。
- 圖中內容、ID、標籤、分數、版本及時間都是示例資料。

## 2. 視覺與 Layout

### 畫面觀察

- 桌面 CMS：左側常駐 Sidebar，右側工作區；Sidebar 無實心背板。
- 背景由白至冷灰藍柔和漸層，局部淡藍光暈。
- Header controls、Video Summary、pill tabs 與內容卡片使用白色／半透明白表面。
- 大圓角、低對比邊界、極淡陰影與大量留白形成輕量通透層次。
- 深海軍藍文字、藍灰次要文字、綠色完成狀態；圖中的紫色選取色依需求改為藍色。
- 工作區由上而下為 Header、Video Summary、pill tabs、雙欄內容。左欄為 AI Metadata；右欄依序為 Content Overview、AI Metadata Sources and Basis、Relevant Similar Content。

### 建議 token（非定案）

| Token | 建議值 | 用途 |
| --- | ---: | --- |
| `--shell-padding` | `24px` | 桌面外距 |
| `--sidebar-width` | `220px` | 常駐導覽 |
| `--workspace-gap` | `24px` | 導覽與工作區間距 |
| `--content-gap` | `16px` | 模組間距 |
| `--content-columns` | `58% 42%` | 雙欄起始比例 |
| `--content-max-width` | `1600px` | 超寬螢幕限制 |

圖片只展示寬螢幕；響應式斷點、手機版及 Sidebar 收合方式待確認。

## 3. Sidebar IA

### 畫面觀察：英文資訊架構

```text
KK lab
OTT Content Intelligence
├─ Home
├─ Library
├─ AI Analysis
├─ Content Management                    [expanded]
│  ├─ General Info
│  ├─ AI Metadata                        [selected]
│  ├─ Scene & Chapter
│  ├─ Cast & Crew
│  ├─ Rights & Distribution
│  ├─ File Management
│  └─ Performance
├─ AI Search
├─ Analytics
└─ Settings                              [bottom anchored]
```

- 品牌區包含漸層圓形標誌、`KK lab` 與副標。
- 一級導覽使用 outline icon＋英文標籤；Content Management 顯示展開 chevron。
- 子選單由細直線串接；AI Metadata 以淡藍 pill、藍字與左側藍色短條表示選取。
- AI Search、Analytics 與上方群組有較大垂直距離；Settings 位於底部。

狀態至少涵蓋 Default、Hover、Selected/Active、Focus-visible、Expanded/Collapsed、Disabled。Selected 不只靠顏色；展開控制使用 `aria-expanded`，目前頁使用 `aria-current="page"`。產品群組關係、整體收合、權限及超長文字待確認。

## 4. Header

### 畫面觀察

- 左側：返回箭頭、breadcrumb `Library / AI Metadata`。
- 右側：版本選擇器 `v1.0 (2025-03-10 10:30)`、`Re-analyze`、`Save`、overflow menu。
- 版本是寬版 outline control；Re-analyze 帶循環箭頭；Save 是實心 pill；更多操作是三點圖示。

### 規範

- Save 改用藍色 primary button；Re-analyze 使用白／半透明 secondary button。
- Re-analyze：Idle、Confirming（若覆蓋）、Queued、Running、Succeeded、Failed。
- Save：Pristine、Unsaved、Saving、Saved、Failed、Conflict，loading 時不改變寬度。
- 離頁提示、新版本規則、版本唯讀與 overflow 項目待確認。

## 5. Video Summary

### 畫面觀察

- 左側 16:9 縮圖，中央播放鍵，右下疊加 `1:58:23`。
- 中段為日文影片名；同列右側是綠色 `Completed Analysis` pill。
- 次列：`ID TELA-6825`、`Drama`、`Food`、`2024`、`1:58:23`、`SP`，以細線分隔。

縮圖需有替代文字、失敗 fallback 與可讀取的播放按鈕。標題截斷、正式欄位及缺值待確認。分析狀態至少評估 Not analyzed、Queued、Analyzing、Completed、Failed、Outdated，且以文字＋狀態點表達。

## 6. Pill Tabs

### 畫面觀察

白色／半透明 pill 容器內平均排列：

1. `AI Metadata`（selected）
2. `Content Info`
3. `Chapters & Scenes`
4. `Cast & Crew`
5. `Subtitles`
6. `Similar Content`

Selected 是實心 pill＋白字，本版改為藍色。建議容器 padding `4px`、tab 高 `44px`、水平 padding `20–28px`、pill 圓角。需有 Default、Hover、Selected、Focus-visible、Disabled、Loading，並採 tablist/tab 語意與方向鍵操作。URL、未儲存資料及窄螢幕方式待確認。

## 7. AI Metadata

### Header（畫面觀察）

標題旁有 info icon；說明提及 genre、theme、mood、style 與 AI search、recommendation、content generation。右上為帶 sparkle icon 的 `AI Generate from Clip`。Clip 選取、覆蓋規則、範圍、耗時與錯誤待確認。

### 五組分類（畫面觀察）

每組 row card 左側為圖示、類別與英文說明；右側為 chips；右上為 selected count 與 overflow menu。

| 分類 | 畫面說明 | 計數 | 圖中示例 |
| --- | --- | --- | --- |
| Genre | Main genre and content category of the video. | `Selected 2/8` | 邦画、国内ドラマ、洋画、海外・アジアドラマ、アニメ、キッズ・特撮、バラエティ・音楽、その他 |
| Theme | Main themes and subject matters of the video. | `Selected 2/6` | 美食文化 96%、在地探索 88%、人情味 58%、単人旅程 54%、職人精神 48%、日常生活 42% |
| Mood | Emotional atmosphere conveyed in the video. | `Selected 2/6` | 療癒 93%、溫暖 87%、放鬆 68%、滿足 66%、懷舊 40%、感動 36% |
| Style | Visual style and filming techniques. | `Selected 2/6` | 寫實 92%、生活感 86%、公路旅行 58%、旁白敘述 52%、幽默 36%、美食特寫 34% |
| Audience | Target audience segments for the video. | `Selected 2/6` | 美食愛好者 96%、一般大眾 84%、中高年齡 56%、男性 52%、海外觀眾 45%、家庭觀眾 38% |

### Selected counts

- 格式為 `Selected {selected}/{available}`，分母是目前顯示的候選數。
- 每組選 2 個只是示例，不代表固定上限；操作後應即時更新並可被輔助科技讀取。
- 最少／最多選取、自訂 tag、隱藏候選的分母與儲存驗證待確認。

### 單選、多選與 confidence chip

#### 畫面觀察

- chip 左側皆為圓形控制；selected 是實心圓加勾，unselected 是空心圓。
- 每組同時有兩個 selected，因此五組目前皆為**多選**，不是 radio 單選。
- Genre 只顯示文字；Theme、Mood、Style、Audience 顯示文字＋AI confidence 百分比。
- selected confidence chip 為主色淡底、主色字與勾選；unselected 為灰白底、深灰字、空心圓，仍顯示分數。

#### 元件規範

- **Multi-select chip**：以 checkbox 語意實作，即使控制外觀為圓形。
- **Single-select chip（本圖未出現）**：只有產品明確限制單選時採 radio；不能由圓形外觀推定。
- **Confidence chip**：multi-select 的內容變體，尾端附 `NN%`，需有如「AI confidence 96 percent」的可讀取名稱。
- **Genre chip**：無 confidence 的多選變體；缺值與 0% 必須在資料模型區分。
- confidence、AI 建議、人工採用是獨立欄位；信心值不能單獨決定 selected。
- confidence 算法、精度、門檻、排序、更新與人工選取後的顯示待確認。

### Metadata Summary（畫面觀察）

分類下方為 `Metadata Summary (AI Generated)` row card，右側顯示中文摘要；未見編輯操作。可編輯性、語言、重新生成、版本與人工修改標記待確認。

## 8. 右欄模組

### Content Overview

- **畫面觀察**：標題與 `Edit`；上半部為圖片、`AI Generated` badge、`Synopsis` 及英文摘要；下半部為 2 × 3 grid：Language、Subtitles、Episodes、Duration、Production Year、Production Region。
- `AI Generated` 是來源 badge，不是按鈕，需與人工覆寫區分。
- Edit 採 inline／drawer／modal、摘要限制、缺值、換行與權限待確認。

### AI Metadata Sources and Basis

- **畫面觀察**：funnel icon、展開 chevron；segmented tabs 為 `Synopsis`（selected）、`Scene Analysis`、`Transcript Text`、`Visual Analysis`；下方 bullet list 說明判斷依據。
- 保留來源切換與具體 evidence；tabs 採 tab 語意，收合控制提供 `aria-expanded`。
- 來源與 tag 映射、時間碼、引用片段、缺失、排序與影片跳轉待確認。

### Relevant Similar Content

- **畫面觀察**：水平縮圖列；標籤為 Food、Local Cuisine、Travel、Healing、Japan Scenery；部分有播放圖示，右側箭頭表示可續覽。
- 建議採 carousel/list 語意與鍵盤操作。相似度、推薦原因、排序、播放條件、目的地、分頁與空狀態待確認。

## 9. Component Inventory

| 元件 | 變體 | 最低必要狀態 |
| --- | --- | --- |
| Button | Primary、Secondary、Ghost、Icon-only | Default、Hover、Pressed、Focus、Disabled、Loading |
| Pill Tab | Page、Evidence segmented | Default、Hover、Selected、Focus、Disabled |
| Selection Chip | Multi-select、with confidence；Single-select 僅未來變體 | Unselected、Selected、Hover、Focus、Disabled、Error |
| Badge | Status、Source、Count | 文字＋圖示／形狀語意 |
| Card | Summary、Module、Row、Evidence、Carousel | Default、Loading、Empty、Error |
| Menu Button | Version、Overflow、Category | Closed、Open、Focus、Disabled |
| Media Thumbnail | Video、Content still | Loading、Loaded、Unavailable、Playable |
| Collapse | Navigation、Evidence | Expanded、Collapsed、Focus、Disabled |
| Metadata Field | Label＋value | Populated、Empty、Loading、Error、Read-only |

## 10. Design Tokens（全部為建議值）

### Color

| Token | 建議值 | 用途 |
| --- | --- | --- |
| `--color-bg-start` | `#F7FAFD` | 漸層亮端 |
| `--color-bg-end` | `#EAF2F8` | 淺灰藍端 |
| `--color-surface` | `rgba(255,255,255,.74)` | 通透卡片 |
| `--color-surface-strong` | `rgba(255,255,255,.92)` | 浮起控制 |
| `--color-surface-subtle` | `#F2F6FA` | 未選 chip |
| `--color-border` | `rgba(87,112,143,.12)` | 低對比邊界 |
| `--color-divider` | `#E4EBF2` | 分隔線 |
| `--color-text-primary` | `#0D1730` | 標題 |
| `--color-text-secondary` | `#445474` | 正文 |
| `--color-text-muted` | `#71809A` | caption |
| `--color-primary-700` | `#1957D2` | 主要按鈕、選取 |
| `--color-primary-600` | `#2563EB` | Hover、focus |
| `--color-primary-100` | `#E8F0FF` | selected 淡底 |
| `--color-success-700` | `#17823B` | Completed 文字／點 |
| `--color-success-100` | `#DDF7E6` | Completed 背景 |
| `--color-danger-600` | `#D92D20` | Error；圖未展示 |

```css
/* 建議氛圍，非定案 */
background:
  radial-gradient(circle at 72% 8%, rgba(204, 224, 242, .48), transparent 34%),
  linear-gradient(135deg, #f7fafd 0%, #eaf2f8 100%);
```

### Typography

圖片僅能確認中性無襯線風格，無法確認實際字型與字重。

| Token | 建議值 | 用途 |
| --- | --- | --- |
| `--font-sans` | `Inter, "Noto Sans TC", "Noto Sans JP", sans-serif` | 多語 CMS |
| `--type-page-title` | `24px/32px, 700` | 影片名／主標 |
| `--type-section-title` | `20px/28px, 700` | 模組標題 |
| `--type-row-title` | `16px/24px, 650` | 分類名稱 |
| `--type-body` | `14px/21px, 400` | 摘要、說明 |
| `--type-label` | `13px/18px, 550` | controls |
| `--type-caption` | `12px/17px, 400` | metadata、badge |

版本、時間、百分比與計數建議使用 tabular numbers。

### Spacing、Radius、Effects

| Token | 建議值 | 用途 |
| --- | --- | --- |
| `--space-1/2/3/4/5/6/8` | `4/8/12/16/20/24/32px` | 間距級距 |
| `--control-sm/md/lg` | `32/40/44px` | chip/button/tab 高度 |
| `--hit-target-min` | `44px` | 最小操作熱區 |
| `--radius-sm/md/lg/xl/2xl` | `8/12/16/20/24px` | 元件圓角 |
| `--radius-pill` | `999px` | pill、chip、badge |
| `--border-subtle` | `1px solid rgba(87,112,143,.12)` | 低對比邊界 |
| `--shadow-card` | `0 10px 30px rgba(34,62,94,.06)` | 卡片 |
| `--shadow-float` | `0 6px 18px rgba(34,62,94,.10)` | 浮起控制 |
| `--surface-blur` | `blur(18px)` | 通透表面，需實色 fallback |

## 11. 互動、無障礙與內容規範

- 藍色替換後驗證正文、selected chip、focus ring、primary button 與 badge 的 WCAG 對比。
- icon-only control 提供 accessible name；tooltip 不作為唯一名稱來源。
- Focus-visible 建議 `2px` 藍色外框＋`2px` offset，不得被 overflow 裁切。
- Chip 整體是點擊目標；多選支援 Space，tabs 支援方向鍵，menu 支援 Escape。
- Loading skeleton 與最終內容等高，避免 layout shift。
- Empty、partial、error、stale、read-only、permission denied、offline 均未在圖中出現，需另補規格。
- AI 內容應保留來源、生成版本、時間及人工覆寫紀錄；資料欄位待確認。
- 英文 UI label 維持一致 case；內容可為多語，不與介面語言混為一談。

## 12. 不應由本圖直接定案

- 精確尺寸、色碼、字型、陰影與透明度。
- 響應式斷點與手機版導覽。
- chip 最大選取數、single-select 類別、confidence 演算法與門檻。
- 儲存、重新分析、版本切換與衝突處理。
- Edit、overflow、AI Generate from Clip 的完整互動。
- 權限、審核／發布、undo/redo 與稽核紀錄。
- Similar Content 演算法與 Sources and Basis 證據映射。

以上在 PO、設計與工程確認前均為待確認；不得把建議 token 或靜態畫面推測視為正式需求。
