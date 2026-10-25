import type { Prayer } from "./prayer-types";

const COMPENDIO = { label: "Compêndio do Catecismo · Apêndice: orações comuns", url: "https://www.vatican.va/archive/compendium_ccc/documents/archive_2005_compendium-ccc_po.html" };
const ROSARIO = { label: "Vaticano · O Santo Rosário", url: "https://www.vatican.va/special/rosary/rosary_po.html" };

export const PRAYERS: Prayer[] = [
  { id: "sinal-da-cruz", title: "Sinal da Cruz", category: "traditional", source: COMPENDIO,
    text: "Pelo sinal da santa Cruz, livrai-nos, Deus, nosso Senhor, dos nossos inimigos.\n\nEm nome do Pai e do Filho e do Espírito Santo. Amém." },
  { id: "pai-nosso", title: "Pai-Nosso", category: "traditional", source: COMPENDIO,
    text: "Pai nosso, que estais nos céus, santificado seja o vosso nome; venha a nós o vosso reino; seja feita a vossa vontade, assim na terra como no céu.\n\nO pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém." },
  { id: "ave-maria", title: "Ave-Maria", category: "traditional", source: COMPENDIO,
    text: "Ave, Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus.\n\nSanta Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém." },
  { id: "gloria-ao-pai", title: "Glória ao Pai", category: "traditional", source: COMPENDIO,
    text: "Glória ao Pai e ao Filho e ao Espírito Santo.\n\nComo era no princípio, agora e sempre. Amém." },
  { id: "credo", title: "Credo (Símbolo dos Apóstolos)", category: "traditional", source: COMPENDIO,
    text: "Creio em Deus Pai todo-poderoso, Criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria; padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus, está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos.\n\nCreio no Espírito Santo, na santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém." },
  { id: "salve-rainha", title: "Salve-Rainha", category: "traditional", source: COMPENDIO,
    text: "Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva; a vós suspiramos, gemendo e chorando neste vale de lágrimas.\n\nEia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei; e, depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre, ó clemente, ó piedosa, ó doce sempre Virgem Maria." },
  { id: "fatima", title: "Oração de Fátima", category: "traditional", source: ROSARIO,
    text: "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno; levai as almas todas para o céu e socorrei principalmente as que mais precisarem." },
  { id: "responsorio", title: "Rogai por nós", category: "traditional", source: ROSARIO,
    text: "V. Rogai por nós, santa Mãe de Deus.\nR. Para que sejamos dignos das promessas de Cristo." },
  { id: "agradecimento", title: "Oração final do Rosário", category: "traditional", source: ROSARIO,
    text: "Oremos. Ó Deus, cujo Filho Unigênito, por sua vida, morte e ressurreição, nos alcançou o prêmio da salvação eterna, concedei-nos, vos pedimos, que, meditando estes mistérios no santo Rosário da Bem-aventurada Virgem Maria, imitemos o que contêm e alcancemos o que prometem. Por Cristo, nosso Senhor. Amém." },
];

export const PRAYER_TEXTS: Record<string, string> = Object.fromEntries(PRAYERS.map((p) => [p.id, p.text]));
export const getPrayer = (id: string) => PRAYERS.find((p) => p.id === id);
