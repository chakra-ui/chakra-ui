import * as React from "react";
import { BoxProps } from "../Box";
import { PseudoBoxProps } from "../PseudoBox";
import { CollapseProps } from "../Collapse";

type NumberOrArrayOfNumber = number | number[];

interface IAccordion {
  /**
   * If `true`, multiple accordion items can be expanded at once.
   */
  allowMultiple?: boolean;
  /**
   * If `true`, any expanded accordion item can be collapsed again.
   */
  allowToggle?: boolean;
  /**
   * The index(es) of the expanded accordion item
   */
  index?: NumberOrArrayOfNumber;
  /**
   * The initial index(es) of the expanded accordion item
   */
  defaultIndex?: NumberOrArrayOfNumber;
  /**
   * The callback invoked when accordion items are expanded or collapsed.
   */
  onChange?: (expandedIndex?: NumberOrArrayOfNumber) => void;
  /**
   * The content of the accordion. Must be `AccordionItem`
   */
  children: React.ReactNode;
}

type AccordionProps = IAccordion & BoxProps;

/**
 * The accordion component delivers large amounts of content in a small space through progressive disclosure.
 *
 * By default, only one item may be expanded and it can only be collapsed again by expanding another.
 */
export const Accordion: React.FC<AccordionProps>;

/////////////////////////////////////////////////////////////

interface IAccordionItemRenderProps {
  isExpanded: boolean;
  isDisabled: boolean;
}

/**
 * The content of the accordion.
 * The children must be the `AccordionHeader` and `AccordionPanel` components.
 */
type AccordionItemChildren =
  | { children: (props: IAccordionItemRenderProps) => React.ReactNode }
  | { children: React.ReactNode };

interface IAccordionItem {
  /**
   * If `true`, expands the accordion in the controlled mode.
   */
  isOpen?: boolean;
  /**
   * If `true`, expands the accordion by on initial mount.
   */
  defaultIsOpen?: boolean;
  /**
   * The callback fired when the accordion is expanded/collapsed.
   */
  onChange?: (isOpen: boolean) => void;
}

export type AccordionItemProps = IAccordionItem &
  AccordionItemChildren &
  BoxProps;

/**
 * Accordions allow users to expand and collapse sections of content.
 * It composes `Box` component.
 */
export const AccordionItem: React.FC<AccordionItemProps>;

/////////////////////////////////////////////////////////////

interface IAccordionHeader {
  /**
   * If `true`, disables the accordion header.
   * Note: Pass `_disabled` prop to style the disabled state.
   */
  isDisabled?: boolean;
}

export type AccordionHeaderProps = IAccordionHeader & PseudoBoxProps;

/**
 * AccordionHeader component composes `PseudoBox`, this means you can use
 * the `_expanded`, `_disabled`, `_hover`, etc. props to style them
 */
export const AccordionHeader: React.FC<AccordionHeaderProps>;

/////////////////////////////////////////////////////////////

/**
 * AccordionPanel component composes `Collapse` to provide the height animation
 */
export const AccordionPanel: React.FC<CollapseProps>;
