import { chakra, PropsOf } from "@chakra-ui/system"
import {
  createContext,
  cx,
  isFunction,
  ReactNodeOrRenderProp,
} from "@chakra-ui/utils"
import * as React from "react"
import { forwardRef, Ref } from "react"
import {
  useEditable,
  UseEditableProps,
  UseEditableReturn,
} from "./Editable.hook"

type EditableContext = Omit<UseEditableReturn, "htmlProps">

const [EditableProvider, useEditableContext] = createContext<EditableContext>()

const StyledEditable = chakra("div", { themeKey: "Editable.Root" })

type RenderProps = Pick<
  UseEditableReturn,
  "isEditing" | "onSubmit" | "onCancel" | "onEdit"
>

type Omitted = "onChange" | "value" | "children" | "defaultValue"

export type EditableProps = UseEditableProps &
  Omit<PropsOf<typeof StyledEditable>, Omitted> & {
    children?: ReactNodeOrRenderProp<RenderProps>
  }

/**
 * Editable
 *
 * The wrapper that provides context and logic for all editable
 * components. It renders a `div`
 */
export const Editable = forwardRef((props: EditableProps, ref: Ref<any>) => {
  const { htmlProps, ...context } = useEditable(props)

  const { isEditing, onSubmit, onCancel, onEdit } = context

  const _className = cx("chakra-editable", props.className)

  const children = isFunction(props.children)
    ? props.children({ isEditing, onSubmit, onCancel, onEdit })
    : props.children

  return (
    <EditableProvider value={context}>
      <StyledEditable ref={ref} {...htmlProps} className={_className}>
        {children}
      </StyledEditable>
    </EditableProvider>
  )
})

const StyledPreview = chakra("span", { themeKey: "Editable.Preview" })

export type EditablePreviewProps = PropsOf<typeof StyledPreview>

/**
 * EditablePreview
 *
 * The `span` used to display the final value, in the `preview` mode
 */

export const EditablePreview = forwardRef(
  (props: EditablePreviewProps, ref: Ref<any>) => {
    const { getPreviewProps } = useEditableContext()
    const previewProps = getPreviewProps(props)

    const _className = cx("chakra-editable__preview", props.className)

    return <StyledPreview ref={ref} {...previewProps} className={_className} />
  },
)

const StyledInput = chakra("input", { themeKey: "Editable.Input" })

export type EditableInputProps = PropsOf<typeof StyledInput>

/**
 * EditableInput
 *
 * The input used in the `edit` mode
 */
export const EditableInput = forwardRef(
  (props: EditableInputProps, ref: Ref<HTMLInputElement>) => {
    const { getInputProps } = useEditableContext()
    const inputProps = getInputProps({ ...props, ref })

    const _className = cx("chakra-editable__input", props.className)

    return <StyledInput {...inputProps} className={_className} />
  },
)

/**
 * React hook use to gain access to the editable state and actions.
 */
export function useEditableState() {
  const {
    isEditing,
    onSubmit,
    onCancel,
    onEdit,
    isDisabled,
  } = useEditableContext()

  return {
    isEditing,
    onSubmit,
    onCancel,
    onEdit,
    isDisabled,
  }
}

/**
 * React hook use to create controls for the editable component
 */
export function useEditableControls() {
  const {
    isEditing,
    getEditButtonProps,
    getCancelButtonProps,
    getSubmitButtonProps,
  } = useEditableContext()

  return {
    isEditing,
    getEditButtonProps,
    getCancelButtonProps,
    getSubmitButtonProps,
  }
}
