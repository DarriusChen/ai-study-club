/* Thirteen slides. Time includes Notebook demonstrations and hands-on practice: 120 minutes. */
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const MATERIALS_REPO = 'https://github.com/NTUST-Data-Analytics-Club/python-course-materials';
const material = (path, label, section) => ({ path, label, section });
const code = value => `<pre><code>${esc(value)}</code></pre>`;
window.SLIDES = [
  {
    chapter:'今天的成果', min:5, title:'Python 基礎與 SpendSense',
    body:()=>`<div class="split cover"><div><h1>Python 基礎<br>消費分析實作</h1><p class="intro">用 SpendSense<br>分析自己的消費紀錄</p><p class="hint" style="margin-top:32px">兩小時實作課<br>今天的目標：讀懂程式，改出一個功能</p></div><figure><img class="shot" src="spendsense.png" alt="SpendSense 實際載入 sample.csv 後的消費明細與類別花費圖"><figcaption>實際範例資料：20 筆消費，合計 2,762 元</figcaption></figure></div>`,
    notes:'00:00–00:05\n先展示成品，暫時不解釋每一行。用 sample.csv 上傳，切換 food，觀察明細與金額。提醒：目前 App 的下方圖表統計整份 CSV，類別與日期選單只篩選明細。今天依照基礎、分析、介面的順序練習，最後每人修改一個功能。\n課前確認 Python 環境、Notebook kernel、pandas／streamlit／plotly 均可使用。投影片圖片來自本機原始 app.py 實際執行，上傳的是專案 data/sample.csv，日期是既有範例資料。',
    demo:'問：你最想從消費紀錄知道什麼？現場示範讀檔與類別選單；若環境有問題，先以投影片截圖展示成果。'
  },
  {
    chapter:'認識 Python', min:3, title:'Python 是什麼？', lead:'一種通用程式語言，用明確的指令描述你想做的事。',
    body:()=>`<div class="split"><div class="explain"><p><strong>語法相對簡潔</strong><br>適合練習把問題拆成可以執行的步驟</p><p><strong>用途廣泛</strong><br>自動化、資料分析、網站後端、AI 應用</p><p class="hint">今天用它讀取消費紀錄，<br>計算花費，再做成互動介面。</p></div><div class="explain"><p><strong>Python：程式語言</strong><br>定義程式怎麼寫、指令代表什麼</p><p><strong>VS Code：程式編輯器</strong><br>編寫和管理程式碼的工具</p><p><strong>Notebook：互動執行環境</strong><br>分格執行程式，也能搭配文字與結果</p></div></div>`,
    notes:'00:05–00:08\n先釐清語言和工具的關係。Python 是語言；執行程式需要 Python 執行環境。VS Code 是編輯器，可搭配 Python 與 Jupyter 擴充功能。Notebook 提供互動式介面，Python 程式由所選的 kernel 執行；Notebook 也支援其他語言。\nPython 常見用途有自動化、資料分析、網站後端與 AI 應用。今天聚焦讀取 CSV、分析資料與顯示結果，不需要逐一介紹各領域工具。\n選講：Python 可在不同作業系統使用，但套件與檔案路徑仍可能需要調整；Python 支援物件導向，今天先不教 class。常見的 CPython 會先將程式編譯為位元組碼再由執行環境執行，不宜把「直譯式」說成原始碼逐行翻譯。',
    demo:'指向目前開啟的 VS Code 與 Notebook，問：我們寫的是哪一種語言？在哪個工具輸入、在哪裡看到結果？'
  },
  {
    chapter:'Python 的特性', min:4, title:'Python 寫起來有哪些特性？', lead:'不用先寫變數的型別，值本身仍然有型別。',
    body:()=>`<div class="split"><div><h3>C：宣告時寫出型別</h3>${code('int amount = 65;')}<h3 style="margin-top:24px">Python：直接指定值</h3>${code('amount = 65\nprint(type(amount))  # int\n\n65 + "元"  # TypeError')}<p class="hint" style="margin-top:18px">兩種寫法都讓 amount 代表整數 65。</p></div><div class="explain"><p><strong>不用先宣告型別</strong><br>C 的 int 表示整數型別<br>Python 可直接寫 amount = 65</p><p><strong>縮排決定程式區塊</strong><br>if、for 裡的步驟需要對齊</p><p><strong>套件豐富</strong><br>Pandas 整理表格<br>Streamlit 建立互動介面</p><p class="hint">數字與字串有不同的運算規則，<br>65 與 "元" 不能直接相加。</p></div></div>`,
    notes:'00:08–00:12\n用 C 的 int amount = 65; 對照 Python 的 amount = 65。這裡的 C 程式碼是一般函式內可使用的宣告片段，不是完整的可執行程式。只要指出 int 表示整數，不需要帶編譯流程、分號規則或更多 C 語法。\nPython 不要求先寫變數的型別宣告，指定的物件本身仍有型別。Python 採動態型別，同一個名字可以先指向整數，再指向字串，但運算仍需符合型別規則。也可以選擇寫 amount: int = 65 這類型別註記，註記本身通常不會在執行時強制檢查。\nprint(type(amount)) 的完整輸出是 <class \'int\'>，程式碼上的 # int 是簡寫提示。65 + "元" 這行預期產生 TypeError，示範時放在獨立 cell，先請學生猜結果，再執行。顯示金額可改成 f"{amount}元"。提醒：這裡是刻意製造錯誤，方便理解數字和字串的差別。\n縮排與套件先用一句話預告，後面的 if、for 與 Pandas 實作會再次說明。',
    demo:'先圈出 C 的 int，再看 Python 的 type(amount)。問：不用宣告型別，是否代表數字和文字可以隨便相加？執行獨立 cell 的預期錯誤後，再用 f-string 顯示 65元。'
  },
  {
    chapter:'程式運作邏輯', min:5, title:'程式把資料變成結果', lead:'寫程式，就是把想做的事拆成明確的步驟。',
    body:()=>`<ol class="pipeline"><li><span class="num">步驟 1</span><b>輸入資料</b><p>讀入消費 CSV<br>日期、類別、品項、金額</p></li><li><span class="num">步驟 2</span><b>處理資料</b><p>選出餐飲紀錄<br>加總各類別金額</p></li><li><span class="num">步驟 3</span><b>顯示結果</b><p>印出總花費<br>呈現表格和圖表</p></li></ol><p class="statement">Python 通常由上往下執行。<br><span class="highlight">資料會隨著每一步，得到新的結果。</span></p>`,
    notes:'00:12–00:17\n用日常食譜類比步驟即可，不需要講 CPU、記憶體或編譯器。變數幫資料取名字，條件決定走哪條路，迴圈重複步驟。稍後會實際看到這些語法。\nNotebook：先由上往下執行，每格的結果會保留在 kernel。只改文字沒有執行，資料不會更新。若結果奇怪，重新啟動 kernel 後依序執行。',
    demo:'問：要知道 food 花多少錢，你會先篩選再加總，還是先把所有金額加起來？請學生口頭說出步驟。'
  },
  {
    chapter:'Hello World', min:8, title:'變數、型別與飲料訂單', lead:'先用單筆訂單練習計算，再判斷有沒有超過預算。',
    body:()=>`<div class="split">${code('drink_name = "紅茶"\nunit_price = 50\nquantity = int("3")\nbudget = 130\n\ntotal = unit_price * quantity\nprint(f"{drink_name} 共 {total} 元")\n\nif total > budget:\n    print("超過預算")')}<div class="explain"><p><strong>§3–5：變數、型別、運算</strong><br>價格乘上杯數，得到總價</p><p><strong>§6：字串與轉型</strong><br>int("3") 轉整數，f-string 整理輸出</p><p><strong>§7–9：條件與錯誤閱讀</strong><br>= 指定值，== 比較；看懂錯誤最後一行</p><p class="hint">切到 hello_world.ipynb §10<br>完成「檢查飲料預算」TODO。</p></div></div>`,
    notes:'00:17–00:25\n對照 hello_world.ipynb §3–9，最後做到 §10「動手練習：檢查飲料預算」。本頁是同一份飲料資料的短寫法；教材使用 practice_ 開頭的變數，學生填 TODO 時保留教材名稱。\n前 5 分快速帶變數、type、運算、int 轉型、f-string、比較與 if／elif／else；後 3 分讓學生完成 §10。核對：紅茶 3 杯，150 元，超過預算 20 元。再把預算改成 150、200，檢查剛好用完及有餘額。\n§9 的錯誤範例已放在說明文字中；要觀察訊息時另開獨立 cell，一次貼一個範例。新版教材已避免覆蓋內建型別名稱，不再沿用舊版的命名警告。',
    demo:'讓學生找出 int() 與 f-string 的用途，然後在 §10 的 TODO 中補上計算和三種預算判斷。'
  },
  {
    chapter:'資料結構', min:8, title:'多筆訂單用 list，一筆資料用 dict', lead:'對照 dtypes.ipynb 的 List 與 Dict 小節，先練習讀取與新增。',
    body:()=>`<div class="split">${code('members = ["Darrius", "Tyson"]\nprint(members[0])\nmembers.append("Zhu")\n\norder = {\n    "name": "Darrius",\n    "drink": "拿鐵"\n}\nprint(order["drink"])\norder["drink"] = "紅茶"')}<div class="explain"><p><strong>List：依位置保存多筆資料</strong><br>索引從 0 開始，append 加到尾端</p><p><strong>Dict：用 key 找到 value</strong><br>同一個 key 再次賦值會更新內容</p><p><strong>Set 與 Tuple：先認識用途</strong><br>set 去重；tuple 保存固定配對</p><p class="hint">先讀到 Tuple 結束；<br>Comprehension 留到學完迴圈之後。</p></div></div>`,
    notes:'00:25–00:33\n對照 02-data-types/dtypes.ipynb 的 List：讀取元素與切片、新增元素；Dict：讀取值與檢查鍵、修改值、新增鍵值配對。前 5 分重點操作，後 3 分學生修改飲料與新增社員。\n本頁 order 是為銜接專題而加的簡短示例；Notebook 既有範例是 dict1／dict2／dict3，請學生回到各小節 code cell 練習。\nSet 與 Tuple 簡述用途，完整刪除、集合運算、串接與切片留課後。新版 tuple 錯誤已用 try／except 接住，可 Run All，不需警告學生會中斷整本。依 README 先看四種結構，再開 loops.ipynb；Comprehension 需要 for／if／zip，留在迴圈後延伸。',
    demo:'請學生用 members[0] 找第一位社員，再把 dict1 的 drink 改成自己喜歡的飲料。問：同一個姓名訂兩杯，直接用姓名當 dict key 會怎樣？'
  },
  {
    chapter:'For 迴圈', min:12, title:'重複處理，再做判斷', lead:'for 逐筆取出金額，if 根據條件決定下一步。',
    body:()=>`<div class="split">${code('prices = [120, 40, 35]\ntotal = 0\n\nfor price in prices:\n    total += price\n    print("目前總金額：", total)\n\nprint("總金額：", total)')}<div class="explain"><p><strong>§1.1–1.2：走訪與累加</strong><br>total 依序變成 120、160、195</p><p><strong>§1.3：篩選並建立列表</strong><br>迴圈內用 if 檢查，再用 append 加入</p><p><strong>§1.4–1.6：走訪工具</strong><br>range 產生整數範圍<br>enumerate 加編號，zip 配對資料</p><p class="hint">累加值與結果列表，先在迴圈外建立。</p></div></div>`,
    notes:'00:33–00:45\n開啟 01-basics/loops.ipynb。前 5 分 §1.1–1.2，追蹤 total 的 120、160、195；接著 3 分 §1.3 的 if＋append 篩選。最後 4 分預覽 §1.4–1.6，重點是 zip 配對名單與金額，為 §4.1 練習做準備。\nrange／enumerate／zip 是搭配 for 的走訪工具，不是不同種類的迴圈。zip 預設以較短資料為準；如果列表長度不同，後面的元素不會配到。\n今天用迴圈完成任務。README 說明 03-function 尚未提供教材，函式可留待後續課程。',
    demo:'先猜每次 total 的值。再把 total = 0 移到迴圈內，觀察為什麼無法累加；之後還原。'
  },
  {
    chapter:'While 與迴圈控制', min:5, title:'條件成立就繼續，必要時停止', lead:'while 會重複檢查條件；break 與 continue 控制當次流程。',
    body:()=>`<div class="split">${code('savings = 20\nrounds = 0\n\nwhile savings < 100:\n    savings += 30\n    rounds += 1\n    print(savings)\n\nprint("存錢次數：", rounds)')}<div class="explain"><p><strong>§2：while</strong><br>初始值、條件、狀態更新缺一不可<br>依序印出 50、80、110，共 3 次</p><p><strong>§3.1：break</strong><br>結束目前這一層迴圈</p><p><strong>§3.2：continue</strong><br>跳過本次剩下的處理，再進下一次</p><p class="hint">§4.2、§4.3 可在課後接著挑戰。</p></div></div>`,
    notes:'00:45–00:50\n對照 loops.ipynb §2「依條件重複執行：while」與 §3「控制迴圈：break 與 continue」。本頁以 §4.2 練習資料示範 while，讓學生對照初始值、條件與更新。把初始金額改成 100 時，迴圈執行 0 次。\n用 §3 的既有例子說明：break 在找到第一杯超過 100 元時停止；continue 在遇到 0（取消訂單）時略過，後續訂單仍繼續處理。\n不要實際跑無限迴圈；口頭問省略 savings += 30 會怎樣。while 搭配 continue 時，確認更新不會被略過。§4.2 與 §4.3 的完整 TODO 留給提早完成者或課後練習。',
    demo:'問：110 已超過 100，為什麼還是正確的停止結果？接著比較遇到 0 時，break 與 continue 對後續資料有何差別。'
  },
  {
    chapter:'教材 TODO 與緩衝', min:10, title:'在 Notebook 完成飲料預算練習', lead:'打開 loops.ipynb §4.1，先看 TODO，再用結果核對。',
    body:()=>`<div class="split"><div>${code('practice_members = [\n    "Darrius", "Tyson", "Zhu"\n]\npractice_prices = [120, 40, 65]')}<p class="hint" style="margin-top:24px">先用 zip 配對，再累加與篩選。</p></div><div><ol class="prompts"><li>印出每位社員與金額</li><li>計算全部訂單總額</li><li>收集超過 50 元的社員</li></ol><p class="hint" style="margin-top:24px">自我檢查：225 元；Darrius、Zhu。<br>完成後可接 §4.2、§4.3。</p></div></div>`,
    notes:'00:50–01:00\n前 5 分在 loops.ipynb §4.1「使用 for 檢查飲料預算」完成原有 TODO，不另開無法對照教材的練習。先在迴圈外建立 total 與結果 list，再用 zip(practice_members, practice_prices) 配對。核對總額 225，超過 50 元的姓名依序是 Darrius、Zhu。後 5 分休息、補進度並確認 pandas。\n提早完成者做 §4.2 while（50、80、110，3 次）或 §4.3 break／continue（結果 [40, 65]）。再進階可回 dtypes.ipynb「Comprehension」和「動手練習：整理飲料訂單」；兩小時主線不要求完成推導式。',
    demo:'請學生指出 total 與結果列表為何要放在 for 外面，再解釋自己如何判斷超過 50 元。'
  },
  {
    chapter:'Pandas 資料分析', min:20, title:'CSV 變成一張可以計算的表', lead:'import 載入套件，Pandas 用 DataFrame 表示表格。',
    body:()=>`<div class="split">${code('import pandas as pd\n\nspend_data = pd.read_csv(\n    "../data/sample.csv"\n)\nspend_data.head()\n\ncategory_summary = (\n    spend_data.groupby(\n        "category", as_index=False\n    )["amount"].sum()\n)')}<div class="explain"><p><strong>Load data</strong><br>read_csv 讀取資料，head 看前幾列</p><p><strong>Group by category</strong><br>先依 category 分組，再加總 amount</p><p><strong>Group by date</strong><br>同樣方法，改成按 date 分組</p><p class="hint">Notebook 接著用 sort_values 排序。<br>類別篩選是課堂補充，下一頁接到介面。</p></div></div>`,
    notes:'01:00–01:20\n對照 Project-SpendSense/src/analysis.ipynb 的 Load data、Group by category and calculate total amount、Group by date and calculate total amount，保留教材的 spend_data 與 category_summary 命名。工作目錄需在 Project-SpendSense/src，否則調整 ../data/sample.csv。\n前 5 分 import、DataFrame、read_csv、head；接著 5 分類別 groupby 與 sort_values，5 分日期 groupby。最後 5 分課堂補充：spend_data["amount"].sum() 與 spend_data[spend_data["category"] == "food"]，為介面篩選做準備。這兩段是額外補充，不是 Notebook 原有小節。\nNotebook 開頭同時匯入 matplotlib，但專題 requirements 尚未列它。本次先只執行 import pandas as pd，略過 Matplotlib 匯入與最後的繪圖 cell；圖表在 Streamlit 完成。\nCSV 有 date、category、item、amount。現有範例 20 筆，總額 2762。教材 date_summary 目前按 amount 排序；若要按時間看趨勢，課堂補充改成依 date 排序。',
    demo:'學生先跑類別加總，再把分組欄位改成 date，對照原 Notebook 的下一個小節。'
  },
  {
    chapter:'認識 Streamlit', min:5, title:'Streamlit 是什麼？', lead:'用 Python 快速建立互動網頁，適合資料分析工具與 Dashboard。',
    body:()=>`<div class="split"><div>${code('import streamlit as st\n\nst.title("我的第一個網頁")\nbudget = st.number_input(\n    "預算", value=300\n)\nst.write(f"你的預算是 {budget} 元")')}<p class="hint" style="margin-top:22px">存成 app.py，在終端機啟動：</p>${code('python -m streamlit run app.py')}</div><div class="explain"><p><strong>Pandas 處理資料</strong><br>讀取 CSV、篩選、分組與加總</p><p><strong>Streamlit 顯示介面</strong><br>把 Python 結果變成文字、表格、圖表<br>也能加入輸入框、選單與上傳按鈕</p><p><strong>在瀏覽器操作</strong><br>開啟終端機顯示的 Local URL<br>改動預算，觀察文字同步更新</p><p class="hint">操作元件時，程式通常會重新<br>由上往下執行；變數會重新指定。</p></div></div>`,
    notes:'01:20–01:25\n本頁最小範例是課堂補充，不是教材 app.py 的原有片段。對照專題 README 的「使用技術」「執行」，再在 src/app.py 中辨認 import streamlit、st.header、st.file_uploader。\n前 1 分介紹分工：Pandas 整理資料，Streamlit 建立介面。接著 2 分把範例存成另一個資料夾的 app.py，確保已安裝 Streamlit；在終端機執行 python -m streamlit run app.py，開啟顯示的 Local URL。不要覆蓋教材的完成版 app.py；若用其他檔名，啟動指令也改成該檔名。\n最後 2 分修改預算輸入，指出 st.number_input 的回傳值指定給 budget，st.write 用它顯示文字。一般 widget 互動會讓整份 script 重新由上往下執行，因此普通變數會重新指定；本頁先不展開 session_state、callback、form 或 fragment。\n停止服務可在原終端機按 Ctrl+C。接著開練習骨架，用同樣方式啟動。\n官方參考：https://docs.streamlit.io/develop/concepts/architecture/architecture',
    demo:'先把預算從 300 改成 500，觀察文字變化；再把 st.title 的文字改成自己的名稱並儲存，確認網頁更新。'
  },
  {
    chapter:'SpendSense 實作', min:25, title:'把分析結果放進互動介面', lead:'Pandas 處理資料，Streamlit 將結果顯示在網頁上。',
    body:()=>`<div class="split"><ol class="task-list"><li><div>顯示資料與總花費<small>read_csv、st.dataframe、st.metric</small></div></li><li><div>加入類別選單<small>st.selectbox 搭配資料篩選</small></div></li><li><div>畫出各類別花費<small>groupby 搭配 st.bar_chart</small></div></li></ol><div>${code('import streamlit as st\nimport pandas as pd\n\nuploaded = st.file_uploader(\n    "上傳 sample.csv", type=["csv"]\n)\n\nif uploaded is not None:\n    df = pd.read_csv(uploaded)\n    st.dataframe(df)')}<p class="links"><a href="../lab-guide/">實作指南與完整練習步驟</a><br><a href="../downloads/spendsense-starter.py" download>下載練習骨架</a>　<a href="../downloads/sample.csv" download>下載 sample.csv</a></p></div></div>`,
    notes:'01:25–01:50\n沿用上一頁的啟動方式，開啟練習骨架並執行 python -m streamlit run spendsense-starter.py。程式會開啟本機網址，在瀏覽器操作。骨架先提供上傳、必要欄位檢查與原始資料顯示，學生完成三個 TODO。\n時間配置：8 分加總並顯示 st.metric；8 分接類別選單與 if 篩選；最後 9 分 groupby 與 st.bar_chart。實作指南有提示與參考解答。對零基礎學生允許看提示，但要求說明欄位與條件。\nStreamlit 的選單變動時，通常會由上往下重新執行整份程式。一般變數會重新指定，這解釋為何每次都要讀資料、計算、顯示。\n原專案 app.py 是完成版供觀摩，包含日期篩選、排版與 Plotly；今天不用逐行重打一遍。練習版圖表與總花費跟著類別篩選，以同一個 filtered 資料表計算。原版圖表則統計整份 CSV，示範時要說明差異。',
    demo:'每完成一個 TODO 就刷新結果。用所有類別核對 2762，再切 food 確認明細、金額與圖表同步變動。'
  },
  {
    chapter:'修改與回顧', min:10, title:'讓它多回答一個問題', lead:'選一個小修改，完成後說明資料如何得到結果。',
    body:()=>`<div class="split"><div><p class="recap">還剩多少預算？<br>哪一筆消費最高？<br>每天各花了多少錢？</p><p class="hint" style="margin-top:24px">選一題實作，或替現有功能改一個條件。</p></div><div class="explain"><p><strong>輸入</strong><br>你用了哪份資料、哪個欄位？</p><p><strong>處理</strong><br>你在哪裡篩選或計算？</p><p><strong>輸出</strong><br>畫面上的哪個結果改變了？</p><p class="links"><a href="../resources/">教材與課後練習</a><br><a href="../">返回 Python 課程首頁</a></p></div></div>`,
    notes:'01:50–02:00\n前 6 分各自修改，後 4 分請一到兩位同學展示。剩餘預算可用 budget - filtered["amount"].sum()。最高單筆可用 filtered["amount"].max()，但先處理空資料。日期統計可用 filtered.groupby("date")["amount"].sum().sort_index()。\n驗收：學生能指出資料來源、解釋一個條件，並展示自己修改後的結果。今天不要求背完 API。若時間不足，讓大家改篩選值與標題並解釋即可。\n素材來源：python-course-materials 新版 README、hello_world.ipynb、dtypes.ipynb、loops.ipynb 與 Project-SpendSense。延伸閱讀依序做 loops §4.2–4.3，再回 dtypes 的 Comprehension 與飲料訂單練習；本頁預算、最高單筆、日期分析屬於專題延伸。',
    demo:'請學生用一句話完成：「我改了＿＿，所以當＿＿時，畫面會＿＿。」'
  }
];

