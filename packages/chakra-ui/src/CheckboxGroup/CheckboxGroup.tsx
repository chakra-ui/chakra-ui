/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  Children,
  cloneElement,
  useState,
  useRef,
  isValidElement,
  FormEvent,
} from "react";
import { useUID as useId } from "react-uid";
import { Box } from "../Box";
import * as React from "react";
import * as StyledSystem from "styled-system";
import { BoxProps } from "../Box";
import { CheckboxOptions } from "../Checkbox";
import { Merge } from "@chakra-ui/utils";

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
  defaultValue?: Array<string | number>;
  /**
   * The value of the checkbox group
   */
  value?: Array<string | number>;
  /**
   * The callback fired when any children Checkbox is checked or unchecked
   */
  onChange?: (value: Array<string | number>) => void;
  /**
   * The space between each checkbox
   */
  spacing?: StyledSystem.MarginProps["margin"];
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
  onChange,
  name,
  variantColor,
  size,
  defaultValue,
  isInline,
  value: valueProp,
  spacing = 2,
  children,
  ...rest
}: CheckboxGroupOptions) => {
  const [values, setValues] = useState<CheckboxGroupOptions["defaultValue"]>(
    defaultValue || [],
  );

  const { current: isControlled } = useRef(valueProp != null);
  const _values = isControlled ? valueProp : values;

  const _onChange = ({
    checked,
    value,
  }: {
    checked: boolean;
    value: string | number;
  }) => {
    if (_values == null) return;

    let newValues: any[];
    if (checked) {
      newValues = [..._values, value];
    } else {
      newValues = _values.filter(val => val != value);
    }

    !isControlled && setValues(newValues);
    onChange && onChange(newValues);
  };

  // If no name is passed, we'll generate a random, unique name
  const fallbackName = `checkbox-${useId()}`;
  const _name = name || fallbackName;

  const clones = Children.map(children, (child, index) => {
    if (!isValidElement(child)) return;

    const isLastCheckbox = React.Children.count(children) === index + 1;
    const spacingProps = isInline ? { mr: spacing } : { mb: spacing };

    return (
      <Box
        display={isInline ? "inline-block" : "block"}
        {...(!isLastCheckbox && spacingProps)}
      >
        {cloneElement(child, {
          size: size,
          variantColor: variantColor,
          name: `${_name}-${index}`,
          onChange: () =>
            _onChange({
              checked: _values ? !_values.includes(child.props.value) : false,
              value: child.props.value,
            }),
          isChecked: _values ? _values.includes(child.props.value) : false,
        })}
      </Box>
    );
  });

  return (
    <Box role="group" {...rest}>
      {clones}
    </Box>
  );
};

export default CheckboxGroup;
