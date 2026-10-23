import type { LessonUnit } from "./lesson-types";

// Sínteses catequéticas, não citações literais. As fontes acompanham cada ensinamento.
export const ADDITIONAL_UNITS: LessonUnit[] = [
  {
    id: "historia", title: "A história da salvação", emoji: "🌿", lessons: [
      {
        id: "criacao", title: "Deus e a criação", emoji: "🌿", xp: 20,
        teachings: [
          { title: "Tudo começa em Deus", text: "Deus criou o céu e a terra. A criação não é fruto de uma necessidade: Deus cria livremente, por sua sabedoria e seu amor.", source: "Gn 1,1 · CIC 279, 295" },
          { title: "À imagem de Deus", text: "Deus viu que sua criação era boa. O ser humano, criado à sua imagem, tem uma dignidade especial: pode conhecer e amar seu Criador.", source: "Gn 1,26-31 · CIC 299, 355-357" },
          { title: "Cuidar da nossa casa", text: "Deus confiou ao ser humano o cuidado da criação. Cultivar e guardar a terra significa respeitar as criaturas e agir com responsabilidade.", source: "Gn 2,15 · CIC 373" },
        ],
        questions: [
          { prompt: "Segundo a Bíblia, quem criou o céu e a terra?", options: ["Os anjos", "Deus", "Moisés", "Os primeiros seres humanos"], answer: 1, explanation: "Deus é o Criador do céu e da terra (Gn 1,1; CIC 279)." },
          { prompt: "O ser humano foi criado…", options: ["Sem nenhuma dignidade", "À imagem de Deus", "Para ser um anjo", "Somente para trabalhar"], answer: 1, explanation: "Ser imagem de Deus dá a cada pessoa uma dignidade especial (Gn 1,27; CIC 357)." },
          { prompt: "Qual é nossa responsabilidade com a criação?", options: ["Explorá-la sem limites", "Abandoná-la", "Cuidar dela com responsabilidade", "Adorá-la como um deus"], answer: 2, explanation: "Deus nos chama a cultivar e guardar sua criação (Gn 2,15; CIC 373)." },
        ],
      },
      {
        id: "exodo", title: "Moisés e a aliança", emoji: "🏔️", xp: 20,
        teachings: [
          { title: "Deus escuta seu povo", text: "Os israelitas sofriam como escravos no Egito. Deus ouviu seu clamor e chamou Moisés para conduzir o povo à liberdade.", source: "Ex 3,7-10 · CIC 62, 205" },
          { title: "A passagem do mar", text: "Deus libertou Israel da escravidão. A passagem do mar Vermelho é lembrada pela Igreja como uma imagem da libertação trazida pelo Batismo.", source: "Ex 14,21-31 · CIC 1221" },
          { title: "Uma aliança no Sinai", text: "No monte Sinai, Deus fez uma aliança com Israel. Os mandamentos ensinam o povo a viver em fidelidade a Deus e no amor ao próximo.", source: "Ex 19,3-6; 20,1-17 · CIC 62, 2060-2062" },
        ],
        questions: [
          { prompt: "Quem Deus chamou para conduzir Israel para fora do Egito?", options: ["Pedro", "Noé", "Moisés", "João"], answer: 2, explanation: "Deus chamou Moisés para libertar seu povo (Ex 3,7-10; CIC 205)." },
          { prompt: "A passagem do mar Vermelho é uma imagem de qual sacramento?", options: ["Batismo", "Ordem", "Matrimônio", "Unção dos Enfermos"], answer: 0, explanation: "A libertação pelo mar prefigura a libertação do Batismo (CIC 1221)." },
          { prompt: "Em qual monte Deus fez a aliança com Israel?", options: ["Monte das Oliveiras", "Sinai", "Tabor", "Calvário"], answer: 1, explanation: "Deus estabeleceu a aliança com Israel no Sinai (Ex 19; CIC 62)." },
        ],
      },
      {
        id: "evangelhos", title: "A boa notícia de Jesus", emoji: "📜", xp: 20,
        teachings: [
          { title: "Quatro Evangelhos", text: "Mateus, Marcos, Lucas e João são os quatro Evangelhos. Eles testemunham a vida e os ensinamentos de Jesus e nos convidam a crer nele.", source: "Jo 20,30-31 · CIC 120, 124-125" },
          { title: "O Reino está próximo", text: "Jesus anuncia o Reino de Deus e chama à conversão. Acolher esse Reino é deixar Deus transformar nosso coração e nossa maneira de viver.", source: "Mc 1,14-15 · CIC 541-542" },
          { title: "Cristo vive!", text: "Jesus morreu por nossos pecados, foi sepultado e ressuscitou ao terceiro dia. A Ressurreição é a verdade central da nossa fé em Cristo.", source: "1Cor 15,3-5 · CIC 638-639" },
        ],
        questions: [
          { prompt: "Quais são os quatro evangelistas?", options: ["Pedro, Paulo, Tiago e Judas", "Mateus, Marcos, Lucas e João", "Abraão, Isaac, Jacó e José", "Moisés, Davi, Isaías e Elias"], answer: 1, explanation: "Os quatro Evangelhos são segundo Mateus, Marcos, Lucas e João (CIC 120)." },
          { prompt: "O que Jesus anuncia no início de sua missão?", options: ["O Reino de Deus", "Um império militar", "O fim da oração", "Uma lei sem amor"], answer: 0, explanation: "Jesus anuncia o Reino de Deus e chama à conversão (Mc 1,15; CIC 541)." },
          { prompt: "Qual é a verdade central da fé em Cristo?", options: ["A construção do templo", "A coroação de Davi", "A Ressurreição de Jesus", "A viagem de Moisés"], answer: 2, explanation: "A Ressurreição de Jesus é a verdade central da fé cristã (CIC 638)." },
        ],
      },
    ],
  },
  {
    id: "vida-sacramental", title: "A vida nos sacramentos", emoji: "🍞", lessons: [
      {
        id: "batismo", title: "Uma vida nova: Batismo", emoji: "💧", xp: 20,
        teachings: [
          { title: "Em nome da Trindade", text: "Jesus enviou os discípulos a batizar em nome do Pai, do Filho e do Espírito Santo. O Batismo é a porta de entrada da vida cristã.", source: "Mt 28,19-20 · CIC 1213, 1223" },
          { title: "Nascer para uma vida nova", text: "Pelo Batismo somos libertados do pecado, tornamo-nos filhos adotivos de Deus e somos unidos à morte e à Ressurreição de Jesus.", source: "Rm 6,3-4 · CIC 1262-1266" },
          { title: "Parte da família da Igreja", text: "O Batismo nos incorpora à Igreja e deixa uma marca espiritual permanente. Por isso, não se repete o Batismo.", source: "1Cor 12,13 · CIC 1267, 1272" },
        ],
        questions: [
          { prompt: "Em nome de quem somos batizados?", options: ["Dos Apóstolos", "Somente de Maria", "Do Pai, do Filho e do Espírito Santo", "Dos santos"], answer: 2, explanation: "Jesus ensinou a batizar em nome da Santíssima Trindade (Mt 28,19)." },
          { prompt: "O Batismo nos une…", options: ["À vida nova em Cristo", "A um reino terrestre", "A uma família sem Deus", "Somente a uma tradição cultural"], answer: 0, explanation: "No Batismo somos unidos à morte e à Ressurreição de Cristo (Rm 6,3-4)." },
          { prompt: "O Batismo pode ser repetido?", options: ["Sim, a cada ano", "Não, sua marca espiritual é permanente", "Sim, ao mudar de paróquia", "Sim, antes de cada Missa"], answer: 1, explanation: "O Batismo imprime um caráter permanente e não pode ser repetido (CIC 1272)." },
        ],
      },
      {
        id: "eucaristia", title: "Jesus na Eucaristia", emoji: "🍞", xp: 20,
        teachings: [
          { title: "A Última Ceia", text: "Na Última Ceia, Jesus entregou seu Corpo e seu Sangue e pediu aos discípulos que celebrassem em sua memória. Assim instituiu a Eucaristia.", source: "Lc 22,19-20 · CIC 1323, 1337" },
          { title: "Uma presença real", text: "Na Eucaristia, Cristo está verdadeiramente presente: Corpo, Sangue, Alma e Divindade. Não é apenas um símbolo; é o próprio Jesus que se dá a nós.", source: "Jo 6,51; 1Cor 11,23-25 · CIC 1374-1376" },
          { title: "Um só corpo", text: "A comunhão fortalece nossa união com Cristo e com a Igreja. A Eucaristia é fonte e ápice de toda a vida cristã.", source: "1Cor 10,16-17 · CIC 1324, 1391, 1396" },
        ],
        questions: [
          { prompt: "Quando Jesus instituiu a Eucaristia?", options: ["Na Última Ceia", "No monte Sinai", "Na criação do mundo", "No casamento de José e Maria"], answer: 0, explanation: "Jesus instituiu a Eucaristia na Última Ceia (Lc 22,19-20; CIC 1323)." },
          { prompt: "Como Cristo está presente na Eucaristia?", options: ["Somente como uma lembrança", "Apenas como um símbolo", "Verdadeiramente, com seu Corpo, Sangue, Alma e Divindade", "Apenas em nossa imaginação"], answer: 2, explanation: "A presença de Cristo é verdadeira, real e substancial (CIC 1374)." },
          { prompt: "A comunhão fortalece nossa união com…", options: ["Apenas quem pensa igual a nós", "Cristo e sua Igreja", "Somente os anjos", "Um reino político"], answer: 1, explanation: "A comunhão une a Cristo e fortalece a unidade de seu Corpo, a Igreja (CIC 1391, 1396)." },
        ],
      },
      {
        id: "reconciliacao", title: "O perdão na Confissão", emoji: "🤍", xp: 20,
        teachings: [
          { title: "Deus nos recebe de volta", text: "Na parábola do filho pródigo, o pai acolhe o filho que retorna. Jesus mostra a misericórdia de Deus e nos convida a reconhecer o pecado e voltar para Ele.", source: "Lc 15,11-32 · CIC 1439" },
          { title: "Um ministério de perdão", text: "Após ressuscitar, Jesus confiou aos Apóstolos o ministério do perdão dos pecados. A Igreja continua esse ministério no sacramento da Reconciliação.", source: "Jo 20,21-23 · CIC 1441-1442" },
          { title: "Arrependimento e recomeço", text: "Na Confissão, reconhecemos nossos pecados diante do sacerdote, com arrependimento e propósito de mudar. A absolvição nos reconcilia com Deus e com a Igreja.", source: "2Cor 5,18-20 · CIC 1422, 1451, 1456, 1468-1469" },
        ],
        questions: [
          { prompt: "Como o pai recebe o filho que retorna na parábola?", options: ["Com indiferença", "Com misericórdia e alegria", "Expulsando-o", "Sem escutá-lo"], answer: 1, explanation: "O pai acolhe o filho com amor: imagem da misericórdia de Deus (Lc 15; CIC 1439)." },
          { prompt: "A quem Jesus confiou o ministério do perdão?", options: ["Aos reis de Israel", "Aos soldados", "Aos Apóstolos", "Somente a Moisés"], answer: 2, explanation: "Jesus enviou os Apóstolos com o ministério do perdão dos pecados (Jo 20,21-23)." },
          { prompt: "O arrependimento verdadeiro inclui…", options: ["O propósito de não voltar a pecar", "A vontade de repetir o pecado", "Culpar sempre os outros", "Esconder tudo de Deus"], answer: 0, explanation: "A contrição inclui a tristeza pelo pecado e o propósito de não mais pecar (CIC 1451)." },
        ],
      },
    ],
  },
  {
    id: "viver", title: "Viver como Jesus", emoji: "❤️", lessons: [
      {
        id: "mandamentos", title: "Os mandamentos e o amor", emoji: "📋", xp: 20,
        teachings: [
          { title: "Amar a Deus e ao próximo", text: "Jesus resume a Lei em dois grandes mandamentos: amar a Deus de todo o coração e amar o próximo como a si mesmo.", source: "Mt 22,37-40 · CIC 2055" },
          { title: "Dez palavras para a vida", text: "O Decálogo, os Dez Mandamentos, foi dado ao povo na aliança com Deus. Ele orienta a vida no amor a Deus e no respeito ao próximo.", source: "Ex 20,1-17 · CIC 2056-2057, 2067" },
          { title: "Seguir Jesus", text: "Jesus não separa os mandamentos do amor. Ele nos convida a guardá-los e a segui-lo, fazendo da nossa vida uma resposta ao amor de Deus.", source: "Mt 19,16-21 · CIC 2052-2054" },
        ],
        questions: [
          { prompt: "Quais são os dois grandes mandamentos ensinados por Jesus?", options: ["Vencer e dominar", "Amar a Deus e ao próximo", "Ganhar e guardar", "Julgar e condenar"], answer: 1, explanation: "Toda a Lei se apoia no amor a Deus e ao próximo (Mt 22,37-40; CIC 2055)." },
          { prompt: "Quantos mandamentos tem o Decálogo?", options: ["Três", "Sete", "Dez", "Doze"], answer: 2, explanation: "Decálogo significa dez palavras: são os Dez Mandamentos (CIC 2056)." },
          { prompt: "Além de guardar os mandamentos, Jesus nos convida a…", options: ["Segui-lo", "Ignorar o próximo", "Buscar poder acima de tudo", "Deixar de amar"], answer: 0, explanation: "Jesus chama a guardar os mandamentos e a segui-lo (Mt 19,21; CIC 2053)." },
        ],
      },
      {
        id: "bem-aventurancas", title: "O caminho da felicidade", emoji: "☀️", xp: 20,
        teachings: [
          { title: "As Bem-aventuranças", text: "No Sermão da Montanha, Jesus proclama as Bem-aventuranças. Elas mostram seu rosto e apontam o caminho da verdadeira felicidade no Reino de Deus.", source: "Mt 5,1-12 · CIC 1716-1717" },
          { title: "Corações misericordiosos", text: "Jesus chama de bem-aventurados os misericordiosos e os que promovem a paz. Seu caminho nos convida a perdoar e a construir a paz.", source: "Mt 5,7.9 · CIC 1716" },
          { title: "Nossa esperança", text: "A alegria prometida por Jesus não se reduz a riqueza ou sucesso. A felicidade plena está em Deus, que nos chama à vida eterna.", source: "Mt 5,12 · CIC 1720-1723" },
        ],
        questions: [
          { prompt: "Onde Jesus proclama as Bem-aventuranças?", options: ["No palácio de Herodes", "No Sermão da Montanha", "Na arca de Noé", "No monte Sinai com Moisés"], answer: 1, explanation: "As Bem-aventuranças estão no início do Sermão da Montanha (Mt 5; CIC 1716)." },
          { prompt: "Quem será chamado filho de Deus, segundo Mt 5,9?", options: ["Quem promove a paz", "Quem acumula mais riqueza", "Quem nunca escuta os outros", "Quem busca vingança"], answer: 0, explanation: "Bem-aventurados os que promovem a paz, porque serão chamados filhos de Deus (Mt 5,9)." },
          { prompt: "Onde encontramos a felicidade plena?", options: ["Somente na fama", "Apenas no dinheiro", "Em Deus", "Em vencer os outros"], answer: 2, explanation: "A verdadeira felicidade encontra-se em Deus, fonte de todo bem (CIC 1723)." },
        ],
      },
      {
        id: "caridade", title: "Amar com atitudes", emoji: "❤️", xp: 20,
        teachings: [
          { title: "Como Jesus nos amou", text: "Jesus deu um mandamento novo: amar uns aos outros como Ele nos amou. O amor mútuo é o sinal que identifica seus discípulos.", source: "Jo 13,34-35 · CIC 1823" },
          { title: "A virtude da caridade", text: "A caridade é a virtude pela qual amamos a Deus acima de tudo e ao próximo por amor de Deus. Entre fé, esperança e caridade, a maior é a caridade.", source: "1Cor 13,13 · CIC 1822, 1826" },
          { title: "Fazer-se próximo", text: "O bom samaritano não apenas sentiu pena: cuidou do homem ferido. Jesus nos ensina a amar com gestos concretos de misericórdia, até além das nossas amizades.", source: "Lc 10,25-37 · CIC 1825, 2447" },
        ],
        questions: [
          { prompt: "Como as pessoas reconhecerão os discípulos de Jesus?", options: ["Pela riqueza", "Pelo amor uns aos outros", "Pela força militar", "Pelo número de viagens"], answer: 1, explanation: "O amor mútuo identifica os discípulos de Jesus (Jo 13,35)." },
          { prompt: "Qual é a maior das virtudes teologais?", options: ["Caridade", "Fama", "Poder", "Riqueza"], answer: 0, explanation: "Fé, esperança e caridade permanecem; a maior é a caridade (1Cor 13,13; CIC 1826)." },
          { prompt: "Como o bom samaritano mostrou amor?", options: ["Passando longe", "Apenas observando", "Cuidando do homem ferido", "Esperando uma recompensa"], answer: 2, explanation: "O samaritano agiu com misericórdia e cuidou do ferido (Lc 10,33-35)." },
        ],
      },
    ],
  },
  {
    id: "celebrar", title: "Celebrar e rezar", emoji: "🔔", lessons: [
      {
        id: "missa", title: "A Santa Missa", emoji: "⛪", xp: 20,
        teachings: [
          { title: "Palavra e Eucaristia", text: "A Missa tem duas grandes partes: a liturgia da Palavra e a liturgia eucarística. Elas formam uma única celebração, em que Deus nos alimenta com sua Palavra e com Cristo.", source: "Lc 24,27-35 · CIC 1346" },
          { title: "O memorial da Páscoa", text: "A Eucaristia é o memorial da morte e da Ressurreição de Jesus. O único sacrifício de Cristo torna-se presente sacramentalmente; não é uma nova crucificação.", source: "1Cor 11,23-26 · CIC 1362-1367" },
          { title: "Toda a Igreja celebra", text: "Na Missa, a comunidade inteira participa, com diferentes funções. Somos chamados a celebrar com fé, oração e atenção, unidos como Corpo de Cristo.", source: "1Cor 12,12-27 · CIC 1140-1144" },
        ],
        questions: [
          { prompt: "Quais são as duas grandes partes da Missa?", options: ["Advento e Quaresma", "Liturgia da Palavra e liturgia eucarística", "Batismo e Matrimônio", "Procissão e viagem"], answer: 1, explanation: "A liturgia da Palavra e a liturgia eucarística formam uma única celebração (CIC 1346)." },
          { prompt: "A Eucaristia celebra o memorial…", options: ["Da Páscoa de Cristo", "Da coroação de Davi", "Da construção de Roma", "Somente da travessia do mar"], answer: 0, explanation: "A Eucaristia é o memorial da Páscoa de Cristo (CIC 1362)." },
          { prompt: "Quem participa da celebração da Missa?", options: ["Somente o padre", "Somente o coral", "Toda a comunidade, com diferentes funções", "Somente os leitores"], answer: 2, explanation: "A assembleia celebra unida, cada um segundo sua função (CIC 1140-1144)." },
        ],
      },
      {
        id: "ano-liturgico", title: "O ano litúrgico", emoji: "🗓️", xp: 20,
        teachings: [
          { title: "O mistério de Cristo", text: "Ao longo do ano litúrgico, a Igreja celebra o mistério de Jesus, de sua Encarnação à Ressurreição e à esperança de sua vinda gloriosa.", source: "CIC 1163, 1168-1171" },
          { title: "Domingo, dia do Senhor", text: "Jesus ressuscitou no primeiro dia da semana. Por isso, o domingo é o dia do Senhor, quando a comunidade cristã se reúne especialmente para celebrar a Eucaristia.", source: "Jo 20,1.19 · CIC 1166-1167" },
          { title: "Preparar e celebrar", text: "O Advento prepara o Natal, que celebra o nascimento de Jesus. A Quaresma prepara a Páscoa, celebração de sua Ressurreição. Esses tempos ajudam a viver o Evangelho.", source: "Lc 2,1-14; Mt 4,1-11 · CIC 524-525, 540, 1169" },
        ],
        questions: [
          { prompt: "O que a Igreja celebra ao longo do ano litúrgico?", options: ["Somente as estações do clima", "O mistério de Cristo", "As vitórias de um império", "Somente festas de família"], answer: 1, explanation: "O ano litúrgico celebra o mistério de Cristo em suas diversas etapas (CIC 1163)." },
          { prompt: "Qual acontecimento o domingo celebra especialmente?", options: ["A Ressurreição de Jesus", "O nascimento de Moisés", "A construção do templo", "A coroação de Salomão"], answer: 0, explanation: "O domingo é o dia da Ressurreição de Cristo (CIC 1166)." },
          { prompt: "Qual tempo prepara a celebração do Natal?", options: ["Quaresma", "Tempo Pascal", "Advento", "Semana Santa"], answer: 2, explanation: "No Advento, a Igreja se prepara para celebrar a vinda de Jesus no Natal (CIC 524)." },
        ],
      },
      {
        id: "maria-santos", title: "Maria e os santos", emoji: "🌹", xp: 20,
        teachings: [
          { title: "O sim de Maria", text: "Ao receber o anúncio do anjo, Maria respondeu com fé e liberdade: “Faça-se em mim segundo a tua palavra”. Seu sim acolheu a vontade de Deus.", source: "Lc 1,26-38 · CIC 494" },
          { title: "Honrar não é adorar", text: "A Igreja honra Maria de modo singular como Mãe de Deus. Essa veneração é diferente da adoração, que é devida somente a Deus.", source: "Lc 1,48 · CIC 971" },
          { title: "Uma família em Cristo", text: "A comunhão dos santos une os fiéis em Cristo. Os santos no céu intercedem por nós e nos dão exemplos de vida; toda a Igreja é chamada à santidade.", source: "Hb 12,1 · CIC 946-947, 956-957, 2013" },
        ],
        questions: [
          { prompt: "Como Maria respondeu ao anúncio do anjo?", options: ["Recusando escutar", "Com fé: faça-se em mim segundo a tua palavra", "Pedindo um reino terrestre", "Exigindo uma recompensa"], answer: 1, explanation: "Maria acolheu livremente a vontade de Deus (Lc 1,38; CIC 494)." },
          { prompt: "A quem é devida a adoração?", options: ["A todos os santos", "A Maria", "Somente a Deus", "Aos anjos"], answer: 2, explanation: "A veneração de Maria difere da adoração, devida somente a Deus (CIC 971)." },
          { prompt: "Os santos no céu…", options: ["Intercedem por nós e nos oferecem exemplos de vida", "Substituem Jesus", "São deuses", "Impedem nossa oração a Deus"], answer: 0, explanation: "Os santos intercedem por nós e sua vida nos inspira a seguir Cristo (CIC 956-957)." },
        ],
      },
    ],
  },
];