import { useBoolean, useId, useIsomorphicEffect } from "@chakra-ui/hooks";
import { PropsOf } from "@chakra-ui/system";
import { createContext, Omit, composeEventHandlers } from "@chakra-ui/utils";
import * as React from "react";

interface ControlProps {
  /**
   * If `true`, the form control will required. This has 2 side effects:
   * - The `FormLabel` will show a required indicator
   * - The form element (e.g, Input) will have `aria-requred` set to `true`
   */
  isRequired?: boolean;
  /**
   * If `true`, the form control will be disabled. This has 2 side effects:
   * - The `FormLabel` will have `data-disabled` attribute
   * - The form element (e.g, Input) will be disabled
   */
  isDisabled?: boolean;
  /**
   * If `true`, the form control will be invalid. This has 2 side effects:
   * - The `FormLabel` and `FormErrorIcon` will have `data-invalid` set to `true`
   * - The form element (e.g, Input) will have `aria-invalid` set to `true`
   */
  isInvalid?: boolean;
  /**
   * If `true`, the form control will be readonly
   */
  isReadOnly?: boolean;
}

interface ProviderProps extends ControlProps {
  /**
   * The label text used to inform users as to what information is
   * requested for a text field.
   */
  label?: string;
  /**
   * The error message to be displayed when `isInvalid` is set to `true`
   */
  errorText?: string;
  /**
   * The assistive text to be displayed that provides additional guidance to users
   */
  helperText?: string;
  /**
   * The custom `id` to use for the form control. This is passed directly to the form element (e.g, Input).
   * - The form element (e.g Input) gets the `id`
   * - The form label id: `form-label-${id}`
   * - The form error text id: `form-error-text-${id}`
   * - The form helper text id: `form-helper-text-${id}`
   */
  id?: string;
}

type FormControlContext = ReturnType<typeof useProvider>;

const [FormControlProvider, useFormControl] = createContext<FormControlContext>(
  false,
);

export { useFormControl };

function useProvider(props: FormControlProps) {
  const { id: idProp, isRequired, isInvalid, isDisabled } = props;

  // Generate all the required ids
  const uuid = useId();
  const id = idProp || `input-${uuid}`;

  const labelId = `${id}-label`;
  const feedbackId = `${id}-feedback`;
  const helpTextId = `${id}-helptext`;

  /**
   * Track of when the `FormHelperText` has been rendered.
   * We use this to append it's id the the `aria-describedby` of the `input`
   */
  const [hasHelpText, setHasHelpText] = React.useState(false);

  // Let's keep track of when we focus the form element (e.g, `input`)
  const [isFocused, onFocus, onBlur] = useBoolean(false);

  const context = {
    isRequired,
    isInvalid,
    isDisabled,
    isFocused,
    onFocus,
    onBlur,
    hasHelpText,
    setHasHelpText,
    id,
    labelId,
    feedbackId,
    helpTextId,
  };

  return context;
}

//////////////////////////////////////////////////////////////////////////////
export type FormControlProps = ProviderProps & PropsOf<"div">;

export const FormControl = React.forwardRef(
  (props: FormControlProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      id,
      isRequired,
      isInvalid,
      isDisabled,
      label,
      errorText,
      helperText,
      ...htmlProps
    } = props;
    const context = useProvider(props);
    return (
      <FormControlProvider value={context}>
        <div role="group" ref={ref} {...htmlProps} />
      </FormControlProvider>
    );
  },
);

//////////////////////////////////////////////////////////////////////////////

export const FormLabel = React.forwardRef<HTMLLabelElement, PropsOf<"label">>(
  (props, ref) => {
    const context = useFormControl();

    return (
      <label
        ref={ref}
        data-focus={context.isFocused ? "" : undefined}
        data-disabled={context.isDisabled ? "" : undefined}
        data-invalid={context.isInvalid ? "" : undefined}
        id={props.id || context.labelId}
        htmlFor={context.id}
        {...props}
      >
        {props.children}
      </label>
    );
  },
);

//////////////////////////////////////////////////////////////////////////////

export const FormRequiredIndicator = React.forwardRef<HTMLSpanElement, {}>(
  (props, ref) => {
    const context = useFormControl();
    if (!context.isRequired) return null;
    return <span aria-hidden ref={ref} {...props} />;
  },
);

//////////////////////////////////////////////////////////////////////////////

export function FormHelpText(props: PropsOf<"div">) {
  const context = useFormControl();

  useIsomorphicEffect(() => {
    context.setHasHelpText(true);
    return () => {
      context.setHasHelpText(false);
    };
  }, []);

  return <div id={context.helpTextId} {...props} />;
}

//////////////////////////////////////////////////////////////////////////////

export function FormErrorText(props: PropsOf<"div">) {
  const context = useFormControl();
  if (!context.isInvalid) return null;
  return <div aria-live="polite" id={context.feedbackId} {...props} />;
}

//////////////////////////////////////////////////////////////////////////////

type FormElementProps<T extends HTMLElement> = ControlProps & {
  id?: string;
  onFocus?: React.FocusEventHandler<T>;
  onBlur?: React.FocusEventHandler<T>;
};

function useFormElement<T extends HTMLElement>(props: FormElementProps<T>) {
  const context = useFormControl();
  const describedBy: string[] = [];

  if (context.isInvalid) describedBy.push(context.feedbackId);
  if (context.hasHelpText) describedBy.push(context.helpTextId);
  const ariaDescribedBy = describedBy.join(" ");

  return {
    id: props.id || context.id,
    disabled: props.isDisabled || context.isDisabled,
    "aria-invalid": props.isInvalid || context.isInvalid,
    "aria-required": props.isRequired || context.isRequired,
    "aria-describedby": ariaDescribedBy,
    onFocus: composeEventHandlers(context.onFocus, props.onFocus),
    onBlur: composeEventHandlers(context.onBlur, props.onBlur),
  };
}

type Omitted = "disabled" | "required" | "readOnly";

type FormInputProps = Omit<PropsOf<"input">, Omitted> & ControlProps;

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (props, ref) => {
    const {
      isDisabled,
      isInvalid,
      isRequired,
      id,
      onFocus,
      onBlur,
      ...htmlProps
    } = props;

    const inputProps = useFormElement<HTMLInputElement>(props);

    return <input ref={ref} {...inputProps} {...htmlProps} />;
  },
);

////////////////////////////////////////////////////////////////////////////

type FormTextareaProps = Omit<PropsOf<"textarea">, Omitted> & ControlProps;

export const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FormTextareaProps
>((props, ref) => {
  const {
    isDisabled,
    isInvalid,
    isRequired,
    id,
    onFocus,
    onBlur,
    ...htmlProps
  } = props;

  const inputProps = useFormElement<HTMLTextAreaElement>(props);

  return <textarea ref={ref} {...inputProps} {...htmlProps} />;
});
