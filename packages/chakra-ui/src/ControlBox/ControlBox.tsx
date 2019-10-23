/**@jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { css } from "../Css";
import { Box, BoxProps, SystemProps } from "../Box";

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

type ControlBoxProps<P, T> = BoxProps<P, T> & ControlBoxOptions;

const ControlBox = React.forwardRef(function ControlBox<P, T = HTMLElement>(
  props: ControlBoxProps<P, T>,
  ref: React.Ref<T>,
) {
  const checkedAndDisabled = `input[type=${props.type}]:checked:disabled + &, input[type=${props.type}][data-indeterminate=true]:disabled + &`,
    checkedAndHover = `input[type=${props.type}]:checked:hover:not(:disabled) + &, input[type=${props.type}][data-indeterminate=true]:hover:not(:disabled) + &`,
    checkedAndFocus = `input[type=${props.type}]:checked:focus + &, input[type=${props.type}][data-indeterminate=true]:focus + &`,
    disabled = `input[type=${props.type}]:disabled + &`,
    focus = `input[type=${props.type}]:focus + &`,
    hover = `input[type=${props.type}]:hover:not(:disabled):not(:checked) + &`,
    checked = `input[type=${props.type}]:checked + &, input[type=${props.type}][data-indeterminate=true] + &`,
    invalid = `input[type=${props.type}][aria-invalid=true] + &`;

  return (
    <Box
      ref={ref}
      css={css({
        [focus]: props._focus,
        [hover]: props._hover,
        [disabled]: props._disabled,
        [invalid]: props._invalid,
        [checkedAndDisabled]: props._checkedAndDisabled,
        [checkedAndFocus]: props._checkedAndFocus,
        [checkedAndHover]: props._checkedAndHover,
        "& > *": props._child,
        [checked]: {
          ...props._checked,
          "& > *": props._checkedAndChild,
        },
      })}
    />
  );
}) as <P, T = HTMLElement>(
  props: ControlBoxProps<P, T>,
) => React.ReactElement<ControlBoxProps<P, T>>;

export default ControlBox;
