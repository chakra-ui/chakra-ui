/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Children, cloneElement } from "react";
import Flex from "./Flex";

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

    let _css;
    if (isFirstChild) {
      _css = {
        marginRight: -1,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0
      };
    }

    if (isLastChild) {
      _css = {
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0
      };
    }

    if (!isFirstChild && !isLastChild) {
      _css = { marginRight: -1, borderRadius: 0 };
    }

    return {
      size,
      flex,
      css: css(_css, focusStyle)
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
