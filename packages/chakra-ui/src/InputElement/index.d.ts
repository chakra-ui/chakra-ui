import { IInput } from "../Input";
import * as React from "react";
import { BoxProps } from "../Box";

interface IInputElement {
  /**
   * The size of the adornment is inherited from the `InputGroup` via `cloneElement`.
   */
  size?: IInput["size"];
  /**
   * The position this adornment should appear relative to the `Input`.
   * We added `InputLeftElement` and `InputRightElement` so you might not need to pass this
   */
  placement?: "left" | "right";
  /**
   * The content of the component, normally an `IconButton` or string.
   */
  children: React.ReactNode;
  /**
   * Disable pointer events on this component.
   * This allows for the content of the adornment to focus the input on click.
   */
  disabledPointerEvents?: boolean;
}

type IInputElementProps = IInputElement & BoxProps;

declare const InputElement: React.ForwardRefExoticComponent<IInputElementProps>;
export default InputElement;

export const InputLeftElement: React.ForwardRefExoticComponent<
  IInputElementProps
>;
export const InputRightElement: React.ForwardRefExoticComponent<
  IInputElementProps
>;
