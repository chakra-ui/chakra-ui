import { SystemProps } from "./system-props-interface";

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
  _after?: SystemProps & { content?: string };
  /**
   * Styles for CSS selector `&:before`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _before={{content:`""` }}/>
   * ```
   */
  _before?: SystemProps & { content?: string };
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
   * Used to style the active link in a navigation
   * Styles for CSS Selector `&[aria-current=page]`
   */
  _activeLink?: SystemProps;
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
  /**
   * Styles for CSS Selector `&[aria-busy=true]` or `&[data-loading=true]`.
   * Useful for styling loading states
   */
  _loading?: SystemProps;
  /**
   * Styles for CSS Selector `[hidden=true]`
   * Useful for styling the hidden state
   */
  _hidden?: SystemProps;
}
