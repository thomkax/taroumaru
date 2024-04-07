import achievements from "./id-achs.json";
import tasks from "./id-tasks";

export default {
  general: {
    language: "Indonesia",
  },
  ...achievements,
  ...tasks,
} as const;
