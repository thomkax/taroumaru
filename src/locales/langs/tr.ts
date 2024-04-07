import achievements from "./tr-achs.json";
import tasks from "./tr-tasks";

export default {
  general: {
    language: "Türkçe",
  },
  ...achievements,
  ...tasks,
} as const;
