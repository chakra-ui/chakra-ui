import * as React from "react";
import * as StyledSystem from "styled-system";
import { BoxProps } from "../Box";
import { IAvatar } from "../Avatar";

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
  spacing?: StyledSystem.MarginLeftProps;
}

export type MoreIndicatorProps = IMoreIndicator &
  BoxProps &
  React.RefAttributes<HTMLDivElement>;

export type AvatarGroupProps = IAvatarGroup &
  BoxProps &
  React.RefAttributes<HTMLDivElement>;

export const MoreIndicator: React.ForwardRefExoticComponent<MoreIndicatorProps>;

/**
 * AvatarGroup is a wrapper to render a collection of evenly spaced avatars.
 */
declare const AvatarGroup: React.ForwardRefExoticComponent<AvatarGroupProps>;

export default AvatarGroup;
