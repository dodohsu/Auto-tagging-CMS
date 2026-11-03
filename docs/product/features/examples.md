# Examples 情境入口

- 狀態：本機 Demo 提案。
- 目的：用情境卡片引導使用者查看已建置的 Content detail page，方便逐項討論 AI 能力與呈現方式。

## 本次範圍

- 側欄新增 Examples；主頁使用 AI Chapter、AI Genre、AI Search 三個 Tab。
- AI Chapter 依本次指定放入四張卡片：Actor Discovery、Comedy Highlight、Mood & Genre、AI Action & Skill Detection。
- 第四張先以動畫戰鬥招式辨識作為探索文案；運動賽事是否更適合及辨識可行性待確認。
- AI Genre 與 AI Search 的卡片是補充的討論提案，不視為已確認需求。
- Actor Discovery 卡片使用《孤独のグルメ SP》示意資料與共用 Content detail 版型；Comedy Highlight 卡片連至 M-1 影片專屬示意內頁；其餘卡片仍前往《孤独のグルメ SP》現有詳情頁。
- 每張卡片列出預計使用的技術標籤，僅使用參考截圖中列出的 video understanding 詞彙；標籤是討論用途，不代表完整技術架構或已實作能力。

## 待確認

- 各情境的正式名稱、說明、順序及預設影片。
- 第四個 AI Chapter 情境要採動畫戰鬥招式、運動賽事，或其他更容易驗證的題材。
- AI Genre 與 AI Search 是否需要不同於 Content detail 的落地頁。

## Comedy Highlight 內頁（2026-11-03）

- 來源影片：[M-1グランプリ2026 第一回戰 TOP1 ネタまとめ【後半】](https://www.youtube.com/watch?v=cCmLjsKjrlE)。使用者提供日文自動產生 SRT，涵蓋約 00:00:00–01:44:50；影片顯示長度 1:46:29。
- 依字幕中的登場、收尾及對話主題，先整理段子候選，再合併為 10 個大章節與 47 個 Punchline 候選 Clip。章節由 00:00:00 連續涵蓋至影片終點；最後一章包含字幕結束後的片尾時段。
- 每個 Clip 有暫定起訖、編輯標題、內容摘要與笑點手法；頁面沿用 Content detail 的 `ChapterTopicFilter`、`ChapterVideoPreview`、`ChapterTimelineView`、`ChapterListPanel`。Comedy 頁面在共用預覽元件中嵌入指定 YouTube 影片；點擊時間軸或右側 Clip 會從所選時間點載入影片。
- `[笑い]` 與 `[拍手]` 只在章節或候選 Clip 的字幕時間範圍內出現對應 SRT 註記時顯示；尚未聽辨音訊，不能當作已核對的觀眾反應。
- 自動字幕可能誤聽人名、方言、雙關語及不同組演出的交界。章節名稱、Punchline 切點與摘要皆為待人工複核的編輯候選，不當作正式 AI 辨識結果。
- 本機預覽改用使用者提供的 480p MP4，播放器可播放、拖曳進度，並將實際播放時間回寫時間軸；選擇章節或 Clip 會跳至對應時間。MP4 為本機檔案且不納入版本控制，其他電腦或線上部署需另行提供影片檔；保留 YouTube 原片連結作為備援。
- Comedy Highlight 的主題 Filter 改為兩個可搭配的條件：表演者／組合及笑話 Punchline。表演者名稱直接取自自動字幕的登場自我介紹，辨識不清者標「待確認」，皆須對照原片核對。
- 使用者選定「依笑點類型找」作為主題 Filter：意外反轉、語言雙關、角色扮演、誤會連發、越講越荒謬、一本正經亂講。片段先依既有笑點手法文字暫分，待對照影片複核；類型可多選，並與表演者及 Punchline 條件合併篩選。
- 六種笑點類型使用 Detail page 共用的 `ChapterTopicFilter` 模組呈現，沿用圓角標籤、計數、柔和底色與多選操作；表演者與 Punchline 選項保留在同一篩選卡中。
- 最新版本將笑點類型與段子題材合併為同一排主題標籤，依符合的 Clip 數由高到低顯示最多 10 個；同次數依固定的類型／題材順序排列。題材根據既有章節與 Clip 摘要暫分，尚未人工核對影片；一個 Clip 可同時有笑點類型與題材標籤。
- 表演者／組合篩選新增最多 10 張可點選的演出畫面圓形縮圖，依候選 Clip 數排序、同數量依影片出場順序；畫面在瀏覽器從本機 MP4 擷取，無法解碼時顯示占位圖示。保留完整表演者下拉選單供其餘組別使用。字幕姓名及畫面對應仍需人工核對。
- 線上部署不包含本機 MP4；共用預覽元件在本機影片載入失敗時改用指定 YouTube 嵌入影片，時間點連結保留。
- YouTube 備援播放器接上 IFrame Player API；選取時間軸或 Clip 會定位原片，播放中將播放器時間回寫時間軸，實現雙向同步。

## Actor Discovery 內頁（2026-11-03）

- 與既有 Content detail 共用 `ContentDetailTemplate`：返回導覽、版本與操作列、影片摘要卡、AI Metadata／AI Chapter 分頁及其外層 Layout 均由同一元件渲染。調整該共用 Layout 時，兩頁同步更新。
- AI Chapter 內層也共用 `AIChapterLayout` 架構：標題與模式、Filter、左側影片預覽／時間軸／編輯區，以及右側清單。Actor Discovery 將內容換成人物篩選、出場定位與人物片段清單；往後情境頁套用相同架構。
- 人物與片段清單也使用共用 `ChapterListPanel`；章節名稱與時間標明待確認，沒有已驗證 Clip。
- 目前只有現有劇情摘要中的「井之頭五郎」作為待驗證的人物候選；沒有實際影像辨識或可核對的出場時間碼，故不顯示虛構的片段或信心分數。
