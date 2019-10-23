import * as React from "react";
import { Box, BoxProps } from "../Box";
import { Merge } from "@chakra-ui/utils";

interface EditableOptions {
  /**
   * The value of the Editable in both edit & preview mode
   */
  value?: string;
  /**
   * The initial value of the Editable in both edit & preview mode
   */
  defaultValue?: string;
  /**
   * If `true`, the Editable will be disabled.
   */
  isDisabled?: boolean;
  /**
   * If `true`, the Editable will start with edit mode by default.
   */
  startWithEditView?: boolean;
  /**
   * If `true`, the read only view, has a `tabIndex` set to `0` so it can recieve focus via the keyboard or click.
   */
  isPreviewFocusable?: boolean;
  /**
   * If `true`, it'll update the value onBlur and turn off the edit mode.
   */
  submitOnBlur?: boolean;
  /**
   * Callback invoked when user changes input.
   */
  onChange?: (newValue: string) => void;
  /**
   * Callback invoked when user cancels input with the `Esc` key.
   * It provides the last confirmed value as argument.
   */
  onCancel?: (previousValue: string) => void;
  /**
   * Callback invoked when user confirms value with `enter` key or by blurring input.
   */
  onSubmit?: (newValue: string) => void;
  /**
   * Callback invoked once the user enters edit mode.
   */
  onEdit?: () => void;
  /**
   * If `true`, the input's text will be highlighted on focus.
   */
  selectAllOnFocus?: boolean;
  /**
   * The placeholder text when the value is empty.
   */
  placeholder?: string;
  /**
   * The content of the EditableText
   * Ideally only `EditablePreview` and `EditableInput` should
   * be the children but you add other elements too
   */
  children: React.ReactNode;
}

interface EditableContextValue {
  inputRef?: React.Ref<HTMLInputElement>;
  isEditing?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  onRequestEdit?(): void;
  submitOnBlur?: boolean;
  isPreviewFocusable?: boolean;
  value?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit?(): void;
  onCancel?(): void;
  onFocus?(): void;
}

interface EditableInputRenderProps {
  ref?: EditableContextValue["inputRef"];
  onBlur?: React.FocusEventHandler<HTMLElement>;
  value?: string;
  placeholder?: string;
  onChange?: EditableContextValue["onChange"];
  onKeyDown?: EditableContextValue["onKeyDown"];
}

type EditableProps<P, T> = Merge<BoxProps<P, T>, EditableOptions>;

const EditableContext = React.createContext<EditableContextValue>({});

const Editable = React.forwardRef(function Editable<P, T>(
  {
    value: valueProp,
    defaultValue,
    isDisabled,
    onChange,
    startWithEditView,
    onCancel,
    onSubmit,
    selectAllOnFocus = true,
    submitOnBlur = true,
    isPreviewFocusable = true,
    placeholder = "Click to edit...",
    children,
    ...rest
  }: EditableProps<P, T>,
  ref: React.Ref<T>,
) {
  const [isEditing, setIsEditing] = React.useState<boolean>(
    Boolean(startWithEditView && !isDisabled),
  );
  const { current: isControlled } = React.useRef<boolean>(valueProp != null);

  const [value, setValue] = React.useState<string>(defaultValue || "");
  const _value = isControlled ? valueProp : value;
  const [previousValue, setPreviousValue] = React.useState<string>(
    _value as string,
  );

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onRequestEdit = () => {
    if (!isDisabled) {
      setIsEditing(true);
    }
  };

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      selectAllOnFocus && inputRef.current.select();
    }
  }, [isEditing, selectAllOnFocus]);

  const handleCancel = () => {
    setIsEditing(false);
    setValue(previousValue);
    if (value !== previousValue) {
      onChange && onChange(previousValue);
    }
    onCancel && onCancel(previousValue);
  };

  const handleSubmit = () => {
    setIsEditing(false);
    setPreviousValue(value);
    onSubmit && onSubmit(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!isControlled) {
      setValue(value);
    }
    onChange && onChange(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    if (key === "Escape") {
      handleCancel();
      return;
    }

    if (key === "Enter") {
      handleSubmit();
    }
  };

  const handleFocus = () => {
    if (selectAllOnFocus && inputRef.current) {
      inputRef.current.select();
    }
  };

  const childContext: EditableContextValue = {
    inputRef,
    isEditing,
    isDisabled,
    placeholder,
    onRequestEdit,
    submitOnBlur,
    isPreviewFocusable,
    value: _value,
    onKeyDown: handleKeyDown,
    onChange: handleChange,
    onSubmit: handleSubmit,
    onCancel: handleCancel,
    onFocus: handleFocus,
  };

  return (
    <EditableContext.Provider value={childContext}>
      <Box ref={ref} {...rest}>
        {typeof children === "function"
          ? children({
              isEditing,
              onSubmit: handleSubmit,
              onCancel: handleCancel,
              onRequestEdit,
            })
          : children}
      </Box>
    </EditableContext.Provider>
  );
}) as <P, T>(
  props: EditableProps<P, T>,
) => React.ReactElement<EditableProps<P, T>>;

