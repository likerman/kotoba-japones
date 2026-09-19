import { api } from '@appdeploy/client';
import './styles.css';
import './kana.css';
import './modes.css';
import { kanaReadingFor, modules, type Module, type Question } from './data';

type TopicStats = Record<string, { correct: number; total: number }>;
type Profile = {
  id?: string;
  slug: 'aime' | 'jere';
  name: string;
  emoji: string;
  points: number;
  correct: number;
  total: number;
  sessions: number;
  trainingSessions?: number;
  competitionSessions?: number;
  perfectSessions: number;
  topicStats: TopicStats;
  lastPlayed: number | null;
};

const app = document.querySelector<HTMLDivElement>('#app')!;
let profiles: Profile[] = [];
let activeProfile = localStorage.getItem('kotoba-profile') as Profile['slug'] | null;
let currentModule: Module | null = null;
let questions: Question[] = [];
let questionIndex = 0;
let selectedAnswer = '';
let sessionCorrect = 0;
let sessionTopics: TopicStats = {};
let sessionMode: 'training' | 'competition' = 'training';
let sessionScore = 0;
let review: Array<{ display: string; answer: string; displayReading: string; answerReading: string }> = [];

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);
const currentUser = () => profiles.find((profile) => profile.slug === activeProfile);
const accuracy = (profile: Profile) => profile.total ? Math.round((profile.correct / profile.total) * 100) : 0;

function applyTheme(theme: string) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('kotoba-theme', theme);
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')!.content = theme === 'dark' ? '#171c1a' : '#f5f1e8';
}

async function loadProfiles() {
  try {
    const response = await api.get('/api/profiles');
    profiles = response.data.profiles;
  } catch {
    profiles = [
      { slug: 'aime', name: 'Aiméさん', emoji: '桜', points: 0, correct: 0, total: 0, sessions: 0, trainingSessions: 0, competitionSessions: 0, perfectSessions: 0, topicStats: {}, lastPlayed: null },
      { slug: 'jere', name: 'Jereさん', emoji: '富', points: 0, correct: 0, total: 0, sessions: 0, trainingSessions: 0, competitionSessions: 0, perfectSessions: 0, topicStats: {}, lastPlayed: null },
    ];
  }
}

function shell(content: string, active: 'train' | 'race' = 'train') {
  const user = currentUser();
  app.innerHTML = `
    <div class="paper-noise"></div>
    <header class="topbar">
      <button class="brand link-button" data-action="home" aria-label="Inicio Kotoba"><span class="brand-mark">言</span><span><strong>Kotoba</strong><small>práctica compartida</small></span></button>
      <nav class="main-nav" aria-label="Secciones principales">
        <button class="nav-tab ${active === 'train' ? 'active' : ''}" data-action="train">Entrenar</button>
        <button class="nav-tab ${active === 'race' ? 'active' : ''}" data-action="race">Competir</button>
      </nav>
      <div class="header-actions">
        <button class="theme-btn" data-action="theme" aria-label="Cambiar tema">◐</button>
        <button class="profile-pill" data-action="profiles"><span>${user?.emoji || '人'}</span>${user?.name || 'Elegir perfil'}</button>
      </div>
    </header>
    <main>${content}</main>
    <footer><span>ことば</span><p>Contenido basado en el Manual de japonés · progreso compartido</p></footer>
  `;
  bindShell();
}

function bindShell() {
  document.querySelectorAll<HTMLElement>('[data-action="home"], [data-action="train"]').forEach((button) => button.onclick = renderTraining);
  document.querySelector<HTMLElement>('[data-action="race"]')!.onclick = renderRace;
  document.querySelector<HTMLElement>('[data-action="profiles"]')!.onclick = renderProfilePicker;
  document.querySelector<HTMLElement>('[data-action="theme"]')!.onclick = () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
}

function renderProfilePicker() {
  shell(`
    <section class="profile-screen">
      <p class="eyebrow">¿QUIÉN ENTRENA HOY?</p>
      <h1>Elegí tu perfil</h1>
      <p class="lead">Podés entrenar sin puntos o entrar a Competir cuando quieras jugar por la carrera compartida.</p>
      <div class="profile-grid">
        ${profiles.map((profile) => `
          <button class="profile-card" data-profile="${profile.slug}">
            <span class="profile-avatar">${profile.emoji}</span>
            <strong>${profile.name}</strong>
            <small>${profile.points} puntos · ${profile.sessions} sesiones</small>
          </button>
        `).join('')}
      </div>
      <p class="privacy-note">Estos perfiles son compartidos y no usan contraseña. No ingreses información sensible.</p>
    </section>
  `);
  document.querySelectorAll<HTMLElement>('[data-profile]').forEach((button) => button.onclick = () => {
    activeProfile = button.dataset.profile as Profile['slug'];
    localStorage.setItem('kotoba-profile', activeProfile);
    renderTraining();
  });
}

