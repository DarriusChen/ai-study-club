---
title: 課後練習與自我檢查
description: 檢查 Git 與 GitHub 的核心觀念，並練習撰寫清楚的 Commit message。
---

## 核心觀念

先不看 Lab，試著用自己的話回答：

1. Git 與 GitHub 各負責什麼？
2. Commit 後沒有 Push，其他人能看到新版本嗎？
3. 為什麼 feature branch 的修改在 Merge 前不會出現在 `main`？
4. CSS 尚未 Commit 就改壞時，應該在哪裡還原？
5. 在 GitHub Merge 後，為什麼本機還要切回 `main` 並 Pull？

## Commit message 練習

閱讀[Git Commit Message 撰寫慣例](../commit-message/)，再替下列情境各寫一句 Commit message：

- README 新增組員如何啟動網站的說明。
- 挑戰按鈕原本無法點擊，現在恢復正常。
- 網站新增依主題篩選挑戰的功能。
- 將重複的抽題程式抽成函式，功能維持不變。

完成後檢查：

- 訊息是否符合真正的修改內容？
- `type` 是否符合修改目的？
- 第一行是否讓其他人看得懂做了什麼？
- 是否避免只寫 `update`、`fix bug` 或檔名？

遇到操作問題時，先查看[常見問題與救援](../troubleshooting/)。
