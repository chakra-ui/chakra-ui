/** @jsx jsx */
import { jsx } from "@emotion/core";
import { createContext, useContext, useState } from "react";
import useDarkMode from "use-dark-mode";

// This context handles the color mode (light or dark) of the UI
export const ColorModeContext = createContext({
  mode: "light",
  toggle: () => {},
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

  const { value, toggle } = useDarkMode(false);
  const mode = value ? "dark" : "light";

  const childContext = overideValue
    ? { mode: manualMode, toggle: manualToggle }
    : { mode, toggle };

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
