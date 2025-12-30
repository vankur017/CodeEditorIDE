import CodeEditor from "../components/Editor/CodeEditor";
import LanguageSelector from "../components/controls/LanguageSelector";
import ThemeToggle from "../components/controls/ThemeToggle";
import FilesTabs from "../components/Files/FilesTabs";
import OutputConsole from "../components/Output/OutputConsole";
import { useSelector } from "react-redux";
import ControlBar from "../components/controls/ControlBar";
import { useState } from "react";
import Preview from "../components/Output/Preview";
const EditorPage = () => {
  const [executionKey, setExecutionKey] = useState(0);
  const theme = useSelector((state) => state?.theme?.mode);
  const isDark = theme === "dark";

  const handleRun = () => {
  dispatch(clearOutput()); // Always start with a clean console
  
  const currentLanguage = useSelector((state) => state.controls.selectedLanguage);
  const code = useSelector((state) => state.code[currentLanguage]);

  switch (currentLanguage) {
    case 'html':
    case 'css':
    case 'javascript':
    
      setExecutionKey(prev => prev + 1);
      break;
      
    case 'python':
      runPythonCode(code); 
      break;

    default:
      dispatch(addLog({ type: 'error', message: `Execution for ${currentLanguage} is not supported yet.` }));
  }
};

  return (
    <div className={`h-screen flex flex-col overflow-hidden ${isDark ? "bg-[#1e1e1e]" : "bg-white"}`}>
  
      <header className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-[#2d2d2d]">
        <div className="flex items-center">
          <LanguageSelector />
          <ControlBar onRun={handleRun} />
        </div>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 overflow-hidden">
     
        <div className="flex-1 border-r border-gray-700 flex flex-col">
          <div className="bg-[#252526]">
            <FilesTabs />
          </div>
          <div className="flex-1 relative">
            <CodeEditor />
          </div>
        </div>

        <div className="flex-1 bg-white">

          <Preview key={executionKey} />
        </div>

      </main>

    
      <footer className="h-40 border-t border-gray-700">
        <OutputConsole />
      </footer>
    </div>
  );
};

export default EditorPage;