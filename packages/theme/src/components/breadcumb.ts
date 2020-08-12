const parts = {
  link: "the breadcrumb",
  separator: "the separator between each link",
}

const baseStyleLink = {
  transition: "all 0.15s ease-out",
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

export const Breadcrumb = {
  parts,
  baseStyle,
}
