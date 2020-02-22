import * as React from "react"
import { useControllableProp, useUpdateEffect } from "@chakra-ui/hooks"
import { callAllHandlers, mergeRefs, isEmpty } from "@chakra-ui/utils"

export interface EditableHookProps {
  /**
   * The value of the Editable in both edit & preview mode
   */
  value?: string
  /**
   * The initial value of the Editable in both edit & preview mode
   */
  defaultValue?: string
  /**
   * If `true`, the Editable will be disabled.
   */
  isDisabled?: boolean
  /**
   * If `true`, the Editable will start with edit mode by default.
   */
  startWithEditView?: boolean
  /**
   * If `true`, the read only view, has a `tabIndex` set to `0` so it can recieve focus via the keyboard or click.
   */
  isPreviewFocusable?: boolean
  /**
   * If `true`, it'll update the value onBlur and turn off the edit mode.
   */
  submitOnBlur?: boolean
  /**
   * Callback invoked when user changes input.
   */
  onChange?: (nextValue?: string) => void
  /**
   * Callback invoked when user cancels input with the `Esc` key.
   * It provides the last confirmed value as argument.
   */
  onCancel?: (prevValue?: string) => void
  /**
   * Callback invoked when user confirms value with `enter` key or by blurring input.
   */
  onSubmit?: (nextValue?: string) => void
  /**
   * Callback invoked once the user enters edit mode.
   */
  onEdit?: () => void
  /**
   * If `true`, the input's text will be highlighted on focus.
   */
  selectAllOnFocus?: boolean
  /**
   * The placeholder text when the value is empty.
   */
  placeholder?: string
}

export function useEditable(props: EditableHookProps) {
  const {
    onChange: onChangeProp,
    onCancel: onCancelProp,
    onSubmit: onSubmitProp,
    value: valueProp,
    isDisabled,
    defaultValue,
    isPreviewFocusable,
    submitOnBlur,
    startWithEditView,
    selectAllOnFocus,
    placeholder,
    onEdit: onEditProp,
    ...htmlProps
  } = props

  const [isEditing, setIsEditing] = React.useState(
    Boolean(startWithEditView && !isDisabled),
  )
  const [valueState, setValue] = React.useState<string>(defaultValue || "")
  const [isControlled, value] = useControllableProp(valueProp, valueState)
  const [previousValue, setPreviousValue] = React.useState(value)

  const inputRef = React.useRef<HTMLInputElement>(null)

  const isInteractive = !isEditing || !isDisabled

  useUpdateEffect(() => {
    if (isEditing) {
      selectAllOnFocus ? inputRef.current?.select() : inputRef.current?.focus()
    }
    onEditProp?.()
  }, [isEditing, selectAllOnFocus])

  const onEdit = React.useCallback(() => {
    if (isInteractive) setIsEditing(true)
  }, [isInteractive])

  const onCancel = React.useCallback(() => {
    setIsEditing(false)
    setValue(previousValue)
    if (value !== previousValue) {
      onChangeProp?.(previousValue)
    }
    onCancelProp?.(previousValue)
  }, [onChangeProp, onCancelProp, value, previousValue])

  const onSubmit = React.useCallback(() => {
    setIsEditing(false)
    setPreviousValue(value)
    onSubmitProp?.(value)
  }, [value, onSubmitProp])

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      if (!isControlled) setValue(value)
      onChangeProp?.(value)
    },
    [onChangeProp, isControlled],
  )

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      const { key } = event
      if (key === "Escape") return onCancel()
      if (key === "Enter") return onSubmit()
    },
    [onCancel, onSubmit],
  )

  const isValueEmpty = isEmpty(value)

  const getTabIndex = () => {
    if (isInteractive && isPreviewFocusable) return 0
    return undefined
  }

  const onBlur = React.useCallback(() => {
    if (submitOnBlur) onSubmit()
    else onCancel()
  }, [submitOnBlur, onSubmit, onCancel])

  type InputProps = {
    onChange?: React.ChangeEventHandler
    onBlur?: React.FocusEventHandler
    onKeyDown?: React.KeyboardEventHandler
    ref?: React.RefObject<HTMLInputElement>
  }

  type PreviewProps = { onFocus?: React.FocusEventHandler }

  return {
    isEditing,
    isDisabled,
    value,
    onEdit,
    onCancel,
    onSubmit,
    isValueEmpty,
    getPreviewProps: (props: PreviewProps = {}) => ({
      ...props,
      children: isValueEmpty ? placeholder : value,
      hidden: isEditing,
      "aria-disabled": isDisabled ? true : undefined,
      tabIndex: getTabIndex(),
      onFocus: callAllHandlers(props.onFocus, onEdit),
    }),
    getInputProps: (props: InputProps = {}) => ({
      ...props,
      hidden: !isEditing,
      placeholder,
      ref: mergeRefs(props.ref, inputRef),
      disabled: isDisabled,
      "aria-disabled": isDisabled,
      value,
      onBlur: callAllHandlers(props.onBlur, onBlur),
      onChange: callAllHandlers(props.onChange, onChange),
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
    }),
    htmlProps,
  }
}

export type EditableHookReturn = ReturnType<typeof useEditable>
