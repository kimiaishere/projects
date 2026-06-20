import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        fixed
        cursor-pointer 
        top-6
        right-6
        z-50
        px-4
        py-2
        rounded-xl
        border
        backdrop-blur-md
        transition-all
        duration-300
        ${
          theme === "dark"
            ? "bg-white/10 border-white/20 text-white"
            : "bg-white border-slate-200 text-slate-900 shadow-md"
        }
      `}
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}