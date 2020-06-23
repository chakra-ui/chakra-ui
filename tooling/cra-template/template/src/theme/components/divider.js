const Divider = {
  defaultProps: {
    variant: 'horizontal',
  },
  variants: {
    vertical: {
      borderLeftWidth: '1px',
      height: '100%',
    },
    horizontal: {
      borderBottomWidth: '1px',
      width: '100%',
    },
  },
};

export default Divider;
