import * as React from "react";
import useControllableValue from "../useControllableValue";
import { composeEventHandlers, createContext } from "@chakra-ui/utils";

interface UseEditableOptions {
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
  children: React.ReactNode;
}

export function useEditable(props: UseEditableOptions) {
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
  const [isControlled, value] = useControllableValue(valueProp, valueState);
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
  };
}

////////////////////////////////////////////////////////////////

const [EditableContextProvider, useEditableContext] = createContext<
  ReturnType<typeof useEditable>
>();

export function EditableProvider(props: UseEditableOptions) {
  const editable = useEditable(props);
  const ctx = React.useMemo(() => editable, [editable]);
  return (
    <EditableContextProvider value={ctx}>
      {props.children}
    </EditableContextProvider>
  );
}

////////////////////////////////////////////////////////////////

export function useEditablePreview(props: any) {
  const {
    isEditing,
    isDisabled,
    value,
    onEdit,
    isPreviewFocusable,
    placeholder,
  } = useEditableContext();

  const isValueEmpty = value == null || value == "";

  const getTabIndex = () => {
    if ((!isEditing || !isDisabled) && isPreviewFocusable) {
      return 0;
    }
    return undefined;
  };

  return {
    value,
    placeholder,
    hidden: isEditing,
    isValueEmpty,
    "aria-disabled": isDisabled,
    tabIndex: getTabIndex(),
    onFocus: composeEventHandlers(props.onFocus, onEdit),
  };
}

////////////////////////////////////////////////////////////////

interface UseEditableInput {
  onChange?: React.ChangeEventHandler;
  onBlur?: React.FocusEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
}

export function useEditableInput(props: UseEditableInput = {}) {
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
  } = useEditableContext();

  const onBlur = React.useCallback(() => {
    if (submitOnBlur) onSubmit();
  }, [submitOnBlur, onSubmit]);

  return {
    hidden: !isEditing,
    placeholder,
    ref: inputRef,
    disabled: isDisabled,
    "aria-disabled": isDisabled,
    onBlur: composeEventHandlers(props.onBlur, onBlur),
    value,
    onChange: composeEventHandlers(props.onChange, onChange),
    onKeyDown: composeEventHandlers(props.onKeyDown, onKeyDown),
  };
}

export function useEditableState() {
  const {
    isEditing,
    onSubmit,
    onCancel,
    onEdit,
    isDisabled,
  } = useEditableContext();
  return {
    isEditing,
    onSubmit,
    onCancel,
    onEdit,
    isDisabled,
  };
}
