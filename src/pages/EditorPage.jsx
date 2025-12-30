import CodeEditor from "../components/Editor/CodeEditor";
import LanguageSelector from "../components/controls/LanguageSelector";
import ThemeToggle from "../components/controls/ThemeToggle";
import FilesTabs from "../components/Files/FilesTabs";
import { addLog, clearOutput } from "../features/output/outputSlice";
import Explorer from "../components/controls/Explorer";
import OutputConsole from "../components/Output/OutputConsole";
import { useSelector, useDispatch } from "react-redux";
import ControlBar from "../components/controls/ControlBar";
import { useState } from "react";

const EditorPage = () => {
  const dispatch = useDispatch();
  const [executionKey, setExecutionKey] = useState(0);
  const { projectFiles, activeFileId } = useSelector((state) => state.files);
  const theme = useSelector((state) => state?.theme?.mode);
  const isDark = theme === "dark";

  // --- INTERNAL HELPER: The JS Runner ---
  const executeJavaScript = (code) => {
    try {
      const customConsole = {
        log: (...args) => {
          const message = args
            .map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)))
            .join(" ");
          dispatch(addLog({ type: "info", message }));
        },
        error: (...args) => {
          const message = args.join(" ");
          dispatch(addLog({ type: "error", message }));
        },
        warn: (...args) => {
          const message = args.join(" ");
          dispatch(addLog({ type: "warning", message }));
        },
      };

      // Create a scoped function to prevent polluting the global window object
      const runner = new Function("console", code);
      runner(customConsole);
      
      dispatch(addLog({ type: "success", message: "Execution finished successfully." }));
    } catch (err) {
      dispatch(addLog({ type: "error", message: `Runtime Error: ${err.message}` }));
    }
  };

  const handleRun = async () => {
    const activeFile = projectFiles.find((f) => f.id === activeFileId);
    if (!activeFile) {
      dispatch(addLog({ type: 'error', message: "No active file to run." }));
      return;
    }

    dispatch(clearOutput());
    const { language, content, name } = activeFile;

    // 1. Logic for JS/TS
    if (language === 'javascript' || language === 'typescript') {
      dispatch(addLog({ type: 'info', message: `Executing ${name}...` }));
      executeJavaScript(content);
      return;
    }

    // 2. Logic for Web Files (HTML/CSS)
    if (['html', 'css'].includes(language)) {
      dispatch(addLog({ type: 'info', message: `Refreshing preview for ${name}...` }));
      setExecutionKey(prev => prev + 1);
      dispatch(addLog({ type: 'success', message: 'Preview updated.' }));
      return;
    }

    // 3. Logic for Compiled Languages (Simulation)
    const compiledLanguages = ['python', 'java', 'c', 'cpp', 'csharp', 'go', 'rust', 'php', 'ruby', 'sql'];
    if (compiledLanguages.includes(language)) {
      dispatch(addLog({ type: 'info', message: `Starting ${language} environment...` }));
      
      setTimeout(() => {
        dispatch(addLog({ 
          type: 'warning', 
          message: `${language.toUpperCase()} execution requires a backend compiler.` 
        }));
        dispatch(addLog({ 
          type: 'info', 
          message: `Output for ${name}:\n------------------\n[System] Connect Piston API to see live output.` 
        }));
      }, 500);
      return;
    }

    // 4. Logic for Data/Config
    if (['json', 'yaml', 'xml', 'markdown'].includes(language)) {
      dispatch(addLog({ type: 'info', message: `Checking ${name} syntax...` }));
      if (language === 'json') {
        try {
          JSON.parse(content);
          dispatch(addLog({ type: 'success', message: 'Valid JSON.' }));
        } catch (e) {
          dispatch(addLog({ type: 'error', message: 'Invalid JSON syntax.' }));
        }
      } else {
        dispatch(addLog({ type: 'info', message: 'Static file. No execution needed.' }));
      }
    }
  };

  return (
    <div className={`h-screen flex flex-col overflow-hidden ${isDark ? "bg-[#1e1e1e]" : "bg-white"}`}>
      
      <header className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-[#2d2d2d] z-10">
        <div className="flex items-center">
          <LanguageSelector />
          <ControlBar onRun={handleRun} />
        </div>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r border-gray-700 shrink-0">
          <Explorer />
        </div>

        <div className="flex-1 border-r border-gray-700 flex flex-col min-w-0">
          <div className="bg-[#252526]">
            <FilesTabs />
          </div>
          <div className="flex-1 relative">
            <CodeEditor />
          </div>
        </div>
        
        {/* Optional Preview Pane - Uncomment when needed */}
        {/* <div className="flex-1 bg-white overflow-auto">
          <Preview key={executionKey} />
        </div> */}
      </main>

      <footer className="h-40 border-t border-gray-700 bg-[#1e1e1e]">
        <OutputConsole />
      </footer>
    </div>
  );
};

export default EditorPage;