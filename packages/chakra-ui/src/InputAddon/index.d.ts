import { FC } from "react";

interface IInputAddon {
  /**
   * The content of the input addon
   */
  children?: ReactNode;
  /**
   * The addon text of the input addon
   */
  text?: string;
  /**
   * The size of the input addon
   */
  size?: string;
  /**
   * If `true` set the form control to the invalid state.
   */
  isInvalid?: boolean;
  /**
   * The variant of the input addon
   */
  variant?: string;
  /**
   * The id of the input addon
   */
  id?: string;
  /**
   * The position of the input addon.
   * Possible values: `left` or `right`.
   */
  position?: "left" | "right";
}

export type InputAddonProps = IInputAddon & BoxProps;

declare const InputAddon: FC<InputAddonProps>;

export const InputAddon;
