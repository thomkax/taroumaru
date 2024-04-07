import achievements from "./it-achs.json";
import tasks from "./it-tasks";

export default {
  general: {
    language: "Italiano",
  },
  ...achievements,
  ...tasks,
} as const;
