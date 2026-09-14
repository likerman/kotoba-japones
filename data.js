// Contenido curado a partir del manual. Agregar entradas acá amplía automáticamente la práctica.
window.KOTOBA_CONTENT = {
  kana: [
    ['あ','ア','a'],['い','イ','i'],['う','ウ','u'],['え','エ','e'],['お','オ','o'],
    ['か','カ','ka'],['き','キ','ki'],['く','ク','ku'],['け','ケ','ke'],['こ','コ','ko'],
    ['さ','サ','sa'],['し','シ','shi'],['す','ス','su'],['せ','セ','se'],['そ','ソ','so'],
    ['た','タ','ta'],['ち','チ','chi'],['つ','ツ','tsu'],['て','テ','te'],['と','ト','to'],
    ['な','ナ','na'],['に','ニ','ni'],['ぬ','ヌ','nu'],['ね','ネ','ne'],['の','ノ','no'],
    ['は','ハ','ha'],['ひ','ヒ','hi'],['ふ','フ','fu'],['へ','ヘ','he'],['ほ','ホ','ho'],
    ['ま','マ','ma'],['み','ミ','mi'],['む','ム','mu'],['め','メ','me'],['も','モ','mo'],
    ['や','ヤ','ya'],['ゆ','ユ','yu'],['よ','ヨ','yo'],['ら','ラ','ra'],['り','リ','ri'],
    ['る','ル','ru'],['れ','レ','re'],['ろ','ロ','ro'],['わ','ワ','wa'],['を','ヲ','wo'],['ん','ン','n']
  ],
  combinations: [
    ['きゃ','kya'],['きゅ','kyu'],['きょ','kyo'],['しゃ','sha'],['しゅ','shu'],['しょ','sho'],
    ['ちゃ','cha'],['ちゅ','chu'],['ちょ','cho'],['にゃ','nya'],['ひょ','hyo'],['りゅ','ryu'],
    ['ざっし','zasshi'],['がっこう','gakkō'],['ワット','watto'],['きょうしつ','kyōshitsu']
  ],
  vocabulary: [
    ['本','ほん','hon','libro','Objetos'],['辞書','じしょ','jisho','diccionario','Objetos'],['鍵','かぎ','kagi','llave','Objetos'],
    ['傘','かさ','kasa','paraguas','Objetos'],['時計','とけい','tokei','reloj','Objetos'],['椅子','いす','isu','silla','Objetos'],
    ['カメラ','カメラ','kamera','cámara','Objetos'],['新聞','しんぶん','shinbun','periódico','Objetos'],['電話','でんわ','denwa','teléfono','Objetos'],
    ['教室','きょうしつ','kyōshitsu','aula','Lugares'],['会社','かいしゃ','kaisha','empresa','Lugares'],['学校','がっこう','gakkō','escuela','Lugares'],
    ['食堂','しょくどう','shokudō','comedor','Lugares'],['病院','びょういん','byōin','hospital','Lugares'],['受付','うけつけ','uketsuke','recepción','Lugares'],
    ['パン','パン','pan','pan','Alimentos'],['お茶','おちゃ','ocha','té verde','Alimentos'],['コーヒー','コーヒー','kōhī','café','Alimentos'],
    ['日本','にほん','Nihon','Japón','Países'],['ドイツ','ドイツ','Doitsu','Alemania','Países'],['フランス','フランス','Furansu','Francia','Países'],
    ['起きます','おきます','okimasu','levantarse','Verbos'],['寝ます','ねます','nemasu','dormir','Verbos'],['働きます','はたらきます','hatarakimasu','trabajar','Verbos'],
    ['勉強します','べんきょうします','benkyō shimasu','estudiar','Verbos'],['読みます','よみます','yomimasu','leer','Verbos'],
    ['終わります','おわります','owarimasu','terminar','Verbos'],['行きます','いきます','ikimasu','ir','Verbos'],['来ます','きます','kimasu','venir','Verbos'],
    ['帰ります','かえります','kaerimasu','volver','Verbos'],['デパート','デパート','depāto','grandes almacenes','Lugares'],['銀行','ぎんこう','ginkō','banco','Lugares'],
    ['郵便局','ゆうびんきょく','yūbinkyoku','oficina de correos','Lugares'],['図書館','としょかん','toshokan','biblioteca','Lugares'],['美術館','びじゅつかん','bijutsukan','museo de arte','Lugares'],
    ['会議','かいぎ','kaigi','reunión','Actividades'],['試験','しけん','shiken','examen','Actividades'],['映画','えいが','eiga','película o cine','Actividades'],
    ['電話番号','でんわばんごう','denwa bangō','número de teléfono','Comunicación'],['何番','なんばん','nanban','qué número','Interrogativos'],
    ['あさって','あさって','asatte','pasado mañana','Tiempo'],['おととい','おととい','ototoi','anteayer','Tiempo'],['けさ','けさ','kesa','esta mañana','Tiempo'],
    ['家族','かぞく','kazoku','familia','Personas'],['タクシー','タクシー','takushī','taxi','Transporte'],['新幹線','しんかんせん','shinkansen','tren bala','Transporte'],
    ['いつ','いつ','itsu','cuándo','Interrogativos'],['誕生日','たんじょうび','tanjōbi','cumpleaños','Tiempo'],['奈良','なら','Nara','Nara','Ciudades']
  ],
  grammar: [
    {q:'これ ___ 本です。', a:'は', choices:['は','か','の','を'], note:'は marca el tema: “Esto es un libro”.'},
    {q:'あなたは 日本人です ___。', a:'か', choices:['か','は','の','を'], note:'か al final convierte la oración en pregunta.'},
    {q:'この かぎは ___ のですか。', a:'だれ', choices:['だれ','何歳','どこ','いくら'], note:'だれの pregunta de quién es algo.'},
    {q:'受付は ___ ですか。', a:'どこ', choices:['どこ','これ','何歳','だれ'], note:'どこ pregunta por un lugar.'},
    {q:'___ 本は わたしのです。', a:'この', choices:['この','これ','ここ','どこ'], note:'この acompaña siempre a un sustantivo.'},
    {q:'これは ___ ですか。— 300円です。', a:'いくら', choices:['いくら','どなた','何歳','どこの'], note:'いくら pregunta cuánto cuesta.'},
    {q:'その ワインを ___。', a:'見せてください', choices:['見せてください','どこ','いくら','どちら'], note:'見せてください significa “muéstreme, por favor”.'},
    {q:'わたしは 7時 ___ 起きます。', a:'に', choices:['に','は','へ','を'], note:'に marca la hora exacta de una acción.'}
  ],
  numbers: [
    {q:'三百円', a:'300 yenes', choices:['300 yenes','3.000 yenes','30 yenes','600 yenes']},
    {q:'ろっぴゃくえん', a:'600 yenes', choices:['600 yenes','800 yenes','300 yenes','6.000 yenes']},
    {q:'八千円', a:'8.000 yenes', choices:['8.000 yenes','800 yenes','80.000 yenes','3.000 yenes']},
    {q:'七時半', a:'7:30', choices:['7:30','7:15','6:30','8:30']},
    {q:'午後七時', a:'19:00', choices:['19:00','07:00','17:00','21:00']},
    {q:'一階', a:'primer piso', choices:['primer piso','tercer piso','subsuelo','octavo piso']},
    {q:'三階', a:'tercer piso', choices:['tercer piso','primer piso','octavo piso','subsuelo']},
    {q:'十万円', a:'100.000 yenes', choices:['100.000 yenes','10.000 yenes','1.000.000 yenes','1.000 yenes']},
    {q:'十二時十五分', a:'12:15', choices:['12:15','12:50','2:15','11:20']},
    {q:'六時半', a:'6:30', choices:['6:30','7:30','6:15','5:30']}
  ],
  movement: [
    {q:'きのう 10時に ___。', a:'寝ました', choices:['寝ました','寝ます','寝ません','寝ませんでした'], note:'きのう señala pasado, por eso corresponde ～ました.'},
    {q:'毎日 12時から 1時まで ___。', a:'休みます', choices:['休みます','休みました','休みませんでした','寝ました'], note:'毎日 expresa hábito y requiere la forma no pasada ～ます.'},
    {q:'おとといの晩 9時から 11時まで ___。', a:'勉強しました', choices:['勉強しました','勉強します','勉強しません','働きます'], note:'おととい (anteayer) exige una forma pasada.'},
    {q:'あさっては 日曜日です。___。', a:'働きません', choices:['働きません','働きませんでした','働きました','休みました'], note:'あさって es futuro; la negación formal no pasada es ～ません.'},
    {q:'きのう 12時 ___ 勉強しました。', a:'まで', choices:['まで','に','から','へ'], note:'まで marca el límite hasta el que continúa una actividad.'},
    {q:'1時 ___ 寝ました。', a:'に', choices:['に','まで','で','と'], note:'に marca el momento exacto de una acción.'},
    {q:'美術館は 何時 ___ 何時までですか。', a:'から', choices:['から','に','へ','と'], note:'から indica el comienzo y まで el final de un intervalo.'},
    {q:'わたしは 京都 ___ 行きます。', a:'へ', choices:['へ','で','と','まで'], note:'へ se escribe he, se pronuncia e y marca dirección o destino.'},
    {q:'新幹線 ___ 東京へ 行きます。', a:'で', choices:['で','へ','と','に'], note:'で indica el medio de transporte utilizado.'},
    {q:'山田さん ___ 東京へ 行きます。', a:'と', choices:['と','で','へ','から'], note:'と después de una persona significa “con”.'},
    {q:'タクシーで うちへ ___。', a:'帰ります', choices:['帰ります','来ます','行きます','終わります'], note:'帰ります significa volver o regresar.'},
    {q:'家族と 日本へ ___。（pasado）', a:'来ました', choices:['来ました','来ます','行きました','帰ります'], note:'来ました es el pasado formal de 来ます: “vine”.'},
    {q:'___ 日本へ 来ましたか。', a:'いつ', choices:['いつ','どこ','だれ','何番'], note:'いつ pregunta cuándo ocurrió algo.'},
    {q:'日曜日 どこへ 行きましたか。— ___。', a:'どこへも 行きませんでした', choices:['どこへも 行きませんでした','奈良へ 行きます','新幹線で 行きました','家族と 来ました'], note:'どこへも con verbo negativo significa “a ningún lugar”.'}
  ]
};
