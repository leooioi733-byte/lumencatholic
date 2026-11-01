import { ADDITIONAL_UNITS } from "./lesson-units";
import { DEEPENING_UNITS } from "./lesson-deepening";
import type { Lesson, LessonUnit } from "./lesson-types";
export type { Teaching, Question, Lesson, LessonUnit } from "./lesson-types";

export const UNIT_TITLE = "Fundamentos da fé católica";

const FOUNDATION_LESSONS: Lesson[] = [
  {
    id: "biblia",
    title: "O que é a Bíblia?",
    emoji: "📖",
    xp: 20,
    teachings: [
      {
        title: "A Palavra de Deus",
        text: "A Bíblia é a Palavra de Deus escrita. Deus inspirou autores humanos, que usaram seus próprios talentos para escrever o que Ele quis comunicar.",
        source: "2Tm 3,16 · CIC 105-106",
      },
      {
        title: "73 livros",
        text: "A Bíblia católica tem 73 livros: 46 no Antigo Testamento, antes de Jesus, e 27 no Novo Testamento, que narra a vida de Jesus e o início da Igreja.",
        source: "CIC 120",
      },
      {
        title: "Escritura e Tradição",
        text: "A Igreja recebe a Revelação de Deus por dois caminhos unidos: a Sagrada Escritura e a Tradição apostólica. Juntas, formam um só depósito da fé.",
        source: "CIC 80-82",
      },
    ],
    questions: [
      {
        prompt: "Quantos livros tem a Bíblia católica?",
        options: ["66", "73", "50", "27"],
        answer: 1,
        explanation: "São 73 livros: 46 do Antigo e 27 do Novo Testamento (CIC 120).",
      },
      {
        prompt: "Quem é o autor principal da Bíblia?",
        options: ["Apenas os profetas", "Os papas", "Deus, por meio de autores humanos", "Os reis de Israel"],
        answer: 2,
        explanation: "Deus inspirou os autores humanos — Ele é o autor da Sagrada Escritura (CIC 105-106).",
      },
      {
        prompt: "O Novo Testamento fala principalmente de…",
        options: ["A criação do mundo", "A vida de Jesus e da Igreja nascente", "O êxodo do Egito", "Os reis de Israel"],
        answer: 1,
        explanation: "Os Evangelhos são o coração das Escrituras, pois falam de Jesus (CIC 125).",
      },
    ],
  },
  {
    id: "jesus",
    title: "Quem é Jesus Cristo?",
    emoji: "✝️",
    xp: 20,
    teachings: [
      {
        title: "Deus feito homem",
        text: "Jesus é o Filho eterno de Deus que se fez homem, nascido da Virgem Maria. “O Verbo se fez carne e habitou entre nós.”",
        source: "Jo 1,14 · CIC 461",
      },
      {
        title: "Verdadeiro Deus e verdadeiro homem",
        text: "Jesus não é metade Deus e metade homem: Ele é plenamente Deus e plenamente homem, uma só Pessoa divina.",
        source: "CIC 464-469",
      },
      {
        title: "“Deus salva”",
        text: "O nome Jesus significa “Deus salva”. Ele morreu na cruz por nossos pecados e ressuscitou ao terceiro dia.",
        source: "Mt 1,21 · 1Cor 15,3-4 · CIC 430, 638",
      },
    ],
    questions: [
      {
        prompt: "O que significa o nome “Jesus”?",
        options: ["Rei dos reis", "Deus salva", "Filho de Davi", "Luz do mundo"],
        answer: 1,
        explanation: "Jesus quer dizer “Deus salva” (Mt 1,21; CIC 430).",
      },
      {
        prompt: "Jesus é…",
        options: ["Apenas um grande profeta", "Metade Deus, metade homem", "Verdadeiro Deus e verdadeiro homem", "Um anjo enviado por Deus"],
        answer: 2,
        explanation: "A Igreja professa que Jesus é verdadeiro Deus e verdadeiro homem (CIC 464).",
      },
      {
        prompt: "Em que dia Jesus ressuscitou?",
        options: ["No primeiro dia", "No terceiro dia", "No sétimo dia", "Após quarenta dias"],
        answer: 1,
        explanation: "“Ressuscitou ao terceiro dia, segundo as Escrituras” (1Cor 15,4).",
      },
    ],
  },
  {
    id: "credo",
    title: "O que é o Credo?",
    emoji: "🕊️",
    xp: 20,
    teachings: [
      {
        title: "O resumo da fé",
        text: "O Credo, também chamado Símbolo da Fé, é um resumo das principais verdades em que os cristãos acreditam. “Credo” vem do latim e quer dizer “Eu creio”.",
        source: "CIC 185-187",
      },
      {
        title: "Três partes",
        text: "O Credo fala de Deus Pai e da criação, de Jesus Cristo e da salvação, e do Espírito Santo, que santifica a Igreja.",
        source: "CIC 190",
      },
      {
        title: "Doze artigos",
        text: "O Símbolo dos Apóstolos é dividido tradicionalmente em doze artigos, lembrando os doze Apóstolos.",
        source: "CIC 191, 194",
      },
    ],
    questions: [
      {
        prompt: "O que significa a palavra “Credo”?",
        options: ["Eu rezo", "Eu creio", "Amém", "Glória"],
        answer: 1,
        explanation: "Credo é latim para “Eu creio” (CIC 187).",
      },
      {
        prompt: "De quem falam as três partes do Credo?",
        options: ["Pai, Filho e Espírito Santo", "Maria, José e Jesus", "Pedro, Paulo e João", "Abraão, Moisés e Davi"],
        answer: 0,
        explanation: "O Credo se organiza em torno das três Pessoas da Santíssima Trindade (CIC 190).",
      },
      {
        prompt: "Quantos artigos tem o Símbolo dos Apóstolos?",
        options: ["7", "10", "12", "3"],
        answer: 2,
        explanation: "São doze artigos, em memória dos doze Apóstolos (CIC 191).",
      },
    ],
  },
  {
    id: "igreja",
    title: "O que é a Igreja Católica?",
    emoji: "⛪",
    xp: 20,
    teachings: [
      {
        title: "Fundada por Cristo",
        text: "Jesus fundou a Igreja sobre os Apóstolos, tendo Pedro como pedra: “Tu és Pedro, e sobre esta pedra edificarei a minha Igreja.”",
        source: "Mt 16,18 · CIC 881",
      },
      {
        title: "Corpo de Cristo",
        text: "A Igreja não é só um prédio: é o povo de Deus, o Corpo de Cristo, do qual Ele é a Cabeça e nós somos os membros.",
        source: "1Cor 12,27 · CIC 787-795",
      },
      {
        title: "Una, santa, católica e apostólica",
        text: "Essas são as quatro marcas da Igreja. “Católica” quer dizer universal: ela é enviada a todos os povos.",
        source: "CIC 811, 830-831",
      },
    ],
    questions: [
      {
        prompt: "O que significa “católica”?",
        options: ["Antiga", "Romana", "Universal", "Sagrada"],
        answer: 2,
        explanation: "Católica significa universal (CIC 830).",
      },
      {
        prompt: "Sobre qual Apóstolo Jesus disse que edificaria sua Igreja?",
        options: ["João", "Pedro", "Tiago", "André"],
        answer: 1,
        explanation: "“Tu és Pedro, e sobre esta pedra edificarei a minha Igreja” (Mt 16,18).",
      },
      {
        prompt: "Qual destas NÃO é uma das quatro marcas da Igreja?",
        options: ["Una", "Santa", "Apostólica", "Nacional"],
        answer: 3,
        explanation: "As marcas são: una, santa, católica e apostólica (CIC 811).",
      },
    ],
  },
  {
    id: "oracao",
    title: "Como funciona a oração?",
    emoji: "🙏",
    xp: 20,
    teachings: [
      {
        title: "Conversa com Deus",
        text: "A oração é a elevação da alma a Deus. É falar e escutar Deus, como um filho com seu Pai.",
        source: "CIC 2559",
      },
      {
        title: "A oração que Jesus ensinou",
        text: "Quando os discípulos pediram “Senhor, ensina-nos a rezar”, Jesus ensinou o Pai-Nosso, chamado de resumo de todo o Evangelho.",
        source: "Lc 11,1-4 · Mt 6,9-13 · CIC 2761",
      },
      {
        title: "Formas de rezar",
        text: "Podemos adorar, pedir, interceder pelos outros, agradecer e louvar. A oração pode ser vocal, meditação ou contemplação.",
        source: "CIC 2626-2643, 2699",
      },
    ],
    questions: [
      {
        prompt: "Segundo o Catecismo, a oração é…",
        options: ["Uma obrigação só aos domingos", "A elevação da alma a Deus", "Repetir palavras decoradas", "Algo só para padres"],
        answer: 1,
        explanation: "“A oração é a elevação da alma a Deus” (CIC 2559).",
      },
      {
        prompt: "Qual oração Jesus ensinou aos discípulos?",
        options: ["Ave-Maria", "Credo", "Pai-Nosso", "Glória ao Pai"],
        answer: 2,
        explanation: "Jesus ensinou o Pai-Nosso (Mt 6,9-13).",
      },
      {
        prompt: "Rezar pelos outros se chama…",
        options: ["Intercessão", "Adoração", "Contemplação", "Penitência"],
        answer: 0,
        explanation: "A intercessão é a oração em favor dos outros (CIC 2634).",
      },
    ],
  },
  {
    id: "sacramentos",
    title: "O que são os sacramentos?",
    emoji: "🕯️",
    xp: 20,
    teachings: [
      {
        title: "Sinais da graça",
        text: "Os sacramentos são sinais visíveis, instituídos por Cristo e confiados à Igreja, que realmente nos dão a graça de Deus.",
        source: "CIC 1131",
      },
      {
        title: "São sete",
        text: "Batismo, Confirmação (Crisma), Eucaristia, Penitência (Confissão), Unção dos Enfermos, Ordem e Matrimônio.",
        source: "CIC 1113",
      },
      {
        title: "Três grupos",
        text: "Iniciação cristã: Batismo, Crisma e Eucaristia. Cura: Confissão e Unção. Serviço da comunhão: Ordem e Matrimônio.",
        source: "CIC 1211-1212",
      },
    ],
    questions: [
      {
        prompt: "Quantos são os sacramentos?",
        options: ["3", "5", "7", "12"],
        answer: 2,
        explanation: "A Igreja celebra sete sacramentos (CIC 1113).",
      },
      {
        prompt: "Quem instituiu os sacramentos?",
        options: ["Os Apóstolos", "Jesus Cristo", "Os bispos", "O primeiro papa"],
        answer: 1,
        explanation: "Os sacramentos foram instituídos por Cristo (CIC 1114, 1131).",
      },
      {
        prompt: "Qual destes é um sacramento de cura?",
        options: ["Batismo", "Matrimônio", "Confissão", "Ordem"],
        answer: 2,
        explanation: "Confissão e Unção dos Enfermos são os sacramentos de cura (CIC 1421).",
      },
    ],
  },
];

export const UNITS: LessonUnit[] = [
  { id: "fundamentos", title: UNIT_TITLE, emoji: "📖", lessons: FOUNDATION_LESSONS },
  ...ADDITIONAL_UNITS,
  ...DEEPENING_UNITS,
];
export const LESSONS: Lesson[] = UNITS.flatMap((unit) => unit.lessons);

export function getLessonUnit(id: string) {
  return UNITS.find((unit) => unit.lessons.some((lesson) => lesson.id === id));
}

export function getLesson(id: string) {
  return LESSONS.find((l) => l.id === id);
}

export function nextLesson(completed: string[]) {
  return LESSONS.find((l) => !completed.includes(l.id)) ?? null;
}

/** XP de uma lição: valor cheio, mais 5 de bônus se acertar tudo de primeira. */
export function lessonXp(lesson: Lesson, mistakes: number) {
  return lesson.xp + (mistakes === 0 ? 5 : 0);
}
