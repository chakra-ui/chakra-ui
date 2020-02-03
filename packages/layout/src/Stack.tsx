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
   * If `true`, the items will be places horizontally
   */
  isInline?: boolean;
}

type StackProps = FlexProps & StackOptions;

const Stack = forwardRef((props: StackProps, ref: React.Ref<any>) => {
  const {
    direction = "column",
    justify = "flex-start",
    align,
    spacing = 2,
    wrap,
    ...rest
  } = props;

  const spacingProp = { marginTop: spacing };

  return (
    <chakra.div
      ref={ref}
      display="flex"
      alignItems={align}
      justifyContent={justify}
      flexDirection={direction}
      flexWrap={wrap}
      css={css({ ">*+*": spacingProp })}
      {...rest}
    />
  );
}) as ChakraComponent<"div", StackOptions>;

export default Stack;
