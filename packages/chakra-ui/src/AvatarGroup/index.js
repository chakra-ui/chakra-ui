/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement } from "react";
import Avatar from "../Avatar";
import { avatarSizes } from "../Avatar/styles";
import Flex from "../Flex";
import { useUIMode } from "../ThemeProvider";

export const MoreIndicator = ({ size, label, ...props }) => {
  const borderColor = { light: "#fff", dark: "gray.900" };
  const bg = { light: "gray.200", dark: "whiteAlpha.400" };

  const { mode } = useUIMode();

  return (
    <Flex
      bg={bg[mode]}
      color="inherit"
      rounded="full"
      alignItems="center"
      justifyContent="center"
      border="2px"
      borderColor={borderColor[mode]}
      size={avatarSizes[size]}
      {...props}
    >
      {label}
    </Flex>
  );
};

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
      showBorder: true,
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
