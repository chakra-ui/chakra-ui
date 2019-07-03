/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import propTypes from "prop-types";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Box } from "../Layout";
import { useUIMode } from "../theme";

const EditableContext = createContext();

const EditableText = ({
  value: controlledValue,
  defaultValue,
  isDisabled,
  onChange,
  isEditing: IsEditing,
  onEdit,
  onCancel,
  onSubmit,
  selectAllOnFocus,
  placeholder = "Click to edit...",
  children,
  ...rest
}) => {
  const [isEditing, setIsEditing] = useState(IsEditing && !isDisabled);
  const { current: isControlled } = useRef(controlledValue != null);

  const [value, setValue] = useState(defaultValue || "");
  const derivedValue = isControlled ? controlledValue : value;
  const [previousValue, setPreviousValue] = useState(derivedValue);

  const inputRef = useRef(null);

  const { mode } = useUIMode();

  const handleFocus = event => {
    if (!isDisabled) {
      setIsEditing(true);
    }
  };

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

  useEffect(() => {
    if (isEditing) {
      inputRef.current && inputRef.current.focus();

      if (selectAllOnFocus) {
        const { length } = inputRef.current.value;
        inputRef.current.setSelectionRange(0, length);
      }
    }

    onEdit && onEdit(isEditing, derivedValue);
  }, [isEditing, selectAllOnFocus, derivedValue, onEdit]);

  const childContext = {
    ref: inputRef,
    isEditing,
    isDisabled,
    placeholder,
    onFocus: handleFocus,
    onBlur: handleSubmit,
    value: derivedValue,
    onKeyDown: handleKeyDown,
    onChange: handleChange
  };

  return (
    <Box color={mode === "dark" ? "alpha.900" : rest.color} {...rest}>
      <EditableContext.Provider value={childContext}>
        {children}
      </EditableContext.Provider>
    </Box>
  );
};

const sharedStyle = css`
  font-size: inherit;
  font-weight: inherit;
  text-align: inherit;
  background: transparent;
  transition: all 0.2s;
  border-radius: 3px;
  padding: 0 3px;
  margin: 0px -3px;
`;

export const EditablePreview = props => {
  const { isEditing, isDisabled, value, onFocus, placeholder } = useContext(
    EditableContext
  );
  const tabIndex = isEditing || isDisabled ? null : 0;
  const hasValue = value != null && value !== "";

  const style = css`
    ${sharedStyle}
    cursor: text;
    display: inline-block;
    ${!hasValue &&
      css`
        opacity: 0.6;
      `}
  `;

  if (isEditing) {
    return null;
  }

  return (
    <Box
      as="span"
      css={style}
      data-disabled={isDisabled}
      {...props}
      tabIndex={tabIndex}
      onFocus={onFocus}
    >
      {hasValue ? value : placeholder}
    </Box>
  );
};

export const EditableInput = props => {
  const {
    ref,
    isEditing,
    onChange,
    onKeyDown,
    value,
    onBlur,
    placeholder
  } = useContext(EditableContext);

  const style = css`
    ${sharedStyle};
    width: 100%;
    ::placeholder {
      opacity: 0.6;
    }
  `;

  if (!isEditing) {
    return null;
  }

  return (
    <Box
      as="input"
      ref={ref}
      css={style}
      {...props}
      onBlur={onBlur}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

EditableText.propTypes = {
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
  /** The content of the EditableText
   *  Ideally only `EditablePreview` and `EditableInput` should
   *  be the children (but you add other elements too)
   */
  children: propTypes.node
};

export default EditableText;
