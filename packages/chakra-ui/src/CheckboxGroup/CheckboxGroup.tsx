/** @jsx jsx */
import { useCheckboxGroup } from "@chakra-ui/hooks";
import { Box, BoxProps, SystemProps } from "@chakra-ui/layout";
import { Merge, omit } from "@chakra-ui/utils";
import { jsx } from "@emotion/core";
import * as React from "react";
import { Children, cloneElement, isValidElement } from "react";
import { CheckboxOptions } from "../Checkbox";

export interface CheckboxGroupOptions {
  /**
   * The id of the checkbox group.
   */
  id?: CheckboxOptions["id"];
  /**
   * The name of the checkbox group. This prop is passed to each checbox
   */
  name?: CheckboxOptions["name"];
  /**
   * The content of the checkbox group. Must be the `Checkbox` component
   */
  children?: React.ReactNode;
  /**
   * The initial value of the checkbox group
   */
  defaultValue?: (string | number)[];
  /**
   * The value of the checkbox group
   */
  value?: (string | number)[];
  /**
   * The callback fired when any children Checkbox is checked or unchecked
   */
  onChange?: (value: (string | number)[]) => void;
  /**
   * The space between each checkbox
   */
  spacing?: SystemProps["margin"];
  /**
   * If `true`, the checkboxes will aligned horizontally.
   */
  isInline?: boolean;
  /**
   * The color of the checkbox when it's checked.
   */
  variantColor?: CheckboxOptions["variantColor"];
  /**
   * The size of the checkbox. It's forwarded to all children checkbox
   */
  size?: CheckboxOptions["size"];
}

export type CheckboxGroupProps = Merge<BoxProps, CheckboxGroupOptions>;

const CheckboxGroup = ({
  variantColor,
  size,
  isInline,
  spacing = 2,
  children,
  ...props
}: CheckboxGroupOptions) => {
  const checkboxGroup = useCheckboxGroup(props);
  const clones = Children.map(children, (child, index) => {
    if (!isValidElement(child)) return;
    const isLastCheckbox = React.Children.count(children) === index + 1;
    const spacingProps = isInline ? { mr: spacing } : { mb: spacing };

    return (
      <Box
        display={isInline ? "inline-block" : "block"}
        {...(!isLastCheckbox && spacingProps)}
      >
        {cloneElement(child as React.ReactElement<CheckboxOptions>, {
          size: size,
          variantColor: variantColor,
          onChange: () => checkboxGroup.onChange(child.props.value),
          isChecked: checkboxGroup.value.includes(child.props.value),
        })}
      </Box>
    );
  });

  // Omit incompatible values
  const finalProps = omit(props, ["defaultValue", "value", "onChange"]);

  return (
    <Box role="group" {...finalProps}>
      {clones}
    </Box>
  );
};

export default CheckboxGroup;
