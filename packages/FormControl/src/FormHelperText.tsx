import { chakra, useModeValue } from "@chakra-ui/system";
import * as React from "react";
import { useFormControlContext } from "./FormControl";

export const FormHelperText = React.forwardRef(
  (props: any, ref: React.Ref<any>) => {
    const context = useFormControlContext();
    const color = useModeValue(`gray.500`, `whiteAlpha.600`);

    return (
      <chakra.p
        mt={2}
        ref={ref}
        id={context.id ? `${context.id}-help-text` : undefined}
        color={color}
        lineHeight="normal"
        fontSize="sm"
        {...props}
      />
    );
  },
);

FormHelperText.displayName = "FormHelperText";

export default FormHelperText;
