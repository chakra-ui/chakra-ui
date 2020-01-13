import { createChakra, PropsOf, chakra, SystemProps } from "@chakra-ui/system";
import * as React from "react";
import { useCheckbox, CheckboxProps } from "./Checkbox.hook";
import { SafeMerge, Omit } from "@chakra-ui/utils";

////////////////////////////////////////////////////////////////////////////////

const CustomCheckbox = createChakra("div", {
  baseStyle: {
    _hover: { borderColor: "gray.200", bg: "gray.50" },
    _focus: { shadow: "outline" },
    _checked: {
      bg: "green.500",
      color: "white",
      _hover: { bg: "green.600" },
      _focus: { bg: "tomato" },
    },
    transition: "all 0.2s",
    rounded: "md",
    size: "24px",
    border: "1px solid",
    borderColor: "gray.100",
  },
});

type CustomCheckboxProps = SystemProps &
  Omit<PropsOf<"input">, "size"> &
  CheckboxProps;

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
