/**@jsx jsx */
import styled from "@emotion/styled";
import { Box, SystemProps, css, BoxProps } from "@chakra-ui/layout";
import { Merge } from "@chakra-ui/utils";

interface ControlBoxOptions {
  type?: "checkbox" | "radio";
  _hover?: SystemProps;
  _invalid?: SystemProps;
  _disabled?: SystemProps;
  _focus?: SystemProps;
  _checked?: SystemProps;
  _child?: SystemProps;
  _checkedAndChild?: SystemProps;
  _checkedAndDisabled?: SystemProps;
  _checkedAndFocus?: SystemProps;
  _checkedAndHover?: SystemProps;
}

export type ControlBoxProps = Merge<BoxProps, ControlBoxOptions>;

const ControlBox = (styled(Box)(
  ({
    type = "checkbox",
    _hover,
    _invalid,
    _disabled,
    _focus,
    _checked,
    _child = { opacity: 0 },
    _checkedAndChild = { opacity: 1 },
    _checkedAndDisabled,
    _checkedAndFocus,
    _checkedAndHover,
  }: ControlBoxOptions) => {
    const checkedAndDisabled = `input[type=${type}]:checked:disabled + &, input[type=${type}][aria-checked=mixed]:disabled + &`,
      checkedAndHover = `input[type=${type}]:checked:hover:not(:disabled) + &, input[type=${type}][aria-checked=mixed]:hover:not(:disabled) + &`,
      checkedAndFocus = `input[type=${type}]:checked:focus + &, input[type=${type}][aria-checked=mixed]:focus + &`,
      disabled = `input[type=${type}]:disabled + &`,
      focus = `input[type=${type}]:focus + &`,
      hover = `input[type=${type}]:hover:not(:disabled):not(:checked) + &`,
      checked = `input[type=${type}]:checked + &, input[type=${type}][aria-checked=mixed] + &`,
      invalid = `input[type=${type}][aria-invalid=true] + &`;

    return css({
      [focus]: _focus,
      [hover]: _hover,
      [disabled]: _disabled,
      [invalid]: _invalid,
      [checkedAndDisabled]: _checkedAndDisabled,
      [checkedAndFocus]: _checkedAndFocus,
      [checkedAndHover]: _checkedAndHover,
      "& > *": _child,
      [checked]: {
        ..._checked,
        "& > *": _checkedAndChild,
      },
    });
  },
) as unknown) as React.FC<ControlBoxProps>;

//@ts-ignore
ControlBox.defaultProps = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 120ms",
  flexShrink: 0,
  "aria-hidden": "true",
};

export default ControlBox;
