import {
  chakra,
  forwardRef,
  omitThemingProps,
  PropsOf,
  StylesProvider,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
} from "@chakra-ui/system"
import {
  createContext,
  cx,
  ReactNodeOrRenderProp,
  runIfFn,
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
  errorMessage:
    "useEditableContext: context is undefined. Seems you forgot to wrap the editable components in `<Editable />`",
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
  const styles = useMultiStyleConfig("Editable", props)

  const realProps = omitThemingProps(props)
  const { htmlProps, ...context } = useEditable(realProps)

  const { isEditing, onSubmit, onCancel, onEdit } = context

  const _className = cx("chakra-editable", props.className)

  const children = runIfFn(props.children, {
    isEditing,
    onSubmit,
    onCancel,
    onEdit,
  })

  return (
    <EditableProvider value={context}>
      <StylesProvider value={styles}>
        <chakra.div
          ref={ref}
          {...htmlProps}
          __css={styles.container}
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

const commonStyles: SystemStyleObject = {
  fontSize: "inherit",
  fontWeight: "inherit",
  textAlign: "inherit",
  bg: "transparent",
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

    const previewProps = getPreviewProps(props, ref)
    const _className = cx("chakra-editable__preview", props.className)

    return (
      <chakra.span
        {...previewProps}
        __css={{
          cursor: "text",
          display: "inline-block",
          ...commonStyles,
          ...styles.preview,
        }}
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

    const inputProps = getInputProps(props, ref)
    const _className = cx("chakra-editable__input", props.className)

    return (
      <chakra.input
        {...inputProps}
        __css={{
          outline: 0,
          ...commonStyles,
          ...styles.input,
        }}
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
