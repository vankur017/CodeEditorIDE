import { Play, Bug, RotateCcw, Loader2 } from "lucide-react";
import { useState } from "react";

const ControlBar = ({ onRun, onDebug }) => {
  const [isRunning, setIsRunning] = useState(false);

  const triggerRun = async () => {
    setIsRunning(true);
    await onRun();
    
    setTimeout(() => setIsRunning(false), 600);
  };

  const handleDebug = () => {
  dispatch(clearOutput());
  const { js } = store.getState().code; // Get current JS from Redux

  try {
    // We create a new function with the code. 
    // This will throw a SyntaxError immediately if the code is invalid.
    new Function(js); 
    
    dispatch(addLog({ 
      type: 'log', 
      message: '✅ No syntax errors found in JavaScript.' 
    }));
  } catch (err) {
    dispatch(addLog({ 
      type: 'error', 
      message: `❌ Debugger found an error: ${err.message}` 
    }));
  }
};

  return (
    <div className="flex items-center gap-2 px-4 py-2 border-l border-gray-700">
      {/* RUN BUTTON */}
      <button
        onClick={triggerRun}
        disabled={isRunning}
        className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded transition-all active:scale-95 disabled:opacity-50"
      >
        {isRunning ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
        {isRunning ? "Running..." : "Run"}
      </button>

      {/* DEBUG BUTTON */}
      <button
        onClick={onDebug}
        className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded transition-all active:scale-95"
      >
        <Bug size={14} />
        Debug
      </button>

      {/* CLEAR BUTTON */}
      <button
        onClick={() => dispatch(clearOutput())}
        className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
        title="Clear Console"
      >
        <RotateCcw size={16} />
      </button>
    </div>
  );
};

export default ControlBar;