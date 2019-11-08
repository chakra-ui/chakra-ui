/** @jsx jsx */
import { jsx } from "@emotion/core";
import { createContext, useContext, forwardRef } from "react";
import Box from "../Box";

export const useFormControl = props => {
  const context = useFormControlContext();
  if (!context) {
    return props;
  }
  const keys = Object.keys(context);
  return keys.reduce((acc, prop) => {
    /** Giving precedence to `props` over `context` */
    acc[prop] = props[prop];

    if (context) {
      if (props[prop] == null) {
        acc[prop] = context[prop];
      }
    }

    return acc;
  }, {});
};

const FormControlContext = createContext();

export const useFormControlContext = () => {
  const context = useContext(FormControlContext);
  return context;
};

const FormControl = forwardRef(
  ({ isInvalid, isRequired, isDisabled, isReadOnly, ...rest }, ref) => {
    const context = {
      isRequired,
      isDisabled,
      isInvalid,
      isReadOnly,
    };

    return (
      <FormControlContext.Provider value={context}>
        <Box role="group" ref={ref} {...rest} />
      </FormControlContext.Provider>
    );
  },
);

FormControl.displayName = "FormControl";

export default FormControl;
