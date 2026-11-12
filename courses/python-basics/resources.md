---
title: 教材與投影片對照
description: 逐頁對照投影片、GitHub 程式教材與實作小節，依照新版教材接續練習。
---

## GitHub 程式教材

[開啟 python-course-materials](https://github.com/NTUST-Data-Analytics-Club/python-course-materials)。Clone 網址：

```bash
git clone https://github.com/NTUST-Data-Analytics-Club/python-course-materials.git
```

課堂對照已核對 2026-11-09 的教材版本 [`3223a98`](https://github.com/NTUST-Data-Analytics-Club/python-course-materials/commit/3223a98831b87b1ed8777ba829e62bb582ebb726)。以下連結開啟 main 分支的教材，每張投影片底部也有同一份檔案與小節提示。

## 投影片逐頁對照

| 頁次 | 投影片 | 程式教材 | 對應部分／課堂操作 |
| --- | --- | --- | --- |
| 1 | Python 基礎與 SpendSense | [SpendSense README](https://github.com/NTUST-Data-Analytics-Club/python-course-materials/blob/main/Project-SpendSense/README.md) | 介紹、使用方式；展示上傳 CSV 後的成品 |
| 2 | Python 是什麼？ | [README](https://github.com/NTUST-Data-Analytics-Club/python-course-materials/blob/main/README.md) | 開始使用；Python／VS Code／Notebook 區別為課堂補充 |
| 3 | Python 寫起來有哪些特性？ | [hello_world.ipynb](https://github.com/NTUST-Data-Analytics-Club/python-course-materials/blob/main/01-basics/hello_world.ipynb) | §3 變數、§4 型別、§6 轉型、§8 縮排；C 語言對照為課堂補充 |
| 4 | 程式把資料變成結果 | [hello_world.ipynb](https://github.com/NTUST-Data-Analytics-Club/python-course-materials/blob/main/01-basics/hello_world.ipynb) | §1 執行 Notebook、執行順序與重新開始；輸入／處理／輸出為課堂補充 |
| 5 | 變數、型別與飲料訂單 | [hello_world.ipynb](https://github.com/NTUST-Data-Analytics-Club/python-course-materials/blob/main/01-basics/hello_world.ipynb) | §3–9 變數、運算、字串、轉型、比較、條件與錯誤；完成 §10「檢查飲料預算」TODO |
| 6 | 多筆訂單用 list，一筆資料用 dict | [dtypes.ipynb](https://github.com/NTUST-Data-Analytics-Club/python-course-materials/blob/main/02-data-types/dtypes.ipynb) | List 的讀取／新增、Dict 的讀取／修改；預覽 Set／Tuple 用途，完整操作留課後 |
| 7 | 重複處理，再做判斷 | [loops.ipynb](https://github.com/NTUST-Data-Analytics-Club/python-course-materials/blob/main/01-basics/loops.ipynb) | §1.1–1.3 走訪、累加與篩選；§1.4–1.6 的 range、enumerate、zip |
| 8 | 條件成立就繼續，必要時停止 | [loops.ipynb](https://github.com/NTUST-Data-Analytics-Club/python-course-materials/blob/main/01-basics/loops.ipynb) | §2 while、§3 break／continue；以 §4.2 的存錢資料示範 |
| 9 | 在 Notebook 完成飲料預算練習 | [loops.ipynb](https://github.com/NTUST-Data-Analytics-Club/python-course-materials/blob/main/01-basics/loops.ipynb) | 完成 §4.1 TODO；§4.2／§4.3 為延伸 |
| 10 | CSV 變成一張可以計算的表 | [analysis.ipynb](https://github.com/NTUST-Data-Analytics-Club/python-course-materials/blob/main/Project-SpendSense/src/analysis.ipynb) | Load data、Group by category、Group by date；總額與類別篩選為課堂補充 |
| 11 | Streamlit 是什麼？ | [SpendSense README](https://github.com/NTUST-Data-Analytics-Club/python-course-materials/blob/main/Project-SpendSense/README.md) | 使用技術、執行；預算輸入的最小範例與重新執行機制為課堂補充 |
| 12 | 把分析結果放進互動介面 | [app.py](https://github.com/NTUST-Data-Analytics-Club/python-course-materials/blob/main/Project-SpendSense/src/app.py) | 觀摩「檔案上傳區」「過濾資料」與圖表；實作使用網站提供的三個 TODO 骨架 |
| 13 | 讓它多回答一個問題 | [dtypes.ipynb](https://github.com/NTUST-Data-Analytics-Club/python-course-materials/blob/main/02-data-types/dtypes.ipynb)、[app.py](https://github.com/NTUST-Data-Analytics-Club/python-course-materials/blob/main/Project-SpendSense/src/app.py) | 預算、最高單筆、日期統計為專題延伸；課後回到 Comprehension 與「整理飲料訂單」 |

## 新版教材的閱讀順序

依[教材 README](https://github.com/NTUST-Data-Analytics-Club/python-course-materials/blob/main/README.md)閱讀：

1. Hello World：Notebook 操作、變數、型別、轉型、條件與錯誤閱讀。
2. 資料結構：先讀 List／Dict／Set／Tuple，暫停在 Comprehension 前。
3. Loops：for 與走訪工具、while、break、continue，完成動手練習。
4. 回到資料結構的 Comprehension 與「整理飲料訂單」。
5. SpendSense：Pandas 分析與 Streamlit 介面。

新版檔案為 `01-basics/loops.ipynb`；`03-function` 目前尚未提供教材。這次兩小時主線不安排獨立函式章節。Set、Tuple 的完整方法與推導式可在課後依順序補完。

## SpendSense 的課堂補充

[實作指南](/ai-study-club/courses/python-basics/lab-guide/)使用網站提供的練習骨架；它以同一份篩選資料計算選取總額與分類圖表。GitHub 原始 `app.py` 的選單只篩選明細，下方圖表仍統計整份 CSV。閱讀時先確認兩份版本各自使用哪份資料。

`analysis.ipynb` 原有 Matplotlib 匯入與最後的繪圖範例，但專題 requirements 尚未列 Matplotlib。本次先只執行 Pandas 匯入與分組分析，圖表在 Streamlit 完成；日期趨勢應依日期排序。
