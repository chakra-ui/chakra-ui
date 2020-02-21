import { PropsOf } from "@chakra-ui/system";
import { Omit } from "@chakra-ui/utils";
import { createContext } from "@chakra-ui/utils/src";
import * as React from "react";
import {
  AccordionHookProps,
  AccordionItemHookProps,
  useAccordion,
  useAccordionItem,
  useAccordionItemButton,
  useAccordionItemPanel,
} from "./Accordion.hook";

type AccordionContext = Omit<ReturnType<typeof useAccordion>, "children">;
const [AccordionProvider, useAccordionContext] = createContext<
  AccordionContext
>();

export function BaseAccordion({
  children,
  defaultIndex,
  ...props
}: AccordionHookProps & PropsOf<"div">) {
  const { children: enhancedChildren, ...context } = useAccordion({
    children,
    defaultIndex,
  });
  return (
    <AccordionProvider value={context}>
      <div data-chakra-accordion="" {...props} children={enhancedChildren} />
    </AccordionProvider>
  );
}

const [AccordionItemProvider, useAccordionItemContext] = createContext<
  ReturnType<typeof useAccordionItem>
>();

export function useAccordionItemState() {
  const { isOpen, isDisabled, onClose } = useAccordionItemContext();
  return { isOpen, isDisabled, onClose };
}

export function BaseAccordionItem(
  props: PropsOf<"div"> & AccordionItemHookProps,
) {
  const {
    isFocusable,
    isDisabled,
    onChange,
    isOpen,
    defaultIsOpen,
    ...htmlProps
  } = props;

  const context = useAccordionContext();

  const itemContext = useAccordionItem({
    context,
    isFocusable,
    isDisabled,
    onChange,
  });

  return (
    <AccordionItemProvider value={itemContext}>
      <div data-chakra-accordion-item="" {...htmlProps} />
    </AccordionItemProvider>
  );
}

export function BaseAccordionButton(props: PropsOf<"button">) {
  const context = useAccordionItemContext();
  const buttonProps = useAccordionItemButton({ context });
  return <button data-chakra-accordion-button="" {...props} {...buttonProps} />;
}

export function BaseAccordionPanel(props: PropsOf<"div">) {
  const context = useAccordionItemContext();
  const panelProps = useAccordionItemPanel({ context });
  return <div data-chakra-accordion-panel="" {...props} {...panelProps} />;
}
