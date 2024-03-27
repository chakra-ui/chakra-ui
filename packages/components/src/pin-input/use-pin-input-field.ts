import { usePinInputContext } from "./pin-input-context"

export interface UsePinInputFieldProps extends InputProps {
  ref?: React.Ref<HTMLInputElement>
}

/**
 * @internal
 */
export function usePinInputField(
  props: UsePinInputFieldProps = {},
  ref: React.Ref<any> = null,
) {
  const { getInputProps } = usePinInputContext()

  return getInputProps({
    ...props,
    ref,
    index: (props as any).index, // this is passed to the cloned children in PinInput
  })
}

export interface InputProps
  extends Omit<
    React.ComponentPropsWithRef<"input">,
    "color" | "height" | "width"
  > {}
