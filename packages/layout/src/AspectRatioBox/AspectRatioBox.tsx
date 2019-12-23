import { chakra, ChakraComponent, forwardRef } from "@chakra-ui/system";
import * as React from "react";
import { BoxProps } from "../Box";

export type AspectRatioBoxProps = BoxProps & { ratio?: number };

const AspectRatioBox = forwardRef(
  (
    { ratio = 4 / 3, children, ...rest }: AspectRatioBoxProps,
    ref: React.Ref<any>,
  ) => {
    const child = React.Children.only(children);
    return (
      <chakra.div
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
      </chakra.div>
    );
  },
) as ChakraComponent<"div", { ratio?: number }>;

export default AspectRatioBox;
