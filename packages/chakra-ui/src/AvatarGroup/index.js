/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement } from "react";
import Avatar from "../Avatar";
import { avatarSizes } from "../Avatar/styles";
import Flex from "../Flex";
import { useColorMode } from "../ColorModeProvider";

export const MoreAvatarIndicator = ({ size, label, ...props }) => {
  const borderColor = { light: "#fff", dark: "gray.800" };
  const bg = { light: "gray.200", dark: "whiteAlpha.400" };

  const { colorMode } = useColorMode();

  return (
    <Flex
      bg={bg[colorMode]}
      color="inherit"
      rounded="full"
      alignItems="center"
      justifyContent="center"
      border="2px"
      borderColor={borderColor[colorMode]}
      size={avatarSizes[size]}
      {...props}
    >
      {label}
    </Flex>
  );
};

const AvatarGroup = ({
  size,
  children,
  borderColor,
  spacing = -3,
  ...rest
}) => {
  let count = Children.count(children);
  const clones = Children.map(children, (child, index) => {
    if (child.type !== Avatar) {
      return child.type === MoreAvatarIndicator
        ? cloneElement(child, { size, ml: spacing })
        : child;
    }

    let isFirstAvatar = index === 0;
    return cloneElement(child, {
      ml: isFirstAvatar ? 0 : spacing,
      size,
      borderColor: borderColor || child.props.borderColor,
      showBorder: true,
      css: { zIndex: count - index },
    });
  });

  return (
    <Flex alignItems="center" {...rest}>
      {clones}
    </Flex>
  );
};

export default AvatarGroup;
