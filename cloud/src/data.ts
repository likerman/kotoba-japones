export type Question = {
  topic: string;
  kind: string;
  prompt: string;
  display: string;
  answer: string;
  choices: string[];
  note: string;
  hint?: string;
  reading?: string;
  readingDisplay?: 'always' | 'reveal';
  example?: string;
};

export type Module = {
  id: string;
  icon: string;
  title: string;
  description: string;
  level: string;
  questions: Question[];
};

const kanaReadings: Record<string, string> = {
  'わたし ___ 学生です。': 'わたし ___ がくせいです。',
  'サントスさん ___ 会社員です。': 'サントスさん ___ かいしゃいんです。',
  'ワンさんは 銀行員 ___ か。': 'ワンさんは ぎんこういん ___ か。',
  'いいえ、銀行員 ___。医者です。': 'いいえ、ぎんこういん ___。いしゃです。',
  '学生': 'がくせい', '会社員': 'かいしゃいん', '銀行員': 'ぎんこういん', '医者': 'いしゃ',
  '何歳': 'なんさい', '何番': 'なんばん', '9歳': 'きゅうさい',
  '___ は 辞書です。': '___ は じしょです。', '___ 本は わたしのです。': '___ ほんは わたしのです。',
  'この 傘は ___ ですか。': 'この かさは ___ ですか。', 'お国は ___ ですか。': 'おくには ___ ですか。',
  'この 時計は ___ ですか。': 'この とけいは ___ ですか。', '郵便局': 'ゆうびんきょく', '美術館': 'びじゅつかん',
  '毎朝 6時に ___。': 'まいあさ ろくじに ___。', 'きのう 10時に ___。': 'きのう じゅうじに ___。',
  'きのう 勉強 ___。': 'きのう べんきょう ___。', '昼休みは 12時 ___ 1時までです。': 'ひるやすみは じゅうにじ ___ いちじまでです。',
  'きのう 12時 ___ 勉強しました。': 'きのう じゅうにじ ___ べんきょうしました。',
  '何時 ___ 終わりますか。': 'なんじ ___ おわりますか。', '働きます': 'はたらきます', '終わります': 'おわります',
  '起きます': 'おきます', '起きました': 'おきました', '寝ました': 'ねました', '休みます': 'やすみます',
  '寝ます': 'ねます', '寝ません': 'ねません',
  '京都 ___ 行きます。': 'きょうと ___ いきます。', 'バス ___ 会社へ 行きます。': 'バス ___ かいしゃへ いきます。',
  '家族 ___ 日本へ 来ました。': 'かぞく ___ にほんへ きました。', '自転車': 'じてんしゃ', '地下鉄': 'ちかてつ', '友達': 'ともだち',
  '___ で 東京へ 行きますか。': '___ で とうきょうへ いきますか。', '___ と 日本へ 来ましたか。': '___ と にほんへ きましたか。',
  '7月15日 ___ 国へ 帰ります。': 'しちがつ じゅうごにち ___ くにへ かえります。',
  '___ 国へ 帰ります。（la semana que viene）': '___ くにへ かえります。（la semana que viene）',
  '日曜日 どこへ 行きましたか。': 'にちようび どこへ いきましたか。',
  '何': 'なん', '来週': 'らいしゅう', '毎日': 'まいにち',
  'どこへも 行きませんでした': 'どこへも いきませんでした', '東京へ 行きます': 'とうきょうへ いきます',
  '何で 行きました': 'なんで いきました', '家族と 来ました': 'かぞくと きました',
};

export const kanaReadingFor = (text: string) => kanaReadings[text] || '';

const q = (topic: string, display: string, answer: string, choices: string[], note: string, prompt = 'Elegí la opción correcta.', reading?: string, readingDisplay: 'always' | 'reveal' = 'always', example?: string): Question => ({
  topic,
  kind: topic,
  prompt,
  display,
  answer,
  choices,
  note,
  reading: reading || kanaReadingFor(display) || undefined,
  readingDisplay,
  example,
});

type KanaEntry = { hiragana?: string; katakana?: string; reading: string; example: string };

