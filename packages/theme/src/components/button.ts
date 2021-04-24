import {
  modeCssNested,
  modeCssGrouped,
  mode,
  transparentize,
} from "@chakra-ui/theme-tools"
import { mergeWith } from "@chakra-ui/utils"
import isEqual from "react-fast-compare"

type Dict = Record<string, any>

const baseStyle = {
  lineHeight: "1.2",
  borderRadius: "md",
  fontWeight: "semibold",
  _focus: {
    boxShadow: "outline",
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none",
  },
  _hover: {
    _disabled: {
      bg: "initial",
    },
  },
}

/* 
In this example, I generate the dark mode styles all grouped at the top level
*/
function variantGhost(props: Dict) {
  const { colorScheme: c, theme } = props

  if (c === "gray") {
    return modeCssGrouped({
      color: ["inherit", `whiteAlpha.900`],
      _hover: {
        bg: [`gray.100`, `whiteAlpha.200`],
      },
      _active: { bg: [`gray.200`, `whiteAlpha.300`] },
    })
  }

  const darkHoverBg = transparentize(`${c}.200`, 0.12)(theme)
  const darkActiveBg = transparentize(`${c}.200`, 0.24)(theme)

  /* const oldStyles = {
    color: mode(`${c}.600`, `${c}.200`)(props),
    bg: "transparent",
    _hover: {
      bg: mode(`${c}.50`, darkHoverBg)(props),
    },
    _active: {
      bg: mode(`${c}.100`, darkActiveBg)(props),
    },
  } */

  // If we were to manually write out the styles
  const newStylesManual = {
    color: `${c}.600`,
    bg: "transparent",
    _hover: {
      bg: `${c}.50`,
    },
    _active: {
      bg: `${c}.100`,
    },
    _dark: {
      color: `${c}.200`,
      _hover: { bg: darkHoverBg },
      _active: { bg: darkActiveBg },
    },
  }

  // If we generate the new styles using syntax that looks very close to the previous use of `mode`
  const newStylesCalculated = modeCssGrouped({
    color: [`${c}.600`, `${c}.200`],
    bg: "transparent",
    _hover: { bg: [`${c}.50`, darkHoverBg] },
    _active: { bg: [`${c}.100`, darkActiveBg] },
  })

  // The generated styles object should be equivalent to the manually written one
  // console.log("Compare ghost:", newStylesManual, newStylesCalculated)
  console.log(
    "Are ghost manual and generated styles equal:",
    isEqual(newStylesManual, newStylesCalculated),
  )

  return newStylesManual
}

function variantOutline(props: Dict) {
  const { colorScheme: c } = props

  return mergeWith(
    {
      border: "1px solid",
      borderColor: c === "gray" ? `gray.200` : "currentColor",
      _dark: {
        borderColor: c === "gray" ? `whiteAlpha.300` : "currentColor",
      },
    },
    variantGhost(props),
  )
}

type AccessibleColor = {
  bg?: string
  color?: string
  hoverBg?: string
  activeBg?: string
}

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
  yellow: {
    bg: "yellow.400",
    color: "black",
    hoverBg: "yellow.500",
    activeBg: "yellow.600",
  },
  cyan: {
    bg: "cyan.400",
    color: "black",
    hoverBg: "cyan.500",
    activeBg: "cyan.600",
  },
}

/* 
In this example, I generate the dark mode styles nested in other selectors like _hover
*/
function variantSolid(props: Dict) {
  const { colorScheme: c } = props

  if (c === "gray") {
    const bg = [`gray.100`, `whiteAlpha.200`]

    return modeCssNested({
      bg,
      _hover: {
        bg: [`gray.200`, `whiteAlpha.300`],
        _disabled: {
          bg,
        },
      },
      _active: { bg: [`gray.300`, `whiteAlpha.400`] },
    })
  }

  const {
    bg = `${c}.500`,
    color = "white",
    hoverBg = `${c}.600`,
    activeBg = `${c}.700`,
  } = accessibleColorMap[c] || {}

  const background = [bg, `${c}.200`]

  /*  const oldStyle = {
    bg: background,
    color: mode(color, `gray.800`)(props),
    _hover: {
      bg: mode(hoverBg, `${c}.300`)(props),
      _disabled: {
        bg: background,
      },
    },
    _active: { bg: mode(activeBg, `${c}.400`)(props) },
  } */

  // If we were to manually write out the styles
  const newStylesManual = {
    bg,
    color,
    _dark: { bg: `${c}.200`, color: `gray.800` },
    _hover: {
      bg: hoverBg,
      _dark: { bg: `${c}.300` },
      _disabled: { bg, _dark: { bg: `${c}.200` } },
    },
    _active: { bg: activeBg, _dark: { bg: `${c}.400` } },
  }

  // If we generate the new styles using syntax that looks very close to the previous use of `mode`
  const newStylesCalculated = modeCssNested({
    bg: background,
    color: [color, `gray.800`],
    _hover: {
      bg: [hoverBg, `${c}.300`],
      _disabled: {
        bg: background,
      },
    },
    _active: { bg: [activeBg, `${c}.400`] },
  })

  // The generated styles object should be equivalent to the manually written one
  // console.log("Compare Solid:", newStylesManual, newStylesCalculated)
  console.log(
    "Are solid manual and generated styles equal:",
    isEqual(newStylesManual, newStylesCalculated),
  )

  return newStylesCalculated
}

function variantLink(props: Dict) {
  const { colorScheme: c } = props
  return {
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    verticalAlign: "baseline",
    color: mode(`${c}.500`, `${c}.200`)(props),
    _hover: {
      textDecoration: "underline",
      _disabled: {
        textDecoration: "none",
      },
    },
    _active: {
      color: mode(`${c}.700`, `${c}.500`)(props),
    },
  }
}

const variantUnstyled = {
  bg: "none",
  color: "inherit",
  display: "inline",
  lineHeight: "inherit",
  m: 0,
  p: 0,
}

const variants = {
  ghost: variantGhost,
  outline: variantOutline,
  solid: variantSolid,
  link: variantLink,
  unstyled: variantUnstyled,
}

const sizes = {
  lg: {
    h: 12,
    minW: 12,
    fontSize: "lg",
    px: 6,
  },
  md: {
    h: 10,
    minW: 10,
    fontSize: "md",
    px: 4,
  },
  sm: {
    h: 8,
    minW: 8,
    fontSize: "sm",
    px: 3,
  },
  xs: {
    h: 6,
    minW: 6,
    fontSize: "xs",
    px: 2,
  },
}

const defaultProps = {
  variant: "solid",
  size: "md",
  colorScheme: "gray",
}

export default {
  baseStyle,
  variants,
  sizes,
  defaultProps,
}
