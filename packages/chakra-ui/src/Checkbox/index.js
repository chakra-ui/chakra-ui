/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef, useEffect, useRef } from "react";
import Box from "../Box";
import { useColorMode } from "../ColorModeProvider";
import ControlBox from "../ControlBox";
import Icon from "../Icon";
import VisuallyHidden from "../VisuallyHidden";
import useCheckboxStyle from "./styles";
import { useForkRef } from "../utils";

const Checkbox = forwardRef(
  (
    {
      id,
      name,
      value,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      variantColor = "blue",
      defaultIsChecked,
      isChecked,
      isFullWidth,
      size = "md",
      isDisabled,
      isInvalid,
      isReadOnly,
      onChange,
      onBlur,
      onFocus,
      isIndeterminate,
      children,
      iconColor,
      iconSize = "10px",
      ...rest
    },
    ref,
  ) => {
    const { colorMode } = useColorMode();
    const styleProps = useCheckboxStyle({
      color: variantColor,
      size,
      colorMode,
    });

    const ownRef = useRef();
    const _ref = useForkRef(ownRef, ref);

    useEffect(() => {
      if (_ref.current) {
        _ref.current.indeterminate = Boolean(isIndeterminate);
      }
    }, [isIndeterminate, _ref]);

    return (
      <Box
        as="label"
        display="inline-flex"
        verticalAlign="top"
        alignItems="center"
        width={isFullWidth ? "full" : undefined}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        {...rest}
      >
        <VisuallyHidden
          as="input"
          type="checkbox"
          aria-label={ariaLabel}
          id={id}
          ref={_ref}
          name={name}
          value={value}
          onChange={isReadOnly ? undefined : onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          defaultChecked={isReadOnly ? undefined : defaultIsChecked}
          checked={
            isReadOnly
              ? Boolean(isChecked)
              : defaultIsChecked
              ? undefined
              : isChecked
          }
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-readonly={isReadOnly}
          aria-invalid={isInvalid}
          aria-checked={isIndeterminate ? "mixed" : isChecked}
        />
        <ControlBox opacity={isReadOnly ? 0.8 : 1} {...styleProps}>
          <Icon
            name={isIndeterminate ? "minus" : "check"}
            size={iconSize}
            color={iconColor}
            transition="transform 240ms, opacity 240ms"
          />
        </ControlBox>
        {children && (
          <Box
            ml={2}
            fontSize={size}
            userSelect="none"
            opacity={isDisabled ? 0.4 : 1}
          >
            {children}
          </Box>
        )}
      </Box>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
