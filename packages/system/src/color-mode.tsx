import * as React from "react";

const STORAGE_KEY = "chakra-ui-color-mode";
const HAS_STORAGE = typeof Storage !== "undefined";

type ColorMode = "light" | "dark";

const storage = {
  get: (init?: ColorMode) =>
    ((HAS_STORAGE && window.localStorage.getItem(STORAGE_KEY)) || init) as
      | ColorMode
      | undefined,
  set: (value: ColorMode) =>
    HAS_STORAGE && window.localStorage.setItem(STORAGE_KEY, value),
};

export const getMediaQuery = () => {
  const darkQuery = "(prefers-color-scheme: dark)";
  const mql: MediaQueryList = window.matchMedia?.(darkQuery);
  const dark = mql.media === darkQuery;
  return dark && mql.matches;
};

type ContextType = [ColorMode, React.Dispatch<React.SetStateAction<ColorMode>>];
const ColorModeContext = React.createContext<ContextType | undefined>(
  undefined,
);
export const useColorMode = () =>
  React.useContext(ColorModeContext) as ContextType;

export const ColorModeProvider: React.FC = ({ children }) => {
  const [colorMode, setColorMode] = React.useState<ColorMode>("light");

  React.useEffect(() => {
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setColorMode("dark");
      } else {
        setColorMode("light");
      }
    };

    darkMode.addEventListener("change", handleChange);
    return () => {
      darkMode.removeEventListener("change", handleChange);
    };
  }, []);

  React.useEffect(() => {
    // debugger;
    const stored = storage.get();
    document.body.classList.remove("chakra-ui-" + stored);

    const isDarkMode = getMediaQuery();

    if (!stored) {
      return setColorMode(isDarkMode ? "dark" : "light");
    }

    if (!stored || stored === colorMode) return;

    //eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (!colorMode) return;
    storage.set(colorMode);
  }, [colorMode]);

  const context = [colorMode, setColorMode] as const;

  return (
    <ColorModeContext.Provider value={context as any}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const InitializeColorMode = () => (
  <script
    key="theme-ui-no-flash"
    dangerouslySetInnerHTML={{
      __html: `(function() { try {
        var mode = localStorage.getItem('chakra-ui-color-mode');
        if (!mode) return
        document.body.classList.add('chakra-ui-' + mode);
      } catch (e) {} })();`,
    }}
  />
);

export default useColorMode;
