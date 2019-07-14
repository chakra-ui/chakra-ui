/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { themeGet } from "@styled-system/theme-get";
import { forwardRef } from "react";
import { Box, Flex } from "../Layout";
import VisuallyHidden from "../VisuallyHidden";

const Checkmark = styled.div`
  position: relative;
  height: 5px;
  width: 10px;
  top: -1px;
  border-left: 2px solid;
  border-bottom: 2px solid;
  border-color: #fff;
  opacity: 0;
  transform: rotate(-45deg) scale(0.75);
  transition: transform 250ms, opacity 250ms;
`;

const Checkline = styled.div`
  display: none;
  width: 8px;
  height: 2px;
  background-color: #fff;
`;

const StyledCheckbox = styled(Box)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  flex-shrink: 0;
  cursor: pointer;
  user-select: none;
  border-color: ${themeGet("colors.gray.200")};
  transition: background-color 120ms, box-shadow 250ms;

  input[type="checkbox"]:checked + &,
  input[type="checkbox"]:not(:checked)[data-indeterminate] + & {
    background-color: currentColor;
    border-color: currentColor;
  }

  input[type="checkbox"]:checked + & {
    ${Checkmark} {
      opacity: 1;
      transform: rotate(-45deg) scale(1);
    }
  }

  input[type="checkbox"]:not(:checked)[data-indeterminate] + & {
    ${Checkline} {
      display: inline-block;
    }
  }

  input[type="checkbox"]:checked:disabled + & {
    border-color: ${themeGet("colors.gray.200")};
    background-color: ${themeGet("colors.gray.100")};
    ${Checkmark} {
      border-color: ${themeGet("colors.gray.500")};
    }
  }

  input[type="checkbox"]:disabled + & {
    opacity: 0.6;
    background-color: ${themeGet("colors.gray.100")};
  }

  input[type="checkbox"]:focus + & {
    box-shadow: ${themeGet("shadows.outline")};
  }

  input[type="checkbox"]:focus:not(:checked) + & {
    border-color: ${themeGet("colors.blue.300")};
  }
`;

const Checkbox = forwardRef(
  (
    {
      id,
      name,
      color,
      mode,
      isChecked,
      size,
      isDisabled,
      onChange,
      inline = true,
      indeterminate,
      children,
      wrapperProps,
      ...rest
    },
    ref
  ) => {
    let borderColor = { light: "inherit", dark: "alpha.500" };
    let textColor = { light: "inherit", dark: "alpha.900" };

    return (
      <Flex
        as="label"
        display={inline ? "inline-flex" : "flex"}
        verticalAlign="top"
        userSelect="none"
        alignItems="center"
        cursor={isDisabled ? "not-allowed" : "pointer"}
        {...wrapperProps}
      >
        <VisuallyHidden
          as="input"
          type="checkbox"
          data-indeterminate={indeterminate ? "" : undefined}
          id={id}
          ref={ref}
          name={name}
          onChange={onChange}
          checked={isChecked}
          disabled={isDisabled}
          {...rest}
        />
        <StyledCheckbox
          borderColor={borderColor[mode]}
          border="1px"
          borderRadius="md"
          size={`checkbox.${size}`}
          color={`${color}.500`}
          aria-hidden
        >
          {indeterminate ? <Checkline /> : <Checkmark />}
        </StyledCheckbox>
        {children && (
          <Box
            ml={2}
            fontSize={size}
            color={textColor[mode]}
            opacity={isDisabled ? 0.5 : 1}
          >
            {children}
          </Box>
        )}
      </Flex>
    );
  }
);

Checkbox.defaultProps = {
  size: "md",
  color: "blue",
  mode: "light",
  inline: true
};

export default Checkbox;
