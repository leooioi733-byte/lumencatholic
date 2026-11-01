import type { LessonUnit } from "./lesson-types";

// Sínteses catequéticas, não traduções ou citações literais das Escrituras.
// Referências: Bíblia e Catecismo da Igreja Católica (CIC).
export const DEEPENING_UNITS: LessonUnit[] = [
  {
    id: "vida-no-espirito", title: "A vida no Espírito", emoji: "🕊️", lessons: [
      {
        id: "trindade", title: "A Santíssima Trindade", emoji: "☀️", xp: 20,
        teachings: [
          { title: "Um só Deus, três Pessoas", text: "Cremos em um só Deus em três Pessoas: Pai, Filho e Espírito Santo. Não são três deuses, nem três partes de Deus: cada Pessoa é plenamente Deus.", source: "Mt 28,19 · CIC 232-234, 253" },
          { title: "Distintas e inseparáveis", text: "O Pai não é o Filho, e o Filho não é o Espírito Santo. As três Pessoas são distintas, mas possuem a mesma e única natureza divina. Nenhuma é menos Deus que outra.", source: "Jo 14,16-17 · CIC 254-255" },
          { title: "Deus se revela", text: "A Trindade é o mistério central da fé cristã. Conhecemos esse mistério porque Deus se revelou: o Pai nos envia o Filho e o Espírito Santo e nos chama a participar de sua vida.", source: "Ef 1,3-14 · CIC 234, 237, 257-260" },
        ],
        questions: [
          { prompt: "O que a Igreja professa sobre a Trindade?", options: ["Três deuses separados", "Um só Deus em três Pessoas", "Um Deus dividido em três partes", "Três nomes para a mesma Pessoa"], answer: 1, explanation: "Pai, Filho e Espírito Santo são três Pessoas e um só Deus (CIC 253-255)." },
          { prompt: "As Pessoas divinas são…", options: ["Distintas, com a mesma natureza divina", "Divinas em graus diferentes", "Três seres sem relação", "Apenas modos temporários de Deus"], answer: 0, explanation: "As Pessoas são realmente distintas e partilham a única natureza divina (CIC 254-255)." },
          { prompt: "Como conhecemos o mistério da Trindade?", options: ["Por uma descoberta científica", "Por um mito antigo", "Porque Deus se revelou", "Apenas observando as estrelas"], answer: 2, explanation: "A Trindade é um mistério que Deus nos revelou, não uma conclusão da razão humana sozinha (CIC 237)." },
        ],
      },
      {
        id: "espirito-santo", title: "Quem é o Espírito Santo?", emoji: "🕊️", xp: 20,
        teachings: [
          { title: "Uma Pessoa divina", text: "O Espírito Santo é a terceira Pessoa da Santíssima Trindade. Ele não é apenas uma energia ou um sentimento: é Deus, adorado e glorificado com o Pai e o Filho.", source: "Jo 14,16-17.26 · CIC 685, 691" },
          { title: "A força de Pentecostes", text: "Em Pentecostes, o Espírito Santo foi derramado sobre os discípulos. Ele permanece na Igreja e nos fortalece para anunciar Jesus e viver como seus discípulos.", source: "At 1,8; 2,1-11 · CIC 731-736" },
          { title: "Frutos de uma vida nova", text: "O Espírito Santo nos ajuda a crescer na santidade. Seus frutos incluem amor, alegria, paz, paciência e bondade. Seus dons nos tornam disponíveis para seguir a vontade de Deus.", source: "Gl 5,22-23 · CIC 1830-1832" },
        ],
        questions: [
          { prompt: "Quem é o Espírito Santo?", options: ["Um anjo", "Somente uma emoção", "Uma força sem personalidade", "A terceira Pessoa da Trindade"], answer: 3, explanation: "O Espírito Santo é uma Pessoa divina, não uma força impessoal (CIC 685, 691)." },
          { prompt: "O que os discípulos receberam em Pentecostes?", options: ["Um reino militar", "O dom do Espírito Santo", "Uma nova moeda", "A ordem de parar de anunciar Jesus"], answer: 1, explanation: "Em Pentecostes, o Espírito Santo foi manifestado, dado e comunicado à Igreja (At 2; CIC 731)." },
          { prompt: "Qual destas atitudes é fruto do Espírito?", options: ["Inveja", "Vingança", "Paciência", "Indiferença"], answer: 2, explanation: "A paciência está entre os frutos do Espírito que fazem crescer a vida cristã (Gl 5,22; CIC 1832)." },
        ],
      },
      {
        id: "crisma", title: "Fortalecidos na Crisma", emoji: "🔥", xp: 20,
        teachings: [
          { title: "Aprofundar o Batismo", text: "A Confirmação, também chamada Crisma, fortalece a graça do Batismo. Com o Batismo e a Eucaristia, ela faz parte dos sacramentos da iniciação cristã.", source: "At 8,14-17 · CIC 1285" },
          { title: "O dom do Espírito", text: "Na Crisma recebemos uma efusão especial do Espírito Santo. A unção com o santo crisma e a imposição da mão acompanham o sinal sacramental. Sua marca espiritual é permanente.", source: "At 19,5-6 · CIC 1293-1296, 1302, 1304" },
          { title: "Uma missão que continua", text: "A Crisma nos une mais firmemente a Cristo e à Igreja e nos fortalece para testemunhar a fé. Não é uma formatura: é um chamado a continuar aprendendo, rezando e servindo.", source: "At 1,8 · CIC 1303, 1309" },
        ],
        questions: [
          { prompt: "O que a Crisma fortalece?", options: ["A graça do Batismo", "A fama pessoal", "A força física", "A necessidade de repetir o Batismo"], answer: 0, explanation: "A Confirmação fortalece a graça batismal e completa a iniciação com a Eucaristia (CIC 1285)." },
          { prompt: "Qual dom recebemos de modo especial na Crisma?", options: ["Riqueza garantida", "Uma vida sem dificuldades", "A efusão do Espírito Santo", "O fim de nossa liberdade"], answer: 2, explanation: "O efeito da Confirmação é uma efusão especial do Espírito Santo (CIC 1302)." },
          { prompt: "Depois da Crisma, somos chamados a…", options: ["Deixar de aprender a fé", "Testemunhar Cristo e continuar crescendo na fé", "Abandonar a comunidade", "Repetir a Crisma todo ano"], answer: 1, explanation: "A Crisma fortalece o testemunho cristão e a participação na missão da Igreja (CIC 1303, 1309)." },
        ],
      },
    ],
  },
  {
    id: "cuidar-e-servir", title: "Sacramentos: cuidar e servir", emoji: "🤲", lessons: [
      {
        id: "uncao-enfermos", title: "A Unção dos Enfermos", emoji: "🕯️", xp: 20,
        teachings: [
          { title: "A Igreja cuida dos enfermos", text: "A Carta de Tiago orienta os enfermos a chamar os presbíteros da Igreja para rezar e ungi-los com óleo. Na Unção dos Enfermos, a Igreja confia a pessoa doente ao Senhor.", source: "Tg 5,14-15 · CIC 1499, 1510" },
          { title: "Não só nos últimos momentos", text: "A Unção é destinada a quem começa a estar em perigo pela doença ou pela velhice. Não é preciso esperar os últimos momentos. Pode ser recebida novamente em outra doença grave ou se o estado piorar.", source: "Tg 5,14 · CIC 1514-1515" },
          { title: "Força, paz e coragem", text: "O sacramento oferece força, paz e coragem e une o enfermo à paixão de Cristo. Pode trazer cura corporal se for da vontade de Deus, mas não promete cura física. Também concede perdão se o enfermo não pôde recebê-lo na Confissão.", source: "Tg 5,15 · CIC 1520-1521" },
        ],
        questions: [
          { prompt: "Quem a Carta de Tiago manda chamar para rezar pelos enfermos?", options: ["Somente os governantes", "Os presbíteros da Igreja", "Apenas os soldados", "Nenhuma pessoa"], answer: 1, explanation: "Tiago recomenda chamar os presbíteros para a oração e a unção com óleo (Tg 5,14; CIC 1510)." },
          { prompt: "A Unção dos Enfermos é só para os últimos momentos de vida?", options: ["Sim, sempre", "Sim, e só pode acontecer uma vez", "Não, pode ser recebida em perigo por doença ou velhice", "Não, substitui qualquer tratamento médico"], answer: 2, explanation: "Não se deve esperar a morte iminente: a doença grave ou a velhice podem tornar oportuno o sacramento (CIC 1514-1515)." },
          { prompt: "O que a Unção oferece ao enfermo?", options: ["Força, paz e coragem em Cristo", "Cura física garantida", "Impossibilidade de adoecer novamente", "Dispensa de todos os cuidados médicos"], answer: 0, explanation: "A Unção oferece ajuda espiritual; a recuperação física pode ocorrer se for da vontade de Deus (CIC 1520)." },
        ],
      },
      {
        id: "ordem", title: "Chamados ao ministério", emoji: "⛪", xp: 20,
        teachings: [
          { title: "O sacramento da Ordem", text: "Pelo sacramento da Ordem, a missão confiada por Cristo aos Apóstolos continua na Igreja. Esse sacramento tem três graus: episcopado, presbiterado e diaconado.", source: "1Tm 4,14 · CIC 1536, 1554" },
          { title: "Bispos, padres e diáconos", text: "O bispo recebe a plenitude da Ordem. Os padres são seus colaboradores. Os diáconos servem na liturgia, na Palavra e na caridade; não recebem o sacerdócio ministerial como os bispos e padres.", source: "At 6,1-6; Tt 1,5 · CIC 1557, 1562, 1569-1570" },
          { title: "Autoridade para servir", text: "Jesus ensinou que a autoridade deve ser serviço. O ministério ordenado não torna alguém mais digno que as outras pessoas: existe para servir a Cristo e ao povo de Deus.", source: "Mc 10,42-45 · CIC 1547, 1551" },
        ],
        questions: [
          { prompt: "Quais são os três graus do sacramento da Ordem?", options: ["Batismo, Crisma e Eucaristia", "Fé, esperança e caridade", "Episcopado, presbiterado e diaconado", "Leitor, cantor e sacristão"], answer: 2, explanation: "Bispos, presbíteros e diáconos correspondem aos três graus da Ordem (CIC 1554)." },
          { prompt: "Quem recebe a plenitude do sacramento da Ordem?", options: ["O bispo", "O sacristão", "Todo catequista", "O cantor"], answer: 0, explanation: "A ordenação episcopal confere a plenitude do sacramento da Ordem (CIC 1557)." },
          { prompt: "Para que existe o ministério ordenado?", options: ["Para buscar prestígio", "Para servir a Cristo e ao povo de Deus", "Para substituir a fé dos outros", "Para impedir os leigos de servir"], answer: 1, explanation: "A autoridade sagrada deve ser exercida no serviço, à maneira de Cristo (CIC 1551)." },
        ],
      },
      {
        id: "matrimonio", title: "O amor no Matrimônio", emoji: "💍", xp: 20,
        teachings: [
          { title: "Uma aliança para a vida", text: "O Matrimônio é a aliança pela qual um homem e uma mulher formam uma comunhão de toda a vida, voltada ao bem dos esposos e à geração e educação dos filhos. Entre batizados, é um sacramento.", source: "Gn 2,24; Mc 10,6-9 · CIC 1601" },
          { title: "Amar com fidelidade", text: "Os esposos são chamados ao amor fiel e à entrega mútua. A graça de Cristo os ajuda a crescer no amor e a enfrentar as dificuldades. A fidelidade não exige permanecer em perigo: a separação pode ser necessária em situações graves.", source: "Ef 5,21.25 · CIC 1641-1642, 1646, 1649" },
          { title: "Uma Igreja doméstica", text: "A família cristã é chamada Igreja doméstica: nela, a fé pode ser transmitida pela oração, pelo exemplo e pelo cuidado. Tanto pessoas casadas quanto solteiras são chamadas à santidade na família maior da Igreja.", source: "Cl 3,12-17 · CIC 1655-1658, 2013" },
        ],
        questions: [
          { prompt: "Entre pessoas batizadas, o Matrimônio é…", options: ["Somente um contrato financeiro", "Um sacramento", "Uma cerimônia sem compromisso", "Um prêmio por não ter dificuldades"], answer: 1, explanation: "Cristo elevou a aliança matrimonial entre batizados à dignidade de sacramento (CIC 1601)." },
          { prompt: "Como os esposos são chamados a viver o amor?", options: ["Sem respeito mútuo", "Somente quando tudo é fácil", "Com fidelidade e entrega mútua", "Com domínio de um sobre o outro"], answer: 2, explanation: "O amor conjugal pede fidelidade e doação mútua, sustentadas pela graça (CIC 1641-1642, 1646)." },
          { prompt: "Por que a família cristã é chamada Igreja doméstica?", options: ["Porque pode transmitir a fé pela oração e pelo exemplo", "Porque substitui toda a comunidade", "Porque só pessoas casadas podem ser santas", "Porque dispensa o cuidado com os outros"], answer: 0, explanation: "A família é um lugar de educação na fé e de vida cristã; todos têm lugar na família da Igreja (CIC 1656-1658)." },
        ],
      },
    ],
  },
  {
    id: "escolher-o-bem", title: "Aprender a escolher o bem", emoji: "🧭", lessons: [
      {
        id: "consciencia", title: "Formar a consciência", emoji: "🧭", xp: 20,
        teachings: [
          { title: "Reconhecer o bem", text: "A consciência é um juízo da razão que nos ajuda a reconhecer se uma ação é boa ou má. Não é simplesmente gostar de algo: ela nos chama a buscar o bem e evitar o mal.", source: "Rm 2,14-16 · CIC 1776-1778" },
          { title: "A consciência aprende", text: "Nossa consciência precisa ser formada durante toda a vida. Uma pessoa pode se enganar; por isso, devemos buscar a verdade e não tratar toda preferência pessoal como se fosse correta.", source: "Rm 12,2 · CIC 1783-1784, 1790-1792" },
          { title: "Luz para nossas escolhas", text: "A Palavra de Deus, a oração e o ensinamento da Igreja ajudam a formar a consciência. Também podemos pedir conselhos sábios e examinar nossas atitudes com sinceridade.", source: "2Tm 3,16-17 · CIC 1785" },
        ],
        questions: [
          { prompt: "O que é a consciência moral?", options: ["Qualquer preferência pessoal", "Um juízo da razão sobre o bem e o mal", "Uma emoção que nunca erra", "Uma escolha feita pelos outros"], answer: 1, explanation: "A consciência é um juízo da razão sobre a qualidade moral de uma ação (CIC 1778)." },
          { prompt: "Por que precisamos formar a consciência?", options: ["Porque nossas escolhas nunca importam", "Para evitar toda decisão", "Porque podemos nos enganar e precisamos buscar a verdade", "Para seguir qualquer opinião sem pensar"], answer: 2, explanation: "A consciência precisa de formação, e seu julgamento pode ser errôneo (CIC 1783, 1790)." },
          { prompt: "O que ajuda a formar a consciência?", options: ["A Palavra de Deus, a oração e o ensinamento da Igreja", "Somente a opinião mais popular", "Ignorar nossas atitudes", "Escolher sempre o mais fácil"], answer: 0, explanation: "A Palavra de Deus ilumina a consciência, junto à oração, ao conselho e ao ensinamento da Igreja (CIC 1785)." },
        ],
      },
      {
        id: "virtudes", title: "Virtudes para a vida", emoji: "🌱", xp: 20,
        teachings: [
          { title: "Fé, esperança e caridade", text: "As virtudes teologais são fé, esperança e caridade. Deus as infunde em nós: pela fé cremos nele; pela esperança confiamos em suas promessas; pela caridade amamos a Deus e ao próximo.", source: "1Cor 13,13 · CIC 1812-1814, 1817, 1822" },
          { title: "Quatro virtudes cardeais", text: "Prudência, justiça, fortaleza e temperança são as virtudes cardeais. Elas nos ajudam a discernir o bem, dar a cada um o que é devido, perseverar nas dificuldades e moderar nossos desejos.", source: "Sb 8,7 · CIC 1805-1809" },
          { title: "Crescer um pouco a cada dia", text: "A virtude é uma disposição firme para fazer o bem. Ela cresce com a prática e as escolhas boas. Não contamos apenas com nossa força: a graça de Deus sustenta nosso esforço.", source: "Fl 2,12-13 · CIC 1803-1804, 1810-1811" },
        ],
        questions: [
          { prompt: "Quais são as três virtudes teologais?", options: ["Prudência, fama e força", "Riqueza, sucesso e poder", "Fé, esperança e caridade", "Justiça, pressa e orgulho"], answer: 2, explanation: "As virtudes teologais são fé, esperança e caridade (1Cor 13,13; CIC 1813)." },
          { prompt: "Qual virtude nos ajuda a moderar nossos desejos?", options: ["Temperança", "Vaidade", "Inveja", "Impaciência"], answer: 0, explanation: "A temperança modera a atração dos prazeres e equilibra o uso dos bens criados (CIC 1809)." },
          { prompt: "Como crescemos nas virtudes?", options: ["Só com força de vontade, sem Deus", "Com a graça de Deus e a prática do bem", "Sem precisar escolher ou agir", "Buscando sempre a aprovação dos outros"], answer: 1, explanation: "As virtudes crescem pelo esforço e pela prática; a graça purifica e eleva esse caminho (CIC 1810-1811)." },
        ],
      },
      {
        id: "pecado-graca", title: "Pecado, graça e recomeço", emoji: "🤍", xp: 20,
        teachings: [
          { title: "O pecado fere o amor", text: "Pecar é agir contra a razão, a verdade e a consciência reta, faltando ao amor de Deus e do próximo. O pecado fere nossa relação com Deus e pode ferir outras pessoas.", source: "1Jo 3,4 · CIC 1849-1850" },
          { title: "Nem todo pecado é igual", text: "O pecado mortal destrói a caridade no coração. Para que seja mortal, três condições precisam estar juntas: matéria grave, pleno conhecimento e consentimento deliberado. O pecado venial enfraquece a caridade, mas não a destrói.", source: "1Jo 5,16-17 · CIC 1854-1859, 1863" },
          { title: "A graça abre um recomeço", text: "A graça é o dom gratuito pelo qual Deus nos ajuda a participar de sua vida. Sua misericórdia nos chama ao arrependimento e à conversão; na Reconciliação, Ele nos oferece perdão e vida nova.", source: "Ef 2,4-10; Jo 20,22-23 · CIC 1846-1848, 1996-1997, 1468" },
        ],
        questions: [
          { prompt: "O pecado é uma falta contra…", options: ["A necessidade de ser famoso", "O amor de Deus e do próximo", "O direito de descansar", "A obrigação de agradar a todos"], answer: 1, explanation: "O pecado é uma falta contra o amor verdadeiro a Deus e ao próximo (CIC 1849)." },
          { prompt: "Quais condições devem estar juntas para haver pecado mortal?", options: ["Tristeza, cansaço e medo", "Pressa, dúvida e esquecimento", "Matéria grave, pleno conhecimento e consentimento deliberado", "Qualquer erro involuntário"], answer: 2, explanation: "As três condições precisam ocorrer juntas; não basta considerar só a gravidade do ato (CIC 1857-1859)." },
          { prompt: "O que é a graça de Deus?", options: ["Seu dom gratuito que nos ajuda a participar de sua vida", "Uma recompensa por nunca errar", "Uma desculpa para não mudar", "Um bem que podemos comprar"], answer: 0, explanation: "A graça é o auxílio gratuito de Deus e participação em sua vida (CIC 1996-1997)." },
        ],
      },
    ],
  },
  {
    id: "esperanca-crista", title: "A esperança cristã", emoji: "🌅", lessons: [
      {
        id: "morte-juizo", title: "A vida diante de Deus", emoji: "🕯️", xp: 20,
        teachings: [
          { title: "A morte à luz de Cristo", text: "A morte é uma realidade dolorosa, mas nossa esperança está em Jesus, que morreu e ressuscitou. Para quem vive em Cristo, ela é passagem para Ele, e não a última palavra sobre a vida.", source: "Jo 11,25-26 · CIC 1005-1006, 1010" },
          { title: "O juízo particular", text: "Ao morrer, cada pessoa recebe o juízo particular de Cristo sobre sua vida e sua resposta à graça de Deus. A fé nos convida a viver hoje com amor e responsabilidade, confiando na justiça e na misericórdia do Senhor.", source: "Hb 9,27 · CIC 1021-1022" },
          { title: "Rezar por quem morreu", text: "A Igreja reza pelos falecidos e os confia à misericórdia de Deus. Podemos oferecer orações e a Eucaristia por eles, sem presumir conhecer o destino eterno de uma pessoa.", source: "2Mc 12,44-46 · CIC 958, 1032" },
        ],
        questions: [
          { prompt: "Em quem se apoia a esperança cristã diante da morte?", options: ["Na fama deixada por alguém", "Em Jesus morto e ressuscitado", "Na riqueza acumulada", "Em negar que a morte exista"], answer: 1, explanation: "A morte cristã recebe seu sentido da morte e Ressurreição de Cristo (CIC 1010)." },
          { prompt: "Quando acontece o juízo particular?", options: ["Somente ao nascer", "Depois de várias reencarnações", "No momento da morte", "A cada aniversário"], answer: 2, explanation: "Cada pessoa recebe em sua alma a retribuição eterna no juízo particular, ao morrer (CIC 1022)." },
          { prompt: "Como a Igreja acompanha os falecidos?", options: ["Rezando por eles e confiando-os à misericórdia de Deus", "Afirmando conhecer o destino de todas as pessoas", "Proibindo toda oração por eles", "Esquecendo-os por completo"], answer: 0, explanation: "A Igreja oferece sufrágios pelos mortos, especialmente o sacrifício eucarístico (CIC 958, 1032)." },
        ],
      },
      {
        id: "ressurreicao-mortos", title: "A ressurreição dos mortos", emoji: "🌅", xp: 20,
        teachings: [
          { title: "Cristo ressuscitou", text: "A Ressurreição de Jesus é o fundamento da nossa esperança. Como Cristo venceu a morte, cremos que Deus também ressuscitará os mortos: a vida humana não termina no túmulo.", source: "1Cor 15,12-22 · CIC 988-991" },
          { title: "Corpo e alma", text: "Na morte, a alma se separa do corpo. Na ressurreição, Deus reunirá novamente corpo e alma. Todos ressuscitarão; os justos participarão da vida gloriosa de Cristo com seus corpos transformados.", source: "Jo 5,28-29; 1Cor 15,42-44 · CIC 997-999" },
          { title: "Não é reencarnação", text: "A ressurreição não é nascer de novo em outra vida terrena. Ela acontecerá no último dia, ligada à vinda de Cristo. Seu modo supera nossa compreensão: confiamos no poder e na promessa de Deus.", source: "Jo 6,40 · CIC 1000-1001, 1013" },
        ],
        questions: [
          { prompt: "Qual é o fundamento da esperança na ressurreição dos mortos?", options: ["A Ressurreição de Jesus", "A mudança das estações", "A fama de uma pessoa", "O número de anos vividos"], answer: 0, explanation: "A fé na ressurreição dos mortos está ligada à Ressurreição de Cristo (CIC 991)." },
          { prompt: "O que Deus fará na ressurreição?", options: ["Apagará toda a história humana", "Reunirá novamente corpo e alma", "Transformará todas as pessoas em anjos", "Dará apenas uma lembrança da pessoa"], answer: 1, explanation: "Deus dará vida aos corpos, reunindo-os às almas (CIC 997)." },
          { prompt: "A ressurreição é o mesmo que reencarnação?", options: ["Sim, ambas são várias vidas terrenas", "Sim, depende do número de boas ações", "Não, a ressurreição não é outra vida terrena", "Sim, cada pessoa escolhe outro corpo"], answer: 2, explanation: "A fé cristã não ensina reencarnação; espera a ressurreição no último dia (CIC 1001, 1013)." },
        ],
      },
      {
        id: "vida-eterna", title: "Chamados à vida eterna", emoji: "✨", xp: 20,
        teachings: [
          { title: "O céu: viver com Deus", text: "O céu é a comunhão perfeita e definitiva com Deus, com Maria, os anjos e todos os bem-aventurados. É a plenitude da vida e do amor que Jesus nos promete, além do que conseguimos imaginar.", source: "Jo 14,2-3; Ap 21,1-4 · CIC 1023-1027" },
          { title: "A purificação final", text: "Quem morre na graça e na amizade de Deus, mas ainda precisa de purificação, passa pelo purgatório antes de entrar no céu. Essa purificação é dos que já têm a salvação assegurada: não é uma segunda chance de conversão após a morte.", source: "1Cor 3,12-15 · CIC 1030-1032, 1021" },
          { title: "Liberdade e responsabilidade", text: "Deus deseja que todos se salvem e não predestina ninguém ao inferno. O inferno é a separação definitiva de Deus para quem morre em pecado mortal sem arrependimento, rejeitando livremente seu amor. Somos chamados à conversão e à confiança na misericórdia divina.", source: "Mt 25,31-46; 2Pd 3,9 · CIC 1033-1037" },
        ],
        questions: [
          { prompt: "O que é o céu?", options: ["Somente um lugar entre as nuvens", "A comunhão perfeita e definitiva com Deus", "Uma nova vida terrena", "Um prêmio de riqueza material"], answer: 1, explanation: "O céu é a vida perfeita com a Santíssima Trindade e todos os bem-aventurados (CIC 1024)." },
          { prompt: "Quem passa pela purificação do purgatório?", options: ["Quem precisa escolher outra religião após a morte", "Qualquer pessoa, sem relação com a graça", "Quem morre na amizade de Deus, mas ainda precisa de purificação", "Quem deve comprar a salvação"], answer: 2, explanation: "O purgatório é a purificação final daqueles cuja salvação eterna já está assegurada (CIC 1030-1031)." },
          { prompt: "O que a Igreja ensina sobre a vontade de Deus para nós?", options: ["Deus deseja nossa salvação e nos chama à conversão", "Deus predestina algumas pessoas ao inferno", "Nossas escolhas não têm importância", "Não precisamos acolher seu amor"], answer: 0, explanation: "Deus não predestina ninguém ao inferno e deseja que todos cheguem à conversão (2Pd 3,9; CIC 1037)." },
        ],
      },
    ],
  },
];