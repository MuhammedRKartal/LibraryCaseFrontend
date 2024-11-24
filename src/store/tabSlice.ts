import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabState {
  index: number;
}

const initialState: TabState = {
  index: 0,
};

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setTabIndex(state, action: PayloadAction<number>) {
      state.index = action.payload;
    },
  },
});

export const { setTabIndex } = tabSlice.actions;
export default tabSlice.reducer;
