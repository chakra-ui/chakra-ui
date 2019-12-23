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
  activeLink: "&[aria-current=page]",
  even: "&:nth-of-type(even)",
  odd: "&:nth-of-type(odd)",
  first: "&:first-of-type",
  last: "&:last-of-type",
  notFirst: "&:not(:first-of-type)",
  notLast: "&:not(:last-of-type)",
  groupHover: "[role=group]:hover &",
  before: "&:before",
  after: "&:after",
  focusWithin: "&:focus-within",
  placeholder: "&::placeholder",
  hidden: "&[hidden]",
};

const sx = selectors;

const pseudo = (props: any): object => {
  return css({
    [sx.hover]: tx(props._hover),
    [sx.focus]: tx(props._focus),
    [sx.active]: tx(props._active),
    [sx.visited]: tx(props._visited),
    [sx.disabled]: tx(props._disabled),
    [sx.selected]: tx(props._selected),
    [sx.invalid]: tx(props._invalid),
    [sx.expanded]: tx(props._expanded),
    [sx.grabbed]: tx(props._grabbed),
    [sx.readOnly]: tx(props._readOnly),
    [sx.first]: tx(props._first),
    [sx.notFirst]: tx(props._notFirst),
    [sx.notLast]: tx(props._notLast),
    [sx.last]: tx(props._last),
    [sx.odd]: tx(props._odd),
    [sx.even]: tx(props._even),
    [sx.mixed]: tx(props._mixed),
    [sx.checked]: tx(props._checked),
    [sx.pressed]: tx(props._pressed),
    [sx.groupHover]: tx(props._groupHover),
    [sx.loading]: tx(props._loading),
    [sx.activeLink]: tx(props._activeLink),
    [sx.before]: tx(props._before),
    [sx.after]: tx(props._after),
    [sx.focusWithin]: tx(props._focusWithin),
    [sx.placeholder]: props._placeholder,
    [sx.hidden]: props._hidden,
  })(props.theme);
};

export default pseudo;
