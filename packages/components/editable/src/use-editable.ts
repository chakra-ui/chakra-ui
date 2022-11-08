import { useFocusOnPointerDown } from "@chakra-ui/react-use-focus-on-pointer-down"
import { useSafeLayoutEffect } from "@chakra-ui/react-use-safe-layout-effect"
import { useUpdateEffect } from "@chakra-ui/react-use-update-effect"
import { useControllableState } from "@chakra-ui/react-use-controllable-state"
import { mergeRefs } from "@chakra-ui/react-use-merge-refs"
import { useCallbackRef } from "@chakra-ui/react-use-callback-ref"
import { ariaAttr, callAllHandlers } from "@chakra-ui/shared-utils"
import { PropGetter } from "@chakra-ui/react-types"
import { useCallback, useEffect, useRef, useState } from "react"

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
   * so it can receive focus via the keyboard or click.
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

function contains(parent: HTMLElement | null, child: HTMLElement) {
  if (!parent) return false
  return parent === child || parent.contains(child)
}

/**
 * React hook for managing the inline renaming of some text.
 *
 * @see Docs https://chakra-ui.com/editable
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
    onEdit: onEditCallback,
    ...htmlProps
  } = props

  const onEditProp = useCallbackRef(onEditCallback)

  const defaultIsEditing = Boolean(startWithEditView && !isDisabled)

  const [isEditing, setIsEditing] = useState(defaultIsEditing)

  const [value, setValue] = useControllableState({
    defaultValue: defaultValue || "",
    value: valueProp,
    onChange: onChangeProp,
  })

  /**
   * Keep track of the previous value, so if users
   * presses `cancel`, we can revert to it.
   */
  const [prevValue, setPrevValue] = useState(value)

  /**
   * Ref to help focus the input in edit mode
   */
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const previewRef = useRef<any>(null)

  const editButtonRef = useRef<HTMLButtonElement>(null)
  const cancelButtonRef = useRef<HTMLElement>(null)
  const submitButtonRef = useRef<HTMLElement>(null)

  useFocusOnPointerDown({
    ref: inputRef,
    enabled: isEditing,
    elements: [cancelButtonRef, submitButtonRef],
  })

  const isInteractive = !isEditing && !isDisabled

  useSafeLayoutEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      if (selectAllOnFocus) inputRef.current?.select()
    }
  }, [])

  useUpdateEffect(() => {
    if (!isEditing) {
      editButtonRef.current?.focus()
      return
    }

    inputRef.current?.focus()

    if (selectAllOnFocus) {
      inputRef.current?.select()
    }

    onEditProp?.()
  }, [isEditing, onEditProp, selectAllOnFocus])

  const onEdit = useCallback(() => {
    if (isInteractive) {
      setIsEditing(true)
    }
  }, [isInteractive])

  const onUpdatePrevValue = useCallback(() => {
    setPrevValue(value)
  }, [value])

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

  useEffect(() => {
    if (isEditing) return
    // https://bugzilla.mozilla.org/show_bug.cgi?id=559561
    const inputEl = inputRef.current
    if (inputEl?.ownerDocument.activeElement === inputEl) {
      inputEl?.blur()
    }
  }, [isEditing])

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(event.currentTarget.value)
    },
    [setValue],
  )

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const eventKey = event.key

      const keyMap: Record<string, React.KeyboardEventHandler> = {
        Escape: onCancel,
        Enter: (event) => {
          if (!event.shiftKey && !event.metaKey) {
            onSubmit()
          }
        },
      }

      const action = keyMap[eventKey]

      if (action) {
        event.preventDefault()
        action(event)
      }
    },
    [onCancel, onSubmit],
  )

  const onKeyDownWithoutSubmit = useCallback(
    (event: React.KeyboardEvent) => {
      const eventKey = event.key

      const keyMap: Record<string, React.KeyboardEventHandler> = {
        Escape: onCancel,
      }

      const action = keyMap[eventKey]

      if (action) {
        event.preventDefault()
        action(event)
      }
    },
    [onCancel],
  )

  const isValueEmpty = value.length === 0

  const onBlur = useCallback(
    (event: React.FocusEvent) => {
      if (!isEditing) return
      const doc = event.currentTarget.ownerDocument
      const relatedTarget = (event.relatedTarget ??
        doc.activeElement) as HTMLElement
      const targetIsCancel = contains(cancelButtonRef.current, relatedTarget)
      const targetIsSubmit = contains(submitButtonRef.current, relatedTarget)
      const isValidBlur = !targetIsCancel && !targetIsSubmit

      if (isValidBlur) {
        if (submitOnBlur) {
          onSubmit()
        } else {
          onCancel()
        }
      }
    },
    [submitOnBlur, onSubmit, onCancel, isEditing],
  )

  const getPreviewProps: PropGetter = useCallback(
    (props = {}, ref = null) => {
      const tabIndex = isInteractive && isPreviewFocusable ? 0 : undefined
      return {
        ...props,
        ref: mergeRefs(ref, previewRef),
        children: isValueEmpty ? placeholder : value,
        hidden: isEditing,
        "aria-disabled": ariaAttr(isDisabled),
        tabIndex,
        onFocus: callAllHandlers(props.onFocus, onEdit, onUpdatePrevValue),
      }
    },
    [
      isDisabled,
      isEditing,
      isInteractive,
      isPreviewFocusable,
      isValueEmpty,
      onEdit,
      onUpdatePrevValue,
      placeholder,
      value,
    ],
  )

  const getInputProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      hidden: !isEditing,
      placeholder,
      ref: mergeRefs(ref, inputRef),
      disabled: isDisabled,
      "aria-disabled": ariaAttr(isDisabled),
      value,
      onBlur: callAllHandlers(props.onBlur, onBlur),
      onChange: callAllHandlers(props.onChange, onChange),
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
      onFocus: callAllHandlers(props.onFocus, onUpdatePrevValue),
    }),
    [
      isDisabled,
      isEditing,
      onBlur,
      onChange,
      onKeyDown,
      onUpdatePrevValue,
      placeholder,
      value,
    ],
  )

  const getTextareaProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      hidden: !isEditing,
      placeholder,
      ref: mergeRefs(ref, inputRef),
      disabled: isDisabled,
      "aria-disabled": ariaAttr(isDisabled),
      value,
      onBlur: callAllHandlers(props.onBlur, onBlur),
      onChange: callAllHandlers(props.onChange, onChange),
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDownWithoutSubmit),
      onFocus: callAllHandlers(props.onFocus, onUpdatePrevValue),
    }),
    [
      isDisabled,
      isEditing,
      onBlur,
      onChange,
      onKeyDownWithoutSubmit,
      onUpdatePrevValue,
      placeholder,
      value,
    ],
  )

  const getEditButtonProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      "aria-label": "Edit",
      ...props,
      type: "button",
      onClick: callAllHandlers(props.onClick, onEdit),
      ref: mergeRefs(ref, editButtonRef),
      disabled: isDisabled,
    }),
    [onEdit, isDisabled],
  )

  const getSubmitButtonProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      "aria-label": "Submit",
      ref: mergeRefs(submitButtonRef, ref),
      type: "button",
      onClick: callAllHandlers(props.onClick, onSubmit),
      disabled: isDisabled,
    }),
    [onSubmit, isDisabled],
  )

  const getCancelButtonProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      "aria-label": "Cancel",
      id: "cancel",
      ...props,
      ref: mergeRefs(cancelButtonRef, ref),
      type: "button",
      onClick: callAllHandlers(props.onClick, onCancel),
      disabled: isDisabled,
    }),
    [onCancel, isDisabled],
  )

  return {
    isEditing,
    isDisabled,
    isValueEmpty,
    value,
    onEdit,
    onCancel,
    onSubmit,
    getPreviewProps,
    getInputProps,
    getTextareaProps,
    getEditButtonProps,
    getSubmitButtonProps,
    getCancelButtonProps,
    htmlProps,
  }
}

export type UseEditableReturn = ReturnType<typeof useEditable>
