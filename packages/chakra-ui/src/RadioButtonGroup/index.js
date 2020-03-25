/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useId } from "@reach/auto-id";
import { cloneElement, useRef, useState } from "react";
import Box from "../Box";
import { cleanChildren } from "../utils";

const RadioButtonGroup = ({
  name,
  children,
  defaultValue,
  value: controlledValue,
  onChange,
  spacing = "12px",
  isInline,
  ...rest
}) => {
  const isControlled = controlledValue != null;
  const [value, setValue] = useState(defaultValue || null);
  const _value = isControlled ? controlledValue : value;

  const allNodes = useRef([]);

  const validChildren = cleanChildren(children);

  const focusableValues = validChildren
    .map(child => (child.props.isDisabled === true ? null : child.props.value))
    .filter(val => val != null);

  const allValues = validChildren.map(child => child.props.value);

  const updateIndex = index => {
    const childValue = focusableValues[index];
    const _index = allValues.indexOf(childValue);
    allNodes.current[_index].focus();

    !isControlled && setValue(childValue);
    onChange && onChange(childValue);
  };

  const handleKeyDown = event => {
    if (event.key === "Tab") {
      return;
    }

    // Disable page scrolling while navigating with keys
    event.preventDefault();

    const count = focusableValues.length;
    let enabledCheckedIndex = focusableValues.indexOf(_value);

    if (enabledCheckedIndex === -1) {
      enabledCheckedIndex = 0;
    }

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown": {
        const nextIndex = (enabledCheckedIndex + 1) % count;
        updateIndex(nextIndex);
        break;
      }
      case "ArrowLeft":
      case "ArrowUp": {
        const nextIndex = (enabledCheckedIndex - 1 + count) % count;
        updateIndex(nextIndex);
        break;
      }
      default:
        break;
    }
  };

  const fallbackName = `radio-${useId()}`;
  const _name = name || fallbackName;

  const clones = validChildren.map((child, index) => {
    const isLastChild = validChildren.length === index + 1;
    const isFirstChild = index === 0;

    const spacingProps = isInline ? { mr: spacing } : { mb: spacing };

    const isChecked = child.props.value === _value;

    const handleClick = () => {
      !isControlled && setValue(child.props.value);
      onChange && onChange(child.props.value);
    };

    const getTabIndex = () => {
      // If a RadioGroup has no radio selected the first enabled radio should be focusable
      if (_value == null) {
        return isFirstChild ? 0 : -1;
      } else {
        return isChecked ? 0 : -1;
      }
    };

    return cloneElement(child, {
      key: index,
      ref: node => (allNodes.current[index] = node),
      name: _name,
      onClick: handleClick,
      tabIndex: getTabIndex(),
      isChecked,
      ...(!isLastChild && spacingProps),
    });
  });

  return (
    <Box role="radiogroup" onKeyDown={handleKeyDown} {...rest}>
      {clones}
    </Box>
  );
};

RadioButtonGroup.displayName = "RadioButtonGroup";

export default RadioButtonGroup;
