import "./ThemeToggle.css";

import { Moon, Sun } from "lucide-react";

import { useThemeStore } from "../../../context/themeContext.js";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <>
      {/* Desktop */}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        title={
          theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"
        }
      >
        <div
          className={`theme-toggle__slider ${
            theme === "dark" ? "theme-toggle__slider--dark" : ""
          }`}
        >
          {theme === "light" ? (
            <Sun size={16} strokeWidth={2.3} />
          ) : (
            <Moon size={16} strokeWidth={2.3} />
          )}
        </div>
      </button>

      {/* Mobile */}
      <button
        className="theme-toggle-mobile"
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        title={
          theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"
        }
      >
        {theme === "light" ? (
          <Moon size={19} strokeWidth={2.3} />
        ) : (
          <Sun size={19} strokeWidth={2.3} />
        )}
      </button>
    </>
  );
};

export default ThemeToggle;
