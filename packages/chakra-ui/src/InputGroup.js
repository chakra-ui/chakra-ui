/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { Children, cloneElement } from "react";
import { Flex } from "./Layout";
import Select from "./Select";

const Styled = styled(Flex)`
  & input:focus,
  & select:focus {
    z-index: 1;
    position: relative;
  }

  & > * {
    flex: 0 0 auto;
  }

  & > *:first-child {
    input,
    select {
      ${props =>
        props.isVertical
          ? css`
              border-bottom-right-radius: 0;
              border-bottom-left-radius: 0;
            `
          : css`
              border-bottom-right-radius: 0;
              border-top-right-radius: 0;
            `};
    }
  }

  & > *:last-child {
    input,
    select {
      ${props =>
        props.vertical
          ? css`
              border-top-left-radius: 0;
              border-top-right-radius: 0;
            `
          : css`
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
            `};
    }

    & > *:not(:first-child):not(:last-child),
    & > *:not(:first-child):not(:last-child) {
      border-radius: 0;
    }
  }

  & > *:not(:last-child) {
    margin-right: -1px;
  }
`;

const InputGroup = ({ children, size, ...rest }) => {
  const getClonedProps = (child, index) => {
    const focusStyle = css({
      "&:focus": {
        zIndex: 1,
        position: "relative"
      }
    });

    const flex = child.props.flex || "0 0 auto";
    const isFirstChild = index === 0;
    const isLastChild = index + 1 === Children.count(children);
    const marginProp =
      child.type === Select ? { wrapperProps: { mr: "-1px" } } : { mr: "-1px" };

    const generalProps = { size, flex };

    if (isFirstChild) {
      return {
        ...generalProps,
        ...marginProp,
        css: css(
          {
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0
          },
          focusStyle
        )
      };
    }

    if (isLastChild) {
      return {
        ...generalProps,
        css: css(
          {
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0
          },
          focusStyle
        )
      };
    }

    return {
      ...generalProps,
      ...marginProp,
      css: css({ borderRadius: 0 }, focusStyle)
    };
  };

  return (
    <Flex {...rest}>
      {Children.map(children, (child, index) => {
        return cloneElement(child, getClonedProps(child, index));
      })}
    </Flex>
  );
};

export default InputGroup;
