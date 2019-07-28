import { ReactNode, FC, RefAttributes, ForwardRefExoticComponent } from "react";
import { BoxProps } from "../Box";
import { PseudoBoxProps } from "../PseudoBox";

interface IRenderProps {
  isExpanded: boolean;
  isDisabled: boolean;
}

type RenderProp =
  | { children: (props: IRenderProps) => ReactNode }
  | { childern: ReactNode };

interface IAccordion {
  /**
   * If `true`, expands the accordion in the controlled mode.
   */
  isOpen?: boolean;
  /**
   * If `true`, expands the accordion by default.
   */
  defaultIsOpen?: boolean;
  /**
   * The callback fired when the accordion is expanded/collapsed.
   */
  onChange?: () => void;
  /**
   * The content of the accordion.
   * The children must be the `AccordionHeader` and `AccordionPanel` components.
   */
  children: ReactNode;
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

export type AccordionPanelProps = RefAttributes<HTMLDivElement> & BoxProps;

declare const Accordion: FC<AccordionProps>;

export const AccordionHeader: FC<AccordionHeaderProps>;

export const AccordionPanel: ForwardRefExoticComponent<AccordionPanelProps>;

export default Accordion;