const basicKana = [
  ['あ', 'ア', 'a', 'あめ (ame, lluvia) · アイス (aisu, helado)'], ['い', 'イ', 'i', 'いぬ (inu, perro) · イタリア (Itaria, Italia)'],
  ['う', 'ウ', 'u', 'うみ (umi, mar) · ウール (ūru, lana)'], ['え', 'エ', 'e', 'えき (eki, estación) · エレベーター (erebētā, ascensor)'],
  ['お', 'オ', 'o', 'おちゃ (ocha, té) · オレンジ (orenji, naranja)'], ['か', 'カ', 'ka', 'かさ (kasa, paraguas) · カメラ (kamera, cámara)'],
  ['き', 'キ', 'ki', 'き (ki, árbol) · キウイ (kiui, kiwi)'], ['く', 'ク', 'ku', 'くるま (kuruma, auto) · クラス (kurasu, clase)'],
  ['け', 'ケ', 'ke', 'けさ (kesa, esta mañana) · ケーキ (kēki, torta)'], ['こ', 'コ', 'ko', 'こえ (koe, voz) · コーヒー (kōhī, café)'],
  ['さ', 'サ', 'sa', 'さかな (sakana, pescado) · サラダ (sarada, ensalada)'], ['し', 'シ', 'shi', 'しお (shio, sal) · シャツ (shatsu, camisa)'],
  ['す', 'ス', 'su', 'すし (sushi) · スープ (sūpu, sopa)'], ['せ', 'セ', 'se', 'せかい (sekai, mundo) · セーター (sētā, suéter)'],
  ['そ', 'ソ', 'so', 'そら (sora, cielo) · ソファ (sofa, sofá)'], ['た', 'タ', 'ta', 'たまご (tamago, huevo) · タクシー (takushī, taxi)'],
  ['ち', 'チ', 'chi', 'ちず (chizu, mapa) · チーズ (chīzu, queso)'], ['つ', 'ツ', 'tsu', 'つき (tsuki, luna) · ツアー (tsuā, tour)'],
  ['て', 'テ', 'te', 'て (te, mano) · テレビ (terebi, televisión)'], ['と', 'ト', 'to', 'とけい (tokei, reloj) · トマト (tomato)'],
  ['な', 'ナ', 'na', 'なつ (natsu, verano) · ナイフ (naifu, cuchillo)'], ['に', 'ニ', 'ni', 'にく (niku, carne) · ニュース (nyūsu, noticias)'],
  ['ぬ', 'ヌ', 'nu', 'ぬの (nuno, tela) · ヌードル (nūdoru, fideos)'], ['ね', 'ネ', 'ne', 'ねこ (neko, gato) · ネクタイ (nekutai, corbata)'],
  ['の', 'ノ', 'no', 'のみもの (nomimono, bebida) · ノート (nōto, cuaderno)'], ['は', 'ハ', 'ha', 'はな (hana, flor) · ハンバーガー (hanbāgā, hamburguesa)'],
  ['ひ', 'ヒ', 'hi', 'ひと (hito, persona) · ヒント (hinto, pista)'], ['ふ', 'フ', 'fu', 'ふね (fune, barco) · フォーク (fōku, tenedor)'],
  ['へ', 'ヘ', 'he', 'へや (heya, habitación) · ヘリコプター (herikoputā, helicóptero)'], ['ほ', 'ホ', 'ho', 'ほん (hon, libro) · ホテル (hoteru)'],
  ['ま', 'マ', 'ma', 'まど (mado, ventana) · マンガ (manga)'], ['み', 'ミ', 'mi', 'みず (mizu, agua) · ミルク (miruku, leche)'],
  ['む', 'ム', 'mu', 'むし (mushi, insecto) · ムード (mūdo, ambiente)'], ['め', 'メ', 'me', 'め (me, ojo) · メニュー (menyū, menú)'],
  ['も', 'モ', 'mo', 'もり (mori, bosque) · モデル (moderu, modelo)'], ['や', 'ヤ', 'ya', 'やま (yama, montaña) · ヤクルト (Yakuruto)'],
  ['ゆ', 'ユ', 'yu', 'ゆき (yuki, nieve) · ユニフォーム (yunifōmu, uniforme)'], ['よ', 'ヨ', 'yo', 'よる (yoru, noche) · ヨーグルト (yōguruto, yogur)'],
  ['ら', 'ラ', 'ra', 'らいねん (rainen, año próximo) · ラジオ (rajio, radio)'], ['り', 'リ', 'ri', 'りんご (ringo, manzana) · リモコン (rimokon, control remoto)'],
  ['る', 'ル', 'ru', 'くるま (kuruma, auto) · ルール (rūru, regla)'], ['れ', 'レ', 're', 'れきし (rekishi, historia) · レストラン (resutoran)'],
  ['ろ', 'ロ', 'ro', 'ろく (roku, seis) · ロボット (robotto, robot)'], ['わ', 'ワ', 'wa', 'わたし (watashi, yo) · ワイン (wain, vino)'],
  ['を', 'ヲ', 'wo', 'みずをのむ (mizu o nomu, beber agua) · ヲタク (wotaku)'], ['ん', 'ン', 'n', 'ほん (hon, libro) · パン (pan, pan)'],
] as const;

