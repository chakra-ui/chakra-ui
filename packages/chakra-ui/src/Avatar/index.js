/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import useAvatarStyle, { avatarSizes } from "./styles";
import { useHasImageLoaded } from "../Image";
import { useTheme, useUIMode } from "../ThemeProvider";
import Absolute from "../Absolute";
import Box from "../Box";

export const AvatarBadge = props => {
  const { mode } = useUIMode();
  const borderColor = { light: "white", dark: "gray.900" };

  return (
    <Absolute
      display="flex"
      alignItems="center"
      justifyContent="center"
      transform="translate(25%, 25%)"
      bottom="0"
      right="0"
      border="2px"
      borderColor={borderColor[mode]}
      rounded="full"
      {...props}
    />
  );
};

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

const AvatarName = ({ name, ...props }) => {
  return (
    <Box
      textAlign="center"
      textTransform="uppercase"
      fontWeight="medium"
      {...props}
    >
      {getInitials(name)}
    </Box>
  );
};

const DefaultAvatar = () => (
  <Box size="100%">
    <svg fill="#fff" viewBox="0 0 128 128" role="img">
      <g>
        <path d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z" />
        <path d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24" />
      </g>
    </svg>
  </Box>
);

const Avatar = ({ size, showBorder, name, badge, src, ...rest }) => {
  const avatarProps = useAvatarStyle({ name, size, showBorder });
  const hasLoaded = useHasImageLoaded({ src });

  const { sizes } = useTheme();
  const sizeValue = avatarSizes[size];
  const _size = sizes[sizeValue];

  const renderChildren = () => {
    if (src && hasLoaded) {
      return (
        <Box
          as="img"
          size="100%"
          rounded="full"
          objectFit="cover"
          src={src}
          alt={name}
        />
      );
    }

    if (src && !hasLoaded) {
      if (name) {
        return <AvatarName size={size} name={name} />;
      } else {
        return <DefaultAvatar />;
      }
    }

    if (!src && name) {
      return <AvatarName size={size} name={name} />;
    }

    return <DefaultAvatar />;
  };

  return (
    <Box fontSize={`calc(${_size} / 2.5)`} {...avatarProps} {...rest}>
      {renderChildren()}
      {badge}
    </Box>
  );
};

Avatar.defaultProps = {
  size: "md"
};

Avatar.propTypes = {
  /**
   * The size (height and width) of the avatar
   */
  size: propTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl", "fill"]),
  /**
   * If `true`, the Avatar will show a border around it
   */
  showBorder: propTypes.bool,
  /**
   * The name of the avatar.
   * if image is loaded, this will be used as the `alt` attr of the image
   * If image is not loaded, this will be used to create the initials
   */
  name: propTypes.string.isRequired,
  /**
   * The badge to show at the bottom right of the Avatar
   */
  badge: propTypes.node,
  /**
   * The url for the Avatar
   */
  src: propTypes.string
};

export default Avatar;
