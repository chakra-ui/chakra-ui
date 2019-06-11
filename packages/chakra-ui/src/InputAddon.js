/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { oneOf } from "prop-types";
import { cloneElement } from "react";
import { StyledInput } from "./Input";
import { Box, Flex } from "./Layout";
import { useUIMode } from "./ThemeProvider";

const AddonWrapper = styled(Box)`
  &.input-addon__left {
    margin-right: -1px;
    z-index: 1;
  }

  &.input-addon__right {
    margin-left: -1px;
    z-index: 1;
  }

  &.input-addon__left > * {
    border-bottom-right-radius: 0 !important;
    border-top-right-radius: 0 !important;
  }

  &.input-addon__right > * {
    border-bottom-left-radius: 0 !important;
    border-top-left-radius: 0 !important;
  }
`;

const Addon = ({ variant, size, mode, children, ...props }) => {
  return (
    <StyledInput
      whiteSpace="nowrap"
      flex="0 0 auto"
      css={theme => ({
        width: "auto",
        background:
          mode === "dark" ? theme.colors.alpha[300] : theme.colors.gray[100]
      })}
      inputSize={size}
      variant={variant}
      mode={mode}
      {...props}
    >
      {children}
    </StyledInput>
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
  const mode = useUIMode()
  let isRight = position === "right";
  return (
    <Flex as="label" className="input-addon">
      {position === "left" && (
        <Addon
          size={size}
          variant={variant}
          mode={mode}
          css={css`
            border-bottom-right-radius: 0;
            border-top-right-radius: 0;
          `}
        >
          {text}
        </Addon>
      )}
      <AddonWrapper
        flex="1"
        className={isRight ? "input-addon__left" : "input-addon__right"}
      >
        {cloneElement(children, {
          size,
          id,
          mode,
          variant,
          isInvalid,
          ...rest
        })}
      </AddonWrapper>
      {position === "right" && (
        <Addon
          size={size}
          variant={variant}
          mode={mode}
          css={css`
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
          `}
        >
          {text}
        </Addon>
      )}
    </Flex>
  );
};

InputAddon.propTypes = {
  position: oneOf(["left", "right"])
};

export default InputAddon;
