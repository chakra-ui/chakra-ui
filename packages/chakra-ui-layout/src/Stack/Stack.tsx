import { chakra, ChakraComponent } from "@chakra-ui/system";
import * as React from "react";
import { Box } from "../Box";
import { FlexProps } from "../Flex";

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

const Stack = React.forwardRef(
  (
    {
      direction: directionProp,
      align,
      justify,
      spacing = 2,
      children,
      shouldWrapChildren,
      ...props
    }: StackProps,
    ref: React.Ref<any>,
  ) => {
    const isReversed = directionProp && directionProp.endsWith("reverse");
    const isInline = directionProp && directionProp.startsWith("row");
    let direction: any;

    if (isInline) {
      direction = "row";
    }

    if (isReversed) {
      direction = isInline ? "row-reverse" : "column-reverse";
    }

    if (directionProp) {
      direction = directionProp;
    }

    if (!isInline && !isReversed && !directionProp) {
      direction = "column";
    }

    const validChildren = React.Children.toArray(children).filter(
      React.isValidElement,
    );

    return (
      <chakra.div
        ref={ref}
        display="flex"
        alignItems={align}
        justifyContent={justify}
        flexDirection={direction}
        {...props}
      >
        {React.Children.map(validChildren, (child, index) => {
          const isLastChild = React.Children.count(children) === index + 1;

          const spacingProps = isInline
            ? { [isReversed ? "ml" : "mr"]: isLastChild ? null : spacing }
            : { [isReversed ? "mt" : "mb"]: isLastChild ? null : spacing };

          if (shouldWrapChildren) {
            return (
              <Box display="inline-block" width="100%" {...spacingProps}>
                {child}
              </Box>
            );
          }
          return React.cloneElement(child, spacingProps);
        })}
      </chakra.div>
    );
  },
) as ChakraComponent<"div">;

export default Stack;