function weakestTopics(profile: Profile) {
  return Object.entries(profile.topicStats || {})
    .filter(([, stat]) => stat.total >= 2)
    .map(([topic, stat]) => ({ topic, total: stat.total, accuracy: Math.round(stat.correct / stat.total * 100) }))
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3);
}

function renderTraining() {
  if (!activeProfile || !currentUser()) return renderProfilePicker();
  const profile = currentUser()!;
  const weak = weakestTopics(profile);
  shell(`
    <section class="home-view">
      <div class="hero">
        <div><p class="eyebrow">こんにちは、${profile.name}</p><h1>Tu camino,<br><em>un paso a la vez.</em></h1><p class="lead">Practicá con las Lecciones 1–5 sin sumar ni restar puntos. Tus resultados ayudan a detectar qué temas reforzar.</p><button class="primary-btn" data-start="mix">Empezar repaso mixto <span>→</span></button></div>
        <div class="personal-card"><span>${profile.emoji}</span><p>Puntaje competitivo</p><strong>${profile.points}</strong><small>${profile.sessions} sesiones · ${accuracy(profile)}% precisión</small></div>
      </div>
      <section class="stats-grid">
        <article><strong>${profile.correct}</strong><small>respuestas correctas</small></article>
        <article><strong>${profile.perfectSessions}</strong><small>sesiones perfectas</small></article>
        <article><strong>${accuracy(profile)}%</strong><small>precisión general</small></article>
      </section>
      ${weak.length ? `<section class="weak-panel"><div><p class="eyebrow">PARA REFORZAR</p><h2>Tus próximos focos</h2></div><div class="weak-list">${weak.map((item) => `<span>${item.topic}<b>${item.accuracy}%</b></span>`).join('')}</div></section>` : ''}
      <section class="section-block"><p class="eyebrow">ENTRENAMIENTO · SIN PUNTOS</p><h2>¿Qué querés practicar?</h2><div class="module-grid">
        ${modules.map((module) => `<button class="module-card" data-start="${module.id}"><span class="module-icon">${module.icon}</span><span><small>${module.level}</small><strong>${module.title}</strong><p>${module.description}</p></span><b>→</b></button>`).join('')}
      </div></section>
    </section>
  `);
  document.querySelectorAll<HTMLElement>('[data-start]').forEach((button) => button.onclick = () => startSession(button.dataset.start!, 'training'));
}

