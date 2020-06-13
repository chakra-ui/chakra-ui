import { chakra, PropsOf, forwardRef } from "@chakra-ui/system"
import {
  createContext,
  cx,
  isFunction,
  ReactNodeOrRenderProp,
  __DEV__,
} from "@chakra-ui/utils"
import * as React from "react"
import {
  useEditable,
  UseEditableProps,
  UseEditableReturn,
} from "./use-editable"

type EditableContext = Omit<UseEditableReturn, "htmlProps">

const [EditableProvider, useEditableContext] = createContext<EditableContext>({
  name: "EditableContext",
})

const StyledEditable = chakra("div", {
  themeKey: "Editable.Root",
})

type RenderProps = Pick<
  UseEditableReturn,
  "isEditing" | "onSubmit" | "onCancel" | "onEdit"
>

type Omitted = "onChange" | "value" | "children" | "defaultValue"

type BaseEditableProps = Omit<PropsOf<typeof StyledEditable>, Omitted>

export type EditableProps = UseEditableProps &
  BaseEditableProps & {
    children?: ReactNodeOrRenderProp<RenderProps>
  }

/**
 * Editable
 *
 * The wrapper that provides context and logic for all editable
 * components. It renders a `div`
 */
export const Editable = forwardRef<EditableProps>(function Editable(
  props,
  ref,
) {
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

if (__DEV__) {
  Editable.displayName = "Editable"
}

const StyledPreview = chakra("span", { themeKey: "Editable.Preview" })

export type EditablePreviewProps = PropsOf<typeof StyledPreview>

/**
 * EditablePreview
 *
 * The `span` used to display the final value, in the `preview` mode
 */

export const EditablePreview = forwardRef<EditablePreviewProps>(
  function EditablePreview(props, ref) {
    const { getPreviewProps } = useEditableContext()
    const previewProps = getPreviewProps({ ...props, ref })
    const _className = cx("chakra-editable__preview", props.className)

    return <StyledPreview {...previewProps} className={_className} />
  },
)

if (__DEV__) {
  EditablePreview.displayName = "EditablePreview"
}

const StyledInput = chakra("input", {
  themeKey: "Editable.Input",
})

export type EditableInputProps = PropsOf<typeof StyledInput>

/**
 * EditableInput
 *
 * The input used in the `edit` mode
 */
export const EditableInput = forwardRef<EditableInputProps>(
  function EditableInput(props, ref) {
    const { getInputProps } = useEditableContext()
    const inputProps = getInputProps({ ...props, ref })

    const _className = cx("chakra-editable__input", props.className)

    return <StyledInput {...inputProps} className={_className} />
  },
)

if (__DEV__) {
  EditableInput.displayName = "EditableInput"
}

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
