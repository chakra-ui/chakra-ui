import * as StyledSystem from "styled-system";
import { BoxProps } from "../Box";

interface IPseudoBoxProps {
  /**
   * Styles for CSS selector `&:after`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <PseudoBox _after={{content:`""` }}/>
   * ```
   */
  _after?: BoxProps & {
    content: string;
  };
  /**
   * Styles for CSS selector `&:before`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <PseudoBox _before={{content:`""` }}/>
   * ```
   */
  _before?: BoxProps & {
    content: string;
  };
  /**
   * Styles for CSS selector `&:focus`
   *
   */
  _focus?: BoxProps;
  /**
   * Styles for CSS selector `&:hover`
   */
  _hover?: BoxProps;
  /**
   * Styles for CSS Selector `&:active`
   */
  _active?: BoxProps;
  /**
   * Styles for CSS Selector `&[aria-pressed=true]`
   * Typically used to style the current "pressed" state of toggle buttons
   */
  _pressed?: BoxProps;
  /**
   * Styles to apply when the ARIA attribute `aria-selected` is `true`
   * - CSS selector `&[aria-selected=true]`
   */
  _selected?: BoxProps;
  /**
   * Styles to apply when a child of this element has received focus
   * - CSS Selector `&:focus-within`
   */
  _focusWithin?: BoxProps;

  /**
   * Styles to apply when the ARIA attribute `aria-invalid` is `true`
   * - CSS selector `&[aria-invalid=true]`
   */
  _invalid?: BoxProps;
  /**
   * Styles to apply when this element is disabled. The passed styles are applied to these CSS selectors:
   * - `&[aria-disabled=true]`
   * - `&:disabled`
   * - `&:disabled:focus`
   * - `&:disabled:hover`
   * - `&:focus[aria-disabled=true]`
   * - `&:hover[aria-disabled=true]`
   */
  _disabled?: BoxProps;
  /**
   * Styles to apply when the ARIA attribute `aria-grabbed` is `true`
   * - CSS selector `&[aria-grabbed=true]`
   */
  _grabbed?: BoxProps;
  /**
   * Styles to apply when the ARIA attribute `aria-expanded` is `true`
   * - CSS selector `&[aria-expanded=true]`
   */
  _expanded?: BoxProps;
  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `true`
   * - CSS selector `&[aria-checked=true]`
   */
  _checked?: BoxProps;
  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `mixed`
   * - CSS selector `&[aria-checked=mixed]`
   */
  _mixed?: BoxProps;
  /**
   * Styles for CSS Selector `&:nth-child(odd)`
   */
  _odd?: BoxProps;
  /**
   * Styles for CSS Selector `&:nth-child(even)`
   */
  _even?: BoxProps;
  /**
   * Styles for CSS Selector `&:visited`
   */
  _visited?: BoxProps;
  /**
   * Styles for CSS Selector `&:readonly`
   */
  _readOnly?: BoxProps;
  /**
   * Styles for CSS Selector `&:first-of-type`
   */
  _first?: BoxProps;
  /**
   * Styles for CSS Selector `&:last-of-type`
   */
  _last?: BoxProps;
  /**
   * Styles to apply when you hover on a parent that has `role=group`.
   */
  _groupHover?: BoxProps;
  /**
   * Styles for CSS Selector `&:not(:first-of-type)`
   */
  _notFirst?: BoxProps;
  /**
   * Styles for CSS Selector `&:not(:last-of-type)`
   */
  _notLast?: BoxProps;
  /**
   * Styles for CSS Selector `&::placeholder`.
   * Useful for inputs
   */
  _placeholder?: BoxProps;
}

export type PseudoBoxProps = IPseudoBoxProps & BoxProps;

/**
 * PseudoBox is an interactive wrapper that composes `Box`
 * and converts common CSS pseudo-selectors to props for ease of styling.
 *
 * For example, to style `:hover` use `_hover`
 *
 * @example
 * ```jsx
 * <PseudoBox _hover={...} _focus={...}/>
 * ```
 */
declare const PseudoBox: React.FC<PseudoBoxProps>;

export default PseudoBox;
