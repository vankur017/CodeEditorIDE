import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  activeFileId: null,
  files: [
    {
      id: "1",
      name: "index.js",
      language: "javascript",
      content: "// JS file"
    }
  ]
};

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    addFile: {
      reducer(state, action) {
        state.files.push(action.payload);
      },
      prepare(name, language) {
        return {
          payload: {
            id: nanoid(),
            name,
            language,
            content: ""
          }
        };
      }
    },
    setActiveFile(state, action) {
      state.activeFileId = action.payload;
    },
    updateFileContent(state, action) {
      const file = state.files.find(f => f.id === state.activeFileId);
      if (file) file.content = action.payload;
    }
  }
});

export const { addFile, setActiveFile, updateFileContent } = filesSlice.actions;
export default filesSlice.reducer;
