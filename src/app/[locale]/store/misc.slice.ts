import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const miscSlice = createSlice({
  name: "misc",
  initialState: {
    value: {
      // Internalization function passed from initialization
      // in a root client component.
      i18n: (key: string) => "" as string,

      // Last toggled checkbox ID.
      // Resets to -1 is any of the "search/" values changes.
      checkbox: -1,
    },
  },
  reducers: {
    init: (state, action: PayloadAction<(key: string) => string>) => {
      state.value.i18n = action.payload;
    },

    setCheckbox: (state, action: PayloadAction<number>) => {
      state.value.checkbox = action.payload;
    },
  },
});

export const { init, setCheckbox } = miscSlice.actions;

export default miscSlice.reducer;
