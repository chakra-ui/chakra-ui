import css from "@styled-system/css";
import transformProps from "./transform-custom-props";
import { PseudoProps } from "./pseudo-props-interface";
import { replacePseudo } from "./jsx";

const tx = (props: any) => transformProps(replacePseudo(props));

export const selectors = {
  hover: "&:hover, &[data-hover]",
  active: "&:active, &[data-active]",
  focus: "&:focus, &[data-focus]",
  focusVisible: ".js-focus-visible &.focus-visible, &:focus-visible",
  loading: "&[data-loading], &[aria-busy=true]",
  disabled:
    "&:disabled, &[data-disabled], &:disabled:focus, &:disabled:hover, &[aria-disabled=true], &[aria-disabled=true]:focus, &[aria-disabled=true]:hover",
  checked: "&[aria-checked=true], &[data-checked]",
  indeterminate: "&:indeterminate, &[aria-checked=mixed], &[data-mixed]",
  selected: "&[aria-selected=true], &[data-selected]",
  invalid: "&[aria-invalid=true], &[data-invalid]",
  pressed: "&[aria-pressed=true], &[data-pressed]",
  expanded: "&[aria-expanded=true], &[data-expanded]",
  grabbed: "&[aria-grabbed=true], &[data-grabbed]",
  readOnly: "&[aria-readonly=true], &[readonly], &[data-readonly]",
  visited: "&:visited",
  activeLink: "&[aria-current=page]",
  even: "&:nth-of-type(even)",
  odd: "&:nth-of-type(odd)",
  first: "&:first-of-type",
  last: "&:last-of-type",
  notFirst: "&:not(:first-of-type)",
  notLast: "&:not(:last-of-type)",
  groupHover: "[role=group]:hover &, [data-parent]:hover &",
  groupFocus: "[data-parent]:focus &, [data-parent][data-focus] &",
  groupActive: "[data-parent]:active &, [data-parent][data-active] &",
  groupDisabled: "[data-parent]:disabled &, [data-parent][data-disabled] &",
  before: "&:before",
  after: "&:after",
  focusWithin: "&:focus-within",
  placeholder: "&::placeholder",
  hidden: "&[hidden]",
};

const sx = selectors;

const pseudo = ({ theme, ...props }: { theme: object } & PseudoProps) =>
  css({
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
    [sx.indeterminate]: tx(props._indeterminate),
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
  })(theme);

export default pseudo;
