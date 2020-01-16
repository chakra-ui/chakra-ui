import * as React from "react";
import {
  useModeValue,
  SystemProps,
  chakra,
  createChakra,
} from "@chakra-ui/system";
import { AvatarProps } from "./Avatar";
import { cleanChildren } from "@chakra-ui/utils";

const BaseLabel = createChakra("div", { themeKey: "Avatar" });

const MoreAvatarLabel = (props: any) => {
  const bg = useModeValue("gray.200", "whiteAlpha.400");
  return <BaseLabel bg={bg} {...props} />;
};

interface AvatarGroupOptions {
  /**
   * The children of the avatar group.
   *
   * Ideally should be `Avatar` and `MoreIndicator` components
   */
  children: React.ReactNode;
  /**
   * The space between the avatars in the group.
   */
  spacing?: SystemProps["marginLeft"];
  /**
   * The maximum number of visible avatars
   */
  max?: number;
}

export type AvatarGroupProps = AvatarGroupOptions & AvatarProps;
type AvatarElement = React.ReactElement<AvatarProps>;

export const AvatarGroup = ({
  children,
  borderColor,
  max,
  spacing = -3,
  variantSize,
  ...rest
}: AvatarGroupProps) => {
  const validChildren = cleanChildren(children);
  const count = validChildren.length;

  const clones = validChildren.map((child, index) => {
    if (!React.isValidElement(child)) return;

    if (max && index > max) {
      return null;
    }

    if (max == null || (max && index < max)) {
      const isFirstAvatar = index === 0;
      return React.cloneElement(child as AvatarElement, {
        ml: isFirstAvatar ? 0 : spacing,
        variantSize,
        borderColor: borderColor || child.props["borderColor"],
        showBorder: true,
        zIndex: count - index,
      });
    }

    if (max && index === max) {
      return (
        <MoreAvatarLabel
          variantSize={variantSize}
          marginLeft={spacing}
          children={`+${count - max}`}
        />
      );
    }
  });

  return (
    <chakra.div display="flex" alignItems="center" {...rest}>
      {clones}
    </chakra.div>
  );
};

export default AvatarGroup;
