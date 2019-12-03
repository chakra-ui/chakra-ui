import * as React from "react";
import { BoxProps } from "../Box";
import { IAvatar } from "../Avatar";
import { Omit } from "../common-types";

interface IMoreIndicator {
  size?: IAvatar["size"];
  label: React.ReactNode;
}

interface IAvatarGroup {
  /**
   * The size of the avatar group.
   */
  size?: IAvatar["size"];
  /**
   * The children of the avatar group.
   *
   * Ideally should be `Avatar` and `MoreIndicator` components
   */
  children: React.ReactNode;
  /**
   * The space between the avatars in the group.
   */
  spacing?: BoxProps["marginLeft"];
  /**
   * The maximum number of visible avatars
   */
  max?: number;
}

export type AvatarGroupProps = IAvatarGroup & Omit<BoxProps, "size">;
/**
 * AvatarGroup is a wrapper to render a collection of evenly spaced avatars.
 */
declare const AvatarGroup: React.FC<AvatarGroupProps>;

export default AvatarGroup;
