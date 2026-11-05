import { Church, Landmark, Palette, Sparkles } from "lucide-react";
import type { MuseumCategoryOption, MuseumExhibit } from "./museum-types";
import lanciano from "@/assets/museu/lanciano.jpg.asset.json";
import fatima from "@/assets/museu/fatima.jpg.asset.json";
import lourdes from "@/assets/museu/lourdes.jpg.asset.json";
import guadalupe from "@/assets/museu/guadalupe.jpg.asset.json";
import aparecida from "@/assets/museu/aparecida.jpg.asset.json";
import saoPedro from "@/assets/museu/sao-pedro.jpg.asset.json";
import catacumba from "@/assets/museu/catacumba.jpg.asset.json";
import pieta from "@/assets/museu/pieta.jpg.asset.json";

export const MUSEUM_CATEGORIES: MuseumCategoryOption[] = [
  { id: "todos", label: "Tudo", icon: Sparkles },
  { id: "devocoes", label: "Milagres e devoções", icon: Church },
  { id: "lugares", label: "Lugares sagrados", icon: Landmark },
  { id: "arte", label: "Arte e memória", icon: Palette },
];

const CC_BY_SA = { license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" };
const CC0 = { license: "CC0 1.0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/" };
const PD_ART = { license: "Domínio público", licenseUrl: "https://commons.wikimedia.org/wiki/Template:PD-Art" };
const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const MUSEUM_EXHIBITS: MuseumExhibit[] = [
  {
    id: "lanciano", title: "O milagre eucarístico de Lanciano", category: "devocoes",
    date: "Século VIII (segundo a tradição)", year: 750, location: "Lanciano, Itália",
    summary: "Relicário que guarda o que a tradição venera como carne e sangue de uma Missa antiga.",
    paragraphs: [
      "Segundo a tradição católica, um monge que duvidava da presença real de Cristo na Eucaristia celebrava a Missa em Lanciano quando viu o pão e o vinho consagrados se transformarem em carne e sangue.",
      "O santuário conserva até hoje esses elementos em um relicário, venerados por peregrinos do mundo inteiro. Em 2015, o Papa Francisco escreveu uma carta à cidade por ocasião do jubileu do milagre.",
    ],
    context: "Este relato é uma tradição de fé acolhida pela Igreja, não um fato comprovado pela ciência. A foto mostra o relicário atual, não o acontecimento medieval.",
    image: { url: lanciano.url, alt: "Relicário de prata e vidro do milagre eucarístico de Lanciano", caption: "Relicário no Santuário do Milagre Eucarístico, Lanciano.", author: "Junior / Wikimedia Commons", license: "Domínio público", licenseUrl: "https://commons.wikimedia.org/wiki/Template:PD-self", sourceUrl: commons("Miracolo_Eucaristico_di_Lanciano_-_foto_dal_vivo.JPG") },
    sources: [{ title: "Carta do Papa Francisco a Lanciano (2015)", url: "https://www.vatican.va/content/francesco/la/letters/2015/documents/papa-francesco_20151022_v-lanciano.html" }],
  },
  {
    id: "fatima", title: "Nossa Senhora de Fátima", category: "devocoes",
    date: "Maio a outubro de 1917", year: 1917, location: "Cova da Iria, Fátima, Portugal",
    summary: "Três pastorinhos relataram aparições de Maria; hoje o lugar é um grande santuário de oração.",
    paragraphs: [
      "Lúcia dos Santos e seus primos Francisco e Jacinta Marto contaram ter visto Nossa Senhora seis vezes em 1917. A mensagem pedia oração, especialmente o Terço, e conversão.",
      "Em 13 de outubro de 1930, o bispo de Leiria declarou as visões dignas de crédito e autorizou o culto a Nossa Senhora de Fátima. Francisco e Jacinta foram canonizados em 2017.",
    ],
    context: "O reconhecimento da Igreja autoriza a devoção, mas não é uma prova científica. A foto é atual: mostra o santuário, não as aparições nem o 'milagre do sol'.",
    image: { url: fatima.url, alt: "Esplanada e Basílica do Santuário de Fátima", caption: "Santuário de Nossa Senhora de Fátima, em foto atual.", author: "Arian Zwegers / Wikimedia Commons", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", sourceUrl: commons("Fátima,_Sanctuary_of_Our_Lady_of_Fátima_(6172325245).jpg") },
    sources: [{ title: "Decreto de 1930 — Santuário de Fátima", url: "https://www.fatima.pt/files/upload/voz_da_fatima/VF0097_1930-10-13.pdf" }],
  },
  {
    id: "lourdes", title: "Lourdes e a Gruta de Massabielle", category: "devocoes",
    date: "11 de fevereiro a 16 de julho de 1858", year: 1858, location: "Lourdes, França",
    summary: "Santa Bernadette relatou dezoito aparições de Maria nesta gruta.",
    paragraphs: [
      "A jovem Bernadette Soubirous contou ter visto uma Senhora na Gruta de Massabielle, que se apresentou como \"a Imaculada Conceição\".",
      "Depois de investigar, o bispo de Tarbes reconheceu as aparições em 1862. Lourdes se tornou lugar de peregrinação, oração e cuidado com os doentes.",
    ],
    context: "Reconhecer as aparições não significa reconhecer toda cura atribuída ao lugar. A foto mostra a gruta hoje.",
    image: { url: lourdes.url, alt: "Gruta de Massabielle vista do outro lado do rio, com a basílica acima", caption: "Gruta de Massabielle, Lourdes, em foto atual.", author: "Preacherdoc / Wikimedia Commons", ...CC_BY_SA, sourceUrl: commons("Grotto_of_Massabielle_Lourdes.jpg") },
    sources: [{ title: "Reconhecimento das aparições — Santuário de Lourdes", url: "https://www.lourdes-france.com/en/recognition-of-the-apparitions/" }],
  },
  {
    id: "guadalupe", title: "Nossa Senhora de Guadalupe", category: "devocoes",
    date: "Dezembro de 1531 (segundo a tradição)", year: 1531, location: "Tepeyac, Cidade do México",
    summary: "A imagem que, segundo a tradição, apareceu no manto de São Juan Diego.",
    paragraphs: [
      "A tradição conta que Maria apareceu ao indígena Juan Diego e pediu que se construísse um santuário. Quando ele mostrou ao bispo as rosas que levava no manto (a tilma), a imagem de Nossa Senhora apareceu nele.",
      "Juan Diego foi canonizado em 2002 por São João Paulo II. A tilma é venerada na Basílica de Guadalupe, um dos santuários mais visitados do mundo.",
    ],
    context: "A origem milagrosa é tradição de fé. Esta é uma reprodução da imagem, não a tilma original.",
    image: { url: guadalupe.url, alt: "Imagem de Nossa Senhora de Guadalupe com manto estrelado e raios dourados", caption: "Reprodução da imagem de Nossa Senhora de Guadalupe.", author: "Reprodução: anagoria / Wikimedia Commons", ...PD_ART, sourceUrl: commons("1531_Nuestra_Señora_de_Guadalupe_anagoria.jpg") },
    sources: [{ title: "Biografia de São Juan Diego — Santa Sé", url: "https://www.vatican.va/news_services/liturgy/saints/ns_lit_doc_20020731_juan-diego_en.html" }],
  },
  {
    id: "aparecida", title: "Nossa Senhora Aparecida", category: "devocoes",
    date: "Outubro de 1717", year: 1717, location: "Rio Paraíba do Sul, Aparecida (SP), Brasil",
    summary: "Pescadores encontraram nas redes a imagem que se tornou a Padroeira do Brasil.",
    paragraphs: [
      "Os pescadores Domingos Garcia, João Alves e Felipe Pedroso lançaram as redes no rio e encontraram primeiro o corpo e depois a cabeça de uma imagem de Nossa Senhora da Conceição. Em seguida, a pesca foi abundante.",
      "A devoção cresceu ao redor da pequena imagem escura. Hoje ela é venerada no Santuário Nacional de Aparecida, e sua festa é celebrada em 12 de outubro.",
    ],
    context: "Não foi uma aparição de Maria: foi o encontro de uma imagem. Não está confirmado se a foto mostra a imagem original ou uma réplica.",
    image: { url: aparecida.url, alt: "Imagem de Nossa Senhora Aparecida com manto azul e coroa", caption: "Nossa Senhora Aparecida no Santuário Nacional, 2014.", author: "José Luiz / Wikimedia Commons", ...CC_BY_SA, sourceUrl: commons("Our_Lady_of_Aparecida_-_Basilica_of_Aparecida_-_Aparecida_2014.jpg") },
    sources: [{ title: "História de Nossa Senhora Aparecida — A12", url: "https://www.a12.com/santuario/historia-de-nossa-senhora-aparecida-1717" }],
  },
  {
    id: "sao-pedro", title: "Basílica de São Pedro", category: "lugares",
    date: "Construída entre 1506 e 1626", year: 1626, location: "Cidade do Vaticano",
    summary: "Erguida sobre o lugar da tradição do túmulo de São Pedro, é centro de peregrinação.",
    paragraphs: [
      "A basílica atual substituiu a igreja construída no século IV pelo imperador Constantino. Sua construção levou 120 anos e envolveu artistas como Bramante, Michelangelo e Bernini.",
      "É um dos lugares mais importantes de celebração e peregrinação da Igreja, onde o Papa preside grandes celebrações.",
    ],
    context: "A foto mostra o edifício atual, não a basílica de Constantino.",
    image: { url: saoPedro.url, alt: "Fachada iluminada da Basílica de São Pedro ao anoitecer", caption: "Basílica de São Pedro ao entardecer.", author: "Jebulon / Wikimedia Commons", ...CC0, sourceUrl: commons("Basilica_Sancti_Petri_blue_hour.jpg") },
    sources: [{ title: "Basílica Papal de São Pedro", url: "https://www.basilicasanpietro.va/en/faq/when-was-st-peters-basilica-built" }],
  },
  {
    id: "catacumbas", title: "O Bom Pastor nas Catacumbas", category: "lugares",
    date: "Século III", year: 250, location: "Catacumba de Priscila, Roma",
    summary: "Uma das imagens mais antigas de Jesus como o Bom Pastor.",
    paragraphs: [
      "As catacumbas eram cemitérios subterrâneos das primeiras comunidades cristãs de Roma. Suas pinturas e inscrições mostram a esperança na ressurreição.",
      "Na Catacumba de Priscila, Jesus aparece como o Bom Pastor que carrega a ovelha nos ombros, lembrando João 10,11: \"Eu sou o bom pastor\".",
    ],
    context: "As catacumbas eram lugares de sepultura, não esconderijos. Esta imagem é uma reprodução publicada em 1903, não uma foto atual.",
    image: { url: catacumba.url, alt: "Pintura antiga do Bom Pastor carregando uma ovelha nos ombros", caption: "O Bom Pastor, Catacumba de Priscila (reprodução de 1903).", author: "Joseph Wilpert (reprodução) / Wikimedia Commons", ...PD_ART, sourceUrl: commons("Good_Shepherd_Catacomb_of_Priscilla.jpg") },
    sources: [{ title: "Catacumbas cristãs — Pontifícia Comissão de Arqueologia Sacra", url: "https://www.catacombeditalia.va/content/archeologiasacra/en/christian-catacombs.html" }],
  },
  {
    id: "pieta", title: "A Pietà de Michelangelo", category: "arte",
    date: "c. 1498–1499", year: 1499, location: "Basílica de São Pedro, Vaticano",
    summary: "Maria sustenta o corpo de Jesus, esculpida em mármore pelo jovem Michelangelo.",
    paragraphs: [
      "Encomendada pelo cardeal Jean de Bilhères, a Pietà mostra Maria com Jesus nos braços depois da crucificação. Michelangelo tinha cerca de 24 anos.",
      "A obra une dor e serenidade e convida à contemplação do amor de Maria e do sacrifício de Cristo.",
    ],
    context: "É uma interpretação artística e devocional, não um registro histórico da cena.",
    image: { url: pieta.url, alt: "Escultura de mármore branco de Maria com Jesus morto no colo", caption: "Pietà, de Michelangelo, na Basílica de São Pedro.", author: "Jebulon / Wikimedia Commons", ...CC0, sourceUrl: commons("Michelangelo's_Pietà_Saint_Peter's_Basilica_Vatican_City.jpg") },
    sources: [{ title: "A Pietà — Basílica Papal de São Pedro", url: "https://www.basilicasanpietro.va/en/san-pietro/the-pieta-of-saint-peter-s" }],
  },
];

export function getExhibit(id: string) {
  return MUSEUM_EXHIBITS.find((e) => e.id === id);
}
