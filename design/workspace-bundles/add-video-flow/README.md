# Add Video 流程設計

2026-10-27：依現有 KK lab 介面建立獨立設計方案，未覆蓋原預覽。

預覽：http://127.0.0.1:8001/#add-video

從 Video 的 Add Video 進入新頁面。桌面左側為多影片選檔／拖放與 S3 批次連結；右側為 Subtitle、AI Metadata、AI Chapter 設定。窄螢幕改為上下排列。支援移除影片、去重、連結格式驗證、AI 開關與自訂 Tagging Focus。

Subtitle 預設 Auto-detect per video，可手動覆寫；實際語言偵測待串接。Metadata 預設 Genre、Mood、Style、Audience。Chapter 暫定 Scenes、Topics、Highlights、Key moments，待產品確認。卡片統一編號 01／02／03。

此版為互動原型，沒有傳送影片、存取 S3 或執行 AI。Continue 顯示批次確認提示。正式儲存、上傳進度、失敗重試、S3 授權與分析排程待串接。

驗證：TypeScript 與 Vite 建置通過；瀏覽器確認入口跳轉、S3 一次新增兩筆、AI 關閉後停用標籤設定、Continue 提示、桌面雙欄及窄螢幕排列。

重新建置：在 app 執行 npm run build。node_modules 使用原專案已安裝依賴的本機符號連結。
