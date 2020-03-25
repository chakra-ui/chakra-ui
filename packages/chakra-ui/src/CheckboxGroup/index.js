/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useId } from "@reach/auto-id";
import { cloneElement, useRef, useState } from "react";
import Box from "../Box";
import { cleanChildren } from "../utils";

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
}) => {
  const [values, setValues] = useState(defaultValue || []);

  const { current: isControlled } = useRef(valueProp != null);
  const _values = isControlled ? valueProp : values;

  const _onChange = event => {
    const { checked, value } = event.target;
    let newValues;
    if (checked) {
      newValues = [..._values, value];
    } else {
      newValues = _values.filter(val => val !== value);
    }

    !isControlled && setValues(newValues);
    onChange && onChange(newValues);
  };

  // If no name is passed, we'll generate a random, unique name
  const fallbackName = `checkbox-${useId()}`;
  const _name = name || fallbackName;

  const validChildren = cleanChildren(children);

  const clones = validChildren.map((child, index) => {
    const isLastCheckbox = validChildren.length === index + 1;
    const spacingProps = isInline ? { mr: spacing } : { mb: spacing };

    return (
      <Box
        key={index}
        display={isInline ? "inline-block" : "block"}
        {...(!isLastCheckbox && spacingProps)}
      >
        {cloneElement(child, {
          size: size,
          variantColor: variantColor,
          name: `${_name}-${index}`,
          onChange: _onChange,
          isChecked: _values.includes(child.props.value),
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
