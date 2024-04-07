import achievements from "./ja-achs.json";
import tasks from "./ja-tasks";

export default {
  general: {
    language: "日本語",
  },
  ...achievements,
  ...tasks,
} as const;
