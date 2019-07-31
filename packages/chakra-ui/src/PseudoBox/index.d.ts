import * as StyledSystem from "styled-system";
import { StyledComponent } from "@emotion/styled";
import { BoxProps } from "../Box";

interface IPseudoBoxProps {
  /**
   * Styles for CSS selector `&:after`
   */
  _after: BoxProps;
  /**
   * Styles for CSS selector `&:after`
   */
  _before: BoxProps;
  /**
   * Styles for CSS selector `&:focus`
   */
  _focus: BoxProps;
  /**
   * Styles for CSS selector `&:hover`
   */
  _hover: BoxProps;
  /**
   * Styles for CSS Selector `&:active`
   */
  _active: BoxProps;
  /**
   * Styles to apply when the ARIA attribute `aria-selected` is `true`
   * - CSS selector `&[aria-selected=true]`
   */
  _selected: BoxProps;
  /**
   * Styles to apply when a child of this element has received focus
   * - CSS Selector `&:focus-within`
   */
  _focusWithin: BoxProps;

  /**
   * Styles to apply when the ARIA attribute `aria-invalid` is `true`
   * - CSS selector `&[aria-invalid=true]`
   */
  _invalid: BoxProps;
  /**
   * Styles to apply when the ARIA attribute `aria-disabled` is `true`
   * - CSS selector `&[aria-disabled=true]`
   */
  _disabled: BoxProps;
  /**
   * Styles to apply when the ARIA attribute `aria-grabbed` is `true`
   * - CSS selector `&[aria-grabbed=true]`
   */
  _grabbed: BoxProps;
  /**
   * Styles to apply when the ARIA attribute `aria-expanded` is `true`
   * - CSS selector `&[aria-expanded=true]`
   */
  _expanded: BoxProps;
  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `true`
   * - CSS selector `&[aria-checked=true]`
   */
  _checked: BoxProps;
  /**
   * Styles for CSS Selector `&:readonly`
   */
  _readOnly: BoxProps;
  /**
   * Styles for CSS Selector `&:first-of-type`
   */
  _firstChild: BoxProps;
  /**
   * Styles for CSS Selector `&:last-of-type`
   */
  _lastChild: BoxProps;
  /**
   * Styles for CSS Selector `&:not(:first-of-type)`
   */
  _notFirstChild: BoxProps;
  /**
   * Styles for CSS Selector `&:not(:last-of-type)`
   */
  _notLastChild: BoxProps;
  /**
   * Styles for CSS Selector `&::placeholder`.
   * Useful for inputs
   */
  _placeholder: BoxProps;
}

export type PseudoBoxProps = IPseudoBoxProps & BoxProps;

/**
 * PseudoBox is an interactive wrapper that composes `Box`
 * to provide props for the common CSS pseudo-selectors for ease of styling
 */
declare const PseudoBox: StyledComponent<PseudoBoxProps, {}, {}>;

export default PseudoBox;
