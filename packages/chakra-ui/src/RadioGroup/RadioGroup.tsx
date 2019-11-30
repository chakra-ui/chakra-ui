/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Box, SystemProps, BoxProps } from "@chakra-ui/layout";
import { useRadioGroup } from "@chakra-ui/hooks";
import { omit, Merge } from "@chakra-ui/utils";
import { RadioOptions } from "../Radio";

export interface RadioGroupOptions {
  id?: string;
  name?: string;
  children?: React.ReactNode;
  defaultValue?: RadioOptions["value"];
  value?: RadioOptions["value"];
  variantColor?: RadioOptions["variantColor"];
  onChange?: (value: RadioOptions["value"]) => void;
  spacing?: SystemProps["margin"];
  isInline?: boolean;
}

export type RadioGroupProps = Merge<BoxProps, RadioGroupOptions>;
type z = RadioGroupProps["onChange"];

const RadioGroup = React.forwardRef(
  (
    {
      variantColor,
      size,
      isInline,
      spacing = 2,
      children,
      ...props
    }: RadioGroupProps,
    ref: React.Ref<any>,
  ) => {
    const rootRef = React.useRef<HTMLElement>(null);
    const radioGroup = useRadioGroup(props);

    const clones = React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return;

      const isLastRadio = React.Children.count(children) === index + 1;
      const spacingProps = isInline ? { mr: spacing } : { mb: spacing };

      return (
        <Box
          display={isInline ? "inline-block" : "block"}
          {...(!isLastRadio && spacingProps)}
        >
          {React.cloneElement(child, {
            size,
            variantColor,
            name: radioGroup.name,
            onChange: () => radioGroup.onChange(child.props.value),
            isChecked: radioGroup.value === child.props.value,
          })}
        </Box>
      );
    });

    // Calling focus() on the radiogroup should focus on the selected option or first enabled option
    React.useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          if (!rootRef.current) return;

          let input = rootRef.current.querySelector(
            "input:not(:disabled):checked",
          );

          if (!input) {
            input = rootRef.current.querySelector(
              "input:not(:disabled), [role=radio]:not([aria-disabled=true])",
            );
          }

          if (input) {
            (input as HTMLInputElement).focus();
          }
        },
      }),
      [],
    );

    const finalProps = omit(props, [
      "defaultValue",
      "value",
      "onChange",
      "name",
    ]);

    return (
      <Box ref={rootRef} role="radiogroup" {...finalProps}>
        {clones}
      </Box>
    );
  },
);

export default RadioGroup;
