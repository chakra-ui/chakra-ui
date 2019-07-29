/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import PseudoBox from "../PseudoBox";
import Box from "../Box";

const EditableContext = createContext();

const Editable = ({
  value: valueProp,
  defaultValue,
  isDisabled,
  onChange,
  isEditing: isEditingProp,
  onCancel,
  onSubmit,
  selectAllOnFocus = true,
  submitOnBlur,
  isPreviewFocusable,
  placeholder = "Click to edit...",
  children,
  ...rest
}) => {
  const [isEditing, setIsEditing] = useState(isEditingProp && !isDisabled);
  const { current: isControlled } = useRef(valueProp != null);

  const [value, setValue] = useState(defaultValue || "");
  const _value = isControlled ? valueProp : value;
  const [previousValue, setPreviousValue] = useState(_value);

  const inputRef = useRef(null);

  const onRequestEdit = event => {
    if (!isDisabled) {
      setIsEditing(true);
    }
  };

  useEffect(() => {
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

  const handleChange = event => {
    const { value } = event.target;
    if (!isControlled) {
      setValue(value);
    }
    onChange && onChange(value);
  };

  const handleKeyDown = event => {
    const { key } = event;
    if (key === "Escape") {
      handleCancel();
      return;
    }

    if (key === "Enter") {
      handleSubmit();
    }
  };

  const handleFocus = event => {
    if (selectAllOnFocus) {
      inputRef.current.select();
    }
  };

  const childContext = {
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
    onFocus: handleFocus
  };

  return (
    <EditableContext.Provider value={childContext}>
      <Box {...rest}>
        {typeof children === "function"
          ? children({
              isEditing,
              onSubmit: handleSubmit,
              onCancel: handleCancel,
              onRequestEdit
            })
          : children}
      </Box>
    </EditableContext.Provider>
  );
};

const sharedProps = {
  fontSize: "inherit",
  fontWeight: "inherit",
  textAlign: "inherit",
  bg: "transparent",
  transition: "all 0.2s",
  borderRadius: "md",
  px: "3px",
  mx: "-3px"
};

export const EditablePreview = props => {
  const {
    isEditing,
    isDisabled,
    value,
    onRequestEdit,
    placeholder,
    isPreviewFocusable
  } = useContext(EditableContext);
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
    opacity: !hasValue ? 0.6 : undefined
  };

  if (isEditing) {
    return null;
  }

  return (
    <PseudoBox
      as="span"
      aria-disabled={isDisabled}
      tabIndex={getTabIndex()}
      onFocus={onRequestEdit}
      {...styleProps}
      {...props}
    >
      {hasValue ? value : placeholder}
    </PseudoBox>
  );
};

export const EditableInput = props => {
  const {
    inputRef,
    isEditing,
    onChange,
    onKeyDown,
    value,
    onSubmit,
    submitOnBlur,
    placeholder
  } = useContext(EditableContext);

  const styleProps = {
    ...sharedProps,
    width: "full",
    _placeholder: {
      opacity: "0.6"
    }
  };

  if (!isEditing) {
    return null;
  }

  return (
    <PseudoBox
      as="input"
      ref={inputRef}
      onBlur={() => {
        submitOnBlur && onSubmit();
      }}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      {...styleProps}
      {...props}
    />
  );
};

Editable.propTypes = {
  /** Text value of the controlled input */
  value: propTypes.string,
  /** Default text value of uncontrolled input. */
  defaultValue: propTypes.string,
  /**
   * Whether the text can be edited.
   * @default false
   */
  isDisabled: propTypes.bool,
  /**
   * Whether the component should start with the edit mode active
   * If `true`, the input is shown by default.
   * @default false
   */
  isEditing: propTypes.bool,
  /** Callback invoked when user changes input in any way.  */
  onChange: propTypes.func,
  /** Callback invoked when user cancels input with the `Esc` key. Receives last confirmed value. */
  onCancel: propTypes.func,
  /** Callback invoked when user confirms value with `enter` key or by blurring input. */
  onSubmit: propTypes.func,
  /** Callback invoked after the user enters edit mode. */
  onEdit: propTypes.func,
  /**
   * If `true`, the input's text will be highlighted on focus.
   * @default false
   */
  selectAllOnFocus: propTypes.bool,
  /**
   * Placeholder text when the value is empty.
   * @default "Click to Edit"
   */
  placeholder: propTypes.string,
  /** The content of the Editable
   *  Ideally only `EditablePreview` and `EditableInput` should
   *  be the children (but you add other elements too)
   */
  children: propTypes.node
};

export default Editable;
