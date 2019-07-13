/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import propTypes from "prop-types";
import { cloneElement, Children } from "react";
import { Box } from "../Layout";

const StyledButtonGroup = styled(Box)`
  &[data-attached] {
    button:focus {
      position: relative;
      z-index: 1;
    }

    > button:first-of-type {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    > button:last-of-type {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    > button:not(:first-of-type):not(:last-of-type) {
      border-radius: 0;
    }
  }
`;

export const ButtonGroup = ({
  size,
  color,
  isAttached,
  spacing = 2,
  children,
  ...rest
}) => {
  return (
    <StyledButtonGroup
      display="inline-block"
      data-attached={isAttached ? "" : undefined}
      {...rest}
    >
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          size: child.props.size || size,
          color: child.props.color || color,
          ...(index + 1 !== Children.count(children) &&
            !isAttached && { mr: spacing })
        })
      )}
    </StyledButtonGroup>
  );
};

ButtonGroup.propTypes = {
  size: propTypes.oneOf(["sm", "md", "lg"]),
  color: propTypes.string,
  /**
   * If `true`, the borderRadius of button that are direct children will be altered
   * to look flushed together
   * */
  isAttached: propTypes.bool,
  spacing: propTypes.oneOfType([propTypes.string, propTypes.number]),
  children: propTypes.node.isRequired
};

export default ButtonGroup;
