import { composeEventHandlers, createContext, Omit } from "@chakra-ui/utils";
import * as React from "react";
import useControllableProp from "../useControllableProp";
import useIsomorphicEffect from "../useIsomorphicEffect";
import useMergeRefs from "../useMergeRefs";

export interface CheckboxProps {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  isFocusable?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  defaultIsChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string | number;
  id?: string;
  onBlur?: React.FocusEventHandler;
  onFocus?: React.FocusEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  onKeyUp?: React.KeyboardEventHandler;
}

const makeDataAttribute = (cond: boolean | undefined) =>
  cond ? "" : undefined;

function useCheckbox({
  defaultIsChecked,
  isChecked: checkedProp,
  isFocusable,
  isDisabled,
  isReadOnly,
  isRequired,
  onChange,
  isIndeterminate,
  isInvalid,
  name,
  value,
  id,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  ...remaining
}: CheckboxProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isHovered, setIsHovering] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const ref = React.useRef<HTMLInputElement>(null);

  const [checkedState, setCheckedState] = React.useState(
    Boolean(defaultIsChecked),
  );

  const [isControlled, isChecked] = useControllableProp(
    checkedProp,
    checkedState,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly || isDisabled) {
      event.preventDefault();
      return;
    }

    if (!isControlled) {
      if (isChecked) {
        setCheckedState(event.target.checked);
      } else {
        setCheckedState(isIndeterminate ? true : event.target.checked);
      }
    }

    if (onChange) {
      onChange(event);
    }
  };

  useIsomorphicEffect(() => {
    if (!ref.current) return;
    ref.current.indeterminate = Boolean(isIndeterminate);
  }, [isIndeterminate]);

  const trulyDisabled = isDisabled && !isFocusable;

  const handleFocus = React.useCallback(() => setIsFocused(true), []);
  const handleBlur = React.useCallback(() => setIsFocused(false), []);

  const handlePointerEnter = React.useCallback(() => setIsHovering(true), []);
  const handlePointerLeave = React.useCallback(() => setIsHovering(false), []);

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    if (event.key === " ") setIsActive(true);
  }, []);
  const handleKeyUp = React.useCallback((event: React.KeyboardEvent) => {
    if (event.key === " ") setIsActive(false);
  }, []);

  const handlePointerDown = React.useCallback(() => setIsActive(true), []);
  const handlePointerUp = React.useCallback(() => setIsActive(false), []);

  return {
    state: {
      isInvalid,
      isFocused,
      isChecked,
      isActive,
      isHovered,
      isIndeterminate,
      isDisabled,
      isReadOnly,
      isRequired,
    },
    checkbox: {
      "data-active": makeDataAttribute(isActive),
      "data-hover": makeDataAttribute(isHovered),
      "data-checked": makeDataAttribute(isChecked),
      "data-focus": makeDataAttribute(isFocused),
      "data-mixed": makeDataAttribute(isIndeterminate),
      "data-disabled": makeDataAttribute(isDisabled),
      "data-readonly": makeDataAttribute(isReadOnly),
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
    },
    input: {
      ref,
      type: "checkbox",
      name,
      value,
      id,
      onChange: handleChange,
      onBlur: composeEventHandlers(onBlur, handleBlur),
      onFocus: composeEventHandlers(onFocus, handleFocus),
      onKeyDown: composeEventHandlers(onKeyDown, handleKeyDown),
      onKeyUp: composeEventHandlers(onKeyUp, handleKeyUp),
      required: isRequired,
      checked: isChecked,
      disabled: trulyDisabled,
      readOnly: isReadOnly,
      "aria-invalid": isInvalid,
      "aria-disabled": isDisabled,
    },
    remaining,
  };
}

type UseCheckboxReturn = ReturnType<typeof useCheckbox>;

const [CheckboxProvider, useCheckboxContext] = createContext<
  Omit<UseCheckboxReturn, "remaining">
>();

export const useCheckboxState = () => useCheckboxContext()["state"];

////////////////////////////////////////////////////////////////////////////////

type LabelProps = CheckboxProps & React.HTMLAttributes<HTMLLabelElement>;

export const Checkbox = React.forwardRef(
  (props: LabelProps, ref: React.Ref<HTMLLabelElement>) => {
    const { remaining, ...context } = useCheckbox(props);
    return (
      <CheckboxProvider value={context}>
        <label ref={ref} {...remaining} />
      </CheckboxProvider>
    );
  },
);

////////////////////////////////////////////////////////////////////////////////

type InputProps = React.HTMLAttributes<HTMLInputElement>;

const visuallyHiddenStyles: React.CSSProperties = {
  border: "0px",
  clip: "rect(0px, 0px, 0px, 0px)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: "0px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute",
};

export const CheckboxInput = React.forwardRef(
  (props: InputProps, forwardedRef: React.Ref<HTMLInputElement>) => {
    const { input } = useCheckboxContext();
    const ref = useMergeRefs(input.ref, forwardedRef);
    return (
      <input {...props} {...input} ref={ref} style={visuallyHiddenStyles} />
    );
  },
);

////////////////////////////////////////////////////////////////////////////////

interface CustomCheckboxProps {
  onPointerDown?: React.PointerEventHandler;
  onPointerUp?: React.PointerEventHandler;
  onPointerEnter?: React.PointerEventHandler;
  onPointerLeave?: React.PointerEventHandler;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const CustomCheckbox = React.forwardRef(
  (
    {
      onPointerDown,
      onPointerUp,
      onPointerEnter,
      onPointerLeave,
      style,
      ...props
    }: CustomCheckboxProps,
    ref: React.Ref<any>,
  ) => {
    const { checkbox } = useCheckboxContext();
    return (
      <div
        {...props}
        {...checkbox}
        ref={ref}
        style={{ ...style, touchAction: "none" }}
      />
    );
  },
);

export default useCheckbox;
