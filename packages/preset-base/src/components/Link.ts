export default {
  common: {
    transition: `all 0.15s ease-out`,
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
    _disabled: {
      opacity: "0.4",
      cursor: "not-allowed",
      textDecoration: "none",
    },
  },
};
