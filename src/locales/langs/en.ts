import achievements from "./en-achs.json";
import tasks from "./en-tasks";

export default {
  general: {
    language: "English",
  },
  ...achievements,
  ...tasks,
} as const;
