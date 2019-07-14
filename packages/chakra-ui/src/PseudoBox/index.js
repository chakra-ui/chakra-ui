/** @jsx jsx */
import styled from "@emotion/styled";
import css from "@styled-system/css";
import Box from "../Box";
import { config } from "../Box/styled-system.config";

// The selectors are based on WAI-ARIA speficiations
// It's also a way to get users to embrace accessibility :)
const hover = "&:not([aria-disabled=true]):hover, &:not(:disabled):hover";
const active = "&:not([aria-disabled=true]):active, &:not(:disabled):active";
const focus = "&:focus";
const disabled = "&[aria-disabled=true], &:disabled";
const selected = "&[aria-selected=true]";
const invalid = "&[aria-invalid=true]";
const readOnly = "&[aria-readonly=true], &[readonly]";
const firstChild = "&:first-of-type";
const lastChild = "&:last-of-type";
const expanded = "&[aria-expanded=true]";
const grabbed = "&[aria-grabbed=true]";

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
    _lastChild
  }) => {
    return css({
      [hover]: tx(_hover),
      [focus]: tx(_focus),
      [disabled]: tx(_disabled),
      [active]: tx(_active),
      [selected]: tx(_selected),
      [invalid]: tx(_invalid),
      [selected]: tx(_selected),
      [expanded]: tx(_expanded),
      [grabbed]: tx(_grabbed),
      [readOnly]: tx(_readOnly),
      [firstChild]: tx(_firstChild),
      [lastChild]: tx(_lastChild),
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
