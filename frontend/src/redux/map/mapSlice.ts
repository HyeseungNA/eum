import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coords } from "@/types/map";

const initialState = {
  coords: {
    lat: 0,
    lng: 0,
  },
  path: "",
  groupId: 0,
  pinId: -1,
};

export const coords = createSlice({
  name: "coords",
  initialState,
  reducers: {
    reset: () => initialState,
    assign: (state, action: PayloadAction<Coords>) => {
      state.coords = action.payload;
    },
    destination: (state, action: PayloadAction<string>) => {
      state.path = action.payload;
    },
    setGroupId: (state, action: PayloadAction<number>) => {
      state.groupId = action.payload;
    },
    setPinId: (state, action: PayloadAction<number>) => {
      state.pinId = action.payload;
    },
  },
});

export const { reset, assign, destination, setGroupId, setPinId } =
  coords.actions;
export default coords.reducer;
