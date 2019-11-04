/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import { Box, BoxProps } from "@chakra-ui/layout";
import { inputSizes, InputSizes } from "../Input/styles";
import { InputOptions } from "../Input";

interface InputElementOptions {
  /**
   * The size of the adornment is inherited from the `InputGroup` via `cloneElement`.
   */
  size?: InputOptions["size"];
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
  disablePointerEvents?: boolean;
}

type InputElementProps<P, T> = InputElementOptions & BoxProps<P, T>;

const InputElement = forwardRef(function InputElement<P, T extends HTMLElement>(
  {
    size,
    children,
    placement = "left",
    disablePointerEvents = false,
    ...props
  }: InputElementProps<P, T>,
  ref: React.Ref<T>,
) {
  const height =
    inputSizes[size as InputSizes] && inputSizes[size as InputSizes]["height"];
  const fontSize =
    inputSizes[size as InputSizes] &&
    inputSizes[size as InputSizes]["fontSize"];
  const placementProp = { [placement]: "0" };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      height={height}
      width={height}
      fontSize={fontSize}
      top="0"
      zIndex={1}
      ref={ref}
      {...(disablePointerEvents && { pointerEvents: "none" })}
      {...placementProp}
      {...props}
    >
      {children}
    </Box>
  );
}) as <P, T extends HTMLElement>(
  props: InputElementProps<P, T>,
) => React.ReactElement<InputElementProps<P, T>>;

const InputLeftElement = forwardRef(function InputLeftElement<
  P,
  T extends HTMLElement
>(props: InputElementProps<P, T>, ref: React.Ref<T>) {
  return <InputElement ref={ref} placement="left" {...props} />;
}) as <P, T extends HTMLElement>(
  props: InputElementProps<P, T>,
) => React.ReactElement<InputElementProps<P, T>>;

const InputRightElement = forwardRef(function InputRightElement<
  P,
  T extends HTMLElement
>(props: InputElementProps<P, T>, ref: React.Ref<T>) {
  return <InputElement ref={ref} placement="right" {...props} />;
}) as <P, T extends HTMLElement>(
  props: InputElementProps<P, T>,
) => React.ReactElement<InputElementProps<P, T>>;

export { InputLeftElement, InputRightElement };
export default InputElement;
