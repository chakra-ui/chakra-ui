import { keyframes } from '@chakra-ui/system';
import { mode, getColor } from '@chakra-ui/theme-tools';
export const frame = (start, end) => keyframes`
  from {
    border-color: ${start};
    background: ${start};
  }
  to {
    border-color: ${end};
    background: ${end};
  }
`;

export function getBaseStyle(props) {
  const {
    startColor = mode('gray.100', 'gray.800')(props),
    endColor = mode('gray.400', 'gray.600')(props),
    speed,
    theme,
  } = props;
  const start = getColor(theme, startColor);
  const end = getColor(theme, endColor);

  return {
    borderColor: start,
    background: end,
    animation: `${speed}s linear infinite alternate ${frame(start, end)}`,
  };
}

const Skeleton = {
  baseStyle: getBaseStyle,
};

export default Skeleton;
