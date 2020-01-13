import { VariantStyleFunction, getModeValue } from "./utils";
import { getColor } from "@chakra-ui/color";

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

function getLineStyle(props: VariantStyleFunction) {
  const color = getModeValue(
    props,
    `${props.variantColor}.600`,
    `${props.variantColor}.300`,
  );

  const activeBg = getModeValue(props, "gray.200", "whiteAlpha.300");

  return {
    TabList: {
      borderBottom: "2px solid",
      borderColor: "inherit",
    },
    Tab: {
      borderBottom: "2px solid",
      borderColor: "transparent",
      marginBottom: "-2px",
      _selected: {
        color: color,
        borderColor: "currentColor",
      },
      _active: {
        bg: activeBg,
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
    },
  };
}

function getEnclosedStyle(props: VariantStyleFunction) {
  const selectedColor = getModeValue(
    props,
    `${props.variantColor}.600`,
    `${props.variantColor}.300`,
  );

  const selectedBorderColor = getModeValue(props, `white`, `gray.800`);

  return {
    Tab: {
      roundedTop: "md",
      border: "1px solid",
      borderColor: "transparent",
      marginBottom: "-1px",
      _selected: {
        color: selectedColor,
        borderColor: "inherit",
        borderBottomColor: selectedBorderColor,
      },
    },
    TabList: {
      marginBottom: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit",
    },
  };
}

const getEnclosedColoredStyle = (props: VariantStyleFunction) => {
  const bg = getModeValue(props, `gray.50`, `whiteAlpha.50`);
  const selectedColor = getModeValue(
    props,
    `${props.variantColor}.600`,
    `${props.variantColor}.300`,
  );
  const selectedBg = getModeValue(props, `#fff`, "gray.800");

  return {
    Tab: {
      border: "1px solid",
      borderColor: "inherit",
      bg: bg,
      marginBottom: "-1px",
      _notLast: {
        mr: "-1px",
      },
      _selected: {
        bg: selectedBg,
        color: selectedColor,
        borderColor: "inherit",
        borderTopColor: "currentColor",
        borderBottomColor: "transparent",
      },
    },
    TabList: {
      marginBottom: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit",
    },
  };
};

function getSoftRoundedStyle(props: VariantStyleFunction) {
  const selectedColor = getColor(props.theme, `${props.variantColor}.700`);
  const selectedBg = getColor(props.theme, `${props.variantColor}.100`);

  return {
    Tab: {
      rounded: "full",
      fontWeight: "semibold",
      color: "gray.600",
      _selected: {
        color: selectedColor,
        bg: selectedBg,
      },
    },
    TabList: {},
  };
}

function getSolidRoundedStyle(props: VariantStyleFunction) {
  const color = getModeValue(props, "gray.600", "inherit");
  const selectedBg = getModeValue(
    props,
    `${props.variantColor}.600`,
    `${props.variantColor}.300`,
  );
  const selectedColor = getModeValue(props, `#fff`, "gray.800");

  return {
    Tab: {
      rounded: "full",
      fontWeight: "semibold",
      color: color,
      _selected: {
        color: selectedColor,
        bg: selectedBg,
      },
    },
    TabList: {},
  };
}

export default {
  baseStyle: {
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
    },
  },
  variantSize: {
    sm: {
      Tab: tabVariantSize.sm,
    },
    md: {
      Tab: tabVariantSize.md,
    },
    lg: {
      Tab: tabVariantSize.lg,
    },
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
