import * as React from "react";
import { createContext } from "@chakra-ui/utils";
import { chakra, PropsOf } from "@chakra-ui/system";

interface FormControlOptions {
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  id?: string;
}

const [FormControlProvider, useFormControlContext] = createContext<
  FormControlOptions
>(true);

export { useFormControlContext };

export function objectKeys<T>(obj: T) {
  return (Object.keys(obj) as unknown) as (keyof T)[];
}

export function useFormControl(props: FormControlOptions) {
  const context = useFormControlContext();

  if (!context) return props;

  const result: FormControlOptions = {};

  objectKeys(props).forEach(prop => {
    //@ts-ignore
    result[prop] = props[prop];

    const inContext = context && context[prop];
    if (inContext) {
      //@ts-ignore
      result[prop] = context[prop];
    }
  });

  return result;
}

export type FormControlProps = FormControlOptions & PropsOf<typeof chakra.div>;

const FormControl = React.forwardRef(
  (props: FormControlProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      isInvalid,
      isRequired,
      isDisabled,
      isReadOnly,
      id,
      ...rest
    } = props;

    const context = {
      id,
      isRequired,
      isDisabled,
      isInvalid,
      isReadOnly,
    };

    return (
      <FormControlProvider value={context}>
        <chakra.div role="group" ref={ref} {...rest} />
      </FormControlProvider>
    );
  },
);

export default FormControl;
