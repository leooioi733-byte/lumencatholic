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
  { id: "anjo-da-guarda", title: "Oração do Anjo da Guarda", category: "traditional", source: COMPENDIO,
    text: "Santo Anjo do Senhor, meu zeloso guardador, se a ti me confiou a piedade divina, sempre me rege, me guarda, me governa e me ilumina. Amém." },
  { id: "angelus", title: "Angelus (O Anjo do Senhor)", category: "traditional", source: COMPENDIO,
    text: "V. O Anjo do Senhor anunciou a Maria.\nR. E ela concebeu do Espírito Santo.\nAve, Maria...\n\nV. Eis aqui a serva do Senhor.\nR. Faça-se em mim segundo a vossa palavra.\nAve, Maria...\n\nV. E o Verbo se fez carne.\nR. E habitou entre nós.\nAve, Maria...\n\nV. Rogai por nós, santa Mãe de Deus.\nR. Para que sejamos dignos das promessas de Cristo.\n\nOremos. Infundi, Senhor, nós vos pedimos, a vossa graça em nossas almas, para que nós, que pela anunciação do Anjo conhecemos a encarnação de Cristo, vosso Filho, pela sua paixão e cruz sejamos conduzidos à glória da ressurreição. Pelo mesmo Cristo, nosso Senhor. Amém." },
  { id: "regina-caeli", title: "Rainha do Céu (Regina Caeli)", category: "traditional", source: COMPENDIO,
    text: "Rezada no Tempo Pascal, no lugar do Angelus.\n\nV. Rainha do céu, alegrai-vos, aleluia!\nR. Porque quem merecestes trazer em vosso seio, aleluia!\nV. Ressuscitou como disse, aleluia!\nR. Rogai a Deus por nós, aleluia!\nV. Exultai e alegrai-vos, ó Virgem Maria, aleluia!\nR. Porque o Senhor ressuscitou verdadeiramente, aleluia!\n\nOremos. Ó Deus, que vos dignastes alegrar o mundo com a ressurreição do vosso Filho, nosso Senhor Jesus Cristo, concedei-nos, vos pedimos, que, por sua Mãe, a Virgem Maria, alcancemos as alegrias da vida eterna. Pelo mesmo Cristo, nosso Senhor. Amém." },
  { id: "ato-de-contricao", title: "Ato de Contrição", category: "traditional", source: COMPENDIO,
    text: "Meu Deus, porque sois infinitamente bom e Vos amo de todo o meu coração, pesa-me de Vos ter ofendido e, com o auxílio da vossa divina graça, proponho firmemente emendar-me e nunca mais Vos tornar a ofender. Peço e espero o perdão das minhas culpas pela vossa infinita misericórdia. Amém." },
  { id: "vinde-espirito-santo", title: "Vinde, Espírito Santo", category: "traditional", source: COMPENDIO,
    text: "Vinde, Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do vosso amor.\n\nV. Enviai o vosso Espírito e tudo será criado.\nR. E renovareis a face da terra.\n\nOremos. Ó Deus, que instruístes os corações dos vossos fiéis com a luz do Espírito Santo, concedei-nos que no mesmo Espírito saibamos o que é reto e gozemos sempre da sua consolação. Por Cristo, nosso Senhor. Amém." },
  { id: "eterno-descanso", title: "Pelos fiéis defuntos (Eterno descanso)", category: "traditional", source: COMPENDIO,
    text: "Dai-lhes, Senhor, o eterno descanso, e brilhe para eles a luz perpétua. Descansem em paz. Amém." },
  { id: "lembrai-vos", title: "Lembrai-Vos (São Bernardo)", category: "traditional", source: COMPENDIO,
    text: "Lembrai-Vos, ó piíssima Virgem Maria, que nunca se ouviu dizer que algum daqueles que têm recorrido à vossa proteção, implorado a vossa assistência e reclamado o vosso socorro, fosse por Vós desamparado. Animado eu, pois, com igual confiança, a Vós, ó Virgem entre todas singular, como a Mãe recorro, de Vós me valho e, gemendo sob o peso dos meus pecados, me prostro aos vossos pés. Não desprezeis as minhas súplicas, ó Mãe do Verbo de Deus humanado, mas dignai-Vos de as ouvir propícia e de me alcançar o que Vos rogo. Amém." },
  { id: "sao-miguel", title: "Oração a São Miguel Arcanjo", category: "saints", source: { label: "Oração do Papa Leão XIII · recomendada por São João Paulo II (Regina Caeli, 24/4/1994)", url: "https://www.vatican.va/content/john-paul-ii/it/angelus/1994/documents/hf_jp-ii_reg_19940424.html" },
    text: "São Miguel Arcanjo, defendei-nos no combate; sede o nosso refúgio contra a maldade e as ciladas do demônio. Ordene-lhe Deus, instantemente o pedimos; e vós, príncipe da milícia celeste, pela virtude divina, precipitai no inferno a Satanás e aos outros espíritos malignos que andam pelo mundo para perder as almas. Amém." },
];

export const PRAYER_TEXTS: Record<string, string> = Object.fromEntries(PRAYERS.map((p) => [p.id, p.text]));
export const getPrayer = (id: string) => PRAYERS.find((p) => p.id === id);
