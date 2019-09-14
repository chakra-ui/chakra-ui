/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  Children,
  cloneElement,
  useState,
  useRef,
  isValidElement,
} from "react";
import { useId } from "@reach/auto-id";
import Box from "../Box";

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
      newValues = [...values, value];
    } else {
      newValues = values.filter(val => val !== value);
    }

    !isControlled && setValues(newValues);
    onChange && onChange(newValues);
  };

  // If no name is passed, we'll generate a random, unique name
  const fallbackName = `checkbox-${useId()}`;
  const _name = name || fallbackName;

  const clones = Children.map(children, (child, index) => {
    if (!isValidElement(child)) return;
    
    const isLastCheckbox = children.length === index + 1;
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
