import { BoxProps } from "../Box";
import * as React from "react";
import { Icons } from "../theme/icons";
import { Omit } from "../common-types";

interface IIcon {
  /**
   * The size of the icon.
   */
  size?: string;
  /**
   * The name of the icon.
   */
  name?: Icons | string;
  /**
   * The color of the icon.
   */
  color?: string;
  /**
   * The role of the icon. `presentation` or `img`
   */
  role?: "presentation" | "img";
  /**
   * If `false`, it means the icon is used within interactive
   * element and won't be focuable.
   */
  focusable?: boolean;
}

export type IconProps = IIcon & Omit<BoxProps, "size">;

declare const Icon: React.FC<IconProps>;

export default Icon;
