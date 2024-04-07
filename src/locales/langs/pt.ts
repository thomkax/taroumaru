import achievements from "./pt-achs.json";
import tasks from "./pt-tasks";

export default {
  general: {
    language: "Português",
  },
  ...achievements,
  ...tasks,
} as const;
