/**@jsx jsx */
import {
  chakra,
  ChakraComponent,
  css,
  forwardRef,
  jsx,
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
  direction?: "row" | "column";
  /**
   * The content of the stack.
   */
  children: React.ReactNode;
  /**
   * If `true`, the items will be places horizontally
   */
  isInline?: boolean;
  /**
   * If `true`, the stack will be reversed
   */
  isReversed?: boolean;
}

type StackProps = FlexProps & StackOptions;

const Stack = forwardRef((props: StackProps, ref: React.Ref<any>) => {
  const {
    direction = "column",
    justify = "flex-start",
    align,
    spacing = 2,
    wrap,
    children,
    isReversed,
    isInline,
    ...rest
  } = props;

  const finalDirection = isInline ? "row" : direction;

  const stackStyle = {
    [finalDirection === "row" ? "marginLeft" : "marginTop"]: spacing,
  };

  const finalChildren = isReversed
    ? React.Children.toArray(children).reverse()
    : children;

  return (
    <chakra.div
      ref={ref}
      display="flex"
      alignItems={align}
      justifyContent={justify}
      flexDirection={finalDirection}
      flexWrap={wrap}
      css={css({ ">*+*": stackStyle })}
      {...rest}
    >
      {finalChildren}
    </chakra.div>
  );
}) as ChakraComponent<"div", StackProps>;

export default Stack;
