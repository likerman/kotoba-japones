const C = window.KOTOBA_CONTENT;
const $ = (s) => document.querySelector(s);
const state = { module: 'mix', questions: [], index: 0, selected: null, correct: 0, lives: 3, mistakes: [] };
const saved = JSON.parse(localStorage.getItem('kotoba-progress') || '{}');
const progress = { total: saved.total || 0, correct: saved.correct || 0, streak: saved.streak || 0, lastDay: saved.lastDay || '', today: saved.today || 0, todayDate: saved.todayDate || '' };

const modules = [
  {id:'kana', icon:'あ', title:'Hiragana y katakana', desc:'Reconocé los silabarios y su lectura en romaji.', level:'Nivel inicial', color:'coral'},
  {id:'vocabulary', icon:'物', title:'Vocabulario', desc:'Objetos, lugares, alimentos, países y verbos.', level:'5 categorías', color:'blue'},
  {id:'grammar', icon:'文', title:'Gramática', desc:'Completá partículas, demostrativos y preguntas.', level:'8 estructuras', color:'green'},
  {id:'numbers', icon:'時', title:'Números y tiempo', desc:'Practicá precios, horas y pisos.', level:'8 desafíos', color:'gold'},
  {id:'mix', icon:'祭', title:'Repaso mixto', desc:'Una sesión variada con todo lo aprendido.', level:'Recomendado', color:'ink'}
];

function shuffle(arr){ return [...arr].sort(() => Math.random() - .5); }
function sample(arr, n=1){ return shuffle(arr).slice(0,n); }
function choices(correct, pool){ return shuffle([correct, ...sample(pool.filter(x => x !== correct), 3)]); }

function kanaQuestion(){
  if(Math.random()>.7){
    const row=sample(C.combinations)[0];
    return {type:'Escritura',kind:'Combinaciones',prompt:'¿Cómo se lee esta combinación?',display:row[0],answer:row[1],choices:choices(row[1],C.combinations.map(x=>x[1])),note:`${row[0]} se lee ${row[1]}. Prestá atención a los sonidos combinados, las vocales largas y la っ pequeña.`};
  }
  const row = sample(C.kana)[0], katakana = Math.random() > .5, symbol = row[katakana ? 1 : 0];
  return {type:'Escritura', kind:katakana?'Katakana':'Hiragana', prompt:'¿Cómo se lee este carácter?', display:symbol, answer:row[2], choices:choices(row[2], C.kana.map(x=>x[2])), note:`${row[0]} es hiragana · ${row[1]} es katakana · se lee ${row[2]}.`};
}
function vocabQuestion(){
  const row = sample(C.vocabulary)[0], reverse = Math.random() > .65;
  if(reverse) return {type:'Vocabulario',kind:row[4],prompt:'¿Cómo se dice en japonés?',display:row[3],answer:row[0],choices:choices(row[0],C.vocabulary.map(x=>x[0])),note:`${row[0]}（${row[1]}）· ${row[2]} · ${row[3]}`};
  return {type:'Vocabulario',kind:row[4],prompt:'¿Qué significa esta palabra?',display:row[0],hint:`${row[1]} · ${row[2]}`,answer:row[3],choices:choices(row[3],C.vocabulary.map(x=>x[3])),note:`${row[0]}（${row[1]}）· ${row[2]} · ${row[3]}`};
}
function grammarQuestion(){ const x=sample(C.grammar)[0]; return {type:'Gramática',kind:'Completar',prompt:'Elegí la opción correcta.',display:x.q,answer:x.a,choices:shuffle(x.choices),note:x.note}; }
function numbersQuestion(){ const x=sample(C.numbers)[0]; return {type:'Números y tiempo',kind:'Lectura',prompt:'¿Qué significa esta expresión?',display:x.q,answer:x.a,choices:shuffle(x.choices),note:`${x.q} significa ${x.a}.`}; }
function makeQuestions(module){
  const factories={kana:kanaQuestion,vocabulary:vocabQuestion,grammar:grammarQuestion,numbers:numbersQuestion};
  if(module==='mix') return shuffle([kanaQuestion,kanaQuestion,vocabQuestion,vocabQuestion,vocabQuestion,grammarQuestion,grammarQuestion,numbersQuestion,numbersQuestion,grammarQuestion]).map(f=>f());
  return Array.from({length:10},()=>factories[module]());
}

