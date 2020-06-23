const Heading = {
  defaultProps: {
    size: 'xl',
  },
  baseStyle: {
    fontFamily: 'heading',
    lineHeight: 'shorter',
    fontWeight: 'bold',
  },
  sizes: {
    '2xl': {
      fontSize: ['4xl', null, '5xl'],
    },
    xl: {
      fontSize: ['3xl', null, '4xl'],
    },
    lg: {
      fontSize: ['xl', null, '2xl'],
    },
    md: {
      fontSize: 'xl',
    },
    sm: {
      fontSize: 'md',
    },
    xs: {
      fontSize: 'sm',
    },
  },
};

export const HeadingSizes = {
  '2xl': '2xl',
  xl: 'xl',
  lg: 'lg',
  md: 'md',
  sm: 'sm',
  xs: 'xs',
};

export default Heading;
