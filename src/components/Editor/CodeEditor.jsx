import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { updateFileContent } from "../../features/files/filesSlice"; // Use the correct slice

const CodeEditor = () => {
  const dispatch = useDispatch();
  
  // 1. Get files and active ID from the new slice
  const { projectFiles, activeFileId } = useSelector((state) => state.files);
  const theme = useSelector((state) => state.theme.mode); // Adjusted for typical theme state

  // 2. Find the actual file object currently being edited
  const activeFile = projectFiles.find((f) => f.id === activeFileId);

  // If no file is selected (e.g., all tabs closed), show a placeholder
  if (!activeFile) {
    return (
      <div className="h-full flex items-center justify-center bg-[#1e1e1e] text-gray-500">
        Select a file to start coding
      </div>
    );
  }

  return (
    <Editor
      height="100%"
      language={activeFile.language}
      value={activeFile.content} // Now using the content from the file object
      theme={theme === "dark" ? "vs-dark" : "light"}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
      onChange={(value) => dispatch(updateFileContent(value))} // Correct action
    />
  );
};

export default CodeEditor;