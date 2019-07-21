import styled from "@emotion/styled";
import css from "@styled-system/css";
import Box from "../Box";
import { tx } from "../Box/config";

const InputBox = styled(Box)(
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
    _checkedAndHover
  }) => {
    const checkedAndDisabled = `input[type=${type}]:checked:disabled + &`,
      checkedAndHover = `input[type=${type}]:checked:hover:not(:disabled) + &`,
      checkedAndFocus = `input[type=${type}]:checked:focus + &`,
      disabled = `input[type=${type}]:disabled + &`,
      focus = `input[type=${type}]:focus + &`,
      hover = `input[type=${type}]:hover:not(:disabled):not(:checked) + &`,
      checked = `input[type=${type}]:checked + &`,
      invalid = `input[type=${type}][aria-invalid=true] + &`;

    return css({
      [focus]: tx(_focus),
      [hover]: tx(_hover),
      [disabled]: tx(_disabled),
      [invalid]: tx(_invalid),
      [checkedAndDisabled]: tx(_checkedAndDisabled),
      [checkedAndFocus]: tx(_checkedAndFocus),
      [checkedAndHover]: tx(_checkedAndHover),
      "& > *": tx(_child),
      [checked]: {
        ...tx(_checked),
        "& > *": tx(_checkedAndChild)
      }
    });
  }
);

InputBox.defaultProps = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 120ms",
  flexShrink: "0",
  "aria-hidden": "true"
};

export default InputBox;
