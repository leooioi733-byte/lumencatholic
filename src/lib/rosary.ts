import type { MysteryId, MysterySet, RosaryStep } from "./prayer-types";

export const MYSTERY_SETS: MysterySet[] = [
  { id: "gozosos", title: "Mistérios gozosos", days: "Segunda-feira e sábado", mysteries: [
    { title: "A Anunciação", meditation: "Maria acolhe a mensagem do anjo e responde com fé ao chamado de Deus.", scripture: "Lc 1,26–38" },
    { title: "A Visitação", meditation: "Maria visita Isabel e leva com alegria a presença de Jesus.", scripture: "Lc 1,39–56" },
    { title: "O Nascimento de Jesus", meditation: "O Filho de Deus nasce em Belém e é acolhido por Maria, José e os pastores.", scripture: "Lc 2,1–20" },
    { title: "A Apresentação de Jesus no Templo", meditation: "Maria e José apresentam Jesus ao Senhor; Simeão reconhece nele a salvação.", scripture: "Lc 2,22–40" },
    { title: "O Encontro de Jesus no Templo", meditation: "Maria e José encontram Jesus entre os mestres, ocupado com as coisas do Pai.", scripture: "Lc 2,41–52" },
  ] },
  { id: "luminosos", title: "Mistérios luminosos", days: "Quinta-feira", mysteries: [
    { title: "O Batismo de Jesus no Jordão", meditation: "O Pai revela Jesus como seu Filho amado, e o Espírito Santo desce sobre ele.", scripture: "Mt 3,13–17" },
    { title: "A Revelação de Jesus nas Bodas de Caná", meditation: "A pedido de Maria, Jesus realiza seu primeiro sinal e manifesta sua glória.", scripture: "Jo 2,1–11" },
    { title: "O Anúncio do Reino de Deus", meditation: "Jesus anuncia o Reino e convida à conversão e à fé no Evangelho.", scripture: "Mc 1,14–15" },
    { title: "A Transfiguração de Jesus", meditation: "Jesus manifesta sua glória aos discípulos; o Pai os convida a escutá-lo.", scripture: "Mt 17,1–8" },
    { title: "A Instituição da Eucaristia", meditation: "Na Última Ceia, Jesus entrega seu Corpo e seu Sangue como alimento e aliança.", scripture: "Lc 22,14–20" },
  ] },
  { id: "dolorosos", title: "Mistérios dolorosos", days: "Terça-feira e sexta-feira", mysteries: [
    { title: "A Agonia de Jesus no Horto", meditation: "Jesus reza no Getsêmani e se entrega à vontade do Pai.", scripture: "Mt 26,36–46" },
    { title: "A Flagelação de Jesus", meditation: "Jesus é açoitado antes de ser entregue para a crucifixão.", scripture: "Jo 19,1" },
    { title: "A Coroação de Espinhos", meditation: "Jesus suporta a humilhação dos soldados, que o coroam de espinhos.", scripture: "Mt 27,27–31" },
    { title: "Jesus Carrega a Cruz", meditation: "Jesus caminha até o Calvário carregando a cruz.", scripture: "Jo 19,16–17" },
    { title: "A Crucifixão e Morte de Jesus", meditation: "Jesus entrega sua vida na cruz por amor e confia seu espírito ao Pai.", scripture: "Lc 23,33–46" },
  ] },
  { id: "gloriosos", title: "Mistérios gloriosos", days: "Quarta-feira e domingo", mysteries: [
    { title: "A Ressurreição de Jesus", meditation: "Jesus ressuscita dos mortos: a vida vence a morte e renova nossa esperança.", scripture: "Lc 24,1–12" },
    { title: "A Ascensão de Jesus", meditation: "Jesus sobe ao céu e envia os discípulos a testemunhar o Evangelho.", scripture: "At 1,6–11" },
    { title: "A Vinda do Espírito Santo", meditation: "Em Pentecostes, o Espírito Santo fortalece a Igreja reunida em oração.", scripture: "At 2,1–13" },
    { title: "A Assunção de Nossa Senhora", meditation: "Maria é elevada em corpo e alma à glória do céu, sinal da esperança da Igreja.", scripture: "CIC 966; cf. Ap 12,1 (imagem da mulher revestida de sol)" },
    { title: "A Coroação de Nossa Senhora", meditation: "Maria é exaltada pelo Senhor como Rainha do universo, unida à vitória de seu Filho.", scripture: "CIC 966; cf. Ap 12,1" },
  ] },
];

export const ROSARY_SOURCE = { label: "Vaticano · O Santo Rosário", url: "https://www.vatican.va/special/rosary/rosary_po.html" };
export const MYSTERY_SOURCE = { label: "São João Paulo II · Rosarium Virginis Mariae, 19–23 e 38", url: "https://www.vatican.va/content/john-paul-ii/pt/apost_letters/2002/documents/hf_jp-ii_apl_20021016_rosarium-virginis-mariae.html" };

export function mysteriesForDay(day: number): MysteryId {
  return (["gloriosos", "gozosos", "dolorosos", "gloriosos", "luminosos", "dolorosos", "gozosos"] as const)[day] ?? "gozosos";
}

export function getMysterySet(id: MysteryId) {
  return MYSTERY_SETS.find((set) => set.id === id) ?? MYSTERY_SETS[0];
}

// Texts are injected from the shared catalog, never duplicated in the reader.
export function buildRosary(mysteryId: MysteryId, includeFatima: boolean, texts: Record<string, string>): RosaryStep[] {
  const set = getMysterySet(mysteryId);
  const steps: RosaryStep[] = [];
  const add = (id: string, title: string, text: string, section: string, extra: Partial<RosaryStep> = {}) => steps.push({ id, title, text, section, ...extra });
  add("inicio-cruz", "Sinal da Cruz", texts["sinal-da-cruz"], "Orações iniciais");
  add("inicio-credo", "Credo", texts.credo, "Orações iniciais");
  add("inicio-pai-nosso", "Pai-Nosso", texts["pai-nosso"], "Orações iniciais");
  ["Pela fé", "Pela esperança", "Pela caridade"].forEach((intention, i) => add(`inicio-ave-${i + 1}`, `Ave-Maria ${i + 1} de 3`, texts["ave-maria"], intention));
  add("inicio-gloria", "Glória ao Pai", texts["gloria-ao-pai"], "Orações iniciais");
  set.mysteries.forEach((mystery, i) => {
    const decade = i + 1;
    const extra = { decade, mystery };
    const section = `${decade}ª dezena · ${mystery.title}`;
    add(`dezena-${decade}-misterio`, `${decade}º mistério · ${mystery.title}`, mystery.meditation, set.title, extra);
    add(`dezena-${decade}-pai-nosso`, "Pai-Nosso", texts["pai-nosso"], section, extra);
    for (let bead = 1; bead <= 10; bead++) add(`dezena-${decade}-ave-${bead}`, `Ave-Maria ${bead} de 10`, texts["ave-maria"], section, { ...extra, bead });
    add(`dezena-${decade}-gloria`, "Glória ao Pai", texts["gloria-ao-pai"], section, extra);
    if (includeFatima) add(`dezena-${decade}-fatima`, "Oração de Fátima", texts.fatima, section, extra);
  });
  add("final-agradecimento", "Agradecimento do Terço", texts.agradecimento, "Orações finais");
  add("final-salve", "Salve-Rainha", texts["salve-rainha"], "Orações finais");
  add("final-responsorio", "Rogai por nós", texts.responsorio, "Orações finais");
  add("final-cruz", "Sinal da Cruz", texts["sinal-da-cruz"], "Orações finais");
  return steps;
}