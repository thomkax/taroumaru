import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import AchievementTag from "@/data/tags";
import * as Local from "./localStorage";
import { AchCategory } from "@/data/types";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    value: {
      text: "",
      category: 0,
      hide: false,
      tags: [] as AchievementTag[],
      versions: [] as string[],
    },
  },
  reducers: {
    // Initialization from client component to get data from local storage
    init: (state) => {
      state.value.hide = Local.get("@hide") ?? false;
    },

    setText: (state, action: PayloadAction<string>) => {
      state.value.text = action.payload;
    },

    setCategory: (state, action: PayloadAction<number>) => {
      state.value.category = action.payload;
    },

    setActiveCategory: (state, action: PayloadAction<AchCategory[]>) => {
      const categories = action.payload;
      const currentCategory = state.value.category;
      let firstNonEmptyCategory: number | undefined = undefined;

      for (const category of categories) {
        // If current category has any achievements after filtering - return and do nothing.
        if (category.id === currentCategory && category.achs.length > 0) {
          return;
        }

        // Save first non-empty category. It will be used if the current category is empty.
        if (firstNonEmptyCategory === undefined && category.achs.length > 0) {
          firstNonEmptyCategory = category.id;
        }
      }

      state.value.category = firstNonEmptyCategory ?? 0;
    },

    toggleHide: (state) => {
      state.value.hide = !state.value.hide;
      Local.set("@hide", state.value.hide);
    },

    addTag: (state, action: PayloadAction<AchievementTag>) => {
      state.value.tags.push(action.payload);
    },

    removeTag: (state, action: PayloadAction<AchievementTag>) => {
      state.value.tags = state.value.tags.filter((e) => e !== action.payload);
    },

    addVersion: (state, action: PayloadAction<string>) => {
      state.value.versions.push(action.payload);
    },

    removeVersion: (state, action: PayloadAction<string>) => {
      state.value.versions = state.value.versions.filter(
        (e) => e !== action.payload,
      );
    },
  },
});

export const {
  init,
  setText,
  setCategory,
  setActiveCategory,
  toggleHide,
  addTag,
  removeTag,
  addVersion,
  removeVersion,
} = searchSlice.actions;

export default searchSlice.reducer;
