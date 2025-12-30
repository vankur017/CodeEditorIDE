import { createSlice } from "@reduxjs/toolkit";

const outputSlice = createSlice({
  name: "output",
  initialState: {
    entries: [], // Array of { type, message, timestamp }
  },
  reducers: {
    addLog: (state, action) => {
      
      state.entries.push({
        ...action.payload,
        timestamp: new Date().toLocaleTimeString(),
      });
    },
    clearOutput: (state) => {
      state.entries = [];
    }
  }
});

export const { addLog, clearOutput } = outputSlice.actions;
export default outputSlice.reducer;