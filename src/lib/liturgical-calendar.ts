// Calendário Romano Geral (com próprios do Brasil), em português.
export type Rank = "Solenidade" | "Festa" | "Memória" | "Memória facultativa" | "Celebração";
export type Celebration = { name: string; rank: Rank };
export type Season = "Advento" | "Tempo do Natal" | "Tempo Comum" | "Quaresma" | "Tríduo Pascal" | "Tempo Pascal";

const S = "Solenidade", F = "Festa", M = "Memória", MF = "Memória facultativa";
type Row = [string, Rank, string];

// MM-DD | grau | nome
const FIXED: Row[] = [
  ["01-01", S, "Santa Maria, Mãe de Deus"], ["01-02", M, "São Basílio Magno e São Gregório Nazianzeno"], ["01-03", MF, "Santíssimo Nome de Jesus"],
  ["01-07", MF, "São Raimundo de Penyafort"], ["01-13", MF, "Santo Hilário"], ["01-17", M, "Santo Antão"], ["01-20", MF, "São Fabiano e São Sebastião"],
  ["01-21", M, "Santa Inês"], ["01-22", MF, "São Vicente, diácono"], ["01-24", M, "São Francisco de Sales"], ["01-25", F, "Conversão de São Paulo"],
  ["01-26", M, "São Timóteo e São Tito"], ["01-27", MF, "Santa Ângela Merici"], ["01-28", M, "São Tomás de Aquino"], ["01-31", M, "São João Bosco"],
  ["02-02", F, "Apresentação do Senhor"], ["02-03", MF, "São Brás; Santo Oscar"], ["02-05", M, "Santa Águeda"], ["02-06", M, "São Paulo Miki e companheiros"],
  ["02-08", MF, "São Jerônimo Emiliani; Santa Josefina Bakhita"], ["02-10", M, "Santa Escolástica"], ["02-11", MF, "Nossa Senhora de Lourdes"],
  ["02-14", M, "São Cirilo e São Metódio"], ["02-17", MF, "Sete Santos Fundadores dos Servitas"], ["02-21", MF, "São Pedro Damião"],
  ["02-22", F, "Cátedra de São Pedro"], ["02-23", M, "São Policarpo"],
  ["03-04", MF, "São Casimiro"], ["03-07", M, "Santas Perpétua e Felicidade"], ["03-08", MF, "São João de Deus"], ["03-09", MF, "Santa Francisca Romana"],
  ["03-17", MF, "São Patrício"], ["03-18", MF, "São Cirilo de Jerusalém"], ["03-19", S, "São José, esposo da Virgem Maria"],
  ["03-23", MF, "São Turíbio de Mogrovejo"], ["03-25", S, "Anunciação do Senhor"],
  ["04-02", MF, "São Francisco de Paula"], ["04-04", MF, "Santo Isidoro"], ["04-05", MF, "São Vicente Ferrer"], ["04-07", M, "São João Batista de La Salle"],
  ["04-11", M, "Santo Estanislau"], ["04-13", MF, "São Martinho I"], ["04-21", MF, "Santo Anselmo"], ["04-23", MF, "São Jorge; Santo Adalberto"],
  ["04-24", MF, "São Fidélis de Sigmaringa"], ["04-25", F, "São Marcos, evangelista"], ["04-28", MF, "São Pedro Chanel; São Luís Maria Grignion de Montfort"],
  ["04-29", M, "Santa Catarina de Sena"], ["04-30", MF, "São Pio V"],
  ["05-01", MF, "São José Operário"], ["05-02", M, "Santo Atanásio"], ["05-03", F, "São Filipe e São Tiago, apóstolos"], ["05-10", MF, "São João de Ávila"],
  ["05-12", MF, "São Nereu e Santo Aquiles; São Pancrácio"], ["05-13", MF, "Nossa Senhora de Fátima"], ["05-14", F, "São Matias, apóstolo"],
  ["05-18", MF, "São João I"], ["05-20", MF, "São Bernardino de Sena"], ["05-21", MF, "São Cristóvão Magallanes e companheiros"],
  ["05-22", MF, "Santa Rita de Cássia"], ["05-25", MF, "São Beda; São Gregório VII; Santa Maria Madalena de Pazzi"], ["05-26", M, "São Filipe Néri"],
  ["05-27", MF, "Santo Agostinho de Cantuária"], ["05-29", MF, "São Paulo VI"], ["05-31", F, "Visitação de Nossa Senhora"],
  ["06-01", M, "São Justino"], ["06-02", MF, "São Marcelino e São Pedro"], ["06-03", M, "São Carlos Lwanga e companheiros"], ["06-05", M, "São Bonifácio"],
  ["06-06", MF, "São Norberto"], ["06-09", M, "São José de Anchieta (Brasil); Santo Efrém"], ["06-11", M, "São Barnabé, apóstolo"],
  ["06-13", M, "Santo Antônio de Pádua"], ["06-19", MF, "São Romualdo"], ["06-21", M, "São Luís Gonzaga"],
  ["06-22", MF, "São Paulino de Nola; São João Fisher e São Tomás More"], ["06-24", S, "Nascimento de São João Batista"],
  ["06-27", MF, "São Cirilo de Alexandria"], ["06-28", M, "Santo Irineu"], ["06-29", S, "São Pedro e São Paulo, apóstolos"],
  ["06-30", MF, "Primeiros Santos Mártires da Igreja de Roma"],
  ["07-03", F, "São Tomé, apóstolo"], ["07-04", MF, "Santa Isabel de Portugal"], ["07-05", MF, "Santo Antônio Maria Zaccaria"], ["07-06", MF, "Santa Maria Goretti"],
  ["07-09", M, "Santa Paulina do Coração Agonizante de Jesus (Brasil); Santo Agostinho Zhao Rong e companheiros"], ["07-11", M, "São Bento"],
  ["07-13", MF, "Santo Henrique"], ["07-14", MF, "São Camilo de Lellis"], ["07-15", M, "São Boaventura"], ["07-16", MF, "Nossa Senhora do Carmo"],
  ["07-20", MF, "Santo Apolinário"], ["07-21", MF, "São Lourenço de Brindisi"], ["07-22", F, "Santa Maria Madalena"], ["07-23", MF, "Santa Brígida"],
  ["07-24", MF, "São Charbel Makhlouf"], ["07-25", F, "São Tiago, apóstolo"], ["07-26", M, "São Joaquim e Sant'Ana, pais de Nossa Senhora"],
  ["07-29", M, "Santa Marta, Santa Maria e São Lázaro"], ["07-30", MF, "São Pedro Crisólogo"], ["07-31", M, "Santo Inácio de Loyola"],
  ["08-01", M, "Santo Afonso Maria de Ligório"], ["08-02", MF, "Santo Eusébio de Vercelli; São Pedro Julião Eymard"], ["08-04", M, "São João Maria Vianney"],
  ["08-05", MF, "Dedicação da Basílica de Santa Maria Maior"], ["08-06", F, "Transfiguração do Senhor"], ["08-07", MF, "São Sisto II e companheiros; São Caetano"],
  ["08-08", M, "São Domingos"], ["08-09", MF, "Santa Teresa Benedita da Cruz"], ["08-10", F, "São Lourenço, diácono e mártir"], ["08-11", M, "Santa Clara"],
  ["08-12", MF, "Santa Joana Francisca de Chantal"], ["08-13", MF, "São Ponciano e Santo Hipólito"], ["08-14", M, "São Maximiliano Maria Kolbe"],
  ["08-15", S, "Assunção de Nossa Senhora"], ["08-16", MF, "Santo Estêvão da Hungria"], ["08-19", MF, "São João Eudes"], ["08-20", M, "São Bernardo"],
  ["08-21", M, "São Pio X"], ["08-22", M, "Nossa Senhora Rainha"], ["08-23", MF, "Santa Rosa de Lima"], ["08-24", F, "São Bartolomeu, apóstolo"],
  ["08-25", MF, "São Luís de França; São José de Calasanz"], ["08-27", M, "Santa Mônica"], ["08-28", M, "Santo Agostinho"], ["08-29", M, "Martírio de São João Batista"],
  ["09-03", M, "São Gregório Magno"], ["09-08", F, "Natividade de Nossa Senhora"], ["09-09", MF, "São Pedro Claver"], ["09-12", MF, "Santíssimo Nome de Maria"],
  ["09-13", M, "São João Crisóstomo"], ["09-14", F, "Exaltação da Santa Cruz"], ["09-15", M, "Nossa Senhora das Dores"], ["09-16", M, "São Cornélio e São Cipriano"],
  ["09-17", MF, "São Roberto Belarmino; Santa Hildegarda de Bingen"], ["09-19", MF, "São Januário"], ["09-20", M, "Santo André Kim Taegon, São Paulo Chong Hasang e companheiros"],
  ["09-21", F, "São Mateus, apóstolo e evangelista"], ["09-23", M, "São Pio de Pietrelcina"], ["09-26", MF, "São Cosme e São Damião"], ["09-27", M, "São Vicente de Paulo"],
  ["09-28", MF, "São Venceslau; São Lourenço Ruiz e companheiros"], ["09-29", F, "São Miguel, São Gabriel e São Rafael, arcanjos"], ["09-30", M, "São Jerônimo"],
  ["10-01", M, "Santa Teresinha do Menino Jesus"], ["10-02", M, "Santos Anjos da Guarda"], ["10-03", M, "Santos Mártires de Cunhaú e Uruaçu (Brasil)"],
  ["10-04", M, "São Francisco de Assis"], ["10-05", MF, "Santa Faustina Kowalska"], ["10-06", MF, "São Bruno"], ["10-07", M, "Nossa Senhora do Rosário"],
  ["10-09", MF, "São Dionísio e companheiros; São João Leonardi"], ["10-11", MF, "São João XXIII"], ["10-12", S, "Nossa Senhora da Conceição Aparecida, Padroeira do Brasil"],
  ["10-14", MF, "São Calisto I"], ["10-15", M, "Santa Teresa de Jesus"], ["10-16", MF, "Santa Edviges; Santa Margarida Maria Alacoque"],
  ["10-17", M, "Santo Inácio de Antioquia"], ["10-18", F, "São Lucas, evangelista"], ["10-19", MF, "São João de Brébeuf, Santo Isaac Jogues e companheiros; São Paulo da Cruz"],
  ["10-22", MF, "São João Paulo II"], ["10-23", MF, "São João de Capistrano"], ["10-24", MF, "Santo Antônio Maria Claret"],
  ["10-25", M, "Santo Antônio de Sant'Ana Galvão (Brasil)"], ["10-28", F, "São Simão e São Judas, apóstolos"],
  ["11-01", S, "Todos os Santos"], ["11-02", "Celebração", "Comemoração de Todos os Fiéis Defuntos"], ["11-03", MF, "São Martinho de Porres"],
  ["11-04", M, "São Carlos Borromeu"], ["11-09", F, "Dedicação da Basílica do Latrão"], ["11-10", M, "São Leão Magno"], ["11-11", M, "São Martinho de Tours"],
  ["11-12", M, "São Josafá"], ["11-15", MF, "Santo Alberto Magno"], ["11-16", MF, "Santa Margarida da Escócia; Santa Gertrudes"], ["11-17", M, "Santa Isabel da Hungria"],
  ["11-18", MF, "Dedicação das Basílicas de São Pedro e São Paulo"], ["11-21", M, "Apresentação de Nossa Senhora"], ["11-22", M, "Santa Cecília"],
  ["11-23", MF, "São Clemente I; São Columbano"], ["11-24", M, "Santo André Dung-Lac e companheiros"], ["11-25", MF, "Santa Catarina de Alexandria"],
  ["11-30", F, "Santo André, apóstolo"],
  ["12-03", M, "São Francisco Xavier"], ["12-04", MF, "São João Damasceno"], ["12-06", MF, "São Nicolau"], ["12-07", M, "Santo Ambrósio"],
  ["12-08", S, "Imaculada Conceição de Nossa Senhora"], ["12-09", MF, "São João Diego"], ["12-11", MF, "São Dâmaso I"],
  ["12-12", F, "Nossa Senhora de Guadalupe, Padroeira da América Latina"], ["12-13", M, "Santa Luzia"], ["12-14", M, "São João da Cruz"],
  ["12-21", MF, "São Pedro Canísio"], ["12-23", MF, "São João Câncio"], ["12-25", S, "Natal do Senhor"], ["12-26", F, "Santo Estêvão, primeiro mártir"],
  ["12-27", F, "São João, apóstolo e evangelista"], ["12-28", F, "Santos Inocentes, mártires"], ["12-29", MF, "São Tomás Becket"], ["12-31", MF, "São Silvestre I"],
];

