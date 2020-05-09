import { useControllableState, useUpdateEffect } from "@chakra-ui/hooks"
import {
  callAllHandlers,
  createOnKeyDown,
  Dict,
  isEmpty,
  mergeRefs,
  ariaAttr,
} from "@chakra-ui/utils"
import * as React from "react"
import { useRef, useState, useCallback } from "react"
import { PropsOf } from "@chakra-ui/system"

export interface UseEditableProps {
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
   * If `true`, the read only view, has a `tabIndex` set to `0`
   * so it can recieve focus via the keyboard or click.
   * @default true
   */
  isPreviewFocusable?: boolean
  /**
   * If `true`, it'll update the value onBlur and turn off the edit mode.
   * @default true
   */
  submitOnBlur?: boolean
  /**
   * Callback invoked when user changes input.
   */
  onChange?: (nextValue: string) => void
  /**
   * Callback invoked when user cancels input with the `Esc` key.
   * It provides the last confirmed value as argument.
   */
  onCancel?: (previousValue: string) => void
  /**
   * Callback invoked when user confirms value with `enter` key or by blurring input.
   */
  onSubmit?: (nextValue: string) => void
  /**
   * Callback invoked once the user enters edit mode.
   */
  onEdit?: () => void
  /**
   * If `true`, the input's text will be highlighted on focus.
   * @default true
   */
  selectAllOnFocus?: boolean
  /**
   * The placeholder text when the value is empty.
   */
  placeholder?: string
}

/**
 * React hook for managing the inline renaming of some text.
 *
 * @see Docs https://chakra-ui.com/useEditable
 */
export function useEditable(props: UseEditableProps = {}) {
  const {
    onChange: onChangeProp,
    onCancel: onCancelProp,
    onSubmit: onSubmitProp,
    value: valueProp,
    isDisabled,
    defaultValue,
    startWithEditView,
    isPreviewFocusable = true,
    submitOnBlur = true,
    selectAllOnFocus = true,
    placeholder,
    onEdit: onEditProp,
    ...htmlProps
  } = props

  const defaultIsEditing = Boolean(startWithEditView && !isDisabled)

  const [isEditing, setIsEditing] = useState(defaultIsEditing)

  const [value, setValue] = useControllableState({
    defaultValue: defaultValue || "",
    value: valueProp,
    onChange: onChangeProp,
    shouldUpdate: (prev, next) => prev !== next,
  })

  /**
   * Keep track of the previous value, so if users
   * presses `cancel`, we can revert to it.
   */
  const [prevValue, setPrevValue] = useState(value)

  /**
   * Ref to help focus the input in edit mode
   */
  const inputRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef<any>(null)

  const editButtonRef = useRef<HTMLButtonElement>(null)

  const isInteractive = !isEditing || !isDisabled

  useUpdateEffect(() => {
    if (!isEditing) {
      editButtonRef.current?.focus()
      return
    }

    if (selectAllOnFocus) {
      inputRef.current?.select()
    } else {
      inputRef.current?.focus()
    }

    onEditProp?.()
  }, [isEditing, selectAllOnFocus])

  const onEdit = useCallback(() => {
    if (isInteractive) {
      setIsEditing(true)
    }
  }, [isInteractive])

  const onCancel = useCallback(() => {
    setIsEditing(false)
    setValue(prevValue)
    onCancelProp?.(prevValue)
  }, [onCancelProp, setValue, prevValue])

  const onSubmit = useCallback(() => {
    setIsEditing(false)
    setPrevValue(value)
    onSubmitProp?.(value)
  }, [value, onSubmitProp])

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    },
    [setValue],
  )

  const onKeyDown = createOnKeyDown({
    keyMap: {
      Escape: onCancel,
      Enter: event => {
        if (!event.shiftKey && !event.metaKey) {
          onSubmit()
        }
      },
    },
  })

  const isValueEmpty = isEmpty(value)

  const getTabIndex = () => {
    const shouldHaveTabIndex = isInteractive && isPreviewFocusable
    return shouldHaveTabIndex ? 0 : undefined
  }

  const onBlur = useCallback(() => {
    if (submitOnBlur) {
      onSubmit()
    }
  }, [submitOnBlur, onSubmit])

  return {
    isEditing,
    isDisabled,
    isValueEmpty,
    value,
    onEdit,
    onCancel,
    onSubmit,
    getPreviewProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, previewRef),
      children: isValueEmpty ? placeholder : value,
      hidden: isEditing,
      "aria-disabled": ariaAttr(isDisabled),
      tabIndex: getTabIndex(),
      onFocus: callAllHandlers(props.onFocus, onEdit),
    }),
    getInputProps: (props: Dict = {}) => ({
      ...props,
      hidden: !isEditing,
      placeholder,
      ref: mergeRefs(props.ref, inputRef),
      disabled: isDisabled,
      "aria-disabled": ariaAttr(isDisabled),
      value,
      onBlur: callAllHandlers(props.onBlur, onBlur),
      onChange: callAllHandlers(props.onChange, onChange),
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
    }),
    getEditButtonProps: (props: Dict = {}): PropsOf<"button"> => ({
      "aria-label": "Edit",
      ...props,
      type: "button",
      onClick: callAllHandlers(props.onClick, onEdit),
      ref: mergeRefs(props.ref, editButtonRef),
    }),
    getSubmitButtonProps: (props: Dict = {}): PropsOf<"button"> => ({
      "aria-label": "Submit",
      ...props,
      type: "button",
      onClick: callAllHandlers(props.onClick, onSubmit),
    }),
    getCancelButtonProps: (props: Dict = {}): PropsOf<"button"> => ({
      "aria-label": "Cancel",
      ...props,
      type: "button",
      onClick: callAllHandlers(props.onClick, onCancel),
    }),
    htmlProps,
  }
}

export type UseEditableReturn = ReturnType<typeof useEditable>
