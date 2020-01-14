import { isDark, stringToColor } from "@chakra-ui/color";
import {
  chakra,
  ChakraComponent,
  createChakra,
  forwardRef,
  PropsOf,
  SystemProps,
  useModeValue,
} from "@chakra-ui/system";
import { SafeMerge } from "@chakra-ui/utils";
import * as React from "react";

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
  size?: string;
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
  borderColor?: SystemProps["borderColor"];
}

export const AvatarBadge = forwardRef(
  (props: PropsOf<typeof chakra.div>, ref: React.Ref<any>) => {
    const borderColor = useModeValue("white", "gray.800");
    return (
      <chakra.div
        ref={ref}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        transform="translate(25%, 25%)"
        bottom="0"
        right="0"
        border="0.2em solid"
        borderColor={borderColor}
        rounded="full"
        {...props}
      />
    );
  },
) as ChakraComponent<"div">;

const getInitials = (name: string) => {
  const [firstName, lastName] = name.split(" ");

  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  } else {
    return firstName.charAt(0);
  }
};

type BoxProps = PropsOf<typeof chakra.div>;

export type AvatarNameProps = SafeMerge<
  BoxProps,
  { name: AvatarOptions["name"] }
>;

const AvatarName = ({ name, ...props }: AvatarNameProps) => (
  <chakra.div
    textAlign="center"
    textTransform="uppercase"
    fontWeight="normal"
    aria-label={name}
    {...props}
    children={name ? getInitials(name) : null}
  />
);

const DefaultAvatar = (props: BoxProps) => (
  <chakra.div size="100%" {...props}>
    <svg fill="#fff" viewBox="0 0 128 128" role="img">
      <g>
        <path d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z" />
        <path d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24" />
      </g>
    </svg>
  </chakra.div>
);

const AvatarRoot = createChakra("div", { themeKey: "Avatar" });

export type AvatarProps = SafeMerge<PropsOf<typeof AvatarRoot>, AvatarOptions>;

const Avatar = forwardRef(
  (
    { src, name, showBorder, borderColor, ...props }: AvatarProps,
    ref: React.Ref<any>,
  ) => {
    const [hasLoaded, setHasLoaded] = React.useState(true);

    const renderChildren = () => {
      if (src && hasLoaded) {
        return (
          <chakra.img
            size="100%"
            rounded="full"
            objectFit="cover"
            src={src}
            alt={name}
            onError={() => {
              setHasLoaded(false);
            }}
          />
        );
      }

      if (src && !hasLoaded) {
        if (name) {
          return <AvatarName name={name} />;
        } else {
          return <DefaultAvatar aria-label={name} />;
        }
      }

      if (!src && name) {
        return <AvatarName name={name} />;
      }

      return <DefaultAvatar aria-label={name} />;
    };

    const bg = name ? stringToColor(name) : "gray.400";
    const color = name ? (isDark(bg) ? "#fff" : "gray.800") : "#fff";

    const dafaultBorderColor = useModeValue("#fff", "gray.800");
    const styleProps = {
      bg,
      color,
      ...(showBorder && {
        border: "2px solid",
        borderColor: borderColor || dafaultBorderColor,
      }),
    };

    return (
      <AvatarRoot ref={ref} verticalAlign="top" {...styleProps} {...props}>
        {renderChildren()}
        {props.children}
      </AvatarRoot>
    );
  },
);

export default Avatar;
