/**@jsx jsx */
import {
  chakra,
  ChakraComponent,
  css,
  forwardRef,
  jsx,
} from "@chakra-ui/system";
import { cleanChildren } from "@chakra-ui/utils";
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
  /**
   * If `true`, each stack item will show a divider
   */
  showDivider?: boolean;
  /**
   * The border color of the divider.
   * Note: It only applies when `showDivider` is set to `true`,
   */
  dividerColor?: StackProps["borderColor"];
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
    showDivider,
    dividerColor,
    ...rest
  } = props;

  const finalDirection = isInline ? "row" : direction;

  const stackStyle = {
    [finalDirection === "row" ? "marginLeft" : "marginTop"]: spacing,
  };

  const validChildren = cleanChildren(children);

  const finalChildren = isReversed ? validChildren.reverse() : validChildren;

  const clones = finalChildren.map((child, index) => {
    const isLast = index + 1 === finalChildren.length;
    if (!isLast) {
      return (
        <React.Fragment key={index}>
          {child}
          <chakra.hr
            border="0"
            borderBottom="1px solid"
            borderColor={dividerColor}
            marginY={spacing}
            alignSelf="stretch"
          />
        </React.Fragment>
      );
    }
    return child;
  });

  return (
    <chakra.div
      ref={ref}
      display="flex"
      alignItems={align}
      justifyContent={justify}
      flexDirection={finalDirection}
      flexWrap={wrap}
      css={!showDivider ? css({ ">*+*": stackStyle }) : undefined}
      {...rest}
    >
      {showDivider ? clones : finalChildren}
    </chakra.div>
  );
}) as ChakraComponent<"div", StackProps>;

export default Stack;
