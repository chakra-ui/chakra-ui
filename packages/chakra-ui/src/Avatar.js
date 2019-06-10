/** @jsx jsx */
import { jsx } from "@emotion/core";
import { cloneElement, Children, useState } from "react";
import { Flex, Box, Absolute } from "./Layout";
import propTypes from "prop-types";
import { string2Hex } from "./utils";
import Color from "color";

export const MoreIndicator = ({ src, size, label, ...props }) => (
  <Flex
    bg="gray.200"
    color="gray.800"
    borderRadius="round"
    alignItems="center"
    justifyContent="center"
    border="2px"
    borderColor="#fff"
    size={size === "fill" ? "100%" : `avatar.${size}`}
    css={theme => ({
      fontSize: `calc(${theme.sizes.avatar[size]}/2.75)`
    })}
    {...props}
  >
    {label}
  </Flex>
);

const Avatar = ({ size, showOutline, name, badge, src, ...rest }) => {
  const [showImage, setShowImage] = useState(false);

  let showBorderProps = showOutline && {
    border: "2px",
    borderColor: "#fff"
  };
  let avatarSize = size === "fill" ? "100%" : `avatar.${size}`;
  let bgColor = string2Hex(name);
  let color = Color(bgColor).isDark() ? "#fff" : "gray.800";

  let initials = name && name.split(" ");
  if (initials.length > 1) {
    initials = `${initials[0].charAt(0)}${initials[1].charAt(0)}`;
  } else {
    initials = initials[0].charAt(0);
  }

  let avatarImg = new Image();
  avatarImg.src = src;
  avatarImg.onload = () => setShowImage(true);
  avatarImg.onerror = () => setShowImage(false);

  const renderChildren = () => {
    if (src && showImage) {
      return (
        <Box
          as="img"
          size="100%"
          borderRadius="round"
          style={{ objectFit: "cover" }}
          src={src}
          alt={name}
        />
      );
    }

    if (name && !showImage) {
      return (
        <Box
          as="span"
          css={theme => ({
            fontSize: `calc(${theme.sizes.avatar[size]}/2.75)`
          })}
        >
          {initials}
        </Box>
      );
    }
  };

  const renderBadge = () => {
    return (
      <Absolute
        display="flex"
        alignItems="center"
        justifyContent="center"
        size="32%"
        bottom="4%"
        right="4%"
        bg="white"
        border="2px"
        borderColor="white"
        borderRadius="round"
      >
        {badge}
      </Absolute>
    );
  };

  return (
    <Flex
      display="inline-flex"
      bg={bgColor}
      color={color}
      borderRadius="round"
      alignItems="center"
      justifyContent="center"
      position="relative"
      size={avatarSize}
      {...showBorderProps}
      {...rest}
    >
      {renderChildren()}
      {badge && renderBadge()}
    </Flex>
  );
};

Avatar.defaultProps = {
  size: "md"
};

Avatar.propTypes = {
  size: propTypes.oneOf(["xs", "sm", "md", "lg", "fill"])
};

export default Avatar;

// Stacked Avatars

export const AvatarGroup = ({ size, children, spacing = -3, ...rest }) => {
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
