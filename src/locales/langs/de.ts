import achievements from "./de-achs.json";
import tasks from "./de-tasks";

export default {
  general: {
    language: "Deutsch",
  },
  ...achievements,
  ...tasks,
} as const;
