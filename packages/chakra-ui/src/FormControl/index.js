/** @jsx jsx */
import { jsx } from "@emotion/core";
import { createContext, useContext } from "react";
import Box from "../Box";

export const useFormControl = props => {
  const context = useFormControlContext();
  if (!context) {
    return props;
  }
  const keys = Object.keys(context);
  return keys.reduce((acc, prop) => {
    acc[prop] = props[prop];

    if (context) {
      /** Giving precedence to `props` over `context` */
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

const FormControl = ({
  isInvalid,
  isRequired,
  isDisabled,
  isReadOnly,
  ...rest
}) => {
  const context = {
    isRequired,
    isDisabled,
    isInvalid,
    isReadOnly,
  };

  return (
    <FormControlContext.Provider value={context}>
      <Box {...rest} />
    </FormControlContext.Provider>
  );
};

export default FormControl;
