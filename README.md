# AI 讀書會

讀書會的教材與資源入口，使用 Astro 與原生 CSS 建立。

目前提供讀書會簡介、GitHub 入門課程介紹，以及實作指南與常見問題下載。

## 本機開發

建議使用 Node.js 24 LTS。

```bash
npm ci
npm run dev
```

開啟終端機顯示的本機網址。

## 建置

```bash
npm run build
npm run preview
```

靜態網站輸出至 `dist/`。

## 內容位置

- `src/pages/index.astro`：首頁內容與樣式。
- `public/materials/`：可下載的教材 Markdown 檔案。

`node_modules/`、`dist/` 與 `.astro/` 由工具產生，已排除於版本控制之外。
