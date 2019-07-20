import styled from "@emotion/styled";
import css from "@styled-system/css";
import Box from "../Box";
import { tx } from "../Box/styled-system.config";

const InputBox = styled(Box)(
  ({
    type = "checkbox",
    _hover,
    _invalid,
    _disabled,
    _focus,
    _checked,
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
      invalid = `input[type=${type}]:invalid + &`;

    return css({
      [focus]: tx(_focus),
      [hover]: tx(_hover),
      [disabled]: {
        ...tx(_disabled),
        "& ~ *": {
          ...tx(_disabled)
        }
      },
      [invalid]: tx(_invalid),
      [checkedAndDisabled]: tx(_checkedAndDisabled),
      [checkedAndFocus]: tx(_checkedAndFocus),
      [checkedAndHover]: tx(_checkedAndHover),
      "& > *": {
        opacity: 0
      },
      [checked]: {
        ...tx(_checked),
        "& > *": {
          opacity: 1
        }
      }
    });
  }
);

InputBox.defaultProps = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 120ms",
  cursor: "pointer",
  flexShrink: "0",
  "aria-hidden": "true"
};

export default InputBox;
