/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement } from "react";
import { avatarSizes } from "../Avatar/styles";
import Flex from "../Flex";
import { useColorMode } from "../ColorModeProvider";
import { useTheme } from "../ThemeProvider";

const MoreAvatarLabel = ({ size, label, ...props }) => {
  const borderColor = { light: "#fff", dark: "gray.800" };
  const bg = { light: "gray.200", dark: "whiteAlpha.400" };

  const theme = useTheme();
  const sizeKey = avatarSizes[size];
  const _size = theme.sizes[sizeKey];
  const fontSize = `calc(${_size} / 2.75)`;

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
      fontSize={fontSize}
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
  max,
  spacing = -3,
  ...rest
}) => {
  let count = Children.count(children);

  const clones = Children.map(children, (child, index) => {
    if (max && index > max) {
      return null;
    }

    if (max == null || (max && index < max)) {
      let isFirstAvatar = index === 0;
      return cloneElement(child, {
        ml: isFirstAvatar ? 0 : spacing,
        size,
        borderColor: borderColor || child.props.borderColor,
        showBorder: true,
        zIndex: count - index,
      });
    }

    if (max && index === max) {
      return (
        <MoreAvatarLabel size={size} ml={spacing} label={`+${count - max}`} />
      );
    }
  });

  return (
    <Flex alignItems="center" {...rest}>
      {clones}
    </Flex>
  );
};

export default AvatarGroup;
