import { VariantStyleFunction } from "./utils";

const tabVariantSize = {
  sm: {
    padding: "0.25rem 1rem",
    fontSize: "0.85rem",
  },
  md: {
    fontSize: "1rem",
    padding: "0.5rem 1rem",
  },
  lg: {
    fontSize: "1.15rem",
    padding: "0.75rem 1rem",
  },
};

function getLineStyle({ variantColor, colorMode }: VariantStyleFunction) {
  const _color = { light: `${variantColor}.600`, dark: `${variantColor}.300` };
  return {
    TabList: {
      borderBottom: "2px",
      borderColor: "inherit",
    },
    Tab: {
      borderBottom: "2px",
      borderColor: "transparent",
      mb: "-2px",
      _selected: {
        color: _color[colorMode],
        borderColor: "currentColor",
      },
      _active: {
        bg: "gray.200",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
    },
  };
}

function getEnclosedStyle({
  variantColor,
  colorMode,
  theme,
}: VariantStyleFunction) {
  const _selectedColor = {
    light: `${variantColor}.600`,
    dark: `${variantColor}.300`,
  };
  const _selectedBg = { light: "#fff", dark: theme.colors.gray[800] };

  return {
    Tab: {
      roundedTop: "md",
      border: "1px",
      borderColor: "transparent",
      mb: "-1px",
      _selected: {
        color: _selectedColor[colorMode],
        borderColor: "inherit",
        borderBottomColor: _selectedBg[colorMode],
      },
    },
    TabList: {
      mb: "-1px",
      borderBottom: "1px",
      borderColor: "inherit",
    },
  };
}

const getEnclosedColoredStyle = ({
  variantColor,
  colorMode,
}: VariantStyleFunction) => {
  const bg = { light: "gray.50", dark: "whiteAlpha.50" };
  const _selectedColor = {
    light: `${variantColor}.600`,
    dark: `${variantColor}.300`,
  };
  const _selectedBg = { light: `#fff`, dark: `gray.800` };

  return {
    Tab: {
      border: "1px",
      borderColor: "inherit",
      bg: bg[colorMode],
      mb: "-1px",
      _notLast: {
        mr: "-1px",
      },
      _selected: {
        bg: _selectedBg[colorMode],
        color: _selectedColor[colorMode],
        borderColor: "inherit",
        borderTopColor: "currentColor",
        borderBottomColor: "transparent",
      },
    },
    TabList: {
      mb: "-1px",
      borderBottom: "1px",
      borderColor: "inherit",
    },
  };
};

function getSoftRoundedStyle({ variantColor }: VariantStyleFunction) {
  return {
    Tab: {
      rounded: "full",
      fontWeight: "semibold",
      color: "gray.600",
      _selected: {
        color: `${variantColor}.700`,
        bg: `${variantColor}.100`,
      },
    },
    TabList: {},
  };
}

function getSolidRoundedStyle({
  variantColor,
  colorMode,
}: VariantStyleFunction) {
  const _color = { light: "gray.600", dark: "inherit" };
  const _selectedBg = {
    light: `${variantColor}.600`,
    dark: `${variantColor}.300`,
  };
  const _selectedColor = { light: `#fff`, dark: `gray.800` };

  return {
    Tab: {
      rounded: "full",
      fontWeight: "semibold",
      color: _color[colorMode],
      _selected: {
        color: _selectedColor[colorMode],
        bg: _selectedBg[colorMode],
      },
    },
    TabList: {},
  };
}

export default {
  baseStyles: {
    Tab: {
      display: "flex",
      cursor: "pointer",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s",
      _focus: {
        zIndex: "1",
        boxShadow: "outline",
      },
      TabList: {},
    },
  },
  variantSize: {
    Tab: tabVariantSize,
    TabList: {},
  },
  variant: {
    line: getLineStyle,
    enclosed: getEnclosedStyle,
    "soft-rounded": getSoftRoundedStyle,
    "enclosed-colored": getEnclosedColoredStyle,
    "solid-rounded": getSolidRoundedStyle,
    unstyled: {},
  },
};
