import { ReactNode, RefAttributes, ForwardRefExoticComponent } from "react";
import { MarginLeftProps } from "styled-system";
import { BoxProps } from "../Box";

interface IMoreIndicator {
  size: string;
  label: ReactNode;
}

interface IAvatarGroup {
  /**
   * The size of the avatar group.
   */
  size?: string;
  /**
   * The children of the avatar group.
   */
  children: ReactNode;
  /**
   * The space between the individual avatars in the group.
   */
  spacing?: MarginLeftProps;
}

export type MoreIndicatorProps = IMoreIndicator &
  BoxProps &
  RefAttributes<HTMLDivElement>;

export type AvatarGroupProps = IAvatarGroup &
  BoxProps &
  RefAttributes<HTMLDivElement>;

export const MoreIndicator: ForwardRefExoticComponent<MoreIndicatorProps>;

declare const AvatarGroup: ForwardRefExoticComponent<AvatarGroupProps>;

export default AvatarGroup;
