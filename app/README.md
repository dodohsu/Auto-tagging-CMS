# KK lab frontend

React + TypeScript + Vite + shadcn/ui。這是 KK lab Demo 的元件實作入口；`src/App.tsx` 載入可互動的 Library 與 AI Metadata Detail 頁，`../demo/index.html` 為可直接開啟的建置產物。

已安裝 Button、Sidebar、Card、Input、Select、Table、Badge、Breadcrumb、Separator、Avatar，以及 Sidebar 依賴的 Tooltip、Sheet、Skeleton。

```bash
npm install
npm run dev
```

使用 `npm run build` 與 `npm run lint` 檢查專案。主題 token 位於 `src/index.css`，目前主要操作色為 KK lab 藍色。

## Adding components

後續新增元件：

```bash
npx shadcn@latest add <component>
```

元件會放在 `src/components/ui/`。

## Using components

匯入方式：

```tsx
import { Button } from "@/components/ui/button"
```
