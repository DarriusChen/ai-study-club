---
title: 學生 Lab Guide
description: GitHub 入門與協作的課堂實作指南。
---

今天只需要 GitHub 帳號、Git、VS Code 和瀏覽器。所有必做任務在自己的同一個 Repo 完成。先照順序做；卡住就停在該步並看 [常見問題](../troubleshooting/)。

## 操作前，認識兩個畫面

- **本機**：VS Code 裡的專案資料夾。編輯、Diff、Stage、Commit、切換分支在這裡做。
- **遠端**：瀏覽器中的 GitHub Repo。確認 Push、開 PR、Review、Merge 在這裡做。

VS Code 左側分岔圖示是 **Source Control／原始檔控制**。Command Palette／命令選擇區的快捷鍵：macOS `⌘⇧P`；Windows `Ctrl+Shift+P`。下文的 `Git: ...` 可在這裡搜尋。瀏覽器看不到本機尚未 Push 的 Commit。

## Lab 00｜從 Template 建立 Repo，再 Clone

**目標：GitHub 上有自己的 Repo，本機開啟同一份專案。**

1. 登入 GitHub，開啟講師分享的 Template Repo。
2. 按 **Use this template → Create a new repository**。如果沒有這個按鈕，請講師確認已開啟 Template repository。
3. Owner 選自己，名稱填 `ai-study-club`。課堂建議 Public，內容只放公開暱稱，不放學號或電話。**不要勾 Include all branches**，只複製預設分支即可。
4. 建立完成後，確認左上角是 `自己的帳號/ai-study-club`，分支是 `main`。這是新 Repo，與講師 Repo 不會自動同步。
5. 在自己的 Repo 按 **Code → HTTPS**，複製網址。
6. VS Code 開啟 Command Palette → **Git: Clone** → 貼上網址 → 選一個存放課程的「父資料夾」。不要選另一個 Git 專案的內部。Clone 完按 **Open**，必要時確認信任自己的課程資料夾。
7. 左下角應看到 `main`。Source Control 不應有未提交變更。若出現 Initialize Repository，不要按；先確認開的是 Clone 後的資料夾。
8. 用檔案總管／Finder 找到專案的 `index.html`，以瀏覽器開啟。往下捲並按「抽一個小挑戰」，應出現一則題目。

**檢查點 0**：能指出自己的 GitHub Repo、本機資料夾與 `main`。不要另做一次 `git init`，也不要使用 Publish to GitHub 再建立另一個 Repo。

## Lab 01｜修改、Diff、Stage、Commit、Push（含 Lab 00 約 25 分鐘）

### 1. 修改文字並預覽

在 VS Code 打開 `index.html`，用搜尋找 `LAB 01`。只改兩行文字，保留 HTML 標籤與 `id`：

```html
<h1 id="hero-title">我的 AI 學習基地</h1>
<p id="hero-description" class="hero-description">我是小安，今天開始用 Git 記錄每一次進步。</p>
```

`小安` 換成你願意公開的暱稱。原本 h1 裡的 `<br>` 代表換行，可照上例整行替換。存檔（`⌘S`／`Ctrl+S`）後，在瀏覽器重新整理。現在只改了本機，GitHub 還沒變。

### 2. 看 Diff，決定這次要保存什麼

1. 打開 Source Control → **Changes** → 點 `index.html`。
2. 預設左右比較中，左邊是原內容，右邊是目前內容；紅色刪除、綠色新增。窄視窗可能顯示行內比較。
3. 確認只改了標題與介紹。若多改了其他內容，先手動改回。
4. 在 `index.html` 旁按 **＋／Stage Changes**。檔案移到 **Staged Changes**。

Stage 是挑選「這次 Commit 的內容」，尚未產生版本。Stage 後若又改檔，會同時出現已暫存與未暫存內容；請重新檢查並 Stage 你要保存的修改。

### 3. Commit，再 Push

1. 在訊息欄輸入 `Update club introduction`。
2. 按 **Commit**（本課只提交已 Stage 的內容）。若提示要自動 Stage 全部，取消並回上一步手動 Stage。
3. 如果要求設定作者名稱／email，參考 [常見問題](../troubleshooting/)。
4. Commit 後 Changes 應清空。本機已有版本，遠端仍未更新。
5. Source Control 的 `…` 選 **Push**，或 Command Palette → **Git: Push**。依提示透過瀏覽器登入 GitHub 並返回 VS Code。
6. 到自己的 GitHub Repo 重新整理，在 `main` 開啟 `index.html`，確認新標題及最新 Commit 訊息。點提交紀錄，也能看到這次改了哪兩處。

