import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import Data from "@/data/data.json";
import * as Local from "./localStorage";
import searchSlice from "./search.slice";
import { RootState } from "./store";
import miscSlice from "./misc.slice";
import metadata from "@/data/metadata";
import { Ach, AchCategory } from "@/data/types";

export const achsSlice = createSlice({
  name: "achs",
  initialState: {
    value: {
      // Stored values
      achs: {} as Local.Schema["@achs"],
      tasks: {} as Local.Schema["@tasks"],
      profiles: [] as Local.Schema["@profiles"],
      uuid: "",

      // Calculated values
      filtered: [] as AchCategory[],
      totalAchs: 0,
      totalGems: 0,
      completedAchsPerCategory: [] as number[],
    },
  },
  reducers: {
    // Initialization from client component to get data from local storage
    init: (state) => {
      const profiles = initProfiles();
      const uuid = initUUID(profiles);
      const achs = initAchs();
      const tasks = initTasks();

      let totalAchs = 0;
      let totalGems = 0;
      const categoryAchs: number[] = Array(Data.categories.length).fill(0);
      const profileAchs = achs[uuid] ?? {};

      for (const category of Data.categories) {
        let categoryAchCount = 0;

        for (const ach of category.achs.flat()) {
          if (profileAchs?.[ach.id]) {
            totalAchs += 1;
            totalGems += ach.gems;
            categoryAchCount += 1;
          }
        }

        categoryAchs[category.id] = categoryAchCount;
      }

      state.value = {
        achs,
        tasks,
        profiles,
        uuid,

        filtered: [],
        totalAchs,
        totalGems,
        completedAchsPerCategory: categoryAchs,
      };
    },

    filterAchs: (
      state,
      action: PayloadAction<{
        search: ReturnType<typeof searchSlice>["value"];
        misc: ReturnType<typeof miscSlice>["value"];
      }>,
    ) => {
      const search = action.payload.search;
      const misc = action.payload.misc;
      const searchText = search.text.toLowerCase();
      const result: AchCategory[] = [];
      const categoryAchs: number[] = Array(Data.categories.length).fill(0);
      let totalAchs = 0;
      let totalGems = 0;

      const uuid = state.value.uuid;
      const achs = state.value.achs[uuid] ?? {};

      for (const category of Data.categories) {
        const filteredCategory = { ...category };
        filteredCategory.achs = [];
        let completedCount = 0;

        for (const ach of category.achs) {
          const isArray = Array.isArray(ach);

          if (isArray) {
            ach.forEach((e) => {
              if (achs[e.id]) {
                totalAchs++;
                totalGems += e.gems;
              }
            });
          } else {
            if (achs[ach.id]) {
              totalAchs++;
              totalGems += ach.gems;
            }
          }

          const firstAch = isArray ? ach[0] : ach;
          const meta = metadata[firstAch.id]?.tags;

          // True if should be hidden
          const hideCompleted =
            search.hide &&
            (isArray
              ? ach.map((e) => achs[e.id]).every((e) => e)
              : achs[ach.id]);

          const nameMatch =
            misc
              .i18n(`achs.${category.id}.${firstAch.id}.name`)
              .toLowerCase()
              .indexOf(searchText) === -1;

          const descMatch = isArray
            ? ach
                .map(
                  (a) =>
                    misc
                      .i18n(`achs.${category.id}.${a.id}.desc`)
                      .toLowerCase()
                      .indexOf(searchText) === -1,
                )
                .every((e) => e === true)
            : misc
                .i18n(`achs.${category.id}.${ach.id}.desc`)
                .toLowerCase()
                .indexOf(searchText) === -1;

          const textMatch = nameMatch && descMatch;

          const versionMatch =
            search.versions.length > 0 &&
            !search.versions.some((e) => e === firstAch.version);

          const tagMatch =
            search.tags.length > 0 &&
            !search.tags.every((e) => meta?.includes(e));

          if (hideCompleted || textMatch || versionMatch || tagMatch) continue;

          if (isArray) {
            completedCount += ach.reduce(
              (prev, e) => prev + (achs[e.id] ? 1 : 0),
              0,
            );
          } else {
            if (achs[ach.id]) completedCount++;
          }

          filteredCategory.achs.push(ach);
        }

        categoryAchs[category.id] = completedCount;
        result.push(filteredCategory);
      }

      state.value.totalAchs = totalAchs;
      state.value.totalGems = totalGems;
      state.value.completedAchsPerCategory = categoryAchs;
      state.value.filtered = result;
    },

    toggleAchs: (
      state,
      action: PayloadAction<{
        achs: Ach[];
        state: boolean;
        category: number;
      }>,
    ) => {
      const achs = state.value.achs;
      let profileAchs = achs[state.value.uuid];
      if (profileAchs === undefined) {
        profileAchs = achs[state.value.uuid] = {};
      }

      const changedAchs = action.payload.achs;
      const toggleState = action.payload.state;
      let countChange = 0;
      let gemChange = 0;

      for (const ach of changedAchs) {
        if (!!profileAchs[ach.id] === toggleState) continue;

        if (toggleState) {
          countChange++;
          gemChange += ach.gems;
          profileAchs[ach.id] = true;
        } else {
          countChange--;
          gemChange -= ach.gems;
          delete profileAchs[ach.id];
        }
      }

      state.value.totalAchs += countChange;
      state.value.totalGems += gemChange;
      state.value.completedAchsPerCategory[action.payload.category] +=
        countChange;

      Local.set("@achs", achs);
    },

    toggleTask: (
      state,
      action: PayloadAction<{
        ach: number;
        task: number;
      }>,
    ) => {
      const { ach, task } = action.payload;
      const tasks = state.value.tasks;
      let profileTasks = tasks[state.value.uuid];
      if (profileTasks === undefined) {
        profileTasks = tasks[state.value.uuid] = {};
      }
      const toggleState = profileTasks[ach]?.[task] ?? false;

      // If false - toggle to true
      if (!toggleState) {
        // Create a new task obj if its not defined
        profileTasks[ach] = profileTasks[ach] ?? {};
        profileTasks[ach][task] = true;
      } else {
        delete profileTasks[ach][task];
        if (Object.keys(profileTasks[ach]).length === 0) {
          delete profileTasks[ach];
        }
      }

      Local.set("@tasks", tasks);
    },

    setProfile: (state, action: PayloadAction<string>) => {
      state.value.uuid = action.payload;
      Local.set("@uuid", action.payload);
    },

    addProfile: (state) => {
      const index = state.value.profiles.length;

      state.value.profiles.push({
        uuid: crypto.randomUUID(),
        name: `Profile #${index}`,
        index: index,
      });

      Local.set("@profiles", state.value.profiles);
    },

    deleteProfile: (state, action: PayloadAction<string>) => {
      const uuid = action.payload;
      const index = state.value.profiles.findIndex((e) => e.uuid === uuid);

      if (index > -1) {
        const profile = state.value.profiles[index];

        state.value.profiles.splice(index, 1);
        state.value.profiles.forEach((e) =>
          profile.index < e.index ? e.index-- : e.index,
        );

        delete state.value.achs[uuid];
        delete state.value.tasks[uuid];

        Local.set("@profiles", state.value.profiles);
        Local.set("@achs", state.value.achs);
        Local.set("@tasks", state.value.tasks);
      }
    },

    renameProfile: (
      state,
      action: PayloadAction<{ uuid: string; name: string }>,
    ) => {
      const { uuid, name } = action.payload;
      const profile = state.value.profiles.find((e) => e.uuid === uuid);

      if (profile) {
        profile.name = name;
        Local.set("@profiles", state.value.profiles);
      }
    },

    moveProfile: (
      state,
      action: PayloadAction<{ uuid: string; index: number }>,
    ) => {
      const profiles = state.value.profiles;
      const { uuid, index } = action.payload;

      const selectedProfile = profiles.find((e) => e.uuid === uuid);
      if (selectedProfile?.index === index) return;

      if (selectedProfile) {
        const selectedIndex = selectedProfile.index;

        for (const profile of profiles) {
          const profileIndex = profile.index;

          if (profile === selectedProfile) {
            profile.index = index;
            continue;
          } else if (profileIndex >= index && profileIndex < selectedIndex) {
            profile.index++;
          } else if (profileIndex <= index && profileIndex > selectedIndex) {
            profile.index--;
          } else {
            continue;
          }
        }
      }

      Local.set("@profiles", profiles);
    },

    uploadData: (state, action: PayloadAction<any>) => {
      const file = action.payload;

      const profiles = file?.["@profiles"] as
        | Local.Schema["@profiles"]
        | undefined;

      if (profiles && Array.isArray(profiles)) {
        const achs = file?.["@achs"] as Local.Schema["@achs"] | undefined;
        const tasks = file?.["@tasks"] as Local.Schema["@tasks"] | undefined;

        for (const profile of profiles) {
          // If profile with same uuid already exists -
          // create a new profile with a new UUID and * next to a name.
          // Import all the data from previous UUID to a new one.
          if (state.value.profiles.some((e) => e.uuid === profile.uuid)) {
            const newUUID = crypto.randomUUID();

            state.value.profiles.push({
              uuid: newUUID,
              name: profile.name + "*",
              index: state.value.profiles.length,
            });

            if (achs?.[profile.uuid]) {
              state.value.achs[newUUID] = achs[profile.uuid];
            }

            if (tasks?.[profile.uuid]) {
              state.value.tasks[newUUID] = tasks[profile.uuid];
            }
          } else {
            state.value.profiles.push({
              uuid: profile.uuid,
              name: profile.name,
              index: state.value.profiles.length,
            });

            if (achs?.[profile.uuid]) {
              state.value.achs[profile.uuid] = achs[profile.uuid];
            }

            if (tasks?.[profile.uuid]) {
              state.value.tasks[profile.uuid] = tasks[profile.uuid];
            }
          }
        }

        Local.set("@profiles", state.value.profiles);
        Local.set("@achs", state.value.achs);
        Local.set("@tasks", state.value.tasks);
      }
    },
  },
});

