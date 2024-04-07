export const languages = {
  en: "English",
  ru: "Русский",
  fr: "Français",
  de: "Deutsch",
  es: "Español",
  it: "Italiano",
  id: "Indonesia",
  pt: "Português",
  tr: "Türkçe",
  vi: "Tiếng Việt",
  th: "ภาษาไทย",
  ja: "日本語",
  ko: "한국어",
  chs: "简体中文",
  cht: "繁體中文",
} as const;

export const imports = {
  en: () => import("./langs/en"),
  ru: () => import("./langs/ru"),
  fr: () => import("./langs/fr"),
  de: () => import("./langs/de"),
  es: () => import("./langs/es"),
  it: () => import("./langs/it"),
  id: () => import("./langs/id"),
  pt: () => import("./langs/pt"),
  tr: () => import("./langs/tr"),
  vi: () => import("./langs/vi"),
  th: () => import("./langs/th"),
  ja: () => import("./langs/ja"),
  ko: () => import("./langs/ko"),
  chs: () => import("./langs/chs"),
  cht: () => import("./langs/cht"),
};

// Category ID -> Ach ID -> name, desc
export type AchsLocale = {
  achs: Record<string, Record<string, { name: string; desc: string }>>;
};

// Ach ID -> Task ID -> desc
export type TasksLocale = {
  tasks: Record<string, Record<string, string>>;
};
