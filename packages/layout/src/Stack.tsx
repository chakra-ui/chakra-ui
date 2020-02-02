/**@jsx jsx */
import {
  ChakraComponent,
  css,
  jsx,
  forwardRef,
  chakra,
} from "@chakra-ui/system";
import * as React from "react";
import { FlexProps } from "./Flex";

interface StackOptions {
  /**
   * The space between each stack item
   */
  spacing?: FlexProps["margin"];
  /**
   * The direction to stack the items.
   */
  direction?: React.CSSProperties["flexDirection"];
  /**
   * The content of the stack.
   */
  children: React.ReactNode;
  /**
   * If `true`, the children will be wrapped in a `Box` with
   * `display: inline-block`, and the `Box` will take the spacing props
   */
  shouldWrapChildren?: boolean;
}

type StackProps = FlexProps & StackOptions;

const Stack = forwardRef(
  (
    {
      direction = "column",
      align,
      justify,
      spacing = 2,
      children,
      shouldWrapChildren,
      ...props
    }: StackProps,
    ref: React.Ref<any>,
  ) => {
    const isInline = direction?.startsWith("row");
    const isReversed = direction?.endsWith("reverse");

    const spacingProp = isInline
      ? { [isReversed ? "mr" : "ml"]: spacing }
      : { [isReversed ? "mb" : "mt"]: spacing };

    return (
      <chakra.div
        ref={ref}
        display="flex"
        alignItems={align}
        justifyContent={justify}
        flexDirection={direction}
        css={css({ ">*+*": spacingProp })}
        {...props}
      >
        {shouldWrapChildren
          ? React.Children.map(children, child => {
              if (!React.isValidElement(child)) return;
              return <chakra.div display="inline-block">{child}</chakra.div>;
            })
          : children}
      </chakra.div>
    );
  },
) as ChakraComponent<"div", StackOptions>;

export default Stack;
