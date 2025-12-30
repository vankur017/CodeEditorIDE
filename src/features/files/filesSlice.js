import { createSlice, nanoid } from "@reduxjs/toolkit";
import { getLanguageByExtension } from "../../utils/languageHelper";

const initialState = {
  projectFiles: [
    { id: "1", name: "index.js", language: "javascript", content: "// JS Content" },
    { id: "2", name: "styles.css", language: "css", content: "/* CSS Content */" }
  ],
  openFilesIds: ["1"], 
  activeFileId: "1",
};

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    createFile: (state, action) => {
      const { name } = action.payload; // We only need the name now
      
      // Use the utility to determine the language
      const detectedLanguage = getLanguageByExtension(name);
      
      const newFile = {
        id: nanoid(),
        name,
        language: detectedLanguage, // Automatically set based on extension
        content: ""
      };
      
      state.projectFiles.push(newFile);
      
      // VS Code Behavior: Open the new file immediately
      if (!state.openFilesIds.includes(newFile.id)) {
        state.openFilesIds.push(newFile.id);
      }
      state.activeFileId = newFile.id;
    },

    openFile: (state, action) => {
      const id = action.payload;
      if (!state.openFilesIds.includes(id)) {
        state.openFilesIds.push(id);
      }
      state.activeFileId = id;
    },

    closeFile: (state, action) => {
      const idToClose = action.payload;
      const tabIndex = state.openFilesIds.indexOf(idToClose);
      
      state.openFilesIds = state.openFilesIds.filter(id => id !== idToClose);
      
      if (state.activeFileId === idToClose) {
        const nextTabId = state.openFilesIds[tabIndex] || state.openFilesIds[tabIndex - 1];
        state.activeFileId = nextTabId || null;
      }
    },

    setActiveFile: (state, action) => {
      state.activeFileId = action.payload;
    },

    updateFileContent: (state, action) => {
      // Find the file in projectFiles using the active ID
      const file = state.projectFiles.find(f => f.id === state.activeFileId);
      if (file) {
        file.content = action.payload;
      }
    }
  }
});

export const { 
  createFile, 
  openFile, 
  closeFile, 
  setActiveFile, 
  updateFileContent 
} = filesSlice.actions;

export default filesSlice.reducer;