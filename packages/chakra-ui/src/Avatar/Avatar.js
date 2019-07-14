/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { Box } from "../Layout";
import { useTheme, useUIMode } from "../theme";
import { isDarkColor } from "../theme/colors.utils";
import { string2Hex } from "../utils";
import { AvatarBadge } from "./components";

const getInitials = name => {
  if (name) {
    let initials = name.split(" ");
    if (initials.length > 1) {
      initials = `${initials[0].charAt(0)}${initials[1].charAt(0)}`;
    } else {
      initials = initials[0].charAt(0);
    }

    return initials;
  }
};

const useAvatarStyle = props => {
  const { sizes, colors } = useTheme();
  const { mode } = useUIMode();
  const { size, name, showBorder } = props;

  const _size = size === "fill" ? "100%" : sizes.avatar[size];

  const backgroundColor = name ? string2Hex(name) : colors.gray[400];
  const color = name
    ? isDarkColor(backgroundColor)
      ? "#fff"
      : colors.gray[800]
    : "#fff";

  const sizeStyle = css({
    width: _size,
    height: _size
  });

  const borderStyle = css({
    border: "2px solid",
    borderColor: mode === "dark" ? "#121212" : "#fff"
  });

  const baseStyle = css({
    display: "inline-flex",
    borderRadius: "9999px",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  });

  const colorStyle = css({
    backgroundColor,
    color
  });

  return css`
    ${baseStyle}
    ${sizeStyle}
    ${showBorder && borderStyle}
    ${colorStyle}
  `;
};

const Avatar = ({
  size,
  showBorder,
  name,
  stackIndex,
  badge,
  src,
  css,
  ...rest
}) => {
  const [showImage, setShowImage] = useState(false);

  const avatarStyle = useAvatarStyle({ name, size, showBorder });

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setShowImage(true);
    img.onerror = () => setShowImage(false);
  }, [src]);

  const AvatarName = () => (
    <Box
      textAlign="center"
      textTransform="uppercase"
      fontWeight="medium"
      css={theme => ({
        fontSize: `calc(${theme.sizes.avatar[size]} / 2.5)`
      })}
    >
      {getInitials(name)}
    </Box>
  );

  const DefaultAvatar = () => (
    <Box size="100%">
      <svg fill="#fff" viewBox="0 0 128 128" role="img" aria-label="xlarge">
        <g>
          <path d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z" />
          <path d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24" />
        </g>
      </svg>
    </Box>
  );

  const renderChildren = () => {
    if (src && showImage) {
      return (
        <Box
          as="img"
          size="100%"
          borderRadius="full"
          style={{ objectFit: "cover" }}
          src={src}
          alt={name}
        />
      );
    }

    if (src && !showImage) {
      if (name) {
        return <AvatarName />;
      } else {
        return <DefaultAvatar />;
      }
    }

    if (!src && name) {
      return <AvatarName />;
    }

    return <DefaultAvatar />;
  };

  return (
    <Box
      // bg={bgColor}
      // color={color}
      // size={avatarSize}
      // {...showBorderProps}
      css={[avatarStyle, css]}
      {...rest}
    >
      {renderChildren()}
      {badge && <AvatarBadge>{badge}</AvatarBadge>}
    </Box>
  );
};

Avatar.defaultProps = {
  size: "md"
};

Avatar.propTypes = {
  size: propTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl", "fill"])
};

export default Avatar;
