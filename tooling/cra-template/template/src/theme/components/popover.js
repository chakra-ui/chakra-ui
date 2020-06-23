import { mode } from '@chakra-ui/theme-tools';

const Popover = {
  baseStyle: props => ({
    Content: {
      bg: mode('white', 'gray.700')(props),
      border: '1px solid',
      borderColor: 'inherit',
      borderRadius: 'md',
      boxShadow: 'sm',
      width: '100%',
      maxWidth: 'xs',
      zIndex: '1',
      _focus: {
        outline: 0,
        boxShadow: 'outline',
      },
    },
    Header: {
      paddingX: 3,
      paddingY: 2,
      borderBottomWidth: '1px',
    },
    Body: {
      paddingX: 3,
      paddingY: 2,
    },
    Footer: {
      paddingX: 3,
      paddingY: 2,
      borderTopWidth: '1px',
    },
  }),
};

export default Popover;
