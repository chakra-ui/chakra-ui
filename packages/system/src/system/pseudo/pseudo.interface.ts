import { SystemProps } from "../system-props-interface";

type Nested<T, P = {}> =
  | (T & P)
  | {
      [key: string]: (T & P) | Nested<T, P>;
    }
  | {
      [K in Pseudo]: (T & P) | Nested<T, P>;
    };

type Pseudo = keyof PseudoProps;

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
  _after?: Nested<SystemProps, { content?: string }>;
  /**
   * Styles for CSS selector `&:before`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _before={{content:`""` }}/>
   * ```
   */
  _before?: Nested<SystemProps, { content?: string }>;
  /**
   * Styles for CSS selector `&:focus`
   *
   */
  _focus?: Nested<SystemProps>;
  /**
   * Styles for CSS selector `&:hover`
   */
  _hover?: Nested<SystemProps>;
  /**
   * Styles for CSS Selector `&:active`
   */
  _active?: Nested<SystemProps>;
  /**
   * Styles for CSS Selector `&[aria-pressed=true]`
   * Typically used to style the current "pressed" state of toggle buttons
   */
  _pressed?: Nested<SystemProps>;
  /**
   * Styles to apply when the ARIA attribute `aria-selected` is `true`
   * - CSS selector `&[aria-selected=true]`
   */
  _selected?: Nested<SystemProps>;
  /**
   * Styles to apply when a child of this element has received focus
   * - CSS Selector `&:focus-within`
   */
  _focusWithin?: Nested<SystemProps>;

  /**
   * Styles to apply when the ARIA attribute `aria-invalid` is `true`
   * - CSS selector `&[aria-invalid=true]`
   */
  _invalid?: Nested<SystemProps>;
  /**
   * Styles to apply when this element is disabled. The passed styles are applied to these CSS selectors:
   * - `&[aria-disabled=true]`
   * - `&:disabled`
   * - `&:disabled:focus`
   * - `&:disabled:hover`
   * - `&:focus[aria-disabled=true]`
   * - `&:hover[aria-disabled=true]`
   */
  _disabled?: Nested<SystemProps>;
  /**
   * Styles to apply when the ARIA attribute `aria-grabbed` is `true`
   * - CSS selector `&[aria-grabbed=true]`
   */
  _grabbed?: Nested<SystemProps>;
  /**
   * Styles to apply when the ARIA attribute `aria-expanded` is `true`
   * - CSS selector `&[aria-expanded=true]`
   */
  _expanded?: Nested<SystemProps>;
  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `true`
   * - CSS selector `&[aria-checked=true]`
   */
  _checked?: Nested<SystemProps>;
  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `mixed`
   * - CSS selector `&[aria-checked=mixed]`
   */
  _indeterminate?: Nested<SystemProps>;
  /**
   * Styles for CSS Selector `&:nth-child(odd)`
   */
  _odd?: Nested<SystemProps>;
  /**
   * Styles for CSS Selector `&:nth-child(even)`
   */
  _even?: Nested<SystemProps>;
  /**
   * Styles for CSS Selector `&:visited`
   */
  _visited?: Nested<SystemProps>;
  /**
   * Used to style the active link in a navigation
   * Styles for CSS Selector `&[aria-current=page]`
   */
  _activeLink?: Nested<SystemProps>;
  /**
   * Styles for CSS Selector `&:readonly`
   */
  _readOnly?: Nested<SystemProps>;
  /**
   * Styles for CSS Selector `&:first-of-type`
   */
  _first?: Nested<SystemProps>;
  /**
   * Styles for CSS Selector `&:last-of-type`
   */
  _last?: Nested<SystemProps>;
  /**
   * Styles to apply when you hover on a parent that has `role=group`.
   */
  _groupHover?: Nested<SystemProps>;
  /**
   * Styles for CSS Selector `&:not(:first-of-type)`
   */
  _notFirst?: Nested<SystemProps>;
  /**
   * Styles for CSS Selector `&:not(:last-of-type)`
   */
  _notLast?: Nested<SystemProps>;
  /**
   * Styles for CSS Selector `&::placeholder`.
   * Useful for inputs
   */
  _placeholder?: SystemProps;
  /**
   * Styles for CSS Selector `&[aria-busy=true]` or `&[data-loading=true]`.
   * Useful for styling loading states
   */
  _loading?: Nested<SystemProps>;
  /**
   * Styles for CSS Selector `[hidden=true]`
   * Useful for styling the hidden state
   */
  _hidden?: SystemProps;
  /**
   * Styles for right-to-left.
   * Useful for styling child elements when parent elements or html has `dir=rtl`
   */
  _rtl?: Nested<SystemProps>;
}
