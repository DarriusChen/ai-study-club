(() => {
 const $ = id => document.getElementById(id);
 const total = SLIDES.length;
 const presenter = new URLSearchParams(location.search).has('presenter');
 let index = 0, channel, timerEnd = 0, timerRemaining = 600, timerRunning = false, timerSlide = -1;
 let lastFocus;
 const cumulative = [0];
 SLIDES.forEach(s => cumulative.push(cumulative.at(-1)+s.min));
 const hhmm = min => `${String(Math.floor(min/60)).padStart(2,'0')}:${String(min%60).padStart(2,'0')}`;
 if(presenter) { document.body.classList.add('presenter'); $('notes').hidden=false; document.title='講師視窗 · Git & GitHub 101'; }
 try { channel=new BroadcastChannel('git101-slides'); channel.onmessage=e=>{if(e.data.type==='slide') go(e.data.index,false);}; } catch {}
 function markup(s,i) {
  return `<div class="slide-top"><span class="section-label">${esc(s.chapter)}</span><span class="stamp">${hhmm(cumulative[i])}–${hhmm(cumulative[i+1])} / ${s.min} min</span></div><div class="body ${[2,17,21,23,25].includes(i)?'compact':''}">${i===0?'':`<div><h2>${s.title}</h2>${s.lead?`<p class="lead">${s.lead}</p>`:''}</div>`}<div class="content">${s.body()}</div></div><div class="slide-bottom"><span>AI 讀書會 / Git & GitHub 101</span><span>${String(i+1).padStart(2,'0')} / ${total}</span></div>`;
 }
 function fit() {
  const f=$('frame'); const scale=Math.min(f.clientWidth/1600,f.clientHeight/900);
  $('slide').style.transform=`scale(${Math.max(.05,scale)})`;
 }
 function go(n,broadcast=true) {
  index=Math.max(0,Math.min(total-1,Number.isFinite(n)?n:0));
  const s=SLIDES[index];
  $('slide').innerHTML=markup(s,index);
  $('slide').setAttribute('aria-label',`第 ${index+1} 頁：${s.title}`);
  $('chapter').textContent=s.chapter;
  $('counter').textContent=`${String(index+1).padStart(2,'0')} / ${total}`;
  $('range').textContent=`${hhmm(cumulative[index])}–${hhmm(cumulative[index+1])} · ${s.min} 分鐘`;
  $('progress').style.width=`${(index+1)/total*100}%`;
  $('prev').disabled=index===0; $('next').disabled=index===total-1;
  $('notes-content').innerHTML=`<div class="note-label">${hhmm(cumulative[index])}–${hhmm(cumulative[index+1])} · 本頁 ${s.min} 分鐘</div><h2 class="note-title">${s.title}</h2><div class="note-block">${esc(s.notes)}</div><div class="note-block"><b>Demo / 提問</b><p>${esc(s.demo)}</p></div><div class="note-block"><b>下一頁</b><p>${esc(SLIDES[index+1]?.title || '課程結束')}</p></div>`;
  $('notes').scrollTop=0;
  history.replaceState(null,'',`#${index+1}`);
  document.querySelectorAll('#overview-grid button').forEach((b,i)=>b.setAttribute('aria-current',String(i===index)));
  if(broadcast) { channel?.postMessage({type:'slide',index}); try{localStorage.setItem('git101-position',JSON.stringify({index,time:Date.now()}));}catch{} }
  if(index!==timerSlide) {timerRunning=false;timerRemaining=600;timerSlide=index;}
  wireTimer();fit();
 }
 function toggleNotes(){ $('notes').hidden=!$('notes').hidden;fit(); }
 function overview(open=true){if(open){lastFocus=document.activeElement;$('overview').showModal();$('overview-grid').children[index].focus();}else{$('overview').close();lastFocus?.focus();}}
 $('overview-grid').innerHTML=SLIDES.map((s,i)=>`<button data-slide="${i}"><span>${String(i+1).padStart(2,'0')} · ${hhmm(cumulative[i])} · ${s.min}m</span>${s.title}</button>`).join('');
 $('overview-grid').addEventListener('click',e=>{const b=e.target.closest('[data-slide]');if(b){go(Number(b.dataset.slide));overview(false);}});
 $('overview-button').onclick=()=>overview();$('close-overview').onclick=()=>overview(false);
 $('notes-button').onclick=toggleNotes;$('close-notes').onclick=toggleNotes;
 $('prev').onclick=()=>go(index-1);$('next').onclick=()=>go(index+1);
 async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{toast('請使用瀏覽器的全螢幕功能。');}}
 $('fullscreen-button').onclick=fullscreen;
 $('presenter-button').onclick=()=>{const u=new URL(location.href);u.searchParams.set('presenter','1');u.hash=String(index+1);const w=window.open(u.href,'git101-presenter','width=1440,height=900');if(!w)toast('請允許此頁開啟彈出視窗，或按 N 查看備註。');};
 function toast(t){$('status').textContent=t;$('status').style.display='block';setTimeout(()=>$('status').style.display='none',4000);}
 document.addEventListener('keydown',e=>{
  if(e.ctrlKey||e.metaKey||e.altKey||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)||e.target.isContentEditable)return;
  if($('overview').open)return;
  if(['ArrowRight','PageDown','ArrowLeft','PageUp','Home','End'].includes(e.key)){e.preventDefault();go(e.key==='Home'?0:e.key==='End'?total-1:index+(['ArrowRight','PageDown'].includes(e.key)?1:-1));return;}
  // Space 保留給已聚焦的按鈕，避免觸發兩次。
  if(e.key===' '&&e.target.tagName!=='BUTTON'){e.preventDefault();go(index+1);}
  if(e.key.toLowerCase()==='n')toggleNotes();if(e.key.toLowerCase()==='o')overview();if(e.key.toLowerCase()==='f')fullscreen();if(e.key.toLowerCase()==='p')$('presenter-button').click();if(e.key.toLowerCase()==='b')document.body.classList.toggle('blackout');
 });
 let touchStart=null;
 $('frame').addEventListener('touchstart',e=>{if(!e.target.closest('a,button'))touchStart={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY};},{passive:true});
 $('frame').addEventListener('touchend',e=>{if(!touchStart)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)go(index+(dx<0?1:-1));touchStart=null;},{passive:true});
 window.addEventListener('hashchange',()=>go(parseInt(location.hash.slice(1),10)-1));
 window.addEventListener('storage',e=>{if(e.key==='git101-position'){try{go(JSON.parse(e.newValue).index,false);}catch{}}});
 new ResizeObserver(fit).observe($('frame'));
 function tick(){
  if(timerRunning){timerRemaining=Math.max(0,Math.ceil((timerEnd-Date.now())/1000));if(timerRemaining===0)timerRunning=false;}
  const d=document.querySelector('[data-timer-display]');if(d){d.textContent=`${String(Math.floor(timerRemaining/60)).padStart(2,'0')}:${String(timerRemaining%60).padStart(2,'0')}`;document.querySelector('[data-timer]').textContent=timerRunning?'暫停':timerRemaining===0?'重新開始':'開始倒數';}
 }
 function wireTimer(){const b=document.querySelector('[data-timer]');if(!b)return;b.onclick=()=>{if(timerRunning){timerRemaining=Math.max(0,Math.ceil((timerEnd-Date.now())/1000));timerRunning=false;}else{if(!timerRemaining)timerRemaining=600;timerEnd=Date.now()+timerRemaining*1000;timerRunning=true;}tick();};document.querySelector('[data-timer-reset]').onclick=()=>{timerRunning=false;timerRemaining=600;tick();};tick();}
 setInterval(tick,250);
 window.addEventListener('beforeprint',()=>{document.querySelectorAll('.print-slide').forEach(x=>x.remove());SLIDES.forEach((s,i)=>{const el=document.createElement('article');el.className='print-slide';el.id='print-'+i;el.innerHTML=markup(s,i);el.style.cssText='background:#101925;color:#f0f4fa;display:flex;flex-direction:column;padding:64px 82px 52px';$('frame').append(el);});});
 window.addEventListener('afterprint',()=>document.querySelectorAll('.print-slide').forEach(x=>x.remove()));
 go(parseInt(location.hash.slice(1),10)-1,false);
})();
