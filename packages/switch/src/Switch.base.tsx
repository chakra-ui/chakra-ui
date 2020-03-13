import {
  CheckboxHookProps,
  useCheckbox,
  CheckboxHookReturn,
} from "@chakra-ui/checkbox"
import { forwardRef } from "@chakra-ui/system"
import { createContext } from "@chakra-ui/utils"
import React from "react"

const [CheckboxContextProvider, useCheckboxContext] = createContext<
  Omit<CheckboxHookReturn, "htmlProps">
>()

export const useCheckboxState = () => useCheckboxContext()["state"]

type OmitTypes =
  | "defaultChecked"
  | "checked"
  | "onChange"
  | "name"
  | "value"
  | "id"

export type LabelProps = CheckboxHookProps &
  Omit<React.HTMLAttributes<HTMLLabelElement>, OmitTypes>

export const SwitchRoot = forwardRef(
  (props: LabelProps, ref: React.Ref<HTMLLabelElement>) => {
    const { htmlProps, ...context } = useCheckbox(props)
    return (
      <CheckboxContextProvider value={context}>
        <label ref={ref} {...htmlProps}>
          {props.children}
        </label>
      </CheckboxContextProvider>
    )
  },
)

export const SwitchInput = forwardRef(
  (
    props: React.HTMLAttributes<HTMLInputElement>,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const { getInputProps } = useCheckboxContext()
    return <input {...getInputProps({ ref, ...props })} />
  },
)

export const SwitchTrack = forwardRef(
  (props: any, ref: React.Ref<HTMLDivElement>) => {
    const { getCheckboxProps } = useCheckboxContext()
    return (
      <div ref={ref} {...(getCheckboxProps(props) as any)}>
        {props.children}
      </div>
    )
  },
)

export const SwitchThumb = forwardRef(
  (props: any, ref: React.Ref<HTMLDivElement>) => {
    const { state } = useCheckboxContext()
    return (
      <div
        ref={ref}
        {...props}
        data-checked={state.isChecked ? "" : undefined}
        data-hover={state.isHovered ? "" : undefined}
      >
        {props.children}
      </div>
    )
  },
)
