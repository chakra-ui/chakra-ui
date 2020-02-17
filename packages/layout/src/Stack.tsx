/**@jsx jsx */
import {
  chakra,
  ChakraComponent,
  css,
  forwardRef,
  jsx,
  PropsOf,
} from "@chakra-ui/system";
import { cleanChildren, Omit } from "@chakra-ui/utils";
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
  divider?: React.ReactElement;
}

export type StackProps = Omit<FlexProps, "direction" | "flexDirection"> &
  StackOptions;

export type StackDividerProps = PropsOf<typeof chakra.hr>;

export const StackDivider = (props: StackDividerProps) => (
  <chakra.hr border="0" alignSelf="stretch" {...props} />
);

export const Stack = forwardRef((props: StackProps, ref: React.Ref<any>) => {
  const {
    direction = "column",
    justify = "flex-start",
    align,
    spacing = 2,
    wrap,
    children,
    isReversed,
    isInline,
    divider,
    ...rest
  } = props;

  const finalDirection = isInline ? "row" : direction;

  const stackStyle = {
    [finalDirection === "row" ? "marginLeft" : "marginTop"]: spacing,
  };

  const validChildren = cleanChildren(children);

  const finalChildren = isReversed ? validChildren.reverse() : validChildren;

  const dividerStyleProps =
    finalDirection === "row"
      ? {
          marginX: spacing,
          marginY: 0,
          borderLeft: "1px solid",
        }
      : {
          marginY: spacing,
          marginX: 0,
          width: "100%",
          borderBottom: "1px solid",
        };

  const hasDivider = Boolean(divider);

  const clones = finalChildren.map((child, index) => {
    if (!hasDivider) return child;

    const isLast = index + 1 === finalChildren.length;

    if (!isLast) {
      return (
        <React.Fragment key={index}>
          {[
            child,
            React.cloneElement(
              divider as React.ReactElement<any>,
              dividerStyleProps,
            ),
          ]}
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
      css={!hasDivider ? css({ ">*+*": stackStyle }) : undefined}
      {...rest}
    >
      {clones}
    </chakra.div>
  );
}) as ChakraComponent<"div", StackProps>;

export default Stack;