export const FIXED_CELEBRATIONS: Record<string, Celebration> = Object.fromEntries(FIXED.map(([d, rank, name]) => [d, { name, rank }]));

const DAY = 86400000;
const utc = (y: number, m: number, d: number) => new Date(Date.UTC(y, m, d));
const add = (date: Date, days: number) => new Date(date.getTime() + days * DAY);
export const key = (d: Date) => `${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
const iso = (d: Date) => d.toISOString().slice(0, 10);

export function easter(year: number): Date {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
  return utc(year, month - 1, day);
}

export function firstAdvent(year: number) {
  const christmas = utc(year, 11, 25);
  return add(christmas, -(christmas.getUTCDay() || 7) - 21);
}

// No Brasil, Epifania, Ascensão, Pedro e Paulo, Assunção e Todos os Santos vão para o domingo.
export function moveable(year: number): Record<string, Celebration> {
  const e = easter(year);
  const out: Record<string, Celebration> = {};
  const set = (d: Date, name: string, rank: Rank) => { out[iso(d)] = { name, rank }; };
  const jan2 = utc(year, 0, 2);
  const epiphany = add(jan2, (7 - jan2.getUTCDay()) % 7);
  set(epiphany, "Epifania do Senhor", S);
  set(epiphany.getUTCDate() >= 7 ? add(epiphany, 1) : add(epiphany, 7), "Batismo do Senhor", F);
  set(add(e, -46), "Quarta-feira de Cinzas", "Celebração");
  set(add(e, -7), "Domingo de Ramos da Paixão do Senhor", "Celebração");
  set(add(e, -3), "Quinta-feira Santa — Ceia do Senhor", "Celebração");
  set(add(e, -2), "Sexta-feira da Paixão do Senhor", "Celebração");
  set(add(e, -1), "Sábado Santo — Vigília Pascal", "Celebração");
  set(e, "Domingo da Páscoa da Ressurreição do Senhor", S);
  set(add(e, 7), "Domingo da Divina Misericórdia", "Celebração");
  set(add(e, 42), "Ascensão do Senhor", S);
  set(add(e, 49), "Pentecostes", S);
  set(add(e, 50), "Bem-aventurada Virgem Maria, Mãe da Igreja", M);
  set(add(e, 56), "Santíssima Trindade", S);
  set(add(e, 60), "Santíssimo Corpo e Sangue de Cristo (Corpus Christi)", S);
  set(add(e, 68), "Sagrado Coração de Jesus", S);
  set(add(e, 69), "Imaculado Coração de Maria", M);
  const sundayBetween = (m: number, from: number) => { const d = utc(year, m, from); return add(d, (7 - d.getUTCDay()) % 7); };
  set(sundayBetween(5, 28), "São Pedro e São Paulo, apóstolos", S);
  const aug15 = utc(year, 7, 15);
  if (aug15.getUTCDay() !== 0) set(add(aug15, 7 - aug15.getUTCDay()), "Assunção de Nossa Senhora", S);
  set(sundayBetween(10, 2), "Todos os Santos", S);
  set(add(firstAdvent(year), -7), "Nosso Senhor Jesus Cristo, Rei do Universo", S);
  const xmas = utc(year, 11, 25);
  set(xmas.getUTCDay() === 0 ? utc(year, 11, 30) : add(xmas, 7 - xmas.getUTCDay()), "Sagrada Família de Jesus, Maria e José", F);
  return out;
}

export function seasonOf(date: Date): Season {
  const y = date.getUTCFullYear(), e = easter(y), t = date.getTime();
  const baptism = Object.entries(moveable(y)).find(([, c]) => c.name === "Batismo do Senhor")![0];
  if (t <= new Date(baptism).getTime()) return "Tempo do Natal";
  if (t >= utc(y, 11, 25).getTime()) return "Tempo do Natal";
  if (t >= firstAdvent(y).getTime()) return "Advento";
  if (t >= add(e, -46).getTime() && t < add(e, -3).getTime()) return "Quaresma";
  if (t >= add(e, -3).getTime() && t < e.getTime()) return "Tríduo Pascal";
  if (t >= e.getTime() && t <= add(e, 49).getTime()) return "Tempo Pascal";
  return "Tempo Comum";
}

const RANK_ORDER: Rank[] = [S, "Celebração", F, M, MF];

export function celebrationsFor(year: number, month: number, day: number): Celebration[] {
  const d = utc(year, month, day);
  const list: Celebration[] = [];
  const mv = moveable(year)[iso(d)];
  if (mv) list.push(mv);
  const fx = FIXED_CELEBRATIONS[key(d)];
  const transferred = ["06-29", "08-15", "11-01"].includes(key(d)) && Object.values(moveable(year)).some((c) => c.name === fx?.name) && mv?.name !== fx?.name;
  if (fx && !transferred && fx.name !== mv?.name) list.push(fx);
  return list.sort((a, b) => RANK_ORDER.indexOf(a.rank) - RANK_ORDER.indexOf(b.rank));
}

export const MONTHS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
export const CALENDAR_SOURCE = { label: "Calendário Romano Geral e próprio do Brasil (CNBB)", url: "https://www.cnbb.org.br/liturgia-diaria/" };
