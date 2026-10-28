# Moments Lab Discovery Agent｜功能與 IA 參考

> 整理日期：2026-10-25。依 Moments Lab 公開產品頁整理；屬競品研究，不等於登入後實際側邊選單，也不等於 AI Tagger POC 已確認需求。

## 它解決的 ToB 問題

大型片庫中，編輯通常知道想找的情節、台詞或人物，卻不知道落在哪部作品的哪個時間點。傳統依檔名、人工標籤或整支影片搜尋，仍需逐支播放與手動定位。Discovery Agent 將自然語言查詢接到具有時間碼的 AI 描述資料，讓工作者先找到可預覽、可使用的**片段級候選結果**。[官方 Discovery 頁](https://www.momentslab.com/products/search-and-discovery)

## 官方公開的產品能力架構

這是官方網站的 **產品工作流程／能力分類**，不能視為已驗證的登入後導覽 IA。[官方首頁](https://www.momentslab.com/)

```text
Moments Lab
├─ Centralize｜集中片庫；接入儲存、直播素材、代理檔；管理組織、角色與素材權利
├─ Index      ｜MXT 建立片段／鏡頭的時間碼描述、逐字稿及自訂 metadata
├─ Discover   ｜Discovery Agent 與語意／文字搜尋、篩選、片段預覽及 Projects
├─ Create     ｜Studio 編輯、畫面重構、字幕與品牌樣式
└─ Publish    ｜社群平台預覽、發布／排程及發布紀錄
```

- [Centralize 官方頁](https://www.momentslab.com/products/centralize-your-footage)
- [Index／MXT 官方頁](https://www.momentslab.com/products/mxt)
- [Discover 官方頁](https://www.momentslab.com/products/search-and-discovery)
- [Create／Studio 2.0 文章](https://www.momentslab.com/blog/introducing-moments-lab-2-0)
- [Publish 官方頁](https://www.momentslab.com/products/publish)

## Discover 層的資訊與操作

以下是官方列出的能力，不代表實際 UI 的選單名稱或版位：[Discovery Agent 官方頁](https://www.momentslab.com/products/search-and-discovery)

1. **查詢**：以自然語言、語意搜尋或一般文字搜尋描述想找的畫面／情節。
2. **縮小範圍**：依 show、season、episode、character 等 metadata 篩選。
3. **片段級結果**：回傳精確時間碼，而不是只列整個影片檔案。
4. **證據預覽**：在 proxy player 中查看命中片段並調整 In／Out。
5. **後續使用**：加入 Projects 供團隊回饋，或帶入 Studio、匯出／交接至剪輯工具。

其依賴 **Index 層先產生帶時間碼的描述資料**。官方 Discovery FAQ 仍寫 MXT-2 為必要資料來源，而 2.0 產品文章介紹 MXT-3；兩頁的版本敘述不同，實際部署與相容性須向廠商確認。[Discovery FAQ](https://www.momentslab.com/products/search-and-discovery)、[2.0 文章](https://www.momentslab.com/blog/introducing-moments-lab-2-0)

## 對 AI Tagger CMS 的設計借鏡（推論，待 PO 確認）

```text
B 端：片庫／影片 → AI 標籤與片段證據 → 人工覆核 → 可搜尋作品索引
                                                     ↓
C 端：日文自然語言搜尋 → 完整作品推薦卡片（不曝光劇情片段與時間碼）
```

- **可借鏡**：大量影片先按作品、季、集與處理狀態管理；搜尋結果在 B 端顯示時間碼和原片證據，讓編輯能快速核對。
- **需要自行設計**：AI 結果接受／駁回、錯誤分類、抽樣品質衡量、核准發布、回退，以及 C 端搜尋可見範圍。Moments Lab Centralize 頁的 Approval workflows 是**外部人員取用／下載素材的核准**，不能當作 AI 正確率審核的證據。[官方說明](https://www.momentslab.com/products/centralize-your-footage)
- **C 端呈現方向**：依目前設計討論，先推薦完整作品，片段與時間碼僅留在 B 端作查證，避免暴雷。這是本專案方向，**不是 Moments Lab 的 C 端功能**。
- **POC 邊界**：10/13 會議紀錄提到 Web Tool 上傳影片、查看 Auto-tagging 結果及獨立 account；AI Search、人工覆核與 C 端串接是否納入 POC，仍待 PO 確認。[本機會議紀錄](../../../docs/meetings/2026-10-13-ai-tagger.md)

## 查證限制

- 官方 Discovery FAQ 目前列出 English、Spanish、Arabic、Dutch、French，**未列日文**。日文搜尋與日本節目語料須另行實測與詢問最新支援狀態。[官方 FAQ](https://www.momentslab.com/products/search-and-discovery)
- Discovery Agent 官方定位是**找出片段**，不是自動剪輯工具；Studio 是後續編輯環節。[官方 FAQ](https://www.momentslab.com/products/search-and-discovery)
- 公開頁面沒有提供可核實的日文準確率、片庫搜尋召回率、AI Tagging 審核佇列、C 端作品推薦演算法或實際登入後選單樹。

