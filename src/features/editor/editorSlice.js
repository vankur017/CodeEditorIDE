import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "javascript",
  code: {
    javascript: "// Start coding...",
    python: "",
  }
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },
    updateCode(state, action) {
      state.code[state.language] = action.payload;
    }
  }
});

export const { setLanguage, updateCode } = editorSlice.actions;
export default editorSlice.reducer;
