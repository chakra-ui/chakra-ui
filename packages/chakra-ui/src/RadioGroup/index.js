/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import { Children, cloneElement, useState, useRef, forwardRef } from "react";
import { useId } from "@reach/auto-id";
import Box from "../Box";

/* 
  TODO:
  - Calling focus() on the radiogroup should focus on the selected option or first enabled option
*/

const RadioGroup = forwardRef(
  (
    {
      onChange,
      name,
      color,
      size,
      defaultValue,
      isInline,
      value: valueProp,
      spacing = 2,
      children,
      ...rest
    },
    ref,
  ) => {
    const { current: isControlled } = useRef(valueProp != null);
    const [value, setValue] = useState(defaultValue || null);
    const _value = isControlled ? valueProp : value;

    const _onChange = event => {
      const { value: _val } = event.target;
      !isControlled && setValue(_val);
      onChange && onChange(event, _val);
    };

    // If no name is passed, we'll generate a random, unique name
    const fallbackName = `radio-${useId()}`;
    const _name = name || fallbackName;

    const clones = Children.map(children, (child, index) => {
      const isLastRadio = children.length === index + 1;
      const spacingProps = isInline ? { mr: spacing } : { mb: spacing };

      return (
        <Box
          display={isInline ? "inline-block" : "block"}
          {...(!isLastRadio && spacingProps)}
        >
          {cloneElement(child, {
            size: child.props.size || size,
            color: child.props.color || color,
            name: _name,
            onChange: _onChange,
            isChecked: child.props.value === _value,
          })}
        </Box>
      );
    });

    return (
      <Box role="radiogroup" {...rest}>
        {clones}
      </Box>
    );
  },
);

export default RadioGroup;
