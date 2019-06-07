/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import propTypes from "prop-types";
import iconPaths from "./icon-paths";
import { Box } from "../Layout";

const Svg = styled(Box)`
  flex-shrink: 0;
  backface-visibility: hidden;
  &:not(:root) {
    overflow: hidden;
  }
`;

const Icon = ({ size, name, color, role, ...rest }) => {
  const { path, viewBox } = iconPaths[name];
  return (
    <Svg
      as="svg"
      size={size}
      color={color}
      display="inline-block"
      viewBox={viewBox || "0 0 24 24"}
      role={role}
      verticalAlign="middle"
      {...rest}
    >
      {path}
    </Svg>
  );
};

Icon.defaultProps = {
  size: "1em"
};

Icon.propTypes = {
  role: propTypes.oneOf(["presentation", "img"])
};

export default Icon;
export { iconPaths };