function initProfiles() {
  let profiles = Local.get("@profiles");

  if (profiles === undefined) {
    profiles = [
      {
        uuid: crypto.randomUUID(),
        name: "Main",
        index: 0,
      },
    ];

    Local.set("@profiles", profiles);
  }

  return profiles;
}

function initUUID(profiles: Local.Profile[]) {
  let uuid = Local.get("@uuid");

  // Checks if uuid is defined and is valid
  if (uuid === undefined || !profiles.some((e) => e.uuid === uuid)) {
    const profile = profiles.find((e) => e.index === 0);
    uuid = profile ? profile.uuid : profiles[0].uuid;
    Local.set("@uuid", uuid);
  }

  return uuid;
}

function initAchs() {
  let achs = Local.get("@achs");

  if (achs === undefined) {
    achs = {};
    Local.set("@achs", achs);
  }

  return achs;
}

function initTasks() {
  let tasks = Local.get("@tasks");

  if (tasks === undefined) {
    tasks = {};
    Local.set("@tasks", tasks);
  }

  return tasks;
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
const getFilteredAchs = (s: RootState) => s.achs.value.filtered;
const getSelectedCategoryID = (s: RootState) => s.search.value.category;

export const getSelectedAchs = createSelector(
  [getFilteredAchs, getSelectedCategoryID],
  (filtered, category) => {
    return filtered.find((e) => e.id === category)!.achs.flat();
  },
);

export const getSelectedCategory = createSelector(
  [getFilteredAchs, getSelectedCategoryID],
  (filtered, category) => {
    return filtered.find((e) => e.id === category)!;
  },
);

export const getNonEmptyCategories = createSelector(
  [getFilteredAchs],
  (filtered) => {
    return filtered.filter((e) => e.achs.length !== 0);
  },
);

export const {
  init,
  filterAchs,
  toggleAchs,
  toggleTask,
  moveProfile,
  setProfile,
  addProfile,
  deleteProfile,
  renameProfile,
  uploadData,
} = achsSlice.actions;

export default achsSlice.reducer;
