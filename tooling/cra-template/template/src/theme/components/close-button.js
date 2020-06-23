import { mode } from '@chakra-ui/theme-tools';

const CloseButton = {
  defaultProps: {
    size: 'md',
  },
  baseStyle: props => ({
    borderRadius: 'md',
    transition: 'all 0.2s',
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
      boxShadow: 'none',
    },
    _hover: {
      bg: mode(`blackAlpha.100`, `whiteAlpha.100`)(props),
    },
    _active: {
      bg: mode(`blackAlpha.200`, `whiteAlpha.200`)(props),
    },
    _focus: {
      boxShadow: 'outline',
    },
  }),
  sizes: {
    lg: {
      width: '40px',
      height: '40px',
      fontSize: '16px',
    },
    md: {
      width: '32px',
      height: '32px',
      fontSize: '12px',
    },
    sm: {
      width: '24px',
      height: '24px',
      fontSize: '10px',
    },
  },
};

export const CloseButtonSizes = {
  lg: 'lg',
  sm: 'sm',
  md: 'md',
};

export default CloseButton;
