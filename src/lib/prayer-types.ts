export type Prayer = {
  id: string;
  title: string;
  text: string;
  category: "traditional" | "saints";
  source: { label: string; url: string };
};

export type MysteryId = "gozosos" | "luminosos" | "dolorosos" | "gloriosos";
export type Mystery = { title: string; meditation: string; scripture: string };
export type MysterySet = { id: MysteryId; title: string; days: string; mysteries: Mystery[] };
export type RosaryStep = {
  id: string;
  title: string;
  text: string;
  section: string;
  decade?: number;
  bead?: number;
  mystery?: Mystery;
};
export type RosarySession = {
  mysteryId: MysteryId;
  includeFatima: boolean;
  index: number;
  paused: boolean;
  completed: boolean;
};