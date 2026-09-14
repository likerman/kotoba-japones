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
    ['勉強します','べんきょうします','benkyō shimasu','estudiar','Verbos'],['読みます','よみます','yomimasu','leer','Verbos']
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
    {q:'十万円', a:'100.000 yenes', choices:['100.000 yenes','10.000 yenes','1.000.000 yenes','1.000 yenes']}
  ]
};
