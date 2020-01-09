import { createChakra, PropsOf, chakra } from "@chakra-ui/system";
import * as React from "react";
import useCheckbox, { CheckboxProps } from "./Checkbox.hook";

////////////////////////////////////////////////////////////////////////////////

const CustomCheckbox = createChakra("div");
type CustomCheckboxProps = PropsOf<typeof CustomCheckbox> &
  CheckboxProps &
  React.HTMLAttributes<HTMLLabelElement>;

export const Checkbox = React.forwardRef(
  (props: CustomCheckboxProps, ref: React.Ref<HTMLInputElement>) => {
    const { state, input, checkbox, remaining: rest } = useCheckbox(props);
    return (
      <label>
        <input {...input} ref={ref} />
        <CustomCheckbox
          display="inline-block"
          {...checkbox}
          {...rest}
          style={{ touchAction: "none" }}
        >
          {state.isChecked && "✔️"}
          {state.isIndeterminate && "-"}
        </CustomCheckbox>
      </label>
    );
  },
);