// File paths and section names verified against the updated course repository.
const SLIDE_MATERIALS = [
  [
    [
      "Project-SpendSense/README.md",
      "SpendSense README",
      "介紹、使用方式"
    ]
  ],
  [
    [
      "README.md",
      "README",
      "開始使用；本頁語言介紹為課堂補充"
    ]
  ],
  [
    [
      "01-basics/hello_world.ipynb",
      "01-basics/hello_world.ipynb",
      "§3–4、§6、§8；C 對照為補充"
    ]
  ],
  [
    [
      "01-basics/hello_world.ipynb",
      "01-basics/hello_world.ipynb",
      "§1 執行 Notebook；流程說明為補充"
    ]
  ],
  [
    [
      "01-basics/hello_world.ipynb",
      "01-basics/hello_world.ipynb",
      "§3–10 變數、轉型、判斷與預算 TODO"
    ]
  ],
  [
    [
      "02-data-types/dtypes.ipynb",
      "02-data-types/dtypes.ipynb",
      "List、Dict；Set／Tuple 用途預覽"
    ]
  ],
  [
    [
      "01-basics/loops.ipynb",
      "01-basics/loops.ipynb",
      "§1.1–1.6 for、累加、篩選與走訪工具"
    ]
  ],
  [
    [
      "01-basics/loops.ipynb",
      "01-basics/loops.ipynb",
      "§2–3 while、break、continue"
    ]
  ],
  [
    [
      "01-basics/loops.ipynb",
      "01-basics/loops.ipynb",
      "§4.1 飲料預算 TODO；§4.2–4.3 延伸"
    ]
  ],
  [
    [
      "Project-SpendSense/src/analysis.ipynb",
      "Project-SpendSense/src/analysis.ipynb",
      "Load data、Group by category／date"
    ]
  ],
  [
    [
      "Project-SpendSense/README.md",
      "SpendSense README",
      "使用技術、執行；最小範例與互動機制為課堂補充"
    ]
  ],
  [
    [
      "Project-SpendSense/src/app.py",
      "Project-SpendSense/src/app.py",
      "檔案上傳區、過濾資料、圖表；骨架為課堂練習"
    ]
  ],
  [
    [
      "Project-SpendSense/src/app.py",
      "Project-SpendSense/src/app.py",
      "專題延伸：預算、最高單筆、日期統計"
    ],
    [
      "02-data-types/dtypes.ipynb",
      "02-data-types/dtypes.ipynb",
      "課後：Comprehension、整理飲料訂單"
    ]
  ]
];
SLIDES.forEach((slide, index) => {
  slide.materials = SLIDE_MATERIALS[index].map(args => material(...args));
});
