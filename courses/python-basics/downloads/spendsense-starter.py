"""啟動：python -m streamlit run spendsense-starter.py"""
import pandas as pd
import streamlit as st

st.set_page_config(page_title="我的 SpendSense", layout="wide")
st.title("我的 SpendSense 消費分析")
uploaded = st.file_uploader("上傳 sample.csv", type=["csv"])

if uploaded is None:
    st.info("先下載課程提供的 sample.csv，再上傳到這裡。")
    st.stop()

try:
    df = pd.read_csv(uploaded)
except (pd.errors.EmptyDataError, pd.errors.ParserError, UnicodeDecodeError):
    st.error("請上傳格式正確、使用 UTF-8 編碼的 CSV。")
    st.stop()

required = {"date", "category", "item", "amount"}
if not required.issubset(df.columns):
    st.error("需要 date、category、item、amount 四個欄位。")
    st.stop()

df["amount"] = pd.to_numeric(df["amount"], errors="coerce")
if df.empty or df["amount"].isna().any() or df["category"].isna().any():
    st.error("請確認有消費資料，且每筆的類別與金額都有效。")
    st.stop()

st.subheader("原始資料")
st.dataframe(df)

# TODO 1：計算整份資料的總花費，並使用 st.metric 顯示。
# 提示：df["amount"].sum()

# TODO 2：用 st.selectbox 產生類別選單，並依選擇篩選資料。
# 提示：options = ["所有類別"] + df["category"].unique().tolist()
# 先讓 filtered 代表全部資料，完成篩選時再替換這段。
filtered = df

st.subheader("選取的消費")
st.dataframe(filtered)

# TODO 3：以 filtered 計算總花費及分類統計，並畫長條圖。
# 提示：filtered.groupby("category")["amount"].sum()
# 圖表：st.bar_chart(summary)
