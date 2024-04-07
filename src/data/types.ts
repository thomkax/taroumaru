import AchievementTag from "./tags";

export type Ach = {
  id: number;
  name: string;
  gems: number;
  version: string;
};

export type AchGroup = Ach[];
export type AchCategory = {
  id: number;
  name: string;
  count: number;
  gems: number;
  achs: (Ach | AchGroup)[];
};
export type AchievementData = {
  categories: AchCategory[];
  totalAchs: number;
  totalGems: number;
};

export type AchievementMetadata = Record<
  string,
  {
    tasks?: number;
    url?: string;
    tags?: AchievementTag[];
  }
>;
