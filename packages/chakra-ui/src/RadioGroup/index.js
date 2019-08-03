/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import { Children, cloneElement, useState, useRef } from "react";
import { genId } from "../utils";
import Box from "../Box";

const RadioGroup = ({
  id,
  onChange,
  name,
  size,
  defaultValue,
  isInline,
  value: valueProp,
  spacing = 4,
  children,
  ...rest
}) => {
  const { current: isControlled } = useRef(valueProp != null);
  const [value, setValue] = useState(defaultValue || null);
  const _value = isControlled ? valueProp : value;

  const _onChange = event => {
    const { value: _val } = event.target;
    !isControlled && setValue(_val);
    onChange && onChange(event, _val);
  };

  // If no name is passed, we'll generate a random, unique name
  const _name = name || genId("radio");

  const clones = Children.map(children, (child, index) => {
    const isLastRadio = children.length === index + 1;
    const spacingProps = isInline ? { mr: spacing } : { mb: spacing };

    return (
      <Box
        display={isInline ? "inline-block" : "block"}
        {...(!isLastRadio && spacingProps)}
      >
        {cloneElement(child, {
          size,
          name: _name,
          onChange: _onChange,
          isChecked: child.props.value === _value,
        })}
      </Box>
    );
  });

  return (
    <Box role="radiogroup" aria-labelledby={id} {...rest}>
      {clones}
    </Box>
  );
};

RadioGroup.propTypes = {
  /**
   * The selected (controlled) value of the Radio Group.
   */
  value: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.object,
  ]),
  /**
   * The initial selected value of the Radio Group
   */
  defaultValue: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.object,
  ]),
  /**
   * Function fired when a radio button is selected
   *
   * @param {object} event - The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   *
   * @param {string} value - The `value` of the selected radio button
   * */
  onChange: propTypes.func,
};

export default RadioGroup;
