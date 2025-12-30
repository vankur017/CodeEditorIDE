import { useSelector, useDispatch } from "react-redux";
import { addLog, clearOutput } from "../../features/output/outputSlice"

const OutputConsole = () => {
const { entries } = useSelector((state) => state.output);
  const theme = useSelector((state) => state.theme?.mode);
  const dispatch = useDispatch();

  const handleClear = () => {
    
   // console.log("Action Creator:", clearOutput); 
    dispatch(clearOutput());
  };
  const isDark = theme === "dark";

  return (
    <div className={`flex flex-col h-full font-mono text-sm ${
      isDark ? "bg-[#1e1e1e] text-gray-300" : "bg-white text-gray-800"
    }`}>
      {/* Console Header */}
      <div className={`flex items-center justify-between px-4 py-1 border-b ${
        isDark ? "border-[#333] bg-[#252526]" : "border-gray-200 bg-gray-100"
      }`}>
        <span className="text-xs font-bold uppercase tracking-wider opacity-70">Output</span>
        <button 
          onClick={handleClear}
          className="text-[10px] hover:text-red-400 transition-colors uppercase font-bold"
        >
          Clear
        </button>
      </div>

      {/* Logs Area */}
      <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
        {entries.length === 0 ? (
          <span className="opacity-40 italic">No output to display...</span>
        ) : (
          entries.map((entry, index) => (
            <div key={index} className="flex gap-3 mb-1 animate-in fade-in duration-300">
              <span className="opacity-30 select-none">[{entry.timestamp}]</span>
              <span className={entry.type === 'error' ? 'text-red-500' : 'text-emerald-500'}>
                {entry.message}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OutputConsole;