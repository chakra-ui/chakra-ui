import * as StyledSystem from "styled-system";
import { StyledComponent } from "@emotion/styled";
import { BoxProps } from "../Box";

export interface PseudoBoxProps extends React.HTMLAttributes<{}>, BoxProps {
  /**
   * Styles for CSS selector `&:after`
   */
  _after: BoxProps;
  /**
   * Styles for CSS selector `&:focus`
   */
  _focus: BoxProps;
  /**
   * Styles to apply when the ARIA attribute `aria-selected` is `true`
   * - CSS selector `&[aria-selected=true]`
   */
  _selected: BoxProps;
  /**
   * Styles to apply when this element has received focus or
   * contains an element that has received focus
   * - CSS Selector `&:focus-within`
   */
  _focusWithin: BoxProps;
  _hover: BoxProps;
  _invalid: BoxProps;
  _active: BoxProps;
  _disabled: BoxProps;
  _grabbed: BoxProps;
  _expanded: BoxProps;
  _before: BoxProps;
  _readOnly: BoxProps;
  _firstChild: BoxProps;
  _notFirstChild: BoxProps;
  _notLastChild: BoxProps;
  _lastChild: BoxProps;
  _placeholder: BoxProps;
  _checked: BoxProps;
}

declare const PseudoBox: StyledComponent<PseudoBoxProps, {}, {}>;

export default PseudoBox;
