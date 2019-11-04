import styled from "@emotion/styled";
import css from "@styled-system/css";
import Box from "../Box";
import { transformAliasProps } from "../Box/config";

const ControlBox = styled(Box)(
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
  }) => {
    const checkedAndDisabled = `input[type=${type}]:checked:disabled + &, input[type=${type}][aria-checked=mixed]:disabled + &`,
      checkedAndHover = `input[type=${type}]:checked:hover:not(:disabled) + &, input[type=${type}][aria-checked=mixed]:hover:not(:disabled) + &`,
      checkedAndFocus = `input[type=${type}]:checked:focus + &, input[type=${type}][aria-checked=mixed]:focus + &`,
      disabled = `input[type=${type}]:disabled + &`,
      focus = `input[type=${type}]:focus + &`,
      hover = `input[type=${type}]:hover:not(:disabled):not(:checked) + &`,
      checked = `input[type=${type}]:checked + &, input[type=${type}][aria-checked=mixed] + &`,
      invalid = `input[type=${type}][aria-invalid=true] + &`;

    return css({
      [focus]: transformAliasProps(_focus),
      [hover]: transformAliasProps(_hover),
      [disabled]: transformAliasProps(_disabled),
      [invalid]: transformAliasProps(_invalid),
      [checkedAndDisabled]: transformAliasProps(_checkedAndDisabled),
      [checkedAndFocus]: transformAliasProps(_checkedAndFocus),
      [checkedAndHover]: transformAliasProps(_checkedAndHover),
      "& > *": transformAliasProps(_child),
      [checked]: {
        ...transformAliasProps(_checked),
        "& > *": transformAliasProps(_checkedAndChild),
      },
    });
  },
);

ControlBox.defaultProps = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 120ms",
  flexShrink: "0",
  "aria-hidden": "true",
};

export default ControlBox;
