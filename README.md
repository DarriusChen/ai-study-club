# AI 讀書會

讀書會的教材與資源入口，使用 Astro 與原生 CSS 建立。

網站部署網址：[AI 讀書會](https://darriuschen.github.io/ai-study-club/)。目前提供「GitHub 入門與協作實作」，包含 HTML 投影片、實作指南、常見問題與延伸閱讀。

首頁列出讀書會主題；每個主題都有獨立首頁，整理介紹、學習目標、課前準備、Slides、Lab 與 Resources。實作指南及常見問題由 Markdown 產生站內閱讀頁面。

導覽順序：讀書會首頁 → 主題首頁（`/courses/課程名稱/`）→ 各份教材。教材頁提供返回主題首頁的入口。

## 本機開發

使用 Node.js 24（版本範圍為 `>=24 <25`，與 `.nvmrc` 及 CI 設定一致）。若使用 nvm，先執行 `nvm use`。

```bash
npm ci
npm run dev -- --background
```

開啟終端機顯示的本機網址，首頁路徑為 `/ai-study-club/`。管理背景開發伺服器：

```bash
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

## 建置

```bash
npm run build
npm run preview
```

靜態網站輸出至 `dist/`。

預覽時同樣開啟 `/ai-study-club/`，並確認首頁、主題首頁、教材與投影片都能正常開啟。`npm run build` 會檢查內容結構並產生頁面；教材連結仍需實際點開確認。

## GitHub Pages 部署

`.github/workflows/deploy.yaml` 負責建置與部署：

- 對 `main` 提出 Pull Request 時，執行 `npm ci` 與 `npm run build`。
- 推送至 `main` 時，建置後將 `dist/` 發佈到 GitHub Pages。
- 也可在 GitHub Actions 手動執行工作流程；選擇 `main` 才會部署。

首次設定時，在 GitHub repository 的 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。

`astro.config.mjs` 的 `site` 設為 `https://darriuschen.github.io`，`base` 設為 `/ai-study-club/`。若更換部署帳號、網域或 repository 路徑，需同步調整這兩個設定。

## 資料夾分工

```text
courses/
└── git-github/
    ├── course.yaml          # 課程介紹、排序及教材連結
    ├── lab-guide.md         # 實作指南原稿
    ├── troubleshooting.md   # 常見問題原稿
    └── resources.md         # 課程專屬參考資料
src/
├── content.config.ts       # 課程與教材的內容集合定義
├── components/             # 可重用的 UI（如 CourseCover.astro）
├── layouts/                # 教材閱讀版面
├── lib/                    # 教材連結處理
├── pages/                  # 讀書會首頁、主題首頁與教材路由
└── styles/                 # 首頁、主題與教材樣式
public/
├── courses/git-github/cover.svg # 選填的自訂教材封面
├── courses/git-github/slides/ # HTML 投影片與其引用檔案
└── icon.svg
.github/workflows/deploy.yaml # GitHub Pages 建置與部署
astro.config.mjs             # 網站網址、base 路徑及開發設定
.nvmrc                       # 本機與 CI 使用的 Node.js 版本
```

`courses/` 存放每門課的原稿。`public/` 放直接提供給瀏覽器的成品檔案。
`node_modules/`、`dist/` 與 `.astro/` 由工具產生，已排除於版本控制之外。

## 新增一門課

1. 在 `courses/` 新建固定名稱的資料夾，例如 `agent-workflow/`。
2. 參考 `git-github/course.yaml` 填入介紹、排序及教材連結。`order` 越小越靠前，第一門作為首頁本次主題。`learningGoals` 列出學習目標，`prerequisites` 列出課前準備；主題首頁會自動產生。
3. 新增各份 Markdown 教材，在檔案開頭填入 `title` 與 `description`：

   ```markdown
   ---
   title: 實作指南
   description: 本次課程的操作步驟。
   ---

   ## 課前準備

   在這裡開始撰寫教材。
   ```

4. 在該課的 `course.yaml` 的 `materials` 列出每份教材，並填入 `category: slides`、`lab` 或 `resources`，可用 `description` 補充說明。`lab-guide.md` 對應 `href: lab-guide/`，網站會產生 `/courses/課程名稱/lab-guide/`。教材之間可使用 `../troubleshooting/` 等相對連結。站內 Markdown 的 Resources 會直接顯示在主題首頁；外部資源則顯示連結。
5. 執行 `npm run build` 確認內容結構，再以 `npm run preview` 逐一開啟新增的教材連結。

Markdown 的 `title` 由網站顯示為頁面主標題，本文從 `##` 開始即可。

## 教材封面（選填）

首頁透過 `src/components/CourseCover.astro` 顯示教材封面，版型及樣式都由元件管理。
未填 `cover` 時，自動以 `shortTitle`、`tagline` 和 `topics` 產生文字封面，不需要另畫圖片或修改首頁。

有自訂封面時，把 SVG、PNG、WebP 或 JPG 放進 `public/courses/課程名稱/`，並在該課的 `course.yaml` 加入：

```yaml
cover: /courses/git-github/cover.svg
```

路徑以 `/` 開頭，對應 `public/` 下的檔案；不用填 `public/` 或部署的 `/ai-study-club/` 前綴。
圖片會等比例縮放、完整顯示，建議使用接近 400:190 的橫向比例。
封面作為裝飾圖片，課程資訊仍由旁邊的標題與介紹提供。
複製其他課程的設定時，若沒有封面，直接刪除 `cover` 這一行（不要留空值）。

## 投影片與下載檔（以 git-github 為例）

- HTML 投影片：`public/courses/git-github/slides/index.html`，連同其引用的圖片與樣式一起放入。
- 投影片製作原始檔可以另放 `courses/git-github/slides/`，網站只發佈 `public/` 中的成品。

接著在 `course.yaml` 的 `materials` 加上對應入口，例如：

```yaml
materials:
  - label: 查看投影片
    href: /courses/git-github/slides/
    category: slides
  - label: 閱讀實作指南
    href: lab-guide/
    category: lab
  - label: 下載練習檔
    href: /courses/git-github/downloads/starter.zip
    category: lab
```

`materials.href` 中 `/` 開頭的連結對應 `public/` 下的路徑；網站會自動補上 `/ai-study-club/`，因此這裡不需手動加入 base。也支援 `https://` 外部教材連結。
在 Astro 頁面撰寫其他站內連結時，需使用 `import.meta.env.BASE_URL` 組成網址；上述自動補上 base 的處理僅適用於透過 `src/lib/material-url.ts` 產生的教材連結。
未準備好的成品先不要加入 `materials`，避免出現無法開啟的入口。
主題首頁的 Slides 與 Lab 區塊在沒有教材時，會顯示「尚未提供」。
