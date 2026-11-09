---
title: SpendSense 實作指南
description: 用 Pandas 與 Streamlit 完成消費總額、類別篩選與統計圖表。
---

## 課堂路線

前一小時在 Notebook 練習 Python，第二小時做分析和介面。課堂投影片只有 13 張，示範與練習時會切回編輯器。

| 時間 | 內容 |
| --- | --- |
| 00:00–00:05 | 展示 SpendSense 與今天的成果 |
| 00:05–00:12 | Python 用途、工具與語言特性；對照 C 的型別宣告 |
| 00:12–00:17 | 認識輸入、處理、輸出 |
| 00:17–00:25 | Hello World §3–10：變數、轉型、判斷與飲料預算 |
| 00:25–00:33 | dtypes：List／Dict 重點操作，Set／Tuple 用途 |
| 00:33–00:45 | loops §1：for、累加、篩選與走訪工具 |
| 00:45–00:50 | loops §2–3：while、break、continue |
| 00:50–01:00 | loops §4.1 TODO、休息與補進度 |
| 01:00–01:20 | Pandas 讀檔、篩選、分類加總 |
| 01:20–01:25 | Streamlit 入門：啟動、輸入元件與重新執行 |
| 01:25–01:50 | 完成 SpendSense 的三個任務 |
| 01:50–02:00 | 自選修改、展示與回顧 |

## 程式教材與投影片對照

[GitHub 程式教材](https://github.com/NTUST-Data-Analytics-Club/python-course-materials)可用以下網址 Clone：

```bash
git clone https://github.com/NTUST-Data-Analytics-Club/python-course-materials.git
```

每張投影片下方都有可點開的教材檔案與小節，上方「教材對照」提供[逐頁對照表](../resources/)。先照 README 設定 Python、Jupyter 與 ipykernel；基礎三份 Notebook 只使用 Python 內建功能。原始教材與網站提供的 SpendSense 練習骨架是兩份不同教材，下方任務會使用網站骨架。

## 準備與啟動

使用 Python 3.12 或 3.13。下載[練習骨架](../downloads/spendsense-starter.py)與[範例資料](../downloads/sample.csv)，放在同一資料夾。在該資料夾開啟終端機。

建立虛擬環境：

```bash
python -m venv .venv
```

macOS / Linux 啟動：

```bash
source .venv/bin/activate
```

Windows PowerShell 啟動：

```powershell
.\.venv\Scripts\Activate.ps1
```

若電腦限制啟動指令，可直接使用虛擬環境的 Python 執行下列兩條指令，把 `python` 換成 `.\.venv\Scripts\python.exe`。macOS 若只有 `python3`，建立環境時使用 `python3 -m venv .venv`。

```bash
python -m pip install pandas streamlit plotly
python -m streamlit run spendsense-starter.py
```

開啟終端機顯示的 Local URL，上傳 sample.csv。若自動改成 `.txt` 副檔名，先將骨架還原成 `.py`。在終端機按 Ctrl+C 可以停止服務。

骨架已提供上傳與基本資料檢查。每完成一段 TODO，儲存程式並回到瀏覽器確認結果。操作選單時，Streamlit 通常會重新由上往下執行程式。

## 任務 1：顯示總花費

找到 TODO 1。從 `amount` 欄取出所有金額，計算總和，再顯示指標。

```python
total = df["amount"].sum()
st.metric("全部消費總額", f"{total:,.0f} 元")
```

核對：範例資料共有 20 筆，總花費是 **2,762 元**。

## 任務 2：選擇類別並篩選

找到 TODO 2，將原本的 `filtered = df` 換成以下程式。後面的 `st.dataframe(filtered)` 會顯示新的結果。

```python
options = ["所有類別"] + df["category"].unique().tolist()
selected = st.selectbox("消費類別", options)

if selected == "所有類別":
    filtered = df
else:
    filtered = df[df["category"] == selected]
```

先執行 `df["category"] == selected`，理解每列的 True / False，再看外層 `df[...]` 如何保留符合條件的資料列。

## 任務 3：顯示選取總額與分類圖表

找到 TODO 3，使用同一份 `filtered` 資料計算，讓明細、金額與圖表一致。

```python
selected_total = filtered["amount"].sum()
st.metric("選取類別總額", f"{selected_total:,.0f} 元")

summary = filtered.groupby("category")["amount"].sum()
summary = summary.sort_values(ascending=False)
st.bar_chart(summary)
```

切換類別，確認選取總額及圖表變動；「全部消費總額」仍顯示整份資料的 2,762 元。

## 自選修改

選一題即可，完成後解釋自己改了哪個資料或條件。

- 新增預算輸入，顯示預算減去總花費的餘額。
- 顯示最高單筆消費金額。若允許空資料，要先確認資料非空。
- 依日期分組加總，使用 `sort_index()` 排好日期後畫折線圖。

## 遇到問題時

- `ModuleNotFoundError`：確認安裝與執行使用同一個 Python；Notebook 也要選對 kernel。
- `FileNotFoundError`：相對路徑由目前工作目錄決定。原始 `analysis.ipynb` 的 `../data/sample.csv` 假設工作目錄在 `Project-SpendSense/src/`。
- `TypeError: 'list' object is not callable`：檢查是否曾用 `list` 或 `set` 作為變數名，重新啟動 kernel 並改名後依序執行。
- `IndentationError`：檢查冒號與縮排，避免混用 Tab 與空白。

## 完成版的對照

原教材的 `Project-SpendSense/src/app.py` 額外包含日期篩選、雙欄排版及 Plotly。其下方圖表統計整份 CSV，選單只影響明細；本次練習版則讓「選取類別總額」與圖表一起使用 `filtered`。先完成本次任務，再閱讀原完成版。