**檢查點 1**：本機無未提交修改；GitHub `main` 有 `Update club introduction`。能說明存檔、Stage、Commit、Push 的差異。

### 4. 改壞 CSS，還原「尚未提交」的變更

1. 確定上一步已 Commit，且 `style.css` 目前沒有其他修改。
2. 打開 `style.css`，只把 `--page-bg: #f6f8ff;` 改成 `--page-bg: #ff4d8d;`。
3. 存檔、重新整理，背景變粉紅。
4. 在 Source Control 點 `style.css` 看 Diff。**這一次不要 Stage、不要 Commit。**
5. 只對 `style.css` 右鍵 → **Discard Changes／捨棄變更**，確認。這會刪掉該檔案的未提交修改；先確認檔名，不要選 Discard All Changes。
6. 回瀏覽器重新整理，背景恢復。Source Control 清空，標題仍保留剛才的修改。

**檢查點 2**：CSS 恢復、標題保留，沒有新增 Commit。這次是 Discard 未提交變更；已 Commit 的錯誤需使用其他還原方式，不能把 Discard 當作 Revert。

## Lab 02｜在分支新增自介，再經 PR 合併（30 分鐘）

### 1. 建立 `feature/about-me`

1. 確定工作區乾淨、左下角是 `main`，執行 **Git: Pull**，先取得遠端最新版本。
2. 點左下角分支名稱 → **Create new branch…**；也可使用 **Git: Create Branch**。
3. 輸入 `feature/about-me`，按 Enter。確認左下角已切換為這個名字。
4. 打開 `index.html`，搜尋 `LAB 02`，只改下面三行文字：

```html
<h3 id="member-name">小安</h3>
<p id="member-bio">我喜歡設計，正在練習用 AI 做出第一個網站。</p>
<p id="member-goal" class="member-goal">這學期想完成：一個自己的作品集。</p>
```

### 2. 保存到 feature 分支，送到 GitHub

1. 存檔並重新整理網站，在「認識一起學習的人」確認自介。
2. Source Control 看 Diff → Stage `index.html` → Commit：`Add my introduction`。
3. 按 **Publish Branch**（或 **Git: Publish Branch**），把本機新分支送到已存在的 `origin`。這不是 Publish to GitHub 建新 Repo。
4. GitHub 分支選單切到 `feature/about-me`，應看到新自介；切回遠端 `main`，仍是預設「你的暱稱」。這就是分支隔離。

### 3. 開 Pull Request，做一次檢查

1. GitHub 點 **Compare & pull request**。若沒有橫幅，進 **Pull requests → New pull request**。
2. 確認 **base: main ← compare: feature/about-me**，兩者都是自己的 Repo。
3. 標題填 `Add my introduction`。依自動帶入的 PR 範本填寫改動、原因與實際檢查；沒做的項目不要勾。
4. 按 **Create pull request**，打開 **Files changed**，確認只有三行自介修改。
5. 個人練習：自查後在 PR 的 Conversation 留一句具體記錄，例如「已確認暱稱、自介與目標，按鈕仍正常」。這是自查，**作者不能 Approve 自己的 PR**。若同學有空，可請他閱讀並留言；正式互相 Review 留到 Lab 03。
6. 確定沒問題，回 Conversation → **Merge pull request → Confirm merge**。教學使用一般 Merge commit，若合併方式不同請跟講師確認。

PR 是提議；按下 Merge 才將內容合入遠端 `main`。本機 `main` 此刻還沒有自介。

### 4. 同步本機 `main`

1. 回 VS Code，確認無未提交變更，點左下角分支 → 選本機 **main**（不要再建同名分支）。
2. 先看 `index.html` 的自介，應回到舊內容。執行 **Git: Pull**，來源是 `origin/main`。
3. 再看自介應變成新內容，重新整理網站確認。
4. Source Control 應乾淨，GitHub 的 PR 狀態應是 **Merged**。遠端 feature 分支可按 Delete branch 清理；本機分支課後再處理即可。

