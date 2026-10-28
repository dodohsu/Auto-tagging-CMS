# AI Discovery 導覽與 shadcn/ui 更新

AI Discovery 點擊直接顯示 Demo List；選擇 Demo 後使用內容區 Tabs。列表、表單、選擇與操作使用 shadcn/ui。多 Demo 本機資料 keys 保持。

安裝：執行同目錄 install.py，備份並更新 Desktop/ai-tagger。更新前核對兩個來源檔案 hash，避免覆蓋新改動。

驗證：TypeScript / Vite build、ESLint、17 項搜尋／資料隔離與 shadcn 元件渲染檢查。


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


### 2026-10-27 | Searchable Content 大量資料管理

- 將逐筆卡片改為緊湊表格，提供名稱／ID／Tags／摘要搜尋、已納入／未納入、類型、索引狀態篩選與名稱／ID／需處理優先排序。
- 每頁 25／50／100 筆；Metadata 編輯與索引操作按需展開，避免一次渲染全部表單。
- 顯示候選片庫、已納入、可搜尋、已納入但需處理數量。只有 Indexed 且 Metadata／Index 版本一致才算可搜尋。
- 表格勾選代表批次操作選取，搜尋範圍另以 Badge 顯示。支援選取本頁、全部符合結果及跨頁保留；變更篩選或 Chatbot 清除選取。
- 批次納入／移除只修改目前 Chatbot 草稿，移除提供筆數確認；Metadata 與索引仍共用，發布流程沿用 Settings／Playground。
- Demo 仍使用本機資料與前端篩選，沒有新增數千筆假內容至使用者資料。正式版本建議後端搜尋／篩選／排序／分頁、批次工作佇列與權限／操作紀錄；需求與 API 待確認。
- 正式版「全選符合結果」應保存查詢條件與資料快照，不下載所有 ID；大量重新索引應提供進度、失敗清單、重試及取消，而非同時送出數千請求。新增內容是否自動納入、規則式範圍與人工排除優先序待確認，現階段仍採明確 ID 範圍。
- 驗證：TypeScript、變更檔案 ESLint；2,500 筆伺服器渲染驗證每頁只建立 25 列、100 頁且詳情延遲渲染，並驗證失敗／舊版本索引狀態。瀏覽器互動驗證被自動審核模型設定錯誤阻擋。
