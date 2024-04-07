import achievements from "./chs-achs.json";
import tasks from "./chs-tasks";

export default {
  general: {
    language: "简体中文",
  },
  ...achievements,
  ...tasks,
} as const;
