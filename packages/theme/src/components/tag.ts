import Badge from "./badge"

const parts = {
  container: "the tag container",
  label: "the tag inner text",
  closeButton: "the close button",
}

type Dict = Record<string, any>

const baseStyleContainer = {
  fontWeight: "medium",
  lineHeight: 1.2,
  outline: 0,
  _focus: {
    boxShadow: "outline",
  },
}

const baseStyleLabel = {
  lineHeight: 1.2,
}

const baseStyleCloseButton = {
  fontSize: "18px",
  w: "1.25rem",
  h: "1.25rem",
  borderRadius: "sm",
  ml: "0.375rem",
  mr: "-1",
  opacity: 0.5,
  _disabled: {
    opacity: 0.4,
  },
  _focus: {
    boxShadow: "outline",
    bg: "rgba(0, 0, 0, 0.14)",
  },
  _hover: { opacity: 0.8 },
  _active: { opacity: 1 },
}

const baseStyle = {
  container: baseStyleContainer,
  label: baseStyleLabel,
  closeButton: baseStyleCloseButton,
}

const sizes = {
  sm: {
    container: {
      minH: "1.25rem",
      minW: "1.25rem",
      fontSize: "xs",
      px: 1,
      borderRadius: "sm",
    },
  },
  md: {
    container: {
      minH: "1.5rem",
      minW: "1.5rem",
      fontSize: "sm",
      borderRadius: "md",
      px: 2,
    },
  },
  lg: {
    container: {
      minH: 8,
      minW: 8,
      fontSize: "md",
      borderRadius: "md",
      px: 3,
    },
  },
}

const variants = {
  subtle: (props: Dict) => ({
    container: Badge.variants.subtle(props),
  }),
  solid: (props: Dict) => ({
    container: Badge.variants.solid(props),
  }),
  outline: (props: Dict) => ({
    container: Badge.variants.outline(props),
  }),
}

const defaultProps = {
  size: "md",
  variant: "subtle",
  colorScheme: "gray",
}

export default {
  parts,
  variants,
  baseStyle,
  sizes,
  defaultProps,
}
