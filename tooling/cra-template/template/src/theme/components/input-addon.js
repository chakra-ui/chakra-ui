import { mode } from '@chakra-ui/theme-tools';

function getOutlineStyle(props) {
  return {
    border: '1px solid',
    borderColor: mode('inherit', 'whiteAlpha.50')(props),
    bg: mode('gray.100', 'whiteAlpha.300')(props),
  };
}

function getFilledStyle(props) {
  return {
    border: '2px solid',
    borderColor: 'transparent',
    bg: mode('gray.100', 'whiteAlpha.50')(props),
  };
}

function getFlushedStyle(props) {
  return {
    borderBottom: '2px solid',
    borderColor: 'inherit',
    borderRadius: 0,
    paddingX: 0,
    bg: 'transparent',
  };
}

const unstyled = {
  bg: 'transparent',
  paddingX: 0,
  height: 'auto',
};

const sizes = {
  lg: {
    fontSize: 'lg',
    paddingX: 4,
    paddingY: 2,
    borderRadius: 'md',
  },
  md: {
    fontSize: 'md',
    paddingX: 4,
    paddingY: 2,
    borderRadius: 'md',
  },
  sm: {
    fontSize: 'sm',
    paddingX: 3,
    paddingY: 1,
    borderRadius: 'sm',
  },
};

const InputAddon = {
  sizes,
  variants: {
    outline: getOutlineStyle,
    filled: getFilledStyle,
    flushed: getFlushedStyle,
    unstyled,
  },
};

export const InputAddonVariants = {
  outline: 'outline',
  filled: 'filled',
  flushed: 'flushed',
  unstyled: 'unstyled',
};

export default InputAddon;
