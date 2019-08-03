/** @jsx jsx */
import styled from "@emotion/styled";
import css from "@styled-system/css";
import Box from "../Box";
import { tx } from "../Box/config";

// The selectors are based on WAI-ARIA speficiations
const hover = "&:hover";
const active = "&:active";
const focus = "&:focus";
const disabled =
  "&[aria-disabled=true], &:disabled, &:disabled:focus, &:disabled:hover, &:focus[aria-disabled=true], &:hover[aria-disabled=true]";
const checked = "&[aria-checked=true]";
const selected = "&[aria-selected=true]";
const invalid = "&[aria-invalid=true]";
const readOnly = "&[aria-readonly=true], &[readonly]";
const firstChild = "&:first-of-type";
const lastChild = "&:last-of-type";
const expanded = "&[aria-expanded=true]";
const grabbed = "&[aria-grabbed=true]";
const notFirstChild = "&:not(:first-of-type)";
const notLastChild = "&:not(:last-of-type)";

const PseudoBox = styled(Box)(
  ({
    _after,
    _focus,
    _selected,
    _focusWithin,
    _hover,
    _invalid,
    _active,
    _disabled,
    _grabbed,
    _expanded,
    _before,
    _readOnly,
    _firstChild,
    _notFirstChild,
    _notLastChild,
    _lastChild,
    _placeholder,
    _checked,
  }) => {
    return css({
      [hover]: tx(_hover),
      [focus]: tx(_focus),
      [active]: tx(_active),
      [disabled]: tx(_disabled),
      [selected]: tx(_selected),
      [invalid]: tx(_invalid),
      [expanded]: tx(_expanded),
      [grabbed]: tx(_grabbed),
      [readOnly]: tx(_readOnly),
      [firstChild]: tx(_firstChild),
      [notFirstChild]: tx(_notFirstChild),
      [notLastChild]: tx(_notLastChild),
      [lastChild]: tx(_lastChild),
      [checked]: tx(_checked),
      "&:before": tx(_before),
      "&:after": tx(_after),
      "&:focus-within": tx(_focusWithin),
      "&::placeholder": _placeholder,
    });
  },
);

export default PseudoBox;
