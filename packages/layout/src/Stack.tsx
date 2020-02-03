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

/**
 * <HStack>
 *  <div>Item 1</div>
 *  <div>Item 2</div>
 * </HStack>
 *
 * <VStack>
 *  <div>Item 1</div>
 *  <div>Item 2</div>
 * </VStack>
 *
 * <ZStack>
 *  <div>Item 1</div>
 *  <div>Item 2</div>
 * </ZStack>
 */

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
        {children}
      </chakra.div>
    );
  },
) as ChakraComponent<"div", StackOptions>;

export default Stack;
