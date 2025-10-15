import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice.js";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const { dark } = useSelector((state) => state.theme);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white text-sm shadow-md"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