**檢查點 3**：有一個 Merged PR；本機停在 `main`，新自介可見且沒有未提交變更。Push、Merge、Pull 是三個不同動作。

## Lab 03｜兩人 Collaborator 工作流程（選做，30 分鐘）

兩人先完成 Lab 02，選 **A 的既有 Repo** 作為共用專案。B 自己的個人 Repo 保留。這次不使用 Fork，也不再各自 Use template。

### 1. 取得同一個 Repo 的權限（5 分鐘）

1. A：GitHub → A 的 Repo → **Settings → Collaborators → Add people**，輸入 B 的 GitHub 帳號並邀請。
2. B：登入正確帳號，接受邀請後，從 **A 的 Repo** 複製 HTTPS Clone 網址。
3. B：用 **Git: Clone** Clone 到另一個父資料夾，例如 `team-lab`，並開啟新副本。確認遠端網址是 `A的帳號/ai-study-club`，不要在自己的個人 Repo 裡做合作任務。
4. A、B 都切到共用 Repo 的 `main`，工作區乾淨後 **Git: Pull**。

### 2. A 提案，B Review（10 分鐘）

1. A 從最新 `main` 建 `feature/project-idea`。
2. A 在 `index.html` 搜尋 `LAB 03 A`，只改第三張卡片的 h3、p，例如「校園午餐轉盤」／「幫選擇困難的同學決定今天吃什麼。」
3. A 預覽 → Diff → Stage → Commit `Add team project idea` → Publish Branch → PR 到共用 Repo 的 `main`。
4. B 在該 PR 的 **Files changed** 閱讀，對某行按 `+` 留具體意見，例如「說明清楚，可補充預計給誰使用」。用 **Start a review** 後 **Review changes → Comment → Submit review**，避免意見停在尚未送出的 Pending 狀態。
5. A 在同一個 feature 分支依建議修改，Commit、Push；原 PR 自動更新，不用再開一張。
6. B 重新看最新 Diff，確認後 **Review changes → Approve → Submit review**。本課把這當合作約定；沒有設定保護規則時，Approve 不一定是平台強制門檻。
7. A 回 PR 按 Merge 並確認。

### 3. B 提案，A Review（10 分鐘）

1. A、B 都回本機 `main` → **Git: Pull**，先收到新專案卡。
2. B 從這個最新 `main` 建 `feature/partner-intro`。
3. B 搜尋 `LAB 03 B`，只改 `partner-name`、`partner-bio`，填公開暱稱與一句介紹。
4. B 預覽 → Diff → Stage → Commit `Add partner introduction` → Publish Branch → PR 到 **A 的 Repo main**。
5. A 閱讀 Files changed，送出具體 Review，確認後 Approve。B 合併 PR（或由 A 依兩人約定合併）。

### 4. 一起驗收（5 分鐘）

A、B 都切回 `main` → Pull → 重新整理網站。兩人看到相同的新專案卡與 B 的自介，且共用 Repo 有兩張 Merged PR，各有另一人的 Review。分工修改不同區域、第二輪從最新 main 開始，可降低衝突機率。

若出現衝突，先停止提交，請講師協助看 [常見問題](../troubleshooting/)。今天不以製造衝突為必修。

## 加分｜用 GitHub Pages 展示成果

Repo → Settings → Pages → Source 選 **Deploy from a branch** → Branch 選 `main`、資料夾選 `/(root)` → Save。等待部署完成後，開啟 Pages 頁面顯示的網址。若還沒更新，先看 Actions 部署結果，再重新整理；Push 不保證立即上線。未合併的 feature 分支不會改變這個 main 網站。

## 離場前，回答五題

1. Git 與 GitHub 各負責什麼？
2. Commit 後沒 Push，別人能看到新版本嗎？
3. 為什麼 feature 的修改在 Merge 前不會出現在 main？
4. CSS 沒 Commit 就改壞，該在哪裡還原？
5. 在 GitHub Merge 後，為什麼本機還要切 main 並 Pull？

交給講師：Repo 網址、Lab 01 Commit 訊息、一張 Merged PR 網址，以及本機 main 的完成畫面。合作組再加上兩張有互相 Review 的 PR。不要提交帳號密碼或私人資料。
