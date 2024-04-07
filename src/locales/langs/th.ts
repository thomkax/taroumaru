import achievements from "./th-achs.json";
import tasks from "./th-tasks";

export default {
  general: {
    language: "ภาษาไทย",
  },
  ...achievements,
  ...tasks,
} as const;