function renderRace() {
  if (!activeProfile) return renderProfilePicker();
  const ordered = [...profiles].sort((a, b) => b.points - a.points);
  const minPoints = Math.min(0, ...profiles.map((profile) => profile.points));
  const maxPoints = Math.max(20, ...profiles.map((profile) => profile.points));
  const pointRange = Math.max(20, maxPoints - minPoints);
  const difference = Math.abs((ordered[0]?.points || 0) - (ordered[1]?.points || 0));
  shell(`
    <section class="race-view">
      <p class="eyebrow">競争（きょうそう）· COMPETICIÓN AMISTOSA</p><h1>La carrera Kotoba</h1><p class="lead">Acá sí se juega por puntos: cada acierto suma 10 y cada error resta 5. El resultado se aplica a tu perfil al terminar el desafío.</p>
      <div class="competition-cta"><div><strong>Desafío competitivo</strong><small>10 preguntas · +10 por acierto · −5 por error</small></div><button class="primary-btn" data-compete="mix">Competir ahora →</button></div>
      <div class="race-track">
        ${profiles.map((profile) => `<div class="race-lane"><div class="runner" style="width:${8 + (profile.points - minPoints) / pointRange * 92}%"><span>${profile.emoji}</span></div><div class="lane-meta"><strong>${profile.name}</strong><b>${profile.points} puntos</b></div></div>`).join('')}
      </div>
      <div class="scoreboard">
        ${ordered.map((profile, index) => `<article class="score-card ${profile.slug === activeProfile ? 'mine' : ''}"><span class="place">${index + 1}</span><span class="profile-avatar small">${profile.emoji}</span><div><strong>${profile.name}</strong><small>${profile.competitionSessions || 0} desafíos · ${accuracy(profile)}% precisión</small></div><b>${profile.points}</b></article>`).join('')}
      </div>
      <div class="race-message">${difference === 0 ? '¡La carrera está empatada!' : `${ordered[1]?.name || ''} está a ${difference} puntos de alcanzar a ${ordered[0]?.name || ''}.`}</div>
      <section class="competition-modules"><p class="eyebrow">ELEGÍ EL DESAFÍO</p><div class="module-grid">${modules.map((module) => `<button class="module-card" data-compete="${module.id}"><span class="module-icon">${module.icon}</span><span><small>${module.level}</small><strong>${module.title}</strong><p>Competencia de hasta 10 preguntas.</p></span><b>→</b></button>`).join('')}</div></section>
      <section class="comparison"><h2>Fortalezas y oportunidades</h2><div class="comparison-grid">${profiles.map((profile) => { const weak = weakestTopics(profile); return `<article><h3>${profile.emoji} ${profile.name}</h3>${weak.length ? weak.map((item) => `<p><span>${item.topic}</span><b>${item.accuracy}%</b></p>`).join('') : '<p class="muted">Completá dos o más preguntas por tema para obtener un diagnóstico.</p>'}</article>`; }).join('')}</div></section>
    </section>
  `, 'race');
  document.querySelectorAll<HTMLElement>('[data-compete]').forEach((button) => button.onclick = () => startSession(button.dataset.compete!, 'competition'));
}

function startSession(moduleId: string, mode: 'training' | 'competition') {
  const module = modules.find((item) => item.id === moduleId);
  const pool = moduleId === 'mix' ? modules.flatMap((item) => item.questions) : module?.questions || [];
  currentModule = module || { id: 'mix', icon: '祭', title: 'Repaso mixto', description: '', level: 'Lecciones 1–5', questions: pool };
  questions = shuffle(pool).slice(0, 10).map((question) => ({ ...question, choices: shuffle(question.choices) }));
  questionIndex = 0; sessionCorrect = 0; sessionTopics = {}; sessionMode = mode; sessionScore = 0; review = [];
  renderQuestion();
}

