import achievements from "./fr-achs.json";
import tasks from "./fr-tasks";

export default {
  general: {
    language: "Français",
  },
  ...achievements,
  ...tasks,
} as const;
