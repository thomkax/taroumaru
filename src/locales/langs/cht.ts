import achievements from "./cht-achs.json";
import tasks from "./cht-tasks";

export default {
  general: {
    language: "繁體中文",
  },
  ...achievements,
  ...tasks,
} as const;
