import { db, json, error, type RouterRoutes } from '@appdeploy/sdk';

type TopicStats = Record<string, { correct: number; total: number }>;
type CharacterStats = Record<string, { correct: number; total: number; reading: string; script: 'hiragana' | 'katakana' }>;
type Profile = {
  slug: 'aime' | 'jere';
  name: string;
  emoji: string;
  points: number;
  correct: number;
  total: number;
  sessions: number;
  trainingSessions: number;
  competitionSessions: number;
  perfectSessions: number;
  topicStats: TopicStats;
  characterStats?: CharacterStats;
  lastPlayed: number | null;
};

const TABLE = 'kotoba_profiles_v1';
const allowedProfiles = new Set(['aime', 'jere']);
const allowedModules = new Set(['foundations', 'writing', 'objects', 'routines', 'movement', 'reading', 'mix']);

const initialProfiles: Profile[] = [
  { slug: 'aime', name: 'Aiméさん', emoji: '桜', points: 0, correct: 0, total: 0, sessions: 0, trainingSessions: 0, competitionSessions: 0, perfectSessions: 0, topicStats: {}, lastPlayed: null },
  { slug: 'jere', name: 'Jereさん', emoji: '富', points: 0, correct: 0, total: 0, sessions: 0, trainingSessions: 0, competitionSessions: 0, perfectSessions: 0, topicStats: {}, lastPlayed: null },
];

async function listProfiles() {
  let { items } = await db.list<Profile>(TABLE, { limit: 10 });
  if (items.length === 0) {
    await db.add(TABLE, initialProfiles.map((profile) => ({ ...profile })));
    ({ items } = await db.list<Profile>(TABLE, { limit: 10 }));
  }
  return items
    .map((profile) => ({ ...profile, trainingSessions: profile.trainingSessions || 0, competitionSessions: profile.competitionSessions || 0, characterStats: profile.characterStats || {} }))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export const profileRoutes: RouterRoutes = {
  'GET /api/profiles': [async () => json({ profiles: await listProfiles() })],

  'POST /api/sessions': [async ({ body }) => {
    const payload = body as {
      profile?: string;
      module?: string;
      correct?: number;
      total?: number;
      topics?: TopicStats;
      characters?: CharacterStats;
      mode?: 'training' | 'competition';
    };

    if (!payload || !allowedProfiles.has(payload.profile || '') || !allowedModules.has(payload.module || '')) {
      return error('Perfil o módulo inválido', 400);
    }

    const correct = Number(payload.correct);
    const total = Number(payload.total);
    const mode = payload.mode || 'training';
    if (!Number.isInteger(correct) || !Number.isInteger(total) || total < 1 || total > 10 || correct < 0 || correct > total) {
      return error('Resultado inválido', 400);
    }
    if (mode !== 'training' && mode !== 'competition') return error('Modo inválido', 400);

    const profiles = await listProfiles();
    const current = profiles.find((profile) => profile.slug === payload.profile);
    if (!current) return error('Perfil no encontrado', 404);

    const topicStats: TopicStats = { ...(current.topicStats || {}) };
    for (const [topic, result] of Object.entries(payload.topics || {})) {
      const topicCorrect = Number(result.correct);
      const topicTotal = Number(result.total);
      if (!Number.isInteger(topicCorrect) || !Number.isInteger(topicTotal) || topicTotal < 0 || topicCorrect < 0 || topicCorrect > topicTotal) continue;
      const previous = topicStats[topic] || { correct: 0, total: 0 };
      topicStats[topic] = { correct: previous.correct + topicCorrect, total: previous.total + topicTotal };
    }

    const perfect = correct === total;
    const scoreDelta = mode === 'competition' ? correct * 10 - (total - correct) * 5 : 0;
    const characterStats: CharacterStats = { ...(current.characterStats || {}) };
    for (const [character, result] of Object.entries(payload.characters || {}).slice(0, 10)) {
      const characterCorrect = Number(result.correct);
      const characterTotal = Number(result.total);
      if (!character || character.length > 3 || !Number.isInteger(characterCorrect) || !Number.isInteger(characterTotal) || characterTotal < 0 || characterCorrect < 0 || characterCorrect > characterTotal) continue;
      if (result.script !== 'hiragana' && result.script !== 'katakana') continue;
      const previous = characterStats[character] || { correct: 0, total: 0, reading: result.reading, script: result.script };
      characterStats[character] = { correct: previous.correct + characterCorrect, total: previous.total + characterTotal, reading: result.reading, script: result.script };
    }
    const updated: Profile = {
      slug: current.slug,
      name: current.name,
      emoji: current.emoji,
      points: current.points + scoreDelta,
      correct: current.correct + correct,
      total: current.total + total,
      sessions: current.sessions + 1,
      trainingSessions: (current.trainingSessions || 0) + (mode === 'training' ? 1 : 0),
      competitionSessions: (current.competitionSessions || 0) + (mode === 'competition' ? 1 : 0),
      perfectSessions: current.perfectSessions + (perfect ? 1 : 0),
      topicStats,
      characterStats,
      lastPlayed: Date.now(),
    };

    const [saved] = await db.update(TABLE, [{ id: current.id, record: { ...updated } }]);
    if (!saved) return error('No se pudo guardar la sesión', 500);
    return json({ profile: { ...updated, id: current.id }, profiles: await listProfiles(), scoreDelta, mode });
  }],
};
