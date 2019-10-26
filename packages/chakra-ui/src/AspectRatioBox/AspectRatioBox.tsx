import * as React from "react";
import { Box, BoxProps, SystemProps } from "../Box";

export type AspectRatioBoxProps<P, T> = BoxProps<P, T> & { ratio?: number };

const AspectRatioBox = React.forwardRef(function AspectRatioBox<P, T extends HTMLElement>(
  { ratio = 4 / 3, ...props }: AspectRatioBoxProps<P, T>,
  ref: React.Ref<T>,
) {
  const child = React.Children.only(props.children);
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
      {...props}
    >
      {React.isValidElement(child) &&
        React.cloneElement(child, {
          position: "absolute",
          width: "full",
          height: "full",
          top: 0,
          left: 0,
        } as SystemProps)}
    </Box>
  );
}) as <P, T = HTMLElement>(
  props: AspectRatioBoxProps<P, T>,
) => React.ReactElement<AspectRatioBoxProps<P, T>>;

export default AspectRatioBox;
