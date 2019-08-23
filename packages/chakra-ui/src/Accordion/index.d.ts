import * as React from "react";
import { BoxProps } from "../Box";
import { PseudoBoxProps } from "../PseudoBox";

interface IRenderProps {
  isExpanded: boolean;
  isDisabled: boolean;
}

type RenderProp =
  | { children: (props: IRenderProps) => React.ReactNode }
  | { childern: React.ReactNode };

interface IAccordion {
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
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * The content of the accordion.
   * The children must be the `AccordionHeader` and `AccordionPanel` components.
   */
  children: React.ReactNode;
}

interface IAccordionHeader {
  /**
   * If `true`, disables the accordion header.
   * Note: Pass `_disabled` prop to style the disabled state.
   */
  isDisabled?: boolean;
}

export type AccordionProps = IAccordion & BoxProps;

export type AccordionHeaderProps = IAccordionHeader &
  PseudoBoxProps &
  RenderProp;

export type AccordionPanelProps = React.RefAttributes<HTMLDivElement> &
  BoxProps;

/**
 * Accordions allow users to expand and collapse sections of content.
 * It composes `Box` component.
 */
declare const Accordion: React.FC<AccordionProps>;

/**
 * AccordionHeader component composes `PseudoBox`, this means you can use
 * the `_expanded`, `_disabled`, `_hover`, etc. props to style them
 */
export const AccordionHeader: React.FC<AccordionHeaderProps>;

/**
 * AccordionPanel component composes `Collapse` to provide the height animation
 */
export const AccordionPanel: React.FC<
  AccordionPanelProps
>;

export default Accordion;
