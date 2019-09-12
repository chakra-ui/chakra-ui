import { useTheme } from "../ThemeProvider";
import { useColorMode } from "../ColorModeProvider";

export const useMenuListStyle = () => {
  const { colorMode } = useColorMode();
  const elevation = {
    light: {
      bg: "#fff",
      shadow: "sm",
    },
    dark: {
      bg: "gray.700",
      shadow: `rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px`,
    },
  };

  return {
    color: "inherit",
    borderWidth: "1px",
    ...elevation[colorMode],
  };
};

/**
|--------------------------------------------------
| Styles for MenuItem
|--------------------------------------------------
*/

const baseProps = {
  width: "full",
  flex: " 0 0 auto",
  userSelect: "none",
  transition: "background-color 220ms, color 220ms",
};

const interactionProps = ({ colorMode }) => {
  const _focusColor = { light: "gray.100", dark: "whiteAlpha.100" };
  const _activeColor = { light: "gray.200", dark: "whiteAlpha.200" };

  return {
    _active: {
      bg: _activeColor[colorMode],
    },
    _focus: {
      bg: _focusColor[colorMode],
      outline: 0,
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  };
};

export const useMenuItemStyle = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const props = { theme, colorMode };

  return {
    ...baseProps,
    ...interactionProps(props),
  };
};
