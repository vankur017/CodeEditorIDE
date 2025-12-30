import { useDispatch, useSelector } from "react-redux";
import { setActiveFile, closeFile } from "../../features/files/filesSlice";
import { X } from "lucide-react"; 
import { getFileIcon } from "../../utils/languageHelper";

const FilesTabs = () => {
  const dispatch = useDispatch();
  // Ensure we are pulling the correct state. 
  // If you used the new slice, it might be 'openFilesIds' and 'projectFiles'
  const { projectFiles, openFilesIds, activeFileId } = useSelector((state) => state.files);

  // Filter project files to only show those that are actually open as tabs
  const openFiles = projectFiles.filter(file => openFilesIds.includes(file.id));

  return (
    <div className="flex w-full bg-[#252526] overflow-x-auto no-scrollbar h-9">
      {openFiles?.map((file) => {
        const isActive = file.id === activeFileId;
        
        // Call getFileIcon for EACH file inside the loop
        const { icon: Icon, color } = getFileIcon(file.language);

        return (
          <div
            key={file.id}
            onClick={() => dispatch(setActiveFile(file.id))}
            className={`
              group flex items-center min-w-[120px] max-w-[200px] px-3 cursor-pointer border-r border-[#1e1e1e] text-sm transition-colors duration-150
              ${isActive 
                ? "bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]" 
                : "bg-[#2d2d2d] text-[#969696] border-t-2 border-t-transparent hover:bg-[#2b2b2b]"
              }
            `}
          >
            {/* 1. Render the Icon here */}
            <Icon size={16} className={`${color} mr-2 shrink-0`} />

            {/* 2. Render File Name */}
            <span className="flex-1 truncate pr-2">
              {file.name}
            </span>

            {/* 3. Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(closeFile(file.id));
              }}
              className={`
                p-0.5 rounded-md hover:bg-[#454545] hover:text-white transition-opacity
                ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
              `}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FilesTabs;