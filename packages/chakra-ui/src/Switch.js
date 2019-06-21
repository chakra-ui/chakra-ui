/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { themeGet } from "@styled-system/theme-get";
import { forwardRef } from "react";
import { Box } from "./Layout";
import VisuallyHidden from "./VisuallyHidden";
import { useUIMode } from "./ThemeProvider";

const Knob = styled(Box)`
  background: white;
  transition: transform 250ms;
  transform: translateX(0);
`;

const knobTranslateX = props => {
  let { width, height } = props.theme.sizes.switch[props.switchSize];
  return `transform: translateX(calc(${width} - ${height}))`;
};

const Track = styled(Box)`
  display: inline-flex;
  cursor: pointer;
  flex-shrink: 0;
  background-color: ${props =>
    props.mode === "dark"
      ? themeGet("colors.alpha.400")(props)
      : themeGet("colors.gray.300")(props)};
  transition: all 0.2s;
  box-sizing: content-box;
  padding: 2px;

  input[type="checkbox"]:checked + & {
    background-color: ${props =>
      themeGet(`colors.${props.switchColor}.500`)(props)};
    ${Knob} {
      ${knobTranslateX}
    }
  }

  input[type="checkbox"]:disabled + & {
    opacity: 0.5;
  }

  input[type="checkbox"]:focus + & {
    box-shadow: ${themeGet("shadows.focusring")};
  }
`;

const Switch = forwardRef(
  (
    {
      id,
      isChecked,
      size,
      defaultChecked,
      isDisabled,
      children,
      color,
      ...rest
    },
    ref
  ) => {
    const mode = useUIMode();
    return (
      <Box as="label" display="inline-block" verticalAlign="middle">
        <VisuallyHidden
          as="input"
          id={id}
          ref={ref}
          checked={isChecked}
          defaultChecked={defaultChecked}
          type="checkbox"
          disabled={isDisabled}
          {...rest}
        />
        <Track
          borderRadius="round"
          switchColor={color}
          switchSize={size}
          mode={mode}
          width={`switch.${size}.width`}
          height={`switch.${size}.height`}
        >
          <Knob borderRadius="round" size={`switch.${size}.height`} />
        </Track>
      </Box>
    );
  }
);

Switch.defaultProps = {
  color: "blue",
  size: "md"
};

export default Switch;
