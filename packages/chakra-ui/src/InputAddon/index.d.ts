import { FC } from "react";
import { IInputProps } from "../Input";

interface IInputAddon {
  /**
   * The content of the `InputAddon`
   */
  children: ReactNode;
  /**
   * The size of the addon is inherited from the `InputGroup` via `cloneElement`.
   */
  size?: Pick<IInputProps, "size">;
  /**
   * The position the addon should appear relative to the `Input`.
   * We added `InputLeftAddon` and `InputRightAddon` so you might not need to pass this
   */
  placement?: "left" | "right";
}

export type InputAddonProps = IInputAddon & BoxProps;

declare const InputAddon: FC<InputAddonProps>;

export default InputAddon;
export const InputLeftAddon: FC<InputAddonProps>;
export const InputRightAddon: FC<InputAddonProps>;
