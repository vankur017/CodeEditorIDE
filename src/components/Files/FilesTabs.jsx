import { useDispatch, useSelector } from "react-redux";
import { setActiveFile } from "../../features/files/filesSlice";

const FilesTabs = () => {
  const dispatch = useDispatch();
  const { files, activeFileId } = useSelector((state) => state.files);

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {files.map((file) => (
        <button
          key={file.id}
          onClick={() => dispatch(setActiveFile(file.id))}
          style={{
            fontWeight: file.id === activeFileId ? "bold" : "normal"
          }}
        >
          {file.name}
        </button>
      ))}
    </div>
  );
};

export default FilesTabs;
