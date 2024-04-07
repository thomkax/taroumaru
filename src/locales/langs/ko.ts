import achievements from "./ko-achs.json";
import tasks from "./ko-tasks";

export default {
  general: {
    language: "한국어",
  },
  ...achievements,
  ...tasks,
} as const;
