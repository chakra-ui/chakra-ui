import * as React from "react";
import { useControllableProp } from "@chakra-ui/hooks";
import { composeEventHandlers, createContext } from "@chakra-ui/utils";

export interface EditableProviderProps {
  value?: string;
  defaultValue?: string;
  isDisabled?: boolean;
  startWithEditView?: boolean;
  isPreviewFocusable?: boolean;
  submitOnBlur?: boolean;
  onChange?: (newValue?: string) => void;
  onCancel?: (previousValue?: string) => void;
  onSubmit?: (newValue?: string) => void;
  onEdit?: () => void;
  selectAllOnFocus?: boolean;
  placeholder?: string;
}

export function useEditableProvider(props: EditableProviderProps) {
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
  } = props;

  const [isEditing, setIsEditing] = React.useState(
    Boolean(startWithEditView && !isDisabled),
  );
  const [valueState, setValue] = React.useState<string>(defaultValue || "");
  const [isControlled, value] = useControllableProp(valueProp, valueState);
  const [previousValue, setPreviousValue] = React.useState(value);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onEdit = React.useCallback(() => {
    if (!isDisabled) {
      setIsEditing(true);
    }
  }, [isDisabled]);

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();

      if (selectAllOnFocus) {
        inputRef.current.select();
      }
    }
  }, [isEditing, selectAllOnFocus]);

  const onCancel = React.useCallback(() => {
    setIsEditing(false);
    setValue(previousValue);
    if (value !== previousValue && onChangeProp) {
      onChangeProp(previousValue);
    }
    if (onCancelProp) {
      onCancelProp(previousValue);
    }
  }, [onChangeProp, onCancelProp, value, previousValue]);

  const onSubmit = React.useCallback(() => {
    setIsEditing(false);
    setPreviousValue(value);
    if (onSubmitProp) {
      onSubmitProp(value);
    }
  }, [value, onSubmitProp]);

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (!isControlled) {
        setValue(value);
      }
      if (onChangeProp) {
        onChangeProp(value);
      }
    },
    [onChangeProp, isControlled],
  );

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      const { key } = event;
      if (key === "Escape") return onCancel();
      if (key === "Enter") return onSubmit();
    },
    [onCancel, onSubmit],
  );

  const onFocus = React.useCallback(() => {
    if (selectAllOnFocus && inputRef.current) {
      inputRef.current.select();
    }
  }, [selectAllOnFocus]);

  const isValueEmpty = value == null || value == "";

  return {
    isEditing,
    isDisabled,
    isPreviewFocusable,
    value,
    inputRef,
    submitOnBlur,
    onEdit,
    onCancel,
    onSubmit,
    onChange,
    onKeyDown,
    onFocus,
    placeholder,
    isValueEmpty,
  };
}

////////////////////////////////////////////////////////////////

export interface EditablePreviewProps {
  context: ReturnType<typeof useEditableProvider>;
  onFocus?: React.FocusEventHandler;
}
export function useEditablePreview(props: EditablePreviewProps) {
  const { context, onFocus } = props;

  const {
    isEditing,
    isDisabled,
    value,
    onEdit,
    isPreviewFocusable,
    placeholder,
    isValueEmpty,
  } = context;

  const getTabIndex = () => {
    if ((!isEditing || !isDisabled) && isPreviewFocusable) {
      return 0;
    }
    return undefined;
  };

  return {
    children: isValueEmpty ? placeholder : value,
    hidden: isEditing,
    "aria-disabled": isDisabled,
    tabIndex: getTabIndex(),
    onFocus: composeEventHandlers(onFocus, onEdit),
  };
}

////////////////////////////////////////////////////////////////

export interface EditableInputProps {
  context: ReturnType<typeof useEditableProvider>;
  onChange?: React.ChangeEventHandler;
  onBlur?: React.FocusEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
}

export function useEditableInput(props: EditableInputProps) {
  const {
    context,
    onChange: onChangeProp,
    onBlur,
    onKeyDown: onKeyDownProp,
  } = props;
  const {
    inputRef,
    isEditing,
    onChange,
    onKeyDown,
    value,
    onSubmit,
    placeholder,
    submitOnBlur,
    isDisabled,
  } = context;

  const handleBlur = React.useCallback(() => {
    if (submitOnBlur) {
      onSubmit && onSubmit();
    }
  }, [submitOnBlur, onSubmit]);

  return {
    hidden: !isEditing,
    placeholder,
    ref: inputRef,
    disabled: isDisabled,
    "aria-disabled": isDisabled,
    onBlur: composeEventHandlers(onBlur, handleBlur),
    value,
    onChange: composeEventHandlers(onChangeProp, onChange),
    onKeyDown: composeEventHandlers(onKeyDownProp, onKeyDown),
  };
}
