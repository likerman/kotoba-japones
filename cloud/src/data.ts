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
  helpLabel?: string;
  character?: string;
  script?: 'hiragana' | 'katakana';
  group?: string;
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
  '食べます': 'たべます', '飲みます': 'のみます', '見ます': 'みます', '聞きます': 'ききます',
  '読みます': 'よみます', '書きます': 'かきます', '買います': 'かいます', '撮ります': 'とります',
  '会います': 'あいます', '休みましょう': 'やすみましょう', '見ませんか': 'みませんか',
  '食べませんでした': 'たべませんでした', '日本語を 勉強しました': 'にほんごを べんきょうしました',
  '見ました': 'みました', '見ませんでした': 'みませんでした',
  '休みますか': 'やすみますか', '休みません': 'やすみません', '休みました': 'やすみました',
  '会いましょう': 'あいましょう', '会いますか': 'あいますか', '会いません': 'あいません', '会いました': 'あいました',
  '駅へ 行きます': 'えきへ いきます', '友達と 来ました': 'ともだちと きました', '7時に 起きます': 'しちじに おきます',
  '4時5分です': 'よじ ごふんです', '4月5日です': 'しがつ いつかです', '5時間です': 'ごじかんです', '金曜日です': 'きんようびです',
  '土曜日と 日曜日です': 'どようびと にちようびです', '9時からです': 'くじからです', '毎朝です': 'まいあさです',
  '働きません': 'はたらきません', '働きました': 'はたらきました', '働きませんでした': 'はたらきませんでした',
  '勉強しました': 'べんきょうしました', '勉強します': 'べんきょうします', '勉強しません': 'べんきょうしません', '勉強しませんでした': 'べんきょうしませんでした',
  '歩いて': 'あるいて', '電車で': 'でんしゃで', '家族と': 'かぞくと', '何で': 'なんで',
};

export const kanaReadingFor = (text: string) => kanaReadings[text] || '';

