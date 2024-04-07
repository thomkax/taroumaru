import achievements from "./ru-achs.json";
import tasks from "./ru-tasks";

export default {
  general: {
    language: "Русский",
  },
  ...achievements,
  ...tasks,
} as const;
