---
title: Git Commit Message 撰寫慣例
description: 用 Conventional Commits 寫出清楚的提交紀錄，認識 type、scope、body 與 breaking change，搭配 GitHub 課堂範例練習。
---

每次把一組變更記錄到 Git 時，都需要附上一段 Commit message，說明這次改了什麼、為什麼要改。試想幾週後回頭查看紀錄，`update` 很難提供有用資訊；`fix: 修正手機版導覽列遮住標題` 則能讓人快速理解變更內容。

這份筆記適合完成 GitHub 入門 Lab 後閱讀。範例採用 **Conventional Commits（慣例式提交）**，這是一種常見的寫法；Git 與 GitHub 本身並未要求每個專案都採用它。加入既有專案時，先閱讀 `CONTRIBUTING.md` 與近期提交紀錄。

## 先記住這個寫法

```text
type(scope): 描述這次變更
```

- `type`：變更的類型，例如 `feat`、`fix`、`docs`。
- `scope`：影響範圍，例如 `navbar`、`readme`，可以省略，省略時也拿掉括號。
- 描述：具體寫出做了什麼，冒號後留一個半形空格。

```text
feat: 新增活動報名按鈕
fix(navbar): 修正手機版選單無法關閉
docs: 補上本機啟動步驟
```

正式格式與相容性標記可參考 [Conventional Commits 1.0.0 規範](https://www.conventionalcommits.org/zh-hant/v1.0.0/)。

## 常見 type 怎麼選？

以下是適合本課的分類建議。Conventional Commits 定義了 `feat` 與 `fix` 的意義，也允許團隊採用其他類型；其他類型的細部分工應以專案規則為準。

| type | 什麼時候用 | 範例 |
| --- | --- | --- |
| `feat` | 新增使用者可用的功能 | `feat: 新增課程搜尋功能` |
| `fix` | 修正原本不正確的行為 | `fix: 修正報名連結指向錯誤頁面` |
| `docs` | 文件、說明或教材變更 | `docs: 新增分支操作說明` |
| `style` | 程式格式調整，不影響行為 | `style: 統一 JavaScript 縮排` |
| `refactor` | 重整程式結構，維持既有功能 | `refactor: 抽出重複的日期格式處理` |
| `perf` | 改善效能 | `perf: 減少課程列表的重複查詢` |
| `test` | 新增或調整測試 | `test: 補上空搜尋結果的測試` |
| `build` | 調整建置系統或依賴 | `build: 更新 Astro 依賴版本` |
| `ci` | 調整自動化檢查、部署流程 | `ci: 在 Pull Request 執行網站建置` |
| `chore` | 其他維護工作 | `chore: 忽略本機編輯器暫存檔` |

`style` 容易被誤認為「所有 CSS 修改」。依這裡的分類，修正跑版是 `fix`，新增深色模式是 `feat`；只調整 CSS 縮排才是 `style`。判斷依據是修改目的，檔案副檔名只能提供線索。

## 描述要讓讀者知道什麼？

以下是本課的撰寫建議，方便你先建立一致的習慣：

1. **以動作開頭**：例如「新增」「修正」「移除」「整理」。英文可用 `add`、`fix`、`remove`。
2. **說明對象與結果**：寫出哪個功能、頁面或文件變成什麼樣子。
3. **讓第一行能獨立理解**：一行講清楚主要目的，較長的原因放在 body。
4. **語言與長度依團隊約定**：中文與英文都能使用；常見的 50／72 字元建議不是 Conventional Commits 的硬性限制。

| 太模糊 | 更清楚的寫法 |
| --- | --- |
| `update` | `docs: 補上課前安裝清單` |
| `fix bug` | `fix: 修正抽題按鈕在手機上無法點擊` |
| `修改 index.html` | `feat: 在首頁新增活動時間與地點` |
| `完成 AI 的修改` | `fix: 修正沒有搜尋結果時的提示文字` |

AI 也可以協助擬稿。先閱讀 Diff，再請它「根據這次 staged diff，提出三個符合 Conventional Commits 的繁體中文訊息，不要推測未出現的變更」。最後由你確認描述與實際修改一致。

## 需要補充原因時，加上 body

標題交代主要變更，body 補充原因、限制或重要取捨。標題與 body 中間留一行空白；必要時再空一行放 footer，記錄 Issue 或相容性資訊。

```text
fix(navbar): 修正手機版選單遮住頁面標題

原本的固定導覽列未預留內容空間，小螢幕開啟頁面時看不到標題。
調整內容上方間距，讓標題與第一個操作按鈕都能完整顯示。

Refs: #12
```

`Refs: #12` 在此用來標示相關 Issue。如果要透過 GitHub 自動關閉 Issue，可使用 `Closes #12` 等支援的關鍵字；包含該訊息的 Commit 必須進入 repository 的預設分支才會觸發關閉。詳細條件見 [GitHub：連結 Pull Request 與 Issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue)。

## Breaking change：舊用法不再相容時

當變更會讓既有使用者必須修改使用方式，例如移除公開 API 欄位，就需要清楚標示。可以在 type／scope 後加上 `!`，或使用 `BREAKING CHANGE:` footer。下例兩者都寫，並交代遷移方式：

```text
feat(api)!: 將活動查詢結果改為分頁格式

BREAKING CHANGE: GET /events 改為回傳含 items 與 total 的物件。
 呼叫端原本直接讀取陣列，現在需改為讀取 response.items。
```

Footer 的 `BREAKING CHANGE` 要使用大寫。`!` 表示相容性中斷，與修改行數或工作難度無關；任何 type 都可能帶有 breaking change。

在搭配語意化版本的發佈流程中，`fix`、`feat` 與 breaking change 分別傳達修訂、功能新增與不相容變更。**只寫訊息不會自動發版**，版本與 changelog 的產生仍需要專案另外設定工具。參考 [Conventional Commits 的版本對應說明](https://www.conventionalcommits.org/en/v1.0.0/#summary)。

## 在 VS Code 與終端機怎麼用？

在 VS Code 的 Source Control 查看 Diff、Stage 要提交的變更後，把訊息輸入提交欄位，例如：

```text
docs: 補上讀書會課前準備說明
```

使用終端機時，可先查看暫存區，再建立 Commit：

```bash
git diff --staged
git commit -m "docs: 補上讀書會課前準備說明"
```

只有放進暫存區的內容會包含在這筆一般提交裡。需要標題與 body 時，可使用兩個 `-m`，Git 會把它們分成段落；也可執行 `git commit` 開啟編輯器。操作細節見 [Git：git commit](https://git-scm.com/docs/git-commit)。

```bash
git commit -m "fix: 修正報名頁的日期顯示" -m "統一顯示為活動所在地的日期，避免跨時區讀者看到前一天。"
```

## 一筆 Commit，保留一個清楚的目的

好的訊息需要配合適當的提交範圍。假設你同時做了這三件事：

- 新增活動報名按鈕。
- 修正手機版選單。
- 補上 README 安裝說明。

它們通常可以各自 Review，也可能各自撤回，適合拆成三筆 Commit。相反地，一個功能所需的程式、測試與必要文件，可以放在同一筆，讓這筆變更本身保持完整。

如果一句話必須用好幾個「以及」才能描述，先檢查是否混入了無關修改。練習時，可用 VS Code 逐一 Stage 檔案或區塊，再寫對應的訊息。

## 小練習：替課堂修改命名

先自己寫一句，再對照參考答案。答案可以有不同寫法，重點是符合實際變更。

| 情境 | 參考答案 |
| --- | --- |
| README 新增組員如何啟動網站的說明 | `docs(readme): 補上本機啟動步驟` |
| 挑戰按鈕原本無法點擊，現在恢復正常 | `fix: 修正挑戰按鈕無法點擊` |
| 網站新增依主題篩選挑戰的功能 | `feat: 新增挑戰主題篩選` |
| 將重複的抽題程式抽成函式，功能相同 | `refactor: 抽出共用的抽題函式` |

提交前確認：

- [ ] 已閱讀 staged diff，訊息符合這次真正要提交的內容。
- [ ] type 符合修改目的，scope 如有填寫，能幫助辨識範圍。
- [ ] 第一行讓別人看得懂做了什麼。
- [ ] 需要交代原因或遷移方式時，已補上說明。
- [ ] 遵循目前專案的既有慣例。

## 延伸閱讀與來源

查核日期：2026-11-03。上述課堂範例與撰寫建議為本教材整理。

- [Conventional Commits 1.0.0（繁體中文）](https://www.conventionalcommits.org/zh-hant/v1.0.0/)：格式、type、scope 與 breaking change 的規範。
- [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/main/contributing-docs/commit-message-guidelines.md)：觀察一個成熟專案如何訂出自己的提交規則；其細節以 Angular 專案為適用範圍。
- [Git：git commit](https://git-scm.com/docs/git-commit)：`-m`、編輯器與提交訊息的操作說明。
- [GitHub：連結 Pull Request 與 Issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue)：Issue 關聯與自動關閉條件。
