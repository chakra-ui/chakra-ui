/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement } from "react";
import { Flex } from "../Layout";
import Avatar from "./Avatar";
import { MoreIndicator } from "./components";

const AvatarGroup = ({ size, children, spacing = -3, ...rest }) => {
  let count = Children.count(children);
  const clones = Children.map(children, (child, index) => {
    if (child.type !== Avatar) {
      return child.type === MoreIndicator
        ? cloneElement(child, { size, ml: spacing })
        : child;
    }
    let isFirstAvatar = index === 0;
    return cloneElement(child, {
      ml: isFirstAvatar ? 0 : spacing,
      size,
      showOutline: true,
      css: { zIndex: count - index }
    });
  });

  return (
    <Flex alignItems="center" {...rest}>
      {clones}
    </Flex>
  );
};

export default AvatarGroup;
