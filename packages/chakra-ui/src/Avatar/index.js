/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import { Box, Flex, Absolute } from "../Layout";
import useAvatarStyle from "./styles";
import { useHasImageLoaded } from "../Image";

export const MoreIndicator = ({ src, size, label, ...props }) => (
  <Flex
    bg="gray.200"
    color="gray.800"
    borderRadius="full"
    alignItems="center"
    justifyContent="center"
    border="2px"
    borderColor="white"
    size={size === "fill" ? "100%" : `avatar.${size}`}
    css={theme => ({
      fontSize: `calc(${theme.sizes.avatar[size]}/2.75)`
    })}
    {...props}
  >
    {label}
  </Flex>
);

export const AvatarBadge = props => {
  return (
    <Absolute
      display="flex"
      alignItems="center"
      justifyContent="center"
      size="32%"
      bottom="4%"
      right="-4%"
      bg="white"
      border="2px"
      borderColor="white"
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

const Avatar = ({
  size,
  showBorder,
  name,
  stackIndex,
  badge,
  src,
  ...rest
}) => {
  const avatarStyleProps = useAvatarStyle({ name, size, showBorder });
  const hasLoaded = useHasImageLoaded({ src });

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
    <Box {...avatarStyleProps} {...rest}>
      {renderChildren()}
      {badge && <AvatarBadge>{badge}</AvatarBadge>}
    </Box>
  );
};

Avatar.defaultProps = {
  size: "md"
};

Avatar.propTypes = {
  size: propTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl", "fill"]),
  showBorder: propTypes.bool,
  name: propTypes.string,
  stackIndex: propTypes.number,
  badge: propTypes.node,
  src: propTypes.string
};

export default Avatar;
