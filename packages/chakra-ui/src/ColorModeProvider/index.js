/** @jsx jsx */
import { jsx } from "@emotion/core";
import { createContext, useContext, useState } from "react";
import useDarkMode from "use-dark-mode";

// This context handles the color mode (light or dark) of the UI
export const ColorModeContext = createContext({
  colorMode: "light",
  toggleColorMode: () => {},
});

const ColorModeProvider = ({ value: overideValue, children }) => {
  const [manualMode, setManualMode] = useState(overideValue);

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

  const childContext = overideValue
    ? { colorMode: manualMode, toggleColorMode: manualToggle }
    : { colorMode, toggleColorMode: toggle };

  return (
    <ColorModeContext.Provider value={childContext}>
      {children}
    </ColorModeContext.Provider>
  );
};

const DarkMode = props => <ColorModeProvider value="dark" {...props} />;
const LightMode = props => <ColorModeProvider value="light" {...props} />;

const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
};

export default ColorModeProvider;
export { useColorMode, DarkMode, LightMode };
