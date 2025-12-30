import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { updateCode } from "../../features/editor/editorSlice";

const CodeEditor = () => {
  const dispatch = useDispatch();
  const { language, code } = useSelector((state) => state.editor);
  const theme = useSelector((state) => state.theme);


  return (
    <Editor
      height="100%"
      language={language}
      value={code[language]}
      theme={theme === "dark" ? "vs-dark" : "light"}
      onChange={(value) => dispatch(updateCode(value))}
    />
  );
};

export default CodeEditor;
