import { SystemProps } from "./Box";
import css from "@styled-system/css";
import { transformAliasProps as tx } from "./config";

const PseudoSelectors = {
  hover: "&:hover",
  active: "&:active, &[data-active=true]",
  focus: "&:focus",
  visited: "&:visited",
  even: "&:nth-of-type(even)",
  odd: "&:nth-of-type(odd)",
  disabled:
    "&:disabled, &:disabled:focus, &:disabled:hover, &[aria-disabled=true], &[aria-disabled=true]:focus, &[aria-disabled=true]:hover",
  checked: "&[aria-checked=true]",
  mixed: "&[aria-checked=mixed]",
  selected: "&[aria-selected=true]",
  invalid: "&[aria-invalid=true]",
  pressed: "&[aria-pressed=true]",
  readOnly: "&[aria-readonly=true], &[readonly]",
  first: "&:first-of-type",
  last: "&:last-of-type",
  expanded: "&[aria-expanded=true]",
  grabbed: "&[aria-grabbed=true]",
  notFirst: "&:not(:first-of-type)",
  notLast: "&:not(:last-of-type)",
  groupHover: "[role=group]:hover &",
};

export interface PseudoProps {
  /**
   * Styles for CSS selector `&:after`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _after={{content:`""` }}/>
   * ```
   */
  _after?: SystemProps;
  /**
   * Styles for CSS selector `&:before`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _before={{content:`""` }}/>
   * ```
   */
  _before?: SystemProps;
  /**
   * Styles for CSS selector `&:focus`
   *
   */
  _focus?: SystemProps;
  /**
   * Styles for CSS selector `&:hover`
   */
  _hover?: SystemProps;
  /**
   * Styles for CSS Selector `&:active`
   */
  _active?: SystemProps;
  /**
   * Styles for CSS Selector `&[aria-pressed=true]`
   * Typically used to style the current "pressed" state of toggle buttons
   */
  _pressed?: SystemProps;
  /**
   * Styles to apply when the ARIA attribute `aria-selected` is `true`
   * - CSS selector `&[aria-selected=true]`
   */
  _selected?: SystemProps;
  /**
   * Styles to apply when a child of this element has received focus
   * - CSS Selector `&:focus-within`
   */
  _focusWithin?: SystemProps;

  /**
   * Styles to apply when the ARIA attribute `aria-invalid` is `true`
   * - CSS selector `&[aria-invalid=true]`
   */
  _invalid?: SystemProps;
  /**
   * Styles to apply when this element is disabled. The passed styles are applied to these CSS selectors:
   * - `&[aria-disabled=true]`
   * - `&:disabled`
   * - `&:disabled:focus`
   * - `&:disabled:hover`
   * - `&:focus[aria-disabled=true]`
   * - `&:hover[aria-disabled=true]`
   */
  _disabled?: SystemProps;
  /**
   * Styles to apply when the ARIA attribute `aria-grabbed` is `true`
   * - CSS selector `&[aria-grabbed=true]`
   */
  _grabbed?: SystemProps;
  /**
   * Styles to apply when the ARIA attribute `aria-expanded` is `true`
   * - CSS selector `&[aria-expanded=true]`
   */
  _expanded?: SystemProps;
  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `true`
   * - CSS selector `&[aria-checked=true]`
   */
  _checked?: SystemProps;
  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `mixed`
   * - CSS selector `&[aria-checked=mixed]`
   */
  _mixed?: SystemProps;
  /**
   * Styles for CSS Selector `&:nth-child(odd)`
   */
  _odd?: SystemProps;
  /**
   * Styles for CSS Selector `&:nth-child(even)`
   */
  _even?: SystemProps;
  /**
   * Styles for CSS Selector `&:visited`
   */
  _visited?: SystemProps;
  /**
   * Styles for CSS Selector `&:readonly`
   */
  _readOnly?: SystemProps;
  /**
   * Styles for CSS Selector `&:first-of-type`
   */
  _first?: SystemProps;
  /**
   * Styles for CSS Selector `&:last-of-type`
   */
  _last?: SystemProps;
  /**
   * Styles to apply when you hover on a parent that has `role=group`.
   */
  _groupHover?: SystemProps;
  /**
   * Styles for CSS Selector `&:not(:first-of-type)`
   */
  _notFirst?: SystemProps;
  /**
   * Styles for CSS Selector `&:not(:last-of-type)`
   */
  _notLast?: SystemProps;
  /**
   * Styles for CSS Selector `&::placeholder`.
   * Useful for inputs
   */
  _placeholder?: SystemProps;
}

export const pseudo = (props: PseudoProps): object =>
  css({
    [PseudoSelectors.hover]: tx(props._hover),
    [PseudoSelectors.focus]: tx(props._focus),
    [PseudoSelectors.active]: tx(props._active),
    [PseudoSelectors.visited]: tx(props._visited),
    [PseudoSelectors.disabled]: tx(props._disabled),
    [PseudoSelectors.selected]: tx(props._selected),
    [PseudoSelectors.invalid]: tx(props._invalid),
    [PseudoSelectors.expanded]: tx(props._expanded),
    [PseudoSelectors.grabbed]: tx(props._grabbed),
    [PseudoSelectors.readOnly]: tx(props._readOnly),
    [PseudoSelectors.first]: tx(props._first),
    [PseudoSelectors.notFirst]: tx(props._notFirst),
    [PseudoSelectors.notLast]: tx(props._notLast),
    [PseudoSelectors.last]: tx(props._last),
    [PseudoSelectors.odd]: tx(props._odd),
    [PseudoSelectors.even]: tx(props._even),
    [PseudoSelectors.mixed]: tx(props._mixed),
    [PseudoSelectors.checked]: tx(props._checked),
    [PseudoSelectors.pressed]: tx(props._pressed),
    [PseudoSelectors.groupHover]: tx(props._groupHover),
    "&:before": tx(props._before),
    "&:after": tx(props._after),
    "&:focus-within": tx(props._focusWithin),
    "&::placeholder": props._placeholder,
  });
