export type Question = {
  topic: string;
  kind: string;
  prompt: string;
  display: string;
  answer: string;
  choices: string[];
  note: string;
  hint?: string;
};

export type Module = {
  id: string;
  icon: string;
  title: string;
  description: string;
  level: string;
  questions: Question[];
};

const q = (topic: string, display: string, answer: string, choices: string[], note: string, prompt = 'Elegí la opción correcta.'): Question => ({
  topic,
  kind: topic,
  prompt,
  display,
  answer,
  choices,
  note,
});

export const modules: Module[] = [
  {
    id: 'foundations', icon: '基', title: 'Bases y profesiones', level: 'Lección 1',
    description: 'は, も, preguntas, negación, profesiones y edad.',
    questions: [
      q('Bases', 'わたし ___ 学生です。', 'は', ['は', 'も', 'か', 'の'], 'は marca el tema: “Soy estudiante”.'),
      q('Bases', 'サントスさん ___ 会社員です。', 'も', ['も', 'は', 'で', 'へ'], 'も expresa “también”.'),
      q('Bases', 'ワンさんは 銀行員 ___ か。', 'です', ['です', 'も', 'は', 'じゃありません'], 'ですか forma una pregunta cortés.'),
      q('Bases', 'いいえ、銀行員 ___。医者です。', 'じゃありません', ['じゃありません', 'です', 'も', 'か'], 'じゃありません es la forma negativa cortés.'),
      q('Profesiones', '学生', 'estudiante', ['estudiante', 'médico', 'profesor', 'empleado de banco'], '学生（がくせい）· gakusei · estudiante', '¿Qué significa esta palabra?'),
      q('Profesiones', '会社員', 'empleado de empresa', ['empleado de empresa', 'empleado de banco', 'estudiante', 'médico'], '会社員（かいしゃいん）· kaishain · empleado de empresa', '¿Qué significa esta palabra?'),
      q('Profesiones', '銀行員', 'empleado de banco', ['empleado de banco', 'empleado de empresa', 'profesor', 'estudiante'], '銀行員（ぎんこういん）· ginkōin · empleado de banco', '¿Qué significa esta palabra?'),
      q('Profesiones', '医者', 'médico', ['médico', 'profesor', 'empleado', 'estudiante'], '医者（いしゃ）· isha · médico', '¿Qué significa esta palabra?'),
      q('Edad', 'テレーザちゃんは ___ ですか。', '何歳', ['何歳', '何番', 'どこ', 'いつ'], '何歳（なんさい）pregunta cuántos años tiene alguien.'),
      q('Edad', '9歳', 'nueve años', ['nueve años', 'diecinueve años', 'noventa años', 'nueve personas'], '9歳 se lee きゅうさい (kyūsai).', '¿Qué significa esta expresión?'),
    ],
  },
  {
    id: 'writing', icon: 'あ', title: 'Escritura', level: 'Hiragana y katakana',
    description: 'Caracteres, sonidos combinados y consonante doble.',
    questions: [
      q('Escritura', 'ア', 'a', ['a', 'i', 'u', 'e'], 'あ es hiragana y ア es katakana; ambos se leen a.', '¿Cómo se lee?'),
      q('Escritura', 'シ', 'shi', ['shi', 'tsu', 'so', 'n'], 'シ se lee shi.', '¿Cómo se lee?'),
      q('Escritura', 'ツ', 'tsu', ['tsu', 'shi', 'su', 'chi'], 'ツ se lee tsu.', '¿Cómo se lee?'),
      q('Escritura', 'きょうしつ', 'kyōshitsu', ['kyōshitsu', 'kyoshitsu', 'kōshitsu', 'kyōjitsu'], 'きょ forma kyo y う alarga la vocal.', '¿Cómo se lee?'),
      q('Escritura', 'ざっし', 'zasshi', ['zasshi', 'zatsushi', 'zashi', 'sasshi'], 'La っ pequeña duplica la consonante siguiente.', '¿Cómo se lee?'),
      q('Escritura', 'ワット', 'watto', ['watto', 'wato', 'wattsu', 'wotto'], 'La ッ pequeña marca consonante doble.', '¿Cómo se lee?'),
      q('Escritura', 'しゃ', 'sha', ['sha', 'shiya', 'cha', 'ja'], 'し + ゃ pequeña forman sha.', '¿Cómo se lee?'),
      q('Escritura', 'りゅ', 'ryu', ['ryu', 'riyu', 'ru', 'ryo'], 'り + ゅ pequeña forman ryu.', '¿Cómo se lee?'),
    ],
  },
  {
    id: 'objects', icon: '物', title: 'Objetos y lugares', level: 'Lecciones 2 y 3',
    description: 'Demostrativos, posesión, lugares, procedencia y precios.',
    questions: [
      q('Demostrativos', '___ は 辞書です。', 'これ', ['これ', 'この', 'ここ', 'どこ'], 'これ significa “esto” y funciona sin sustantivo.'),
      q('Demostrativos', '___ 本は わたしのです。', 'この', ['この', 'これ', 'ここ', 'どの'], 'この acompaña siempre a un sustantivo.'),
      q('Posesión', 'この 傘は ___ ですか。', 'だれの', ['だれの', '何歳', 'どこ', 'いくら'], 'だれの pregunta de quién es algo.'),
      q('Lugares', 'トイレは ___ ですか。', 'どこ', ['どこ', 'いつ', 'だれ', '何番'], 'どこ pregunta por un lugar.'),
      q('Procedencia', 'お国は ___ ですか。', 'どちら', ['どちら', 'いくら', '何歳', 'だれの'], 'どちら es la forma cortés para preguntar procedencia.'),
      q('Precios', 'この 時計は ___ ですか。', 'いくら', ['いくら', 'どこ', 'いつ', '何番'], 'いくら pregunta cuánto cuesta.'),
      q('Vocabulario', '郵便局', 'oficina de correos', ['oficina de correos', 'biblioteca', 'banco', 'hospital'], '郵便局（ゆうびんきょく）· yūbinkyoku.', '¿Qué significa?'),
      q('Vocabulario', '美術館', 'museo de arte', ['museo de arte', 'biblioteca', 'empresa', 'universidad'], '美術館（びじゅつかん）· bijutsukan.', '¿Qué significa?'),
    ],
  },
  {
    id: 'routines', icon: '時', title: 'Hora y rutinas', level: 'Lección 4',
    description: 'Formas verbales, horarios, から, まで y に.',
    questions: [
      q('Formas verbales', '毎朝 6時に ___。', '起きます', ['起きます', '起きました', '寝ました', '休みます'], '毎朝 indica un hábito, por eso usamos ～ます.'),
      q('Formas verbales', 'きのう 10時に ___。', '寝ました', ['寝ました', '寝ます', '寝ません', '起きます'], 'きのう indica pasado, por eso corresponde ～ました.'),
      q('Formas verbales', 'きのう 勉強 ___。', 'しませんでした', ['しませんでした', 'しません', 'します', 'して'], 'La negación formal pasada es ～ませんでした.'),
      q('Partículas de tiempo', '昼休みは 12時 ___ 1時までです。', 'から', ['から', 'に', 'へ', 'と'], 'から marca el comienzo de un intervalo.'),
      q('Partículas de tiempo', 'きのう 12時 ___ 勉強しました。', 'まで', ['まで', 'に', 'から', 'で'], 'まで marca el límite de una actividad.'),
      q('Partículas de tiempo', '何時 ___ 終わりますか。', 'に', ['に', 'まで', 'へ', 'と'], 'に marca el momento puntual en que termina.'),
      q('Rutinas', '働きます', 'trabajar', ['trabajar', 'descansar', 'terminar', 'estudiar'], '働きます（はたらきます）· hatarakimasu.', '¿Qué significa?'),
      q('Rutinas', '終わります', 'terminar', ['terminar', 'comenzar', 'dormir', 'volver'], '終わります（おわります）· owarimasu.', '¿Qué significa?'),
    ],
  },
  {
    id: 'movement', icon: '行', title: 'Movimiento', level: 'Lección 5',
    description: 'Destino, transporte, compañía, fechas e interrogativos.',
    questions: [
      q('Movimiento', '京都 ___ 行きます。', 'へ', ['へ', 'で', 'と', 'まで'], 'へ marca dirección o destino y se pronuncia e.'),
      q('Transporte', 'バス ___ 会社へ 行きます。', 'で', ['で', 'へ', 'と', 'に'], 'で indica el medio de transporte.'),
      q('Compañía', '家族 ___ 日本へ 来ました。', 'と', ['と', 'で', 'へ', 'から'], 'と después de una persona o grupo significa “con”.'),
      q('Transporte', '自転車', 'bicicleta', ['bicicleta', 'autobús', 'tren bala', 'taxi'], '自転車（じてんしゃ）· jitensha.', '¿Qué significa?'),
      q('Transporte', '地下鉄', 'subte', ['subte', 'tren bala', 'bicicleta', 'autobús'], '地下鉄（ちかてつ）· chikatetsu.', '¿Qué significa?'),
      q('Compañía', '友達', 'amigo o amiga', ['amigo o amiga', 'familia', 'profesor', 'cliente'], '友達（ともだち）· tomodachi.', '¿Qué significa?'),
      q('Interrogativos', '___ で 東京へ 行きますか。', '何', ['何', 'どこ', 'だれ', 'いつ'], '何で pregunta con qué medio.'),
      q('Interrogativos', '___ と 日本へ 来ましたか。', 'だれ', ['だれ', '何', 'どこ', 'いつ'], 'だれと pregunta con quién.'),
      q('Fechas', '7月15日 ___ 国へ 帰ります。', 'に', ['に', 'で', 'へ', 'と'], 'Una fecha concreta lleva に.'),
      q('Fechas', '___ 国へ 帰ります。（la semana que viene）', '来週', ['来週', 'きのう', '毎日', 'おととい'], '来週（らいしゅう）significa la semana que viene y aparece sin に.'),
      q('Negación total', '日曜日 どこへ 行きましたか。', 'どこへも 行きませんでした', ['どこへも 行きませんでした', '東京へ 行きます', '何で 行きました', '家族と 来ました'], 'どこへも + verbo negativo significa “a ningún lugar”.'),
    ],
  },
];

export const allTopics = [...new Set(modules.flatMap((module) => module.questions.map((question) => question.topic)))];
