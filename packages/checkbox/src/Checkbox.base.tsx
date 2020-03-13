import * as React from "react"
import {
  useCheckbox,
  CheckboxHookReturn,
  CheckboxHookProps,
} from "./Checkbox.hook"
import { createContext } from "@chakra-ui/utils"

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

////////////////////////////////////////////////////////////////////////////////

export type LabelProps = CheckboxHookProps &
  Omit<React.HTMLAttributes<HTMLLabelElement>, OmitTypes>

export const Checkbox = React.forwardRef(
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

////////////////////////////////////////////////////////////////////////////////

export type HiddenInputProps = React.HTMLAttributes<HTMLInputElement>

export const CheckboxHiddenInput = React.forwardRef(
  (props: HiddenInputProps, ref: React.Ref<HTMLInputElement>) => {
    const { getInputProps } = useCheckboxContext()
    return <input {...getInputProps({ ...props, ref })} />
  },
)

////////////////////////////////////////////////////////////////////////////////

export type CustomCheckboxProps = React.ComponentProps<"div">

export const CustomCheckbox = React.forwardRef(
  (props: CustomCheckboxProps, ref: React.Ref<any>) => {
    const { getCheckboxProps } = useCheckboxContext()
    return <div ref={ref} {...getCheckboxProps(props)} />
  },
)
