import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../features/editor/editorSlice";

const LanguageSelector = () => {
    const dispatch = useDispatch();
    const language = useSelector((state)=>state.editor.language);
  return (
    <div>
        <select onChange={(e)=>dispatch(setLanguage(e.target.value))} value={language}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="C++">C++</option>
        </select>
    </div>
  )
}

export default LanguageSelector