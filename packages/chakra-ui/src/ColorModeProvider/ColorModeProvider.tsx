/** @jsx jsx */
import { jsx } from "@emotion/core";
import { createContext, useContext, useState } from "react";
import useDarkMode from "use-dark-mode";

interface ContextValue {
  colorMode: Props["value"];
  toggleColorMode: () => void;
}

// This context handles the color mode (light or dark) of the UI
export const ColorModeContext = createContext<ContextValue>({
  colorMode: "light",
  toggleColorMode: () => {},
});

export interface Props {
  value: "light" | "dark";
  children: React.ReactNode;
}

const ColorModeProvider: React.FC<Props> = ({ value, children }) => {
  const [manualMode, setManualMode] = useState<Props["value"]>(value);

  const manualToggle = () => {
    if (manualMode === "light") {
      setManualMode("dark");
    }

    if (manualMode === "dark") {
      setManualMode("light");
    }
  };

  const { value: isDarkMode, toggle } = useDarkMode(false);
  const colorMode = isDarkMode ? "dark" : "light";

  const childContext: ContextValue =
    value != null
      ? { colorMode: manualMode, toggleColorMode: manualToggle }
      : { colorMode, toggleColorMode: toggle };

  return (
    <ColorModeContext.Provider value={childContext}>
      {children}
    </ColorModeContext.Provider>
  );
};

const DarkMode = (props: Props) => (
  <ColorModeProvider value="dark" {...props} />
);
const LightMode = (props: Props) => (
  <ColorModeProvider value="light" {...props} />
);

const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
};

export default ColorModeProvider;
export { useColorMode, DarkMode, LightMode };
