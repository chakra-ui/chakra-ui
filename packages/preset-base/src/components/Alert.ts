const subtle = ({ theme, variantColor, colorMode }: any) => {
  const style = {
    light: {
      bg: `${variantColor}.100`,
    },
    dark: { bg: `${variantColor}.200` },
  };
  return style[colorMode as keyof typeof style];
};

const leftAccent = (props: any) => {
  const { variantColor, colorMode } = props;
  const style = {
    light: {
      paddingLeft: 3,
      borderLeft: "4px",
      borderColor: `${variantColor}.500`,
    },
    dark: {
      paddingLeft: 3,
      borderLeft: "4px",
      borderColor: `${variantColor}.200`,
    },
  };
  return {
    ...subtle(props),
    ...style[colorMode as keyof typeof style],
  };
};

const topAccent = (props: any) => {
  const { variantColor, colorMode } = props;
  const style = {
    light: {
      paddingTop: 2,
      borderTop: "4px",
      borderColor: `${variantColor}.500`,
    },
    dark: {
      paddingTop: 2,
      borderTop: "4px",
      borderColor: `${variantColor}.200`,
    },
  };
  return {
    ...subtle(props),
    ...style[colorMode as keyof typeof style],
  };
};

export default {
  common: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 3,
    paddingBottom: 3,
  },
  variant: {
    solid: ({ variantColor, colorMode }: any) => {
      const style = {
        light: { bg: `${variantColor}.500`, color: "white" },
        dark: { bg: `${variantColor}.200`, color: "gray.900" },
      };
      return style[colorMode as keyof typeof style];
    },
    subtle,
    "left-accent": leftAccent,
    "top-accent": topAccent,
  },
};
