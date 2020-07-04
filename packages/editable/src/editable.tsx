import {
  chakra,
  PropsOf,
  forwardRef,
  useStyleConfig,
  omitThemingProps,
  ThemingProps,
  StylesProvider,
  useStyles,
} from "@chakra-ui/system"
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

type RenderProps = Pick<
  UseEditableReturn,
  "isEditing" | "onSubmit" | "onCancel" | "onEdit"
>

type BaseEditableProps = Omit<
  PropsOf<typeof chakra.div>,
  "onChange" | "value" | "children" | "defaultValue"
>

export type EditableProps = UseEditableProps &
  BaseEditableProps &
  ThemingProps & {
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
  const styles = useStyleConfig("Editable", props)
  const realProps = omitThemingProps(props)
  const { htmlProps, ...context } = useEditable(realProps)

  const { isEditing, onSubmit, onCancel, onEdit } = context

  const _className = cx("chakra-editable", props.className)

  const children = isFunction(props.children)
    ? props.children({ isEditing, onSubmit, onCancel, onEdit })
    : props.children

  return (
    <EditableProvider value={context}>
      <StylesProvider value={styles}>
        <chakra.div
          ref={ref}
          {...htmlProps}
          __css={styles.Container}
          className={_className}
        >
          {children}
        </chakra.div>
      </StylesProvider>
    </EditableProvider>
  )
})

if (__DEV__) {
  Editable.displayName = "Editable"
}

export type EditablePreviewProps = PropsOf<typeof chakra.div>

/**
 * EditablePreview
 *
 * The `span` used to display the final value, in the `preview` mode
 */
export const EditablePreview = forwardRef<EditablePreviewProps>(
  function EditablePreview(props, ref) {
    const { getPreviewProps } = useEditableContext()
    const styles = useStyles()

    const previewProps = getPreviewProps({ ...props, ref })
    const _className = cx("chakra-editable__preview", props.className)

    return (
      <chakra.span
        {...previewProps}
        __css={styles.Preview}
        className={_className}
      />
    )
  },
)

if (__DEV__) {
  EditablePreview.displayName = "EditablePreview"
}

export type EditableInputProps = PropsOf<typeof chakra.input>

/**
 * EditableInput
 *
 * The input used in the `edit` mode
 */
export const EditableInput = forwardRef<EditableInputProps>(
  function EditableInput(props, ref) {
    const { getInputProps } = useEditableContext()
    const styles = useStyles()

    const inputProps = getInputProps({ ...props, ref })
    const _className = cx("chakra-editable__input", props.className)

    return (
      <chakra.input
        {...inputProps}
        __css={styles.Input}
        className={_className}
      />
    )
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
