/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { themeGet } from "@styled-system/theme-get";
import { forwardRef } from "react";
import { Box, Flex } from "./Layout";
import VisuallyHidden from "./VisuallyHidden";

const RadioDot = styled(Box)`
  opacity: 0;
  transform: scale(0.4);
  transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  vertical-align: middle;
  background-color: #fff;
`;

const StyledRadio = styled(Box)`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  justify-content: center;
  border-width: ${themeGet("borderWidths.md")};
  transition: all 250ms;
  border-color: ${themeGet("colors.gray.200")};
  box-sizing: content-box;

  input[type="radio"]:not(:disabled):hover + & {
    border-color: currentColor;
  }

  input[type="radio"]:checked + & {
    background-color: currentColor;
    border-color: currentColor;

    ${RadioDot} {
      opacity: 1;
      transform: scale(1);
    }
  }

  input[type="radio"]:focus + & {
    box-shadow: ${themeGet("shadows.focusring")};
  }

  input[type="radio"]:checked:disabled + & {
    border-color: ${themeGet("colors.gray.200")};

    ${RadioDot} {
      opacity: 1;
      background-color: ${themeGet("colors.gray.400")};
    }
  }

  input[type="radio"]:disabled + & {
    opacity: 0.8;
    cursor: not-allowed;
    background-color: ${themeGet("colors.gray.100")};
  }
`;

const Radio = forwardRef(
  (
    {
      isDisabled,
      isChecked,
      id,
      name,
      mode,
      children,
      color,
      onChange,
      wrapperProps,
      inline,
      size,
      ...rest
    },
    ref
  ) => {
    let themedBorderColor = { light: "inherit", dark: "alpha.500" };
    let themedColor = { light: "inherit", dark: "alpha.900" };

    return (
      <Flex
        as="label"
        display="inline-flex"
        verticalAlign="top"
        userSelect="none"
        htmlFor={id}
        mr="8px"
        alignItems="center"
        cursor={isDisabled ? "not-allowed" : "pointer"}
        {...wrapperProps}
      >
        <VisuallyHidden
          as="input"
          type="radio"
          id={id}
          name={name}
          ref={ref}
          checked={isChecked}
          disabled={isDisabled}
          onChange={onChange}
          {...rest}
        />
        <StyledRadio
          as="span"
          color={`${color}.500`}
          border="1px"
          borderColor={themedBorderColor[mode]}
          borderRadius="round"
          size={`checkbox.${size}`}
        >
          <RadioDot
            as="span"
            borderRadius="round"
            css={theme => ({
              width: `calc(${theme.sizes.checkbox[size]}/ 2)`,
              height: `calc(${theme.sizes.checkbox[size]}/ 2)`
            })}
          />
        </StyledRadio>
        {children && (
          <Box
            as="span"
            opacity={isDisabled ? 0.4 : 1}
            ml={2}
            fontSize={size}
            color={themedColor[mode]}
          >
            {children}
          </Box>
        )}
      </Flex>
    );
  }
);

Radio.defaultProps = {
  size: "md",
  color: "blue",
  mode: "light"
};

export default Radio;
