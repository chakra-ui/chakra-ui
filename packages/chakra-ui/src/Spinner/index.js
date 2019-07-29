/** @jsx jsx */
import { jsx, keyframes, css } from "@emotion/core";
import styled from "@emotion/styled";
import Icon from "../Icon";
import Box from "../Box";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled(Box)`
  border: ${props => `${props.thickness} solid`};
  border-color: currentColor;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-radius: 50%;
  width: ${props => props.spinnerSize};
  height: ${props => props.spinnerSize};
  animation: ${spin} ${props => props.speed} linear infinite;
`;

const Spinner = ({ size, ...props }) => (
  <StyledSpinner spinnerSize={size} {...props} />
);

Spinner.defaultProps = {
  speed: "0.35s",
  size: "16px",
  thickness: "2px"
};

const spinCSS = speed => css`
  animation: ${spin} ${speed || "1s"} linear infinite;
`;

export default Spinner;

/* Alt Spinner, just a lil more fancy :) */
export const Spinner2 = ({
  color = "rgba(164, 164, 164, 1)",
  size = "24px",
  speed
}) => (
  <Box display="inline-block">
    <Icon color={color} name="spinner" size={size} css={spinCSS(speed)} />
  </Box>
);