function showView(id){ document.querySelectorAll('.view').forEach(v=>v.classList.remove('active')); $(id).classList.add('active'); window.scrollTo({top:0,behavior:'smooth'}); }
function renderHome(){
  const today=new Date().toISOString().slice(0,10); if(progress.todayDate!==today){progress.today=0;progress.todayDate=today;save();}
  $('#dailyCount').textContent=`${Math.min(progress.today,10)}/10`; $('#dailyBar').style.width=`${Math.min(progress.today*10,100)}%`;
  $('#streakStat').textContent=progress.streak; $('#correctStat').textContent=progress.correct;
  $('#accuracyStat').textContent=progress.total?`${Math.round(progress.correct/progress.total*100)}%`:'—';
  $('#moduleGrid').innerHTML=modules.map(m=>`<button class="module-card ${m.color}" data-module="${m.id}"><span class="module-icon">${m.icon}</span><span class="module-body"><small>${m.level}</small><strong>${m.title}</strong><p>${m.desc}</p></span><span class="arrow">→</span></button>`).join('');
  document.querySelectorAll('[data-module]').forEach(b=>b.onclick=()=>start(b.dataset.module));
}
function start(module='mix'){ Object.assign(state,{module,questions:makeQuestions(module),index:0,selected:null,correct:0,lives:3,mistakes:[]}); showView('#practiceView'); renderQuestion(); }
function renderQuestion(){
  const q=state.questions[state.index]; state.selected=null;
  $('#questionNumber').textContent=`${state.index+1} de ${state.questions.length}`; $('#sessionBar').style.width=`${state.index/state.questions.length*100}%`; $('#lives').textContent='● '.repeat(state.lives).trim();
  $('#moduleBadge').textContent=q.type; $('#questionKind').textContent=q.kind; $('#prompt').textContent=q.prompt; $('#questionDisplay').textContent=q.display; $('#hint').textContent=q.hint||'';
  $('#answerArea').innerHTML=q.choices.map((x,i)=>`<button class="answer" data-answer="${escapeHtml(x)}"><span>${String.fromCharCode(65+i)}</span>${x}</button>`).join('');
  document.querySelectorAll('.answer').forEach(b=>b.onclick=()=>selectAnswer(b));
  $('#feedback').className='feedback'; $('#feedback').innerHTML=''; $('#checkBtn').classList.remove('hidden'); $('#nextBtn').classList.add('hidden'); $('#checkBtn').disabled=true;
}
function escapeHtml(s){return String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');}
function selectAnswer(btn){ document.querySelectorAll('.answer').forEach(b=>b.classList.remove('selected')); btn.classList.add('selected'); state.selected=btn.dataset.answer; $('#checkBtn').disabled=false; }
function check(){
  const q=state.questions[state.index], ok=state.selected===q.answer; progress.total++; progress.today++;
  document.querySelectorAll('.answer').forEach(b=>{b.disabled=true;if(b.dataset.answer===q.answer)b.classList.add('correct');else if(b.dataset.answer===state.selected)b.classList.add('wrong');});
  if(ok){state.correct++;progress.correct++;$('#feedback').className='feedback good';$('#feedback').innerHTML=`<strong>¡Muy bien! よくできました</strong><p>${q.note}</p>`;}
  else{state.lives=Math.max(0,state.lives-1);state.mistakes.push(q);$('#feedback').className='feedback bad';$('#feedback').innerHTML=`<strong>Casi. La respuesta es “${q.answer}”.</strong><p>${q.note}</p>`;}
  save(); $('#checkBtn').classList.add('hidden'); $('#nextBtn').classList.remove('hidden'); $('#nextBtn').focus();
}
function next(){ if(state.index<state.questions.length-1){state.index++;renderQuestion();}else finish(); }
function finish(){
  const today=new Date(); const todayKey=today.toISOString().slice(0,10); const yesterday=new Date(today);yesterday.setDate(today.getDate()-1);const yesterdayKey=yesterday.toISOString().slice(0,10);
  if(progress.lastDay!==todayKey){progress.streak=progress.lastDay===yesterdayKey?progress.streak+1:1;progress.lastDay=todayKey;} save();
  const pct=state.correct/state.questions.length; $('#resultTitle').textContent=pct>=.8?'¡Excelente trabajo!':pct>=.6?'¡Buen avance!':'Cada intento suma';
  $('#resultCopy').textContent=pct>=.8?'Este tema ya se siente mucho más sólido.':pct>=.6?'Estás construyendo una base firme. Repasá los puntos difíciles.':'Volvé a intentarlo: la memoria se fortalece con cada repaso.';
  $('#resultScore').textContent=`${state.correct}/${state.questions.length}`;
  $('#reviewList').innerHTML=state.mistakes.length?`<h3>Para repasar</h3>${state.mistakes.slice(0,4).map(q=>`<p><span>${q.display}</span><strong>${q.answer}</strong></p>`).join('')}`:'<p class="perfect">Perfecto: no hubo errores en esta sesión.</p>';
  showView('#resultsView');
}
function save(){localStorage.setItem('kotoba-progress',JSON.stringify(progress));}
$('#continueBtn').onclick=()=>start('mix'); $('#checkBtn').onclick=check; $('#nextBtn').onclick=next; $('#exitBtn').onclick=()=>{renderHome();showView('#homeView');};
$('#homeBtn').onclick=()=>{renderHome();showView('#homeView');}; $('#retryBtn').onclick=()=>start(state.module);
$('#resetBtn').onclick=()=>{if(confirm('¿Querés borrar todo el progreso guardado?')){Object.assign(progress,{total:0,correct:0,streak:0,lastDay:'',today:0,todayDate:''});save();renderHome();}};
document.addEventListener('keydown',e=>{if(!$('#practiceView').classList.contains('active'))return;const answers=[...document.querySelectorAll('.answer:not(:disabled)')];if(['1','2','3','4'].includes(e.key)&&answers[+e.key-1])answers[+e.key-1].click();if(e.key==='Enter'){if(!$('#nextBtn').classList.contains('hidden'))next();else if(!$('#checkBtn').disabled)check();}});
renderHome();
