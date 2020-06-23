import { mode, getColor, ink, transparentize } from '@chakra-ui/theme-tools';

function getSolidStyle(props) {
  const { colorScheme: c, theme: t } = props;
  const dark = transparentize(`${c}.500`, 0.6)(t);

  return {
    bg: mode(`${c}.500`, dark)(props),
    color: mode(`white`, `whiteAlpha.800`)(props),
  };
}

function getSubtleStyle(props) {
  const { colorScheme: c, theme: t } = props;
  const darkBg = ink(`${c}.200`, 'lowest')(t);

  return {
    bg: mode(`${c}.100`, darkBg)(props),
    color: mode(`${c}.800`, `${c}.200`)(props),
  };
}

function getOutlineStyle(props) {
  const { colorScheme: c, theme: t } = props;
  const dark = transparentize(`${c}.200`, 0.8)(t);
  const light = getColor(t, `${c}.500`);
  const color = mode(light, dark)(props);

  return {
    color,
    boxShadow: `inset 0 0 0px 1px ` + color,
  };
}

const Badge = {
  defaultProps: {
    variant: 'subtle',
    colorScheme: 'gray',
  },
  baseStyle: {
    paddingX: 1,
    textTransform: 'uppercase',
    fontSize: 'xs',
    borderRadius: 'sm',
    fontWeight: 'bold',
  },
  variants: {
    solid: getSolidStyle,
    outline: getOutlineStyle,
    subtle: getSubtleStyle,
  },
};

export const BadgeVariants = {
  solid: 'solid',
  subtle: 'subtle',
  outline: 'outline',
};

export default Badge;
