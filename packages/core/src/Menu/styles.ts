import { useTheme, useColorMode } from "@chakra-ui/theme";
import { SystemProps } from "@chakra-ui/layout";
import css from "@emotion/css";

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

const baseProps: SystemProps = {
  width: "full",
  flex: " 0 0 auto",
  userSelect: "none",
  transition: "background-color 220ms, color 220ms",
};

const interactionProps = ({ colorMode }: { colorMode: "light" | "dark" }) => {
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

export const useMenuItemStyle = (): SystemProps => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const props = { theme, colorMode };

  return {
    ...baseProps,
    ...interactionProps(props),
  };
};

export const transitionStyles = css`
  &[aria-hidden="true"] {
    visibility: hidden;
  }
  &.menu {
    &-enter,
    &-appear {
      transform: scale(0.4);
      visibility: visible;
    }

    &-enter-active,
    &-appear-active {
      transform: scale(1);
      transition: all cubic-bezier(0.175, 0.885, 0.32, 1.175) 0.24s;
    }

    &-enter-done,
    &-appear-done {
      visibility: visible;
    }

    &-exit {
      visibility: visible;
      transform: scale(1);
      opacity: 1;
    }

    &-exit-active {
      opacity: 0;
      transform: scale(0.9);
      transition: all cubic-bezier(0.4, 0, 1, 1) 0.12s;
    }

    &-exit-done {
      opacity: 0;
      visibility: hidden;
    }
  }
`;