const voicedAndCombinedKana = [
  ['が', 'ガ', 'ga', 'がくせい (gakusei, estudiante) · ガラス (garasu, vidrio)'], ['ぎ', 'ギ', 'gi', 'ぎんこう (ginkō, banco) · ギター (gitā, guitarra)'],
  ['ぐ', 'グ', 'gu', 'ぐんて (gunte, guante) · グラス (gurasu, vaso)'], ['げ', 'ゲ', 'ge', 'げんき (genki, saludable) · ゲーム (gēmu, juego)'],
  ['ご', 'ゴ', 'go', 'ごはん (gohan, comida) · ゴルフ (gorufu)'], ['ざ', 'ザ', 'za', 'ざっし (zasshi, revista) · ザクロ (zakuro, granada)'],
  ['じ', 'ジ', 'ji', 'じしょ (jisho, diccionario) · ジュース (jūsu, jugo)'], ['ず', 'ズ', 'zu', 'みず (mizu, agua) · ズボン (zubon, pantalón)'],
  ['ぜ', 'ゼ', 'ze', 'ぜんぶ (zenbu, todo) · ゼロ (zero)'], ['ぞ', 'ゾ', 'zo', 'ぞう (zō, elefante) · ゾウ (zō)'],
  ['だ', 'ダ', 'da', 'だれ (dare, quién) · ダンス (dansu, baile)'], ['ぢ', 'ヂ', 'ji', 'ちぢむ (chijimu, encogerse) · ヂ se usa muy poco'],
  ['づ', 'ヅ', 'zu', 'つづく (tsuzuku, continuar) · ヅ se usa muy poco'], ['で', 'デ', 'de', 'でんわ (denwa, teléfono) · デパート (depāto, tienda)'],
  ['ど', 'ド', 'do', 'どこ (doko, dónde) · ドア (doa, puerta)'], ['ば', 'バ', 'ba', 'ばんごう (bangō, número) · バス (basu, autobús)'],
  ['び', 'ビ', 'bi', 'びょういん (byōin, hospital) · ビール (bīru, cerveza)'], ['ぶ', 'ブ', 'bu', 'ぶた (buta, cerdo) · ブラジル (Burajiru, Brasil)'],
  ['べ', 'ベ', 'be', 'べんり (benri, práctico) · ベッド (beddo, cama)'], ['ぼ', 'ボ', 'bo', 'ぼうし (bōshi, sombrero) · ボール (bōru, pelota)'],
  ['ぱ', 'パ', 'pa', 'ぱん (pan, pan) · パン (pan)'], ['ぴ', 'ピ', 'pi', 'ぴかぴか (pikapika, brillante) · ピアノ (piano)'],
  ['ぷ', 'プ', 'pu', 'ぷりぷり (puripuri, enfadado) · プール (pūru, piscina)'], ['ぺ', 'ペ', 'pe', 'ぺらぺら (perapera, con fluidez) · ペン (pen)'],
  ['ぽ', 'ポ', 'po', 'ぽかぽか (pokapoka, tibio) · ポスト (posuto, buzón)'], ['ゔ', 'ヴ', 'vu', 'ゔ se usa raramente · ヴァイオリン (vaiorin, violín)'],
  ['きゃ', 'キャ', 'kya', 'きゃく (kyaku, cliente) · キャベツ (kyabetsu, repollo)'], ['きゅ', 'キュ', 'kyu', 'きゅう (kyū, nueve) · キューバ (Kyūba, Cuba)'],
  ['きょ', 'キョ', 'kyo', 'きょう (kyō, hoy) · キョウト (Kyoto)'], ['しゃ', 'シャ', 'sha', 'しゃしん (shashin, foto) · シャツ (shatsu, camisa)'],
  ['しゅ', 'シュ', 'shu', 'しゅくだい (shukudai, tarea) · シューズ (shūzu, zapatos)'], ['しょ', 'ショ', 'sho', 'しょうゆ (shōyu, salsa de soja) · ショップ (shoppu, tienda)'],
  ['ちゃ', 'チャ', 'cha', 'ちゃ (cha, té) · チャンス (chansu, oportunidad)'], ['ちゅ', 'チュ', 'chu', 'ちゅうごく (Chūgoku, China) · チューブ (chūbu, tubo)'],
  ['ちょ', 'チョ', 'cho', 'ちょっと (chotto, un poco) · チョコ (choko, chocolate)'], ['にゃ', 'ニャ', 'nya', 'にゃんこ (nyanko, gatito) · ニャー (nyā, miau)'],
  ['にゅ', 'ニュ', 'nyu', 'にゅうがく (nyūgaku, ingreso escolar) · ニュース (nyūsu, noticias)'], ['にょ', 'ニョ', 'nyo', 'にょろにょろ (nyoronyoro, serpenteando) · ニョッキ (nyokki, ñoquis)'],
  ['ひゃ', 'ヒャ', 'hya', 'ひゃく (hyaku, cien) · ヒャッホー (hyahhō, exclamación)'], ['ひゅ', 'ヒュ', 'hyu', 'ひゅうひゅう (hyūhyū, silbido) · ヒューストン (Hyūsuton, Houston)'],
  ['ひょ', 'ヒョ', 'hyo', 'ひょう (hyō, leopardo) · ヒョウ (hyō)'], ['みゃ', 'ミャ', 'mya', 'みゃく (myaku, pulso) · ミャンマー (Myanmā)'],
  ['みゅ', 'ミュ', 'myu', 'みゅう (myū, maullido) · ミュージック (myūjikku, música)'], ['みょ', 'ミョ', 'myo', 'みょうじ (myōji, apellido) · ミョウガ (myōga, jengibre japonés)'],
  ['りゃ', 'リャ', 'rya', 'りゃく (ryaku, abreviación) · リャマ (ryama, llama)'], ['りゅ', 'リュ', 'ryu', 'りゅう (ryū, dragón) · リュック (ryukku, mochila)'],
  ['りょ', 'リョ', 'ryo', 'りょうり (ryōri, cocina) · リョウ (Ryō, nombre)'], ['ぎゃ', 'ギャ', 'gya', 'ぎゃく (gyaku, opuesto) · ギャグ (gyagu, chiste)'],
  ['ぎゅ', 'ギュ', 'gyu', 'ぎゅうにゅう (gyūnyū, leche) · ギュッ (gyu, apretar)'], ['ぎょ', 'ギョ', 'gyo', 'ぎょう (gyō, línea) · ギョーザ (gyōza)'],
  ['じゃ', 'ジャ', 'ja', 'じゃま (jama, molestia) · ジャム (jamu, mermelada)'], ['じゅ', 'ジュ', 'ju', 'じゅぎょう (jugyō, clase) · ジュース (jūsu, jugo)'],
  ['じょ', 'ジョ', 'jo', 'じょうず (jōzu, hábil) · ジョギング (jogingu)'], ['びゃ', 'ビャ', 'bya', 'さんびゃく (sanbyaku, trescientos) · ビャ se usa poco'],
  ['びゅ', 'ビュ', 'byu', 'びゅうびゅう (byūbyū, viento fuerte) · ビュッフェ (byuffe, bufé)'], ['びょ', 'ビョ', 'byo', 'びょういん (byōin, hospital) · ビョーク (Byōku, Björk)'],
  ['ぴゃ', 'ピャ', 'pya', 'ぴゃっと (pyatto, rápidamente) · ピャ se usa poco'], ['ぴゅ', 'ピュ', 'pyu', 'ぴゅう (pyū, silbido) · ピュア (pyua, puro)'],
  ['ぴょ', 'ピョ', 'pyo', 'ぴょんぴょん (pyonpyon, saltando) · ピョン (pyon)'],
] as const;

