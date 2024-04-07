import achievements from "./vi-achs.json";
import tasks from "./vi-tasks";

export default {
  general: {
    language: "Tiếng Việt",
  },
  ...achievements,
  ...tasks,
} as const;
