/** @jsx jsx */
import styled from "@emotion/styled";
import css from "@styled-system/css";
import Box from "../Box";
import { config } from "../Box/styled-system.config";

/**
 * PseudoBox is an interactive wrapper that composes `Box`
 * to provide props for the common pseudo-selectors for ease of styling
 */

// The selectors are based on WAI-ARIA speficiations
const hover = "&:hover:not([aria-disabled=true]):not(:focus)";
const active = "&:active:not([aria-disabled=true])";
const focus = "&:focus";
const disabled = "&[aria-disabled=true]";
const selected = "&[aria-selected=true]";
const invalid = "&[aria-invalid=true]";
const readOnly = "&[aria-readonly=true], &[readonly]";
const firstChild = "&:first-of-type";
const lastChild = "&:last-of-type";
const expanded = "&[aria-expanded=true]";
const grabbed = "&[aria-grabbed=true]";
const placeholder = "&::placeholder";

const PseudoBox = styled(Box)(
  ({
    _after,
    _before,
    _focus,
    _selected,
    _focusWithin,
    _hover,
    _invalid,
    _active,
    _disabled,
    _grabbed,
    _expanded,
    _readOnly,
    _firstChild,
    _lastChild,
    _placeholder
  }) => {
    return css({
      [disabled]: tx(_disabled),
      [focus]: tx(_focus),
      [hover]: tx(_hover),
      [active]: tx(_active),
      [selected]: tx(_selected),
      [invalid]: tx(_invalid),
      [selected]: tx(_selected),
      [expanded]: tx(_expanded),
      [grabbed]: tx(_grabbed),
      [readOnly]: tx(_readOnly),
      [firstChild]: tx(_firstChild),
      [lastChild]: tx(_lastChild),
      [placeholder]: tx(_placeholder),
      "&:before": tx(_before),
      "&:after": tx(_after),
      "&:focus-within": tx(_focusWithin)
    });
  }
);

// Create an issue on @styled-system/css to allow custom alias to be passed to the `css` function
// In the meantime, let's transform the custom alias
const transformAlias = (prop, propValue) => {
  const configKeys = Object.keys(config);
  let result = {};

  if (configKeys.includes(prop)) {
    const { properties, property } = config[prop];
    if (properties) {
      properties.forEach(_cssProp => (result[_cssProp] = propValue));
    }
    if (property) {
      result[property] = propValue;
    }
  } else {
    result[prop] = propValue;
  }
  return result;
};

const tx = props => {
  let result = {};
  for (let prop in props) {
    let _propValue = props[prop];
    result = { ...result, ...transformAlias(prop, _propValue) };
  }
  return result;
};

export default PseudoBox;