const specialKana: KanaEntry[] = [
  { hiragana: 'っ', katakana: 'ッ', reading: 'consonante doble', example: 'きって (kitte, sello) · ベッド (beddo, cama)' },
  { katakana: 'ー', reading: 'vocal larga', example: 'ケーキ (kēki, torta) · コーヒー (kōhī, café)' },
];

const kanaCharacters: KanaEntry[] = [
  ...basicKana.map(([hiragana, katakana, reading, example]) => ({ hiragana, katakana, reading, example })),
  ...voicedAndCombinedKana.map(([hiragana, katakana, reading, example]) => ({ hiragana, katakana, reading, example })),
  ...specialKana,
];

const uniqueReadings = [...new Set(kanaCharacters.map((entry) => entry.reading))];
const characterQuestions = kanaCharacters.flatMap((entry) => {
  const readingIndex = uniqueReadings.indexOf(entry.reading);
  const distractors = [1, 3, 7].map((offset) => uniqueReadings[(readingIndex + offset) % uniqueReadings.length]);
  const choices = [entry.reading, ...distractors];
  const questions: Question[] = [];
  if (entry.hiragana) questions.push(q('Lectura de hiragana', entry.hiragana, entry.reading, choices, `${entry.hiragana} se lee ${entry.reading}.`, '¿Cómo se lee este hiragana?', entry.reading, 'reveal', entry.example));
  if (entry.katakana) questions.push(q('Lectura de katakana', entry.katakana, entry.reading, choices, `${entry.katakana} se lee ${entry.reading}.`, '¿Cómo se lee este katakana?', entry.reading, 'reveal', entry.example));
  return questions;
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
      q('Escritura', 'ア', 'a', ['a', 'i', 'u', 'e'], 'あ es hiragana y ア es katakana; ambos se leen a.', '¿Cómo se lee?', 'a', 'reveal'),
      q('Escritura', 'シ', 'shi', ['shi', 'tsu', 'so', 'n'], 'シ se lee shi.', '¿Cómo se lee?', 'shi', 'reveal'),
      q('Escritura', 'ツ', 'tsu', ['tsu', 'shi', 'su', 'chi'], 'ツ se lee tsu.', '¿Cómo se lee?', 'tsu', 'reveal'),
      q('Escritura', 'きょうしつ', 'kyōshitsu', ['kyōshitsu', 'kyoshitsu', 'kōshitsu', 'kyōjitsu'], 'きょ forma kyo y う alarga la vocal.', '¿Cómo se lee?', 'kyōshitsu', 'reveal'),
      q('Escritura', 'ざっし', 'zasshi', ['zasshi', 'zatsushi', 'zashi', 'sasshi'], 'La っ pequeña duplica la consonante siguiente.', '¿Cómo se lee?', 'zasshi', 'reveal'),
      q('Escritura', 'ワット', 'watto', ['watto', 'wato', 'wattsu', 'wotto'], 'La ッ pequeña marca consonante doble.', '¿Cómo se lee?', 'watto', 'reveal'),
      q('Escritura', 'しゃ', 'sha', ['sha', 'shiya', 'cha', 'ja'], 'し + ゃ pequeña forman sha.', '¿Cómo se lee?', 'sha', 'reveal'),
      q('Escritura', 'りゅ', 'ryu', ['ryu', 'riyu', 'ru', 'ryo'], 'り + ゅ pequeña forman ryu.', '¿Cómo se lee?', 'ryu', 'reveal'),
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
  {
    id: 'reading', icon: '読', title: 'Lectura de caracteres', level: 'Hiragana y katakana',
    description: 'Reconocé cada carácter y revelá su lectura cuando necesites una pista.',
    questions: characterQuestions,
  },
];

const foundationVariants = [
  ['わたし', '学生', 'がくせい', 'estudiante'],
  ['マリアさん', '会社員', 'かいしゃいん', 'empleado de empresa'],
  ['ワンさん', '銀行員', 'ぎんこういん', 'empleado de banco'],
  ['サントスさん', '医者', 'いしゃ', 'médico'],
].flatMap(([person, profession, professionReading, meaning]) => [
  q('Bases', `${person} ___ ${profession}です。`, 'は', ['は', 'も', 'か', 'の'], 'は marca el tema de la oración.', 'Elegí la partícula correcta.', `${person} ___ ${professionReading}です。`),
  q('Negación', `${person}は ${profession} ___。`, 'じゃありません', ['じゃありません', 'です', 'も', 'か'], 'じゃありません forma la negación cortés.', 'Completá la forma negativa.', `${person}は ${professionReading} ___。`),
  q('Profesiones', meaning, profession, ['学生', '会社員', '銀行員', '医者'], `${profession}（${professionReading}）significa “${meaning}”.`, 'Elegí la palabra japonesa correcta.'),
]);

const objectVariants = [
  ['本', 'ほん'], ['傘', 'かさ'], ['時計', 'とけい'], ['辞書', 'じしょ'],
].flatMap(([noun, nounReading]) => [
  q('Demostrativos', `___ ${noun}は わたしのです。`, 'この', ['この', 'これ', 'ここ', 'どの'], 'この acompaña a un sustantivo cercano.', 'Elegí el demostrativo correcto.', `___ ${nounReading}は わたしのです。`),
  q('Posesión', `この ${noun}は ___ ですか。`, 'だれの', ['だれの', 'どこ', 'いくら', 'いつ'], 'だれの pregunta de quién es algo.', 'Elegí el interrogativo correcto.', `この ${nounReading}は ___ ですか。`),
]);

const routineVariants = [
  ['6', 'ろく'], ['7', 'しち'], ['8', 'はち'], ['9', 'く'], ['10', 'じゅう'], ['11', 'じゅういち'],
].flatMap(([hour, hourReading]) => [
  q('Formas verbales', `毎朝 ${hour}時に ___。`, '起きます', ['起きます', '起きました', '寝ました', '休みます'], '毎朝 indica un hábito y pide la forma ～ます.', 'Elegí la forma verbal correcta.', `まいあさ ${hourReading}じに ___。`),
  q('Partículas de tiempo', `${hour}時 ___ 勉強します。`, 'に', ['に', 'まで', 'へ', 'と'], 'に marca una hora concreta.', 'Elegí la partícula correcta.', `${hourReading}じ ___ べんきょうします。`),
]);

const movementVariants = [
  ['東京', 'とうきょう'], ['京都', 'きょうと'], ['日本', 'にほん'], ['会社', 'かいしゃ'],
].flatMap(([destination, destinationReading]) => [
  q('Movimiento', `${destination} ___ 行きます。`, 'へ', ['へ', 'で', 'と', 'まで'], 'へ marca dirección o destino.', 'Elegí la partícula correcta.', `${destinationReading} ___ いきます。`),
  q('Transporte', `バス ___ ${destination}へ 行きます。`, 'で', ['で', 'へ', 'と', 'に'], 'で indica el medio de transporte.', 'Elegí la partícula correcta.', `バス ___ ${destinationReading}へ いきます。`),
  q('Compañía', `友達 ___ ${destination}へ 行きます。`, 'と', ['と', 'で', 'へ', 'から'], 'と indica con quién se realiza la acción.', 'Elegí la partícula correcta.', `ともだち ___ ${destinationReading}へ いきます。`),
]);

const generatedVariants: Record<string, Question[]> = {
  foundations: foundationVariants,
  objects: objectVariants,
  routines: routineVariants,
  movement: movementVariants,
};

export function buildQuestionPool(moduleId: string) {
  if (moduleId === 'mix') {
    return modules.flatMap((module) => [...module.questions, ...(generatedVariants[module.id] || [])]);
  }
  const module = modules.find((item) => item.id === moduleId);
  return module ? [...module.questions, ...(generatedVariants[moduleId] || [])] : [];
}

export const allTopics = [...new Set(modules.flatMap((module) => module.questions.map((question) => question.topic)))];
