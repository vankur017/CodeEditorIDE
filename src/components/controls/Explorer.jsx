import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFile, openFile } from "../../features/files/filesSlice";
import { FilePlus, FileCode } from "lucide-react";

const Explorer = () => {
  const dispatch = useDispatch();
  const projectFiles = useSelector((state) => state.files.projectFiles);
  const activeFileId = useSelector((state) => state.files.activeFileId);

  const handleCreateFile = () => {
  const name = prompt("Enter filename (e.g., script.py, main.cpp:");
  if (name) {
    dispatch(createFile({ name })); 
  }
};
  

  return (
    <div className="w-64 bg-[#252526] h-full flex flex-col text-[#cccccc] select-none">
      <div className="flex items-center justify-between px-4 py-2 text-xs font-bold uppercase tracking-wider">
        <span>Explorer</span>
        <button onClick={handleCreateFile} className="hover:bg-[#37373d] p-1 rounded">
          <FilePlus size={16} />
        </button>
      </div>

      <div className="flex flex-col mt-2">
        {projectFiles.map((file) => (
          <div
            key={file.id}
            onClick={() => dispatch(openFile(file.id))}
            className={`flex items-center gap-2 px-4 py-1 cursor-pointer text-sm transition-colors
              ${activeFileId === file.id ? "bg-[#37373d] text-white" : "hover:bg-[#2a2d2e]"}
            `}
          >
            <FileCode size={14} className="text-blue-400" />
            <span className="truncate">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explorer;