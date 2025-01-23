import { useState, useEffect, useRef } from "react";
import { THEMES } from "../../constants/shared";
import { useThemeStore } from "../../store/useThemeStore";
import { Palette } from "lucide-react";

const ThemeChange = () => {
  //! Hooks
  const { theme, setTheme } = useThemeStore();
  const themeContainerRef = useRef(null);
  const buttonRef = useRef(null);

  //! State
  const [themesVisible, setThemesVisible] = useState(false);

  //! Button click function to show and hide themes
  const handleShowThemes = () => {
    setThemesVisible((prev) => !prev);
  };

  //! Function to handle click outside of the theme container (outside click will close the theme container)
  const handleClickOutside = (event) => {
    if (
      themeContainerRef.current &&
      !themeContainerRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setThemesVisible(false);
    }
  };

  //! useEffect to add and remove click event listener
  useEffect(() => {
    if (themesVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [themesVisible]);

  //! Function to set theme
  const handleSetTheme = (theme) => {
    setTheme(theme);
    setThemesVisible(false);
  };

  return (
    <div className="w-max flex flex-wrap items-center justify-center relative">
      <button ref={buttonRef} onClick={handleShowThemes}>
        <Palette className="size-4 sm:size-6" />
      </button>

      {themesVisible && (
        <div
          ref={themeContainerRef}
          className="absolute top-7 right-7 w-48 bg-base-200 rounded-md shadow-lg py-1 h-[400px] overflow-y-auto flex flex-col gap-1 z-50"
        >
          <h2 className="text-sm font-semibold w-full text-center p-2 bg-base-300">
            Select Theme
          </h2>
          {THEMES.map((t) => (
            <button
              key={t}
              className={`
              w-full
              group flex gap-1 items-center p-2 rounded-lg transition-colors
              ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
            `}
              onClick={() => handleSetTheme(t)}
            >
              <div
                className="relative h-8 w-full rounded-md overflow-hidden"
                data-theme={t}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeChange;
