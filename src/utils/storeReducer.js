import { combineReducers } from "@reduxjs/toolkit";
import editorReducer from "../features/editor/editorSlice";
 import filesReducer from "../features/files/filesSlice";
 import themeReducer from "../features/theme/themeSlice";
 import outputReducer from "../features/output/outputSlice";

export default combineReducers({
  editor: editorReducer,
  files: filesReducer,
  theme: themeReducer,
  output: outputReducer
});
