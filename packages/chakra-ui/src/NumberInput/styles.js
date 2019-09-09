const themedProps = {
  light: {
    borderColor: "inherit",
    _active: {
      bg: "gray.200",
    },
    _last: {
      roundedBottomRight: 3,
      mt: "-1px",
      borderTopWidth: 1,
    },
  },
  dark: {
    color: "whiteAlpha.800",
    borderColor: "whiteAlpha.300",
    _last: {
      roundedBottomRight: 3,
      mt: "-1px",
      borderTopWidth: 1,
    },
    _active: {
      bg: "whiteAlpha.300",
    },
  },
};

const styleProps = ({ colorMode }) => ({
  borderLeft: "1px",
  _first: {
    roundedTopRight: 1,
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
  ...themedProps[colorMode],
});

export default styleProps;
