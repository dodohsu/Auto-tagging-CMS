# Auto-tagging CMS

React + Vite 的 CMS 示意網站。資料與索引流程為 Demo；資料儲存在各瀏覽器 localStorage，尚無共用後端。

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
