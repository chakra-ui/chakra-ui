const theme = {
  space: { sm: 4, md: 12, lg: 24, xl: 40 },
  components: {
    Button: {
      defaultProps: {
        variant: "solid",
        size: "small",
      },
      baseStyle: {
        padding: 20,
        fontSize: 14,
        background: "white",
      },
      variants: {
        solid: {
          background: "pink",
          color: "white",
          "&:hover": {
            background: "darkpink",
          },
        },
        outline: {
          border: "2px solid red",
          color: "red",
          "&:hover": {
            background: "darkpink",
          },
        },
      },
      sizes: {
        small: {
          padding: 10,
          fontSize: 12,
        },
        large: {
          padding: 16,
          fontSize: 20,
        },
      },
    },
    Tabs: {
      baseStyle: {
        Tab: { fontSize: 14, color: "pink" },
        TabList: { borderBottom: "2px solid", borderColor: "gray" },
      },
    },
    Badge: {
      baseStyle: () => ({
        padding: 40,
      }),
    },
  },
}

export default theme
