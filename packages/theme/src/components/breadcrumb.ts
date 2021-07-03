const parts = ["container", "item", "link", "separator"]

const baseStyleLink = {
  transitionProperty: "common",
  transitionDuration: "fast",
  transitionTimingFunction: "ease-out",
  cursor: "pointer",
  textDecoration: "none",
  outline: "none",
  color: "inherit",
  _hover: {
    textDecoration: "underline",
  },
  _focus: {
    boxShadow: "outline",
  },
}

const baseStyle = {
  link: baseStyleLink,
}

export default {
  parts,
  baseStyle,
}
