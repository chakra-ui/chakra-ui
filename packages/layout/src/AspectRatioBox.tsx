import { ChakraComponent, forwardRef } from "@chakra-ui/system";
import * as React from "react";
import { Box, BoxProps } from "./Box";

export type AspectRatioBoxProps = BoxProps & { ratio?: number };

export const AspectRatioBox = forwardRef(function(
  props: AspectRatioBoxProps,
  ref: React.Ref<any>,
) {
  const { ratio = 4 / 3, children, ...rest } = props;
  const child = React.Children.only(children);
  return (
    <Box
      ref={ref}
      pos="relative"
      _before={{
        height: 0,
        content: `""`,
        display: "block",
        paddingBottom: `${(1 / ratio) * 100}%`,
      }}
      {...rest}
    >
      {React.isValidElement(child) &&
        React.cloneElement(child as React.ReactElement<BoxProps>, {
          position: "absolute",
          width: "full",
          height: "full",
          top: 0,
          left: 0,
        })}
    </Box>
  );
}) as ChakraComponent<"div", { ratio?: number }>;

export default AspectRatioBox;
