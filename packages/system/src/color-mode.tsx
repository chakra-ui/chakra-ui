import * as React from "react";
import { Global } from "@emotion/core";
import css, { get } from "@styled-system/css";

const supportsLocalStorage = typeof Storage !== "undefined";
const storageKey = "chakra-ui-color-mode";
const cx = (mode: ColorMode) => `chakra-ui-${mode}`;
const classNameLight = cx("light");
const classNameDark = cx("dark");

const getBodyElement = () => {
  // for SSR
  const mockBody = {
    classList: {
      add: (token: string) => {},
      remove: (token: string) => {},
    },
  };

  return window.document?.body ?? mockBody;
};

type ColorMode = "light" | "dark";

const storage = {
  get: (init?: ColorMode) =>
    ((supportsLocalStorage && window.localStorage.getItem(storageKey)) ||
      init) as ColorMode | undefined,
  set: (value: ColorMode) =>
    supportsLocalStorage && window.localStorage.setItem(storageKey, value),
};

function getMediaQuery() {
  const preferDarkQuery = "(prefers-color-scheme: dark)";
  const queryList: MediaQueryList = window.matchMedia?.(preferDarkQuery);
  const isQuerySupported = queryList.media === preferDarkQuery;
  const isDark = isQuerySupported && queryList.matches;

  return { isQuerySupported, isDark, queryList };
}

type ContextType = [ColorMode, React.Dispatch<React.SetStateAction<ColorMode>>];
const ColorModeContext = React.createContext<ContextType | undefined>(
  undefined,
);
export const useColorMode = () =>
  React.useContext(ColorModeContext) as ContextType;

// Gets the color mode based on OS time
function syncWithLocalTime(callback: Function, shouldRun?: boolean) {
  if (!shouldRun) return;
  const date = new Date();
  const hour = date.getHours();
  if (hour > 20 || hour < 5) callback("dark");
  else callback("light");
}

function syncBodyClassName(isDark: boolean) {
  const body = getBodyElement();
  body.classList.add(isDark ? classNameDark : classNameLight);
  body.classList.remove(isDark ? classNameLight : classNameDark);
}

interface Props {
  mode?: ColorMode;
  children?: React.ReactNode;
}

export const ColorModeProvider: React.FC = ({ children, mode }: Props) => {
  const [colorMode, setColorMode] = React.useState<ColorMode>(() => {
    const mode = storage.get();
    if (mode) {
      syncBodyClassName(mode === "dark");
      return mode;
    } else {
      const { isDark } = getMediaQuery();
      syncBodyClassName(isDark);
      return isDark ? "dark" : "light";
    }
  });

  // Sync color mode between tabs
  React.useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === storageKey) {
        if (!event.newValue) return;
        setColorMode(event.newValue as ColorMode);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Sync color mode when user changes OS preferences
  React.useEffect(() => {
    const { queryList } = getMediaQuery();

    const onChangePreference = (event: MediaQueryListEvent) => {
      setColorMode(event.matches ? "dark" : "light");
    };
    queryList.addEventListener("change", onChangePreference);
    return () => {
      queryList.removeEventListener("change", onChangePreference);
    };
  }, []);

  React.useEffect(() => {
    if (!colorMode) return;
    storage.set(colorMode);
    syncBodyClassName(colorMode === "dark");
  }, [colorMode]);

  //@ts-ignore
  const [manualMode, setManualMode] = React.useState<ColorMode>(mode);

  const context: ContextType =
    typeof mode != "undefined"
      ? [manualMode, setManualMode]
      : [colorMode, setColorMode];

  return (
    <ColorModeContext.Provider value={context}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const DarkMode = (props: Props) => (
  <ColorModeProvider mode="dark" {...props} />
);
export const LightMode = (props: Props) => (
  <ColorModeProvider mode="light" {...props} />
);

const globalColor = {
  text: "gray.800",
  background: "white",
  primary: "teal.500",
  placeholder: "gray.400",
  modes: {
    dark: {
      text: "whiteAlpha.900",
      background: "gray.800",
      primary: "teal.300",
      placeholder: "whiteAlpha.400",
    },
  },
};

export const createColorStyles = (theme: any, colorMode: ColorMode) => {
  if (!theme.colors) return {};

  const modifiedTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      ...globalColor,
    },
  };

  const isDark = colorMode === "dark";

  const mx = (str: string) => (isDark ? `modes.dark.${str}` : str);
  const rx = (str: string) => get(modifiedTheme, `colors.${mx(str)}`);

  return css({
    color: rx("text"),
    bg: rx("background"),
    "*::placeholder": rx("placeholder"),
    borderColor: rx("border"),
  })(modifiedTheme);
};

const bodyColor = (colorMode: ColorMode) => (theme: any) => ({
  body: createColorStyles(theme, colorMode),
});

export const ColorMode = () => {
  const [colorMode] = useColorMode();
  return <Global styles={bodyColor(colorMode)} />;
};

export const InitializeColorMode = () => (
  <script
    key="chakra-ui-no-flash"
    dangerouslySetInnerHTML={{
      __html: `
      (function() {
        // Change these if you use something different in your hook.
        var storageKey = "chakra-ui-color-mode";
        var classNameDark = "chakra-ui-dark";
        var classNameLight = "chakra-ui-light";
  
        function setClassOnDocumentBody(darkMode) {
          document.body.classList.add(darkMode ? classNameDark : classNameLight);
          document.body.classList.remove(
            darkMode ? classNameLight : classNameDark,
          );
        }
  
        var preferDarkQuery = "(prefers-color-scheme: dark)";
        var mql = window.matchMedia(preferDarkQuery);
        var supportsColorSchemeQuery = mql.media === preferDarkQuery;
        var localStorageTheme = null;
        try {
          localStorageTheme = localStorage.getItem(storageKey);
        } catch (err) {}
        var localStorageExists = localStorageTheme !== null;
        if (localStorageExists) {
          localStorageTheme = JSON.parse(localStorageTheme);
        }
  
        // Determine the source of truth
        if (localStorageExists) {
          // source of truth from localStorage
          setClassOnDocumentBody(localStorageTheme);
        } else if (supportsColorSchemeQuery) {
          // source of truth from system
          setClassOnDocumentBody(mql.matches);
          localStorage.setItem(storageKey, mql.matches);
        } else {
          // source of truth from document.body
          var isDarkMode = document.body.classList.contains(classNameDark);
          localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
        }
      })();
      `,
    }}
  />
);
