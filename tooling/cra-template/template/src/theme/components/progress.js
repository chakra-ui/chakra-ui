import { mode, getColor } from '@chakra-ui/theme-tools';

const getProgressBg = props => {
  const { colorScheme: c, theme: t, isIndeterminate } = props;
  const bg = mode(`${c}.500`, `${c}.200`)(props);
  const gradient = `linear-gradient(
    to right,
    transparent 0%,
    ${getColor(t, bg)} 50%,
    transparent 100%
  )`;

  return {
    bg: isIndeterminate ? gradient : bg,
  };
};

const sizes = {
  xs: {
    Track: {
      height: '0.25rem',
    },
  },
  sm: {
    Track: {
      height: '0.5rem',
    },
  },
  md: {
    Track: {
      height: '0.75rem',
    },
  },
  lg: {
    Track: {
      height: '1rem',
    },
  },
};

const Progress = {
  defaultProps: {
    size: 'md',
    colorScheme: 'blue',
  },
  baseStyle: props => ({
    Label: {
      lineHeight: '1',
      fontSize: '0.25em',
    },
    Track: {
      bg: mode(`gray.100`, `whiteAlpha.300`)(props),
    },
    Indicator: {
      height: '100%',
      transition: 'all 0.3s',
      ...getProgressBg(props),
    },
  }),
  sizes,
};

export const ProgressSizes = {
  lg: 'lg',
  sm: 'sm',
  md: 'md',
  xs: 'xs',
};

export default Progress;