const sharedProps = {
  fontSize: "inherit",
  fontWeight: "inherit",
  textAlign: "inherit",
  bg: "transparent",
  transition: "all 0.2s",
  borderRadius: "md",
  px: "3px",
  mx: "-3px",
};

function useEditableState() {
  const {
    isEditing,
    onSubmit,
    onCancel,
    onRequestEdit,
    isDisabled,
  } = React.useContext(EditableContext);
  return {
    isEditing,
    onSubmit,
    onCancel,
    onEdit: onRequestEdit,
    isDisabled,
  };
}

const EditablePreview = React.forwardRef(function EditablePreview<P>(
  props: BoxProps<P>,
  ref: React.Ref<HTMLSpanElement>,
) {
  const {
    isEditing,
    isDisabled,
    value,
    onRequestEdit,
    placeholder,
    isPreviewFocusable,
  } = React.useContext(EditableContext);
  const hasValue = value != null && value !== "";

  const getTabIndex = () => {
    if ((!isEditing || !isDisabled) && isPreviewFocusable) {
      return 0;
    }

    return null;
  };

  const styleProps = {
    ...sharedProps,
    cursor: "text",
    display: "inline-block",
    opacity: !hasValue ? 0.6 : undefined,
  };

  if (isEditing) {
    return null;
  }

  return (
    <Box
      ref={ref}
      as="span"
      aria-disabled={isDisabled}
      tabIndex={getTabIndex()}
      onFocus={onRequestEdit}
      {...styleProps}
      {...props}
    >
      {hasValue ? value : placeholder}
    </Box>
  );
}) as React.FC<BoxProps>;

const EditableInput = React.forwardRef(function EditableInput<P>(
  props: BoxProps<P>,
  ref: React.Ref<HTMLInputElement>,
) {
  const {
    inputRef,
    isEditing,
    onChange,
    onKeyDown,
    value,
    onSubmit,
    submitOnBlur,
    placeholder,
    isDisabled,
  } = React.useContext(EditableContext);

  if (!isEditing) {
    return null;
  }

  const styleProps = {
    ...sharedProps,
    width: "full",
    _placeholder: {
      opacity: "0.6",
    },
  };

  const renderProps: EditableInputRenderProps = {
    ref: inputRef,
    onBlur: (event: React.FocusEvent<HTMLElement>) => {
      if (submitOnBlur && onSubmit) {
        onSubmit();
      }
      if (props.onBlur) {
        props.onBlur(event);
      }
    },
    value,
    placeholder,
    onChange,
    onKeyDown,
  };

  return typeof props.children === "function" ? (
    props.children(renderProps)
  ) : (
    <Box
      ref={ref}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      as="input"
      outline="none"
      _focus={{ shadow: "outline" }}
      {...renderProps}
      {...styleProps}
      {...props}
    />
  );
}) as React.FC<BoxProps>;

export { EditablePreview, Editable, EditableInput, useEditableState };
