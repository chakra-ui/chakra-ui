import * as React from "react";
import useAvatarStyle, { avatarSizes } from "./styles";
import { useTheme, useColorMode } from "@chakra-ui/theme";
import { Box, BoxProps } from "@chakra-ui/layout";
import { Merge } from "@chakra-ui/utils";

export interface AvatarOptions {
  /**
   * The name of the person in the avatar.
   *
   * - if `src` has loaded, the name will be used as the `alt` attribute of the `img`
   * - If `src` is not loaded, the name will be used to create the initials
   */
  name?: string;
  /**
   * The size of the avatar.
   */
  size?: Size;
  /**
   * If `true`, the `Avatar` will show a border around it.
   *
   * Best for a group of avatars
   */
  showBorder?: boolean;
  /**
   * The badge at the bottom right corner of the avatar.
   */
  children?: React.ReactNode;
  /**
   * The image url of the `Avatar`
   */
  src?: string;
  /**
   * The border color of the avatar
   */
  borderColor?: BoxProps["borderColor"];
}

export const AvatarBadge = React.forwardRef(function AvatarBadge<P, T>(
  props: BoxProps<P, T>,
  ref: React.Ref<T>,
) {
  const { colorMode } = useColorMode();
  const borderColor = { light: "white", dark: "gray.800" };

  return (
    <Box
      ref={ref}
      position="absolute"
      display="flex"
      alignItems="center"
      justifyContent="center"
      transform="translate(25%, 25%)"
      bottom="0"
      right="0"
      border="0.2em solid"
      borderColor={borderColor[colorMode]}
      rounded="full"
      {...props}
    />
  );
}) as <P, T = HTMLElement>(
  props: BoxProps<P, T>,
) => React.ReactElement<BoxProps<P, T>>;

const getInitials = (name: string): string => {
  let [firstName, lastName] = name.split(" ");

  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  } else {
    return firstName.charAt(0);
  }
};

export type AvatarNameProps = Merge<BoxProps, { name: AvatarOptions["name"] }>;

const AvatarName = ({ name, ...props }: AvatarNameProps) => {
  return (
    <Box
      textAlign="center"
      textTransform="uppercase"
      fontWeight="normal"
      aria-label={name}
      {...props}
    >
      {name ? getInitials(name) : null}
    </Box>
  );
};

const DefaultAvatar = (props: BoxProps) => (
  <Box size="100%" {...props}>
    <svg fill="#fff" viewBox="0 0 128 128" role="img">
      <g>
        <path d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z" />
        <path d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24" />
      </g>
    </svg>
  </Box>
);

type Size = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

type AvatarProps<P = {}, T = any> = Merge<BoxProps<P, T>, AvatarOptions>;

const Avatar = React.forwardRef(function Avatar<P, T>(
  {
    src,
    size = "lg",
    name,
    showBorder,
    borderColor,
    ...props
  }: AvatarProps<P, T>,
  ref: React.Ref<T>,
) {
  const avatarStyleProps = useAvatarStyle({
    name,
    size,
    showBorder,
    borderColor,
  });
  // const hasLoaded = useHasImageLoaded({ src: src || "" });
  const hasLoaded = false;

  const theme = useTheme();
  const sizeKey = avatarSizes[size];
  const _size = theme.sizes[sizeKey];
  const fontSize = `calc(${_size} / 2.5)`;

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
        return <AvatarName size={_size} name={name} />;
      } else {
        return <DefaultAvatar aria-label={name} />;
      }
    }

    if (!src && name) {
      return <AvatarName size={_size} name={name} />;
    }

    return <DefaultAvatar aria-label={name} />;
  };

  return (
    <Box
      ref={ref}
      fontSize={fontSize}
      lineHeight={_size}
      verticalAlign="top"
      {...avatarStyleProps}
      {...props}
    >
      {renderChildren()}
      {props.children}
    </Box>
  );
}) as <P, T = HTMLElement>(
  props: AvatarProps<P, T>,
) => React.ReactElement<AvatarProps<P, T>>;

export default Avatar;
