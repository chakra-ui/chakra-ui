import * as React from "react";
import { ButtonProps } from "../Button";

type PropsFromButton = Pick<
  ButtonProps,
  "size" | "variant" | "color" | "isDisabled" | "isLoading" | "type"
>;

interface IIconButton extends PropsFromButton {
  /**
   * The icon to be used. Refer to the [Icons](http://chakra-ui.com/icon/) section
   * of the docs for the available icon options.
   */
  icon?: string;
  /**
   * If `true`, the button will be perfectly round. Else, it'll be slightly round
   */
  isRound?: boolean;
  /**
   * A11y: A label that describes the button
   */
  "aria-label": string;
}

export type IconButtonProps = IIconButton & React.RefAttributes<HTMLDivElement>;

declare const IconButton: React.FC<IconButtonProps>;

export default IconButton;
