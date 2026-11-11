# Auto-tagging CMS

React + Vite 的 CMS 示意網站。資料與索引流程為 Demo；資料儲存在各瀏覽器 localStorage，尚無共用後端。

## 目前版本：V4

- Concert：10 個連續 Clip、每段 1–3 個跨分類 Tag、分類固定純色色塊。
- 分類 Popover：子 Tag 數量、多選篩選與右側 Clip／時間軸連動。
- 中文介面使用臺灣繁體；完整影片播放、進度同步與工作區縮放。
- 展示用標籤平均分散於五個分類；曲風與表演型態尚待影音確認。

Concert 預覽：https://dodohsu.github.io/Auto-tagging-CMS/#detail/DOC-2048/ai-chapter

## 本機

在 app 目錄執行 `npm ci`、`npm run dev`。

## GitHub Pages

將此資料夾內容上傳至 dodohsu/Auto-tagging-CMS，預設分支 main。
在 repository 的 Settings → Pages → Source 選擇 GitHub Actions。
推送 main 後，Deploy CMS to GitHub Pages workflow 會建置並部署。
預期網址：https://dodohsu.github.io/Auto-tagging-CMS/#detailpage

舊版 #detail/<id> 連結仍可讀取；新詳情頁連結使用 #detailpage。

## 完整設計資料

design/ 保留歷史 UI 方案與本工作區的各版本套件；docs/ 為產品文件；src/ 保留早期來源；README-original.md 為原始專案說明。