function renderQuestion() {
  const question = questions[questionIndex];
  selectedAnswer = '';
  shell(`
    <section class="practice-view"><div class="practice-head"><button class="icon-btn" data-action="exit">×</button><div><span>${questionIndex + 1} de ${questions.length}</span><div class="progress-track"><i style="width:${questionIndex / questions.length * 100}%"></i></div></div><b>${currentModule?.title}</b></div><div class="mode-banner ${sessionMode}"><span>${sessionMode === 'competition' ? 'COMPETICIÓN' : 'ENTRENAMIENTO'}</span><strong id="liveScore">${sessionMode === 'competition' ? `${sessionScore >= 0 ? '+' : ''}${sessionScore} puntos` : 'Sin puntos'}</strong></div>
      <div class="question-shell"><div class="question-meta"><span>${question.topic}</span><span>${question.kind}</span></div><p class="question-prompt">${question.prompt}</p><div class="question-display">${question.display}</div>${question.reading ? `<div class="question-reading" aria-label="Lectura en kana">${question.reading}</div>` : ''}<div class="answer-grid">${question.choices.map((choice, index) => { const reading = kanaReadingFor(choice); return `<button class="answer" data-answer="${choice.replaceAll('"', '&quot;')}"><span>${String.fromCharCode(65 + index)}</span><span class="answer-text"><b>${choice}</b>${reading ? `<small>${reading}</small>` : ''}</span></button>`; }).join('')}</div><div id="feedback" class="feedback"></div><button id="checkBtn" class="primary-btn check-btn" disabled>Comprobar</button><button id="nextBtn" class="primary-btn check-btn hidden">Continuar →</button></div>
    </section>
  `, sessionMode === 'competition' ? 'race' : 'train');
  document.querySelector<HTMLElement>('[data-action="exit"]')!.onclick = sessionMode === 'competition' ? renderRace : renderTraining;
  document.querySelectorAll<HTMLButtonElement>('[data-answer]').forEach((button) => button.onclick = () => {
    document.querySelectorAll('.answer').forEach((item) => item.classList.remove('selected'));
    button.classList.add('selected'); selectedAnswer = button.dataset.answer!; document.querySelector<HTMLButtonElement>('#checkBtn')!.disabled = false;
  });
  document.querySelector<HTMLButtonElement>('#checkBtn')!.onclick = checkAnswer;
}

function checkAnswer() {
  const question = questions[questionIndex];
  const correct = selectedAnswer === question.answer;
  if (sessionMode === 'competition') sessionScore += correct ? 10 : -5;
  const stat = sessionTopics[question.topic] || { correct: 0, total: 0 };
  sessionTopics[question.topic] = { correct: stat.correct + (correct ? 1 : 0), total: stat.total + 1 };
  if (correct) sessionCorrect += 1; else review.push({ display: question.display, answer: question.answer, displayReading: question.reading || '', answerReading: kanaReadingFor(question.answer) });
  document.querySelectorAll<HTMLButtonElement>('[data-answer]').forEach((button) => { button.disabled = true; if (button.dataset.answer === question.answer) button.classList.add('correct'); else if (button.dataset.answer === selectedAnswer) button.classList.add('wrong'); });
  const feedback = document.querySelector('#feedback')!;
  feedback.className = `feedback ${correct ? 'good' : 'bad'}`;
  const answerReading = kanaReadingFor(question.answer);
  feedback.innerHTML = `<strong>${correct ? '¡Muy bien! よくできました' : `La respuesta es “${question.answer}”${answerReading ? ` (${answerReading})` : ''}.`}${sessionMode === 'competition' ? ` <span class="point-change ${correct ? 'positive' : 'negative'}">${correct ? '+10' : '−5'} puntos</span>` : ''}</strong><p>${question.note}</p>`;
  const liveScore = document.querySelector<HTMLElement>('#liveScore');
  if (liveScore && sessionMode === 'competition') liveScore.textContent = `${sessionScore >= 0 ? '+' : ''}${sessionScore} puntos`;
  document.querySelector('#checkBtn')!.classList.add('hidden');
  const next = document.querySelector<HTMLButtonElement>('#nextBtn')!;
  next.classList.remove('hidden'); next.onclick = () => { questionIndex += 1; questionIndex < questions.length ? renderQuestion() : finishSession(); };
}

async function finishSession() {
  const earned = sessionMode === 'competition' ? sessionScore : 0;
  let synced = true;
  try {
    const response = await api.post('/api/sessions', { profile: activeProfile, module: currentModule?.id || 'mix', correct: sessionCorrect, total: questions.length, topics: sessionTopics, mode: sessionMode });
    profiles = response.data.profiles;
  } catch { synced = false; }
  shell(`<section class="results-view"><div class="results-card"><span class="result-stamp">${sessionCorrect === questions.length ? '満点' : '前進'}</span><p class="eyebrow">${sessionMode === 'competition' ? 'DESAFÍO COMPLETADO' : 'ENTRENAMIENTO COMPLETADO'}</p><h1>${sessionCorrect >= 8 ? '¡Excelente trabajo!' : sessionCorrect >= 6 ? '¡Buen avance!' : 'Cada intento enseña'}</h1><div class="result-score"><strong>${sessionCorrect}/${questions.length}</strong><span>${sessionMode === 'competition' ? `${earned >= 0 ? '+' : ''}${earned} puntos en la carrera` : 'Práctica sin puntos'}</span></div>${!synced ? '<p class="sync-error">No pudimos sincronizar esta sesión. Revisá tu conexión antes de cerrar.</p>' : ''}<div class="review-list">${review.length ? `<h3>Para repasar</h3>${review.slice(0, 4).map((item) => `<p><span>${item.display}${item.displayReading ? `<small>${item.displayReading}</small>` : ''}</span><b>${item.answer}${item.answerReading ? `<small>${item.answerReading}</small>` : ''}</b></p>`).join('')}` : `<p class="perfect">${sessionMode === 'competition' ? 'Desafío perfecto: sumaste 100 puntos.' : 'Entrenamiento perfecto.'}</p>`}</div><button class="primary-btn" data-action="home">Volver a entrenar</button><button class="secondary-btn" data-action="race">Ver la carrera</button></div></section>`, sessionMode === 'competition' ? 'race' : 'train');
}

async function init() {
  const savedTheme = localStorage.getItem('kotoba-theme');
  applyTheme(savedTheme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  await loadProfiles();
  activeProfile && currentUser() ? renderTraining() : renderProfilePicker();
}

void init();
