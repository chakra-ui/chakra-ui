import { ReactNode, FC } from "react";
import { BoxProps } from "../Box";

interface IAvatarName {
  /**
   * Used to get user initials, which is the default display mode of the avatar.
   */
  name: string;
}

interface IAvatar extends IAvatarName {
  /**
   * The size of the avatar.
   */
  size?: string;
  /**
   * If `true` show a border around the avatar.
   */
  showBorder?: boolean;
  /**
   * If passed, displays a badge at the bottom right corner of the avatar.
   */
  badge?: ReactNode;
  /**
   * Image source of the avatar.
   */
  src?: string;
}

export type AvatarNameProps = IAvatarName & BoxProps;

export type AvatarProps = IAvatar & BoxProps;

export const AvatarBadge: FC<BoxProps>;

export const AvatarName: FC<AvatarNameProps>;

declare const Avatar: FC<AvatarProps>;

export default Avatar;
