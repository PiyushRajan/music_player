import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialData: [],
  songDurations: {},
  selectedSong: null,
  currentSong: null,
};

const dataSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.initialData = action.payload;
    },
    setSongDuration: (state, action) => {
      state.songDurations = action.payload;
    },
    setSelectedSong: (state, action) => {
      state.selectedSong = action.payload;
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
  },
});

export const { setData,setSongDuration,setSelectedSong,setCurrentSong } = dataSlice.actions;
export default dataSlice.reducer;