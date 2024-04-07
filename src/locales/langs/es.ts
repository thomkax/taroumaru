import achievements from "./es-achs.json";
import tasks from "./es-tasks";

export default {
  general: {
    language: "Español",
  },
  ...achievements,
  ...tasks,
} as const;
