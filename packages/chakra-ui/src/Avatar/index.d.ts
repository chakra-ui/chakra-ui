import * as React from "react";
import { BoxProps } from "../Box";

export interface IAvatar {
  /**
   * The name of the person in the avatar.
   *
   * - if `src` has loaded, the name will be used as the `alt` attribute of the `img`
   * - If `src` is not loaded, the name will be used to create the initials
   */
  name: string;
  /**
   * The size of the avatar.
   */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  /**
   * If `true`, the `Avatar` will show a border around it.
   *
   * Best for a group of avatars
   */
  showBorder?: boolean;
  /**
   * The badge at the bottom right corner of the avatar.
   */
  badge?: React.ReactNode;
  /**
   * The image url of the `Avatar`
   */
  src?: string;
}

export type AvatarNameProps = Pick<IAvatar, "name"> & BoxProps;

export type AvatarProps = IAvatar & BoxProps;

export const AvatarBadge: React.FC<BoxProps>;

export const AvatarName: React.FC<AvatarNameProps>;

declare const Avatar: React.FC<AvatarProps>;

export default Avatar;
