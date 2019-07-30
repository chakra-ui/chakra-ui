/** @jsx jsx */
import { jsx } from "@emotion/core";
import { oneOf } from "prop-types";
import Box from "../Box";
import useInputStyle from "../Input/styles";
import { useUIMode } from "../ThemeProvider";

const InputAddon = ({ placement = "left", size = "md", ...props }) => {
  const { mode } = useUIMode();
  const bg = { dark: "alpha.300", light: "gray.100" };
  const _placement = {
    left: {
      mr: "-1px",
      roundedRight: 0,
      borderRightColor: "transparent"
    },
    right: {
      order: 1,
      // ml: "-1px",
      roundedLeft: 0,
      borderLeftColor: "transparent"
    }
  };

  let styleProps = {
    ...useInputStyle({ size, variant: "outline", _focusBorderColor: "blue" }),
    flex: "0 0 auto",
    whiteSpace: "nowrap",
    bg: bg[mode],
    ..._placement[placement]
  };

  return (
    <Box
      {...styleProps}
      {...props}
      css={{ "input:focus + &": { zIndex: -1 } }}
    />
  );
};

InputAddon.propTypes = {
  placement: oneOf(["left", "right"])
};

export default InputAddon;

/* 
  <InputAppend/>
  <InputPrepend/>
*/