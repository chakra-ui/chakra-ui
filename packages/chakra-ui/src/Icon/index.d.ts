import { BoxProps } from "../Box";
import { FC } from "react";

interface IIcon {
  /**
   * The size of the icon.
   */
  size?: string;
  /**
   * The name of the icon.
   */
  name: string;
  /**
   * The color of the icon.
   */
  color?: string;
  /**
   * The role of the icon. `presentation` or `img`
   */
  role?: "presentation" | "img";
}

export type IconProps = IIcon & BoxProps;

declare const Icon: FC<IconProps>;

export default Icon;
