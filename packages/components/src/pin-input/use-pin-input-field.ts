import { mergeRefs } from "@chakra-ui/hooks/use-merge-refs"
import { usePinInputContext, usePinInputDescendant } from "./pin-input-context"

export interface UsePinInputFieldProps extends InputProps {}

export function usePinInputField(
  props: UsePinInputFieldProps = {},
  ref: React.Ref<any> = null,
) {
  const { getInputProps } = usePinInputContext()

  const { index, register } = usePinInputDescendant()

  return getInputProps({
    ...props,
    ref: mergeRefs(register, ref),
    index,
  })
}

export interface InputProps
  extends Omit<
    React.ComponentPropsWithRef<"input">,
    "color" | "height" | "width"
  > {}
