import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../features/theme/themeSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state?.theme?.mode);
  // console.log("theme==========",theme);
  

  return (
    <button onClick={() => dispatch(toggleTheme())}>
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
