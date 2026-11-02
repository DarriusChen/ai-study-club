---
title: 常見問題與救援
description: GitHub 課堂實作常見問題與救援方式。
---

先確認三件事：VS Code 開哪個資料夾？左下角在哪個分支？Source Control 有哪些修改？不要把別人的指令整串貼上。

| 狀況 | 先檢查 | 下一步 |
| --- | --- | --- |
| 找不到 Use this template | 是講師的 Template 首頁嗎？ | 請講師開 Settings → Template repository；不要改用 Fork 代替本課主線 |
| VS Code 沒有 Git | Git 是否安裝完成？ | 安裝官方 Git 後重開 VS Code；命令選擇區用 Git: Show Git Output 看錯誤 |
| 顯示 Initialize Repository | 是否開到 Clone 的父資料夾？ | File → Open Folder 開真正的 Repo，不要再 Initialize |
| Commit 說沒有變更 | 檔案是否已存檔？是否已 Stage？ | 存檔後點 Changes 檔名確認 Diff，再按該檔的 ＋ |
| Stage 後又出現 Changes | Stage 後又編輯了同檔 | 比較兩個區域；重新 Stage 你要一起提交的修改 |
| Commit 要求姓名與 email | Git 作者資訊未設定 | 用下方作者設定；不需輸入 GitHub 密碼 |
| Push 403／Permission denied | origin 是自己的 Repo／已接受邀請的共用 Repo嗎？ | 在 Source Control 的 Repositories 或 Git Output 查看遠端；確認登入帳號，不要硬推 |
| Commit 後 GitHub 沒更新 | 有執行 Push 嗎？是否看錯分支？ | Push 後重新整理 GitHub，選正確分支看提交紀錄 |
| 找不到 Compare & pull request | feature 是否已 Publish？ | GitHub → Pull requests → New pull request，base main、compare feature |
| PR 沒有差異 | 是否在 main 改了自介？是否選錯 compare？ | 看 Commit 在哪個分支；找講師協助，不要製造無意義修改來開 PR |
| 沒有 Approve 自己 PR 的選項 | 你是否為作者？ | 正常；個人練習自查並 Merge，雙人練習由對方送 Review |
| 留了 Review 意見對方看不到 | 是否還是 Pending？ | Review changes → 選 Comment／Approve → Submit review |
| Merge 被擋 | 是否規定必須有審核／檢查？ | 請講師查看 Repo 規則；需要時由另一人 Review，不繞過組織規則 |
| Merge 後本機沒變 | 是否還在 feature？ | 乾淨工作區切 main，再 Git: Pull，不要只刷新網頁 |
| 本機畫面沒更新 | 存檔與瀏覽器開啟的是同一份 index.html 嗎？ | 檢查網址／檔案路徑、重新整理；合作時容易開到個人舊資料夾 |
| Pages 404／舊版 | 是否根目錄有 index.html、main 已合併？ | 看 Settings → Pages 的來源與 Actions 結果；等部署成功再重新整理 |
| GitHub／網路不可用 | 本機副本已 Clone 了嗎？ | 先完成本機 Diff、Stage、Commit、還原與分支；記下待 Push／PR，不能把離線結果當作已完成遠端流程 |

## 初次 Commit 的作者設定（只在需要時）

VS Code → Terminal → New Terminal，在**專案資料夾**逐行執行，將範例替換為自己的資訊。以下只設定此 Repo，不修改全機設定：

```sh
git config user.name "你的公開暱稱"
git config user.email "你的 GitHub noreply email"
```

noreply email 請到 GitHub → Settings → Emails 複製自己帳號顯示的完整地址，不要照抄範例。這是提交署名，不是登入認證。

## Push 被拒絕：遠端比本機新

先保留目前修改，確認分支與遠端。如果工作區乾淨，在該分支 Git: Pull，整合遠端後再 Push；若有衝突，請講師一起處理。不要按 Force Push。若目前有未提交變更，先完成適當 Commit 或請講師協助備份，不要為了 Pull 而全部丟棄。

## 在 main 改了自介，還沒 Commit

若這些修改都屬於 Lab 02，且 main 沒有其他待處理工作，可直接從目前 main 使用 Git: Create Branch 建 `feature/about-me`；修改通常會跟到新分支。先確認左下角分支、Diff 與自介仍在，再 Stage、Commit。若 VS Code 提示無法切換或分支已存在，停止並請講師處理，不要按 Discard All。

若已在 main Commit，請講師看提交狀態；不要自行 reset、重寫紀錄或強制推送。可以保留已提交成果，另用新的有意義修改示範 PR。

## 不小心把粉紅 CSS Commit 了

Discard 只能處理尚未提交的變更。把 `--page-bg` 手動改回 `#f6f8ff`，檢查 Diff、Commit `Restore page background` 並 Push。這是新的修復版本，舊版仍留在歷史中。

## 發生 Merge conflict（延伸）

1. 停止再按 Sync／Push，確認正確的 Repo、分支，以及正在 Pull／Merge 的內容。
2. 請講師協助；有未提交的重要文字先另存備份。
3. 在 VS Code 開啟衝突檔案／Merge Editor，讀懂 Current 和 Incoming 各自內容，再組合要保留的結果。不要不看就按 Accept All。
4. 移除 `<<<<<<<`、`=======`、`>>>>>>>` 等衝突標記，存檔並用瀏覽器確認內容。
5. Stage 已解決的檔案，完成合併 Commit（或依 VS Code 提示 Continue），再 Push。確認 PR 的最新 Diff。

時間不足時保留狀態讓講師協助，不必為了趕進度冒險丟棄內容。

## 給講師的查詢指令（選用，只讀）

```sh
git status
git branch --show-current
git remote -v
git log --oneline --graph --all -8
```

輸出可幫忙辨識目前狀態；分享畫面前留意遠端網址是否意外含憑證，不把 token 貼到群組。