const q = (topic: string, display: string, answer: string, choices: string[], note: string, prompt = 'Elegí la opción correcta.', reading?: string, readingDisplay: 'always' | 'reveal' = 'always', example?: string, helpLabel?: string): Question => ({
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
  helpLabel,
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

const deferredKana = new Set(['ぢ', 'づ', 'ゔ', 'びゃ', 'ぴゃ']);
const deferredKatakana = new Set(['ヲ', 'ヒャ', 'ミャ', 'ミョ', 'リャ', 'リョ', 'ビョ']);

const kanaCharacters: KanaEntry[] = [
  ...basicKana.map(([hiragana, katakana, reading, example]) => ({
    hiragana,
    katakana: deferredKatakana.has(katakana) ? undefined : katakana,
    reading,
    example,
  })),
  ...voicedAndCombinedKana
    .filter(([hiragana]) => !deferredKana.has(hiragana))
    .map(([hiragana, katakana, reading, example]) => ({
      hiragana,
      katakana: deferredKatakana.has(katakana) ? undefined : katakana,
      reading,
      example,
    })),
];

const extraExamples: Record<string, string> = {
  あ: 'あさ (asa, mañana)', す: 'すき (suki, gustar)', そ: 'そと (soto, afuera)', ふ: 'ふゆ (fuyu, invierno)', へ: 'へた (heta, poco hábil)', ほ: 'ほし (hoshi, estrella)', よ: 'よむ (yomu, leer)', を: 'ほんをよむ (hon o yomu, leer un libro)',
  ぐ: 'ぐあい (guai, estado)', げ: 'げんかん (genkan, entrada)', ざ: 'ざせき (zaseki, asiento)', ぜ: 'ぜひ (zehi, sin falta)', ぞ: 'ぞうきん (zōkin, trapo)', で: 'でぐち (deguchi, salida)', ば: 'ばしょ (basho, lugar)', べ: 'べんとう (bentō, vianda)', ぼ: 'ぼたん (botan, botón)', ぱ: 'ぱちぱち (pachipachi, aplausos)', ぷ: 'ぷかぷか (pukapuka, flotando)', ぺ: 'ぺこぺこ (pekopeko, con hambre)', ぽ: 'ぽんぽん (ponpon, suavemente)',
  きゃ: 'きゃくしつ (kyakushitsu, habitación de huéspedes)', きゅ: 'きゅうけい (kyūkei, descanso)', きょ: 'きょねん (kyonen, año pasado)', しゃ: 'しゃかい (shakai, sociedad)', しゅ: 'しゅみ (shumi, pasatiempo)', ちゅ: 'ちゅうい (chūi, atención)', ちょ: 'ちょうど (chōdo, justo)', にゃ: 'にゃんにゃん (nyannyan, miau)', にょ: 'にょきにょき (nyokinyoki, brotando)',
  ひゃ: 'ひゃくえん (hyakuen, cien yenes)', ひゅ: 'ひゅっと (hyutto, rápidamente)', ひょ: 'ひょうか (hyōka, evaluación)', みゃ: 'みゃくはく (myakuhaku, pulso)', みゅ: 'みゅうみゅう (myūmyū, maullido)', みょ: 'みょうにち (myōnichi, mañana)', りゃ: 'りゃくご (ryakugo, abreviatura)', りゅ: 'りゅうがく (ryūgaku, estudiar en el extranjero)', りょ: 'りょこう (ryokō, viaje)',
  ぎゃ: 'ぎゃくてん (gyakuten, remontada)', ぎゅ: 'ぎゅうどん (gyūdon, arroz con carne)', じゃ: 'じゃぐち (jaguchi, canilla)', じゅ: 'じゅうしょ (jūsho, dirección)', じょ: 'じょせい (josei, mujer)', びゅ: 'びゅっと (byutto, rápidamente)', びょ: 'びょうき (byōki, enfermedad)', ぴゅ: 'ぴゅっと (pyutto, de golpe)', ぴょ: 'ぴょこぴょこ (pyokopyoko, dando saltitos)',
  エ: 'エアコン (eakon, aire acondicionado)', カ: 'カレー (karē, curry)', ケ: 'ケチャップ (kechappu, kétchup)', サ: 'サンドイッチ (sandoicchi, sándwich)', セ: 'センター (sentā, centro)', ソ: 'ソース (sōsu, salsa)', ナ: 'ナンバー (nanbā, número)', ヌ: 'カヌー (kanū, canoa)', ネ: 'ネット (netto, internet)', ハ: 'ハム (hamu, jamón)', ヘ: 'ヘルメット (herumetto, casco)', ヤ: 'タイヤ (taiya, neumático)', ユ: 'ユーモア (yūmoa, humor)', ヨ: 'ヨガ (yoga)', ワ: 'シャワー (shawā, ducha)',
  ゲ: 'ゲスト (gesuto, invitado)', ゴ: 'ゴール (gōru, meta)', ゼ: 'ゼリー (zerī, gelatina)', ゾ: 'ゾンビ (zonbi, zombi)', パ: 'パーティー (pātī, fiesta)', ペ: 'ページ (pēji, página)', ポ: 'ポケット (poketto, bolsillo)',
  キャ: 'キャンプ (kyanpu, campamento)', キュ: 'キュート (kyūto, adorable)', キョ: 'キョロキョロ (kyorokyoro, mirar alrededor)', シャ: 'シャワー (shawā, ducha)', シュ: 'シュート (shūto, tiro)', ショ: 'ショー (shō, espectáculo)', チャ: 'チャレンジ (charenji, desafío)', チュ: 'チューリップ (chūrippu, tulipán)', チョ: 'チョコレート (chokorēto, chocolate)',
  ニャ: 'ニャンコ (nyanko, gatito)', ニョ: 'ニョロニョロ (nyoronyoro, serpenteando)', ヒャ: 'ヒャッホー (hyahhō, exclamación)', ヒュ: 'ヒューマン (hyūman, humano)', ヒョ: 'ヒョロヒョロ (hyorohyoro, delgado y débil)', ミャ: 'ミャンマー (Myanmā, Myanmar)', ミュ: 'ミュージカル (myūjikaru, musical)', ミョ: 'ミョウガ (myōga, jengibre japonés)',
  リャ: 'リャマ (ryama, llama)', リュ: 'リュックサック (ryukkusakku, mochila)', リョ: 'リョウ (Ryō, nombre)', ギャ: 'ギャラリー (gyararī, galería)', ギュ: 'ギュウギュウ (gyūgyū, muy apretado)', ギョ: 'ギョッ (gyo, sobresalto)', ジャ: 'ジャケット (jaketto, chaqueta)', ジュ: 'ジュエリー (juerī, joyería)', ジョ: 'ジョーク (jōku, chiste)', ビュ: 'ビューラー (byūrā, rizador de pestañas)', ビョ: 'ビョーク (Byōku, Björk)', ピュ: 'ピューレ (pyūre, puré)', ピョ: 'ピョコピョコ (pyokopyoko, dando saltitos)',
};

const japaneseWord = (example: string) => example.split(' (')[0].trim();

// Vocabulario adicional de uso cotidiano. Se conserva el silabario natural de cada
// palabra y se usa para que un mismo carácter no muestre siempre la misma pareja.
const everydayExamples: Record<'hiragana' | 'katakana', string[]> = {
  hiragana: [
    'あさごはん (asagohan, desayuno)', 'いっしょ (issho, juntos)', 'うち (uchi, casa)', 'えいが (eiga, película)', 'おかし (okashi, dulce)',
    'かいしゃ (kaisha, empresa)', 'きっぷ (kippu, boleto)', 'くに (kuni, país)', 'けいたい (keitai, celular)', 'ここ (koko, aquí)',
    'さくら (sakura, cerezo)', 'しごと (shigoto, trabajo)', 'すいようび (suiyōbi, miércoles)', 'せんせい (sensei, profesor)', 'そこ (soko, allí)',
    'たべもの (tabemono, comida)', 'ちかてつ (chikatetsu, subte)', 'つくえ (tsukue, escritorio)', 'てがみ (tegami, carta)', 'ともだち (tomodachi, amigo)',
    'なまえ (namae, nombre)', 'にほん (nihon, Japón)', 'ぬいぐるみ (nuigurumi, peluche)', 'ねます (nemasu, dormir)', 'のみもの (nomimono, bebida)',
    'はたらきます (hatarakimasu, trabajar)', 'ひるやすみ (hiruyasumi, descanso del mediodía)', 'ふたり (futari, dos personas)', 'へいじつ (heijitsu, día hábil)', 'ほうじちゃ (hōjicha, té tostado)',
    'まいにち (mainichi, todos los días)', 'みせ (mise, tienda)', 'むいか (muika, día seis)', 'めいし (meishi, tarjeta personal)', 'もくようび (mokuyōbi, jueves)',
    'やさい (yasai, verdura)', 'ゆうびんきょく (yūbinkyoku, correo)', 'よみます (yomimasu, leer)', 'らいしゅう (raishū, semana próxima)', 'りょうり (ryōri, cocina)',
    'るす (rusu, ausencia)', 'れいぞうこ (reizōko, heladera)', 'ろくじ (rokuji, las seis)', 'わたし (watashi, yo)', 'でんしゃ (densha, tren)',
    'きゃくさま (kyakusama, cliente)', 'きゅうじつ (kyūjitsu, feriado)', 'きょうしつ (kyōshitsu, aula)', 'しゃしん (shashin, foto)', 'しゅくだい (shukudai, tarea)',
    'しょうゆ (shōyu, salsa de soja)', 'ちゃわん (chawan, cuenco)', 'ちゅうごく (Chūgoku, China)', 'ちょうしょく (chōshoku, desayuno)', 'にゅうがく (nyūgaku, ingreso escolar)',
    'ひゃく (hyaku, cien)', 'ひょう (hyō, leopardo)', 'みょうじ (myōji, apellido)', 'りゅうがくせい (ryūgakusei, estudiante extranjero)', 'りょこう (ryokō, viaje)',
    'ぎゅうにゅう (gyūnyū, leche)', 'じゅぎょう (jugyō, clase)', 'じょうず (jōzu, hábil)', 'びょういん (byōin, hospital)', 'ぴょんぴょん (pyonpyon, saltando)',
  ],
  katakana: [
    'アイスクリーム (aisukurīmu, helado)', 'エレベーター (erebētā, ascensor)', 'オレンジジュース (orenjijūsu, jugo de naranja)', 'カレンダー (karendā, calendario)', 'ケータイ (kētai, celular)',
    'サッカー (sakkā, fútbol)', 'セーター (sētā, suéter)', 'ソフト (sofuto, programa)', 'テレビ (terebi, televisión)', 'ホテル (hoteru, hotel)',
    'ネット (netto, internet)', 'ハンバーガー (hanbāgā, hamburguesa)', 'ヘッドホン (heddohon, auriculares)', 'メロン (meron, melón)', 'ヨーグルト (yōguruto, yogur)',
    'キャラクター (kyarakutā, personaje)', 'キュウリ (kyūri, pepino)', 'シャワー (shawā, ducha)', 'シャンプー (shanpū, champú)', 'ティッシュ (tisshu, pañuelo de papel)',
    'ショッピング (shoppingu, compras)', 'チャーハン (chāhan, arroz frito)', 'チューブ (chūbu, tubo)', 'チョーク (chōku, tiza)', 'ニューヨーク (Nyūyōku, Nueva York)',
    'メニュー (menyū, menú)', 'ヒューマン (hyūman, humano)', 'ヒューズ (hyūzu, fusible)', 'ミュージアム (myūjiamu, museo)', 'ミュージカル (myūjikaru, musical)',
    'ギャップ (gyappu, brecha)', 'ギャラリー (gyararī, galería)', 'レギュラー (regyurā, regular)', 'ジャズ (jazu, jazz)', 'ジャケット (jaketto, chaqueta)',
    'ジュニア (junia, juvenil)', 'ジュエリー (juerī, joyería)', 'ジョブ (jobu, trabajo)', 'ジョーク (jōku, chiste)', 'デビュー (debyū, debut)',
    'コンピューター (konpyūtā, computadora)', 'ピューレ (pyūre, puré)', 'ピョンピョン (pyonpyon, saltando)', 'ロボット (robotto, robot)', 'スーパー (sūpā, supermercado)',
  ],
};

const exampleFor = (entry: KanaEntry, script: 'hiragana' | 'katakana', character: string) => {
  const exampleIndex = script === 'hiragana' ? 0 : 1;
  const primary = entry.example.split(' · ')[exampleIndex];
  const alternative = kanaCharacters
    .map((candidate) => candidate.example.split(' · ')[exampleIndex])
    .find((candidate) => candidate && japaneseWord(candidate) !== japaneseWord(primary) && japaneseWord(candidate).includes(character));
  const everyday = everydayExamples[script].filter((example) => japaneseWord(example).includes(character));
  const examples = [primary, alternative, extraExamples[character], ...everyday].filter((example): example is string => Boolean(example));
  return examples.filter((example, index) => examples.findIndex((item) => japaneseWord(item) === japaneseWord(example)) === index).join('|||');
};

const uniqueReadings = [...new Set(kanaCharacters.map((entry) => entry.reading))];
const voicedCharacters = new Set('がぎぐげござじずぜぞだでどばびぶべぼぱぴぷぺぽガギグゲゴザジズゼゾダデドバビブベボパピプペポ'.split(''));
const rowLabels: Record<string, string> = { k: 'Fila K', s: 'Fila S', t: 'Fila T', n: 'Fila N', h: 'Fila H', m: 'Fila M', y: 'Fila Y', r: 'Fila R', w: 'Fila W', g: 'Sonoros', z: 'Sonoros', j: 'Sonoros', d: 'Sonoros', b: 'Sonoros', p: 'Sonoros' };
const groupFor = (character: string, reading: string) => {
  if (character.length > 1) return 'Combinados';
  if (voicedCharacters.has(character)) return 'Sonoros';
  if (['a', 'i', 'u', 'e', 'o'].includes(reading)) return 'Vocales';
  if (reading === 'n') return 'N final';
  return rowLabels[reading[0]] || 'Especiales';
};

const characterQuestions = kanaCharacters.flatMap((entry) => {
  const readingIndex = uniqueReadings.indexOf(entry.reading);
  const distractors = [1, 3, 7].map((offset) => uniqueReadings[(readingIndex + offset) % uniqueReadings.length]);
  const choices = [entry.reading, ...distractors];
  const questions: Question[] = [];
  if (entry.hiragana) questions.push({ ...q('Lectura de hiragana', entry.hiragana, entry.reading, choices, `${entry.hiragana} se lee ${entry.reading}.`, '¿Cómo se lee este hiragana?', entry.reading, 'reveal', exampleFor(entry, 'hiragana', entry.hiragana)), character: entry.hiragana, script: 'hiragana', group: groupFor(entry.hiragana, entry.reading) });
  if (entry.katakana) questions.push({ ...q('Lectura de katakana', entry.katakana, entry.reading, choices, `${entry.katakana} se lee ${entry.reading}.`, '¿Cómo se lee este katakana?', entry.reading, 'reveal', exampleFor(entry, 'katakana', entry.katakana)), character: entry.katakana, script: 'katakana', group: groupFor(entry.katakana, entry.reading) });
  return questions;
}).concat([
  q('Signo especial de hiragana', 'っ　⇄　つ', 'duplica la consonante siguiente', ['duplica la consonante siguiente', 'alarga la vocal anterior', 'representa el sonido n', 'marca el objeto directo'], 'っ es una “tsu” pequeña. No se pronuncia sola: indica que la consonante que sigue se duplica.', '¿Qué función cumple el primer signo, っ pequeño?', 'tsu pequeña → consonante doble', 'reveal', 'きって (kitte, sello)|||ざっし (zasshi, revista)|||きっぷ (kippu, boleto)|||ちょっと (chotto, un poco)', 'función'),
  q('Signo especial de katakana', 'ッ　⇄　ツ', 'duplica la consonante siguiente', ['duplica la consonante siguiente', 'alarga la vocal anterior', 'representa el sonido n', 'marca el objeto directo'], 'ッ es una “tsu” pequeña. No se pronuncia sola: indica que la consonante que sigue se duplica.', '¿Qué función cumple el primer signo, ッ pequeño?', 'tsu pequeña → consonante doble', 'reveal', 'ベッド (beddo, cama)|||ワット (watto, watt)|||ロボット (robotto, robot)|||サッカー (sakkā, fútbol)', 'función'),
  q('Signo especial de katakana', 'ー', 'alarga la vocal anterior', ['alarga la vocal anterior', 'duplica la consonante siguiente', 'representa el sonido n', 'marca el objeto directo'], 'ー es la marca de vocal larga: extiende el sonido de la vocal anterior en palabras escritas en katakana.', '¿Qué función cumple esta marca en katakana?', 'marca de vocal larga', 'reveal', 'ケーキ (kēki, torta)|||コーヒー (kōhī, café)|||スーパー (sūpā, supermercado)|||タクシー (takushī, taxi)', 'función'),
]);

const similarCharacterSets = [
  ['し', 'つ'], ['さ', 'き'], ['ぬ', 'め', 'ね'], ['れ', 'わ'], ['は', 'ほ'],
  ['シ', 'ツ'], ['ソ', 'ン'], ['ク', 'ケ', 'タ'], ['ヌ', 'ス'], ['ワ', 'ウ', 'フ'],
];

const characterQuestionByDisplay = new Map(characterQuestions.filter((question) => question.character).map((question) => [question.display, question]));
export const similarCharacterQuestions = similarCharacterSets.flatMap((set) => set.map((character) => {
  const question = characterQuestionByDisplay.get(character);
  if (!question) return null;
  const similarReadings = set.map((item) => characterQuestionByDisplay.get(item)?.answer).filter((reading): reading is string => Boolean(reading));
  const fillers = uniqueReadings.filter((reading) => !similarReadings.includes(reading)).slice(0, Math.max(0, 4 - similarReadings.length));
  return { ...question, topic: 'Caracteres parecidos', kind: 'Caracteres parecidos', choices: [...similarReadings, ...fillers] };
})).filter((question): question is Question => Boolean(question));

export const characterPracticeQuestions = characterQuestions.filter((question) => question.character);
export const characterGroups = [...new Set(characterPracticeQuestions.map((question) => question.group).filter((group): group is string => Boolean(group)))];

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
      q('Afiliación con の', 'ワットさんは IMC ___ 研究者です。', 'の', ['の', 'も', 'は', 'か'], 'の conecta una institución con la profesión: “investigador de IMC”.', 'Elegí la partícula correcta.', 'ワットさんは IMC ___ けんきゅうしゃです。'),
      q('Tema con は', 'ミラーさんは アメリカ人です。サントスさん ___ ブラジル人です。', 'は', ['は', 'も', 'の', 'か'], 'Usamos は para presentar un nuevo tema; も significaría “también”.', 'Elegí la partícula correcta.', 'ミラーさんは アメリカじんです。サントスさん ___ ブラジルじんです。'),
      q('Interrogativos', 'あの 方は ___ ですか。', 'どなた', ['どなた', 'どこ', 'いくら', '何歳'], 'どなた es la forma cortés de だれ: “¿quién?”.', 'Elegí el interrogativo correcto.', 'あの かたは ___ ですか。'),
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
      q('Demostrativos', '___ は かさです。（cerca de la otra persona）', 'それ', ['それ', 'これ', 'あれ', 'この'], 'それ señala algo cercano a la persona con quien hablamos.', 'Elegí el demostrativo correcto.'),
      q('Demostrativos', '___ は かぎです。（lejos de ambos）', 'あれ', ['あれ', 'それ', 'これ', 'あの'], 'あれ señala algo alejado de ambas personas.', 'Elegí el demostrativo correcto.'),
      q('Demostrativos con sustantivo', '___ ノートは わたしのです。（cerca de la otra persona）', 'その', ['その', 'この', 'あの', 'それ'], 'その acompaña a un sustantivo cercano al interlocutor.', 'Elegí el demostrativo correcto.'),
      q('Demostrativos con sustantivo', '___ かばんは サントスさんのです。（lejos de ambos）', 'あの', ['あの', 'その', 'この', 'あれ'], 'あの acompaña a un sustantivo alejado de ambas personas.', 'Elegí el demostrativo correcto.'),
      q('Alternativas con か', 'これは ボールペンですか、シャープペンシルですか。', 'ボールペンです', ['ボールペンです', 'はい、そうです', 'いいえ、ちがいます', 'だれのです'], 'Entre dos alternativas se responde eligiendo una, sin はい ni いいえ.', 'Elegí la respuesta adecuada.'),
      q('Contenido con の', 'これは コンピューター ___ 本です。', 'の', ['の', 'は', 'も', 'か'], 'N1 の N2 también puede indicar el tema o contenido: “un libro de computación”.', 'Elegí la partícula correcta.', 'これは コンピューター ___ ほんです。'),
      q('Confirmación', 'これは かぎですか。— はい、___。', 'そうです', ['そうです', 'そうじゃありません', 'どれです', 'だれのです'], 'そうです confirma lo que acaba de preguntar la otra persona.', 'Completá la respuesta.'),
      q('Lugares', '食堂は ___ です。（allí, lejos de ambos）', 'あそこ', ['あそこ', 'そこ', 'ここ', 'どこ'], 'あそこ indica un lugar alejado de ambas personas.', 'Elegí el lugar correcto.', 'しょくどうは ___ です。'),
      q('Lugares', '受付は ___ ですか。', 'どこ', ['どこ', 'だれ', 'いつ', 'いくら'], 'どこ pregunta dónde se encuentra un lugar.', 'Elegí el interrogativo correcto.', 'うけつけは ___ ですか。'),
      q('Lugares corteses', 'エレベーターは ___ です。', 'そちら', ['そちら', 'こちら', 'あちら', 'どちら'], 'そちら es la forma cortés de そこ.', 'Elegí la opción correcta.'),
      q('Procedencia', 'これは ___ ワインですか。', 'どこの', ['どこの', 'だれの', 'どちら', 'いくら'], 'どこの + sustantivo pregunta de qué país, empresa o lugar es algo.', 'Elegí el interrogativo correcto.'),
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
      q('Hora', '今 何時ですか。', '4時5分です', ['4時5分です', '4月5日です', '5時間です', '金曜日です'], '時 indica la hora y 分 los minutos.', 'Elegí la respuesta adecuada.', 'いま なんじですか。'),
      q('Días de la semana', '休みは 何曜日ですか。', '土曜日と 日曜日です', ['土曜日と 日曜日です', '9時からです', '毎朝です', 'きのうです'], '何曜日（なんようび）pregunta qué día de la semana.', 'Elegí la respuesta adecuada.', 'やすみは なんようびですか。'),
      q('Forma no pasada negativa', '土曜日は ___。', '働きません', ['働きません', '働きました', '働きます', '働きませんでした'], '～ません es la forma cortés negativa no pasada.', 'Elegí la forma verbal correcta.', 'どようびは ___。'),
      q('Forma pasada afirmativa', 'きのう 日本語を ___。', '勉強しました', ['勉強しました', '勉強します', '勉強しません', '勉強しませんでした'], '～ました expresa una acción afirmativa pasada.', 'Elegí la forma verbal correcta.', 'きのう にほんごを ___。'),
      q('Forma pasada negativa', 'おととい 日本語を ___。', '勉強しませんでした', ['勉強しませんでした', '勉強しました', '勉強しません', '勉強します'], '～ませんでした expresa una acción negativa pasada.', 'Elegí la forma verbal correcta.', 'おととい にほんごを ___。'),
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
      q('Origen', 'アルゼンチン ___ 日本へ 来ました。', 'から', ['から', 'まで', 'へ', 'で'], 'から marca el punto de origen: “desde Argentina”.', 'Elegí la partícula correcta.', 'アルゼンチン ___ にほんへ きました。'),
      q('Sin compañía', '___ 東京へ 行きます。', 'ひとりで', ['ひとりで', '家族と', '何で', 'どこへも'], 'ひとりで significa “solo/a”, sin compañía.', 'Elegí la expresión correcta.', '___ とうきょうへ いきます。'),
      q('A pie', '駅まで ___ 行きます。', '歩いて', ['歩いて', '電車で', '友達と', '来週'], 'Para ir a pie se usa 歩いて, sin la partícula で.', 'Elegí la opción correcta.', 'えきまで ___ いきます。'),
      q('Interrogativos', '___ 日本へ 来ましたか。', 'いつ', ['いつ', 'どこ', 'だれ', '何で'], 'いつ pregunta cuándo ocurrió una acción.', 'Elegí el interrogativo correcto.', '___ にほんへ きましたか。'),
      q('Fechas', '誕生日は ___ ですか。', 'いつ', ['いつ', 'どこ', '何歳', 'だれ'], 'いつ también sirve para preguntar una fecha.', 'Elegí el interrogativo correcto.', 'たんじょうびは ___ ですか。'),
      q('Trayecto', '東京 ___ 京都まで 新幹線で 行きます。', 'から', ['から', 'へ', 'と', 'に'], 'から y まで marcan el comienzo y el final del trayecto.', 'Elegí la partícula correcta.', 'とうきょう ___ きょうとまで しんかんせんで いきます。'),
    ],
  },
  {
    id: 'actions', icon: '食', title: 'Acciones e invitaciones', level: 'Lección 6',
    description: 'Objeto con を, lugar de la acción con で, invitaciones y propuestas.',
    questions: [
      q('Objeto directo', 'パン ___ 食べます。', 'を', ['を', 'で', 'へ', 'と'], 'を marca aquello sobre lo que recae la acción.', 'Elegí la partícula correcta.', 'パン ___ たべます。'),
      q('Lugar de la acción', 'レストラン ___ ごはんを 食べます。', 'で', ['で', 'を', 'へ', 'に'], 'で marca el lugar donde se realiza una acción.', 'Elegí la partícula correcta.', 'レストラン ___ ごはんを たべます。'),
      q('Objeto directo', '毎朝 何 ___ 飲みますか。', 'を', ['を', 'で', 'と', 'に'], '何を pregunta qué cosa recibe la acción.', 'Elegí la partícula correcta.', 'まいあさ なに ___ のみますか。'),
      q('Negación total', 'きのう 何も ___。', '食べませんでした', ['食べませんでした', '食べます', '飲みます', '見ます'], '何も + verbo negativo significa “nada”.', 'Completá la respuesta.', 'きのう なにも ___。'),
      q('Acciones', '日曜日 何を しましたか。', '日本語を 勉強しました', ['日本語を 勉強しました', '駅へ 行きます', '友達と 来ました', '7時に 起きます'], 'Para contar una actividad usamos el objeto con を y luego el verbo.', 'Elegí una respuesta posible.', 'にちようび なにを しましたか。'),
      q('Invitaciones', 'いっしょに 映画を ___。', '見ませんか', ['見ませんか', '見ます', '見ました', '見ませんでした'], '～ませんか convierte la forma negativa cortés en una invitación amable.', 'Completá la invitación.', 'いっしょに えいがを ___。'),
      q('Propuestas', 'ちょっと ___。', '休みましょう', ['休みましょう', '休みますか', '休みません', '休みました'], '～ましょう propone hacer algo juntos: “descansemos”.', 'Completá la propuesta.', 'ちょっと ___。'),
      q('Propuestas', 'あした 10時に 駅で ___。', '会いましょう', ['会いましょう', '会いますか', '会いません', '会いました'], '会いましょう significa “encontrémonos”.', 'Completá la propuesta.', 'あした じゅうじに えきで ___。'),
      q('Vocabulario', '食べます', 'comer', ['comer', 'beber', 'leer', 'comprar'], '食べます（たべます）· tabemasu · comer.', '¿Qué significa este verbo?', 'たべます'),
      q('Vocabulario', '飲みます', 'beber', ['beber', 'comer', 'escuchar', 'escribir'], '飲みます（のみます）· nomimasu · beber.', '¿Qué significa este verbo?', 'のみます'),
      q('Vocabulario', '読みます', 'leer', ['leer', 'mirar', 'escribir', 'comprar'], '読みます（よみます）· yomimasu · leer.', '¿Qué significa este verbo?', 'よみます'),
      q('Vocabulario', '買います', 'comprar', ['comprar', 'sacar una foto', 'encontrarse', 'escuchar'], '買います（かいます）· kaimasu · comprar.', '¿Qué significa este verbo?', 'かいます'),
    ],
  },
  {
    id: 'reading', icon: '読', title: 'Lectura de caracteres', level: 'Hiragana y katakana',
    description: 'Practicá primero los caracteres de uso frecuente y revelá su lectura cuando necesites una pista.',
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

const actionVariants = [
  ['くだもの', 'comer fruta'], ['にく', 'comer carne'], ['やさい', 'comer verduras'], ['パン', 'comer pan'],
].map(([food, meaning]) => q('Objeto directo', `${food} ___ 食べます。`, 'を', ['を', 'で', 'へ', 'と'], `を marca el objeto: “${meaning}”.`, 'Elegí la partícula correcta.', `${food} ___ たべます。`));

const invitationVariants = [
  ['テニスを しませんか。', 'テニスを しませんか。', '¿Jugamos al tenis?'],
  ['いっしょに ごはんを 食べませんか。', 'いっしょに ごはんを たべませんか。', '¿Comemos juntos?'],
  ['映画を 見ませんか。', 'えいがを みませんか。', '¿Vemos una película?'],
  ['ちょっと 休みましょう。', 'ちょっと やすみましょう。', 'Descansemos un poco.'],
].map(([display, reading, meaning]) => q('Invitaciones', display, meaning, [meaning, '¿Dónde está?', '¿Cuánto cuesta?', 'No hice nada.'], '～ませんか invita; ～ましょう propone hacer algo juntos.', 'Elegí el significado correcto.', reading));

const generatedVariants: Record<string, Question[]> = {
  foundations: foundationVariants,
  objects: objectVariants,
  routines: routineVariants,
  movement: movementVariants,
  actions: [...actionVariants, ...invitationVariants],
};

export function buildQuestionPool(moduleId: string) {
  if (moduleId === 'mix') {
    return modules.flatMap((module) => [...module.questions, ...(generatedVariants[module.id] || [])]);
  }
  const module = modules.find((item) => item.id === moduleId);
  return module ? [...module.questions, ...(generatedVariants[moduleId] || [])] : [];
}

export const allTopics = [...new Set(modules.flatMap((module) => module.questions.map((question) => question.topic)))];
