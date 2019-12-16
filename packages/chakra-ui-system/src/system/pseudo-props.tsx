import css from "@styled-system/css";
import tx from "./transform-custom-props";

export const selectors = {
  hover: "&:hover, &[data-hover=true]",
  active: "&:active, &[data-active=true]",
  focus: "&:focus, &[data-focus=true]",
  loading: "&[data-loading=true], &[aria-busy=true]",
  disabled:
    "&:disabled, &[data-disabled=true], &:disabled:focus, &:disabled:hover, &[aria-disabled=true], &[aria-disabled=true]:focus, &[aria-disabled=true]:hover",
  checked: "&[aria-checked=true], &[data-checked=true]",
  mixed: "&[aria-checked=mixed], &[data-mixed=true]",
  selected: "&[aria-selected=true], &[data-selected=true]",
  invalid: "&[aria-invalid=true], &[data-invalid=true]",
  pressed: "&[aria-pressed=true], &[data-pressed=true]",
  expanded: "&[aria-expanded=true], &[data-expanded=true]",
  grabbed: "&[aria-grabbed=true], &[data-grabbed=true]",
  readOnly: "&[aria-readonly=true], &[readonly], &[data-readonly=true]",
  visited: "&:visited",
  even: "&:nth-of-type(even)",
  odd: "&:nth-of-type(odd)",
  first: "&:first-of-type",
  last: "&:last-of-type",
  notFirst: "&:not(:first-of-type)",
  notLast: "&:not(:last-of-type)",
  groupHover: "[role=group]:hover &",
};

const pseudo = (props: any): object => {
  return css({
    [selectors.hover]: tx(props._hover),
    [selectors.focus]: tx(props._focus),
    [selectors.active]: tx(props._active),
    [selectors.visited]: tx(props._visited),
    [selectors.disabled]: tx(props._disabled),
    [selectors.selected]: tx(props._selected),
    [selectors.invalid]: tx(props._invalid),
    [selectors.expanded]: tx(props._expanded),
    [selectors.grabbed]: tx(props._grabbed),
    [selectors.readOnly]: tx(props._readOnly),
    [selectors.first]: tx(props._first),
    [selectors.notFirst]: tx(props._notFirst),
    [selectors.notLast]: tx(props._notLast),
    [selectors.last]: tx(props._last),
    [selectors.odd]: tx(props._odd),
    [selectors.even]: tx(props._even),
    [selectors.mixed]: tx(props._mixed),
    [selectors.checked]: tx(props._checked),
    [selectors.pressed]: tx(props._pressed),
    [selectors.groupHover]: tx(props._groupHover),
    [selectors.loading]: tx(props._loading),
    "&:before": tx(props._before),
    "&:after": tx(props._after),
    "&:focus-within": tx(props._focusWithin),
    "&::placeholder": props._placeholder,
  })(props.theme);
};

export default pseudo;
