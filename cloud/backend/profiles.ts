import { db, json, error, type RouterRoutes } from '@appdeploy/sdk';

type TopicStats = Record<string, { correct: number; total: number }>;
type Profile = {
  slug: 'aime' | 'jere';
  name: string;
  emoji: string;
  points: number;
  correct: number;
  total: number;
  sessions: number;
  perfectSessions: number;
  topicStats: TopicStats;
  lastPlayed: number | null;
};

const TABLE = 'kotoba_profiles_v1';
const allowedProfiles = new Set(['aime', 'jere']);
const allowedModules = new Set(['foundations', 'writing', 'objects', 'routines', 'movement', 'mix']);

const initialProfiles: Profile[] = [
  { slug: 'aime', name: 'Aiméさん', emoji: '桜', points: 0, correct: 0, total: 0, sessions: 0, perfectSessions: 0, topicStats: {}, lastPlayed: null },
  { slug: 'jere', name: 'Jereさん', emoji: '富', points: 0, correct: 0, total: 0, sessions: 0, perfectSessions: 0, topicStats: {}, lastPlayed: null },
];

async function listProfiles() {
  let { items } = await db.list<Profile>(TABLE, { limit: 10 });
  if (items.length === 0) {
    await db.add(TABLE, initialProfiles.map((profile) => ({ ...profile })));
    ({ items } = await db.list<Profile>(TABLE, { limit: 10 }));
  }
  return items.sort((a, b) => a.slug.localeCompare(b.slug));
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
    };

    if (!payload || !allowedProfiles.has(payload.profile || '') || !allowedModules.has(payload.module || '')) {
      return error('Perfil o módulo inválido', 400);
    }

    const correct = Number(payload.correct);
    const total = Number(payload.total);
    if (!Number.isInteger(correct) || !Number.isInteger(total) || total < 1 || total > 10 || correct < 0 || correct > total) {
      return error('Resultado inválido', 400);
    }

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
    const updated: Profile = {
      slug: current.slug,
      name: current.name,
      emoji: current.emoji,
      points: current.points + correct * 10 + (perfect ? 25 : 0),
      correct: current.correct + correct,
      total: current.total + total,
      sessions: current.sessions + 1,
      perfectSessions: current.perfectSessions + (perfect ? 1 : 0),
      topicStats,
      lastPlayed: Date.now(),
    };

    const [saved] = await db.update(TABLE, [{ id: current.id, record: { ...updated } }]);
    if (!saved) return error('No se pudo guardar la sesión', 500);
    return json({ profile: { ...updated, id: current.id }, profiles: await listProfiles() });
  }],
};
