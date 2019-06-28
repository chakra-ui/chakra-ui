/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { oneOf } from "prop-types";
import { cloneElement } from "react";
import { Box, Flex } from "./Layout";
import { useUIMode } from "./ThemeProvider";
import useInputStyle from "./Input/InputStyle";

const InputWrapper = styled(Box)`
  &[data-position="left"] {
    margin-right: -1px;
    z-index: 1;
  }

  &[data-position="right"] {
    margin-left: -1px;
    z-index: 1;
  }

  &[data-position="right"] > * {
    border-bottom-right-radius: 0 !important;
    border-top-right-radius: 0 !important;
  }

  &[data-position="left"] > * {
    border-bottom-left-radius: 0 !important;
    border-top-left-radius: 0 !important;
  }
`;

const Addon = props => {
  const { variant, size, position, ...rest } = props;
  const mode = useUIMode();

  const inputStyle = useInputStyle(props);

  let customStyle = theme => ({
    flex: "0 0 auto",
    whiteSpace: "nowrap",
    width: "auto",
    background:
      mode === "dark" ? theme.colors.alpha[300] : theme.colors.gray[100]
  });

  let positionStyle =
    position === "left"
      ? css`
          border-bottom-right-radius: 0;
          border-top-right-radius: 0;
        `
      : css`
          order: 1;
          border-bottom-left-radius: 0;
          border-top-left-radius: 0;
        `;

  return (
    <Box
      css={theme => css(inputStyle, customStyle(theme), positionStyle)}
      {...rest}
    />
  );
};

const InputAddon = ({
  children,
  text,
  size = "md",
  isInvalid,
  variant,
  id,
  position = "left",
  ...rest
}) => {
  return (
    <Flex as="label">
      <Addon size={size} variant={variant} position={position}>
        {text}
      </Addon>
      <InputWrapper flex="1" data-position={position}>
        {cloneElement(children, {
          size,
          id,
          variant,
          isInvalid,
          ...rest
        })}
      </InputWrapper>
    </Flex>
  );
};

InputAddon.propTypes = {
  position: oneOf(["left", "right"])
};

export default InputAddon;
