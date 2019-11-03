/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Box, BoxProps } from "../Box";
import useInputStyle from "../Input/styles";
import { useColorMode } from "../ColorModeProvider";
import { InputOptions } from "../Input";
import { forwardRef } from "react";

interface InputAddonOptions {
  /**
   * The content of the `InputAddon`
   */
  children: React.ReactNode;
  /**
   * The size of the addon is inherited from the `InputGroup` via `cloneElement`.
   */
  size?: InputOptions["size"];
  /**
   * The position the addon should appear relative to the `Input`.
   * We added `InputLeftAddon` and `InputRightAddon` so you might not need to pass this
   */
  placement?: "left" | "right";
}

export type InputAddonProps = InputAddonOptions & BoxProps;

const InputAddon = forwardRef(function InputAddon(
  { placement = "left", size = "md", ...props }: InputAddonProps,
  ref: React.Ref<HTMLElement>,
) {
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

  type Placements = keyof typeof _placement;

  const styleProps = {
    ...useInputStyle({ size, variant: "outline" }),
    flex: "0 0 auto",
    whiteSpace: "nowrap",
    bg: bg[colorMode],
    ..._placement[placement as Placements],
  };

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
      css={{ "input:focus + &": { zIndex: -1 } }}
    />
  );
}) as (props: InputAddonProps) => React.ReactElement<InputAddonProps>;

const InputLeftAddon = (props: InputAddonProps) => (
  <InputAddon placement="left" {...props} />
);

const InputRightAddon = (props: InputAddonProps) => (
  <InputAddon placement="right" {...props} />
);

export { InputLeftAddon, InputRightAddon };
export default InputAddon;
