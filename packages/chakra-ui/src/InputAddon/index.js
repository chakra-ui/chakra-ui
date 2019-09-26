/** @jsx jsx */
import { jsx } from "@emotion/core";
import Box from "../Box";
import useInputStyle from "../Input/styles";
import { useColorMode } from "../ColorModeProvider";

const InputAddon = ({ placement = "left", size = "md", ...props }) => {
  const { colorMode } = useColorMode();
  const bg = { dark: "whiteAlpha.300", light: "gray.100" };
  const _placement = {
    left: {
      mr: "-1px",
      roundedRight: 0,
      borderRightColor: "transparent",
    },
    right: {
      order: 1,
      roundedLeft: 0,
      borderLeftColor: "transparent",
    },
  };

  const styleProps = {
    ...useInputStyle({ size, variant: "outline" }),
    flex: "0 0 auto",
    whiteSpace: "nowrap",
    bg: bg[colorMode],
    ..._placement[placement],
  };

  return (
    <Box
      {...styleProps}
      {...props}
      css={{ "input:focus + &": { zIndex: -1 } }}
    />
  );
};

const InputLeftAddon = props => <InputAddon placement="left" {...props} />;
const InputRightAddon = props => <InputAddon placement="right" {...props} />;

export { InputLeftAddon, InputRightAddon };
export default InputAddon;
