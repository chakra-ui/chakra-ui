import * as React from "react";
import {
  Accordion,
  AccordionItemProvider,
  useAccordionButton,
  useAccordionPanel,
  AccordionItemProviderProps,
} from "@chakra-ui/hooks";
import { createChakra, chakra, PropsOf } from "@chakra-ui/system";
import { Omit } from "@chakra-ui/utils";

const AccordionButton = createChakra("button", {
  hook: useAccordionButton,
  themeKey: "AccordionButton",
});

AccordionButton.defaultProps = {
  sx: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    transition: "all 0.2s",
    _focus: { boxShadow: "outline" },
    _hover: { bg: "blackAlpha.50" },
    _disabled: { opacity: 0.4, cursor: "not-allowed" },
    outline: 0,
    paddingX: 4,
    paddingY: 2,
  },
};

const AccordionPanel = createChakra("div", {
  hook: useAccordionPanel,
  themeKey: "AccordionPanel",
  dataAttr: "accordion-panel",
});

AccordionPanel.defaultProps = {
  paddingTop: 2,
  paddingX: 4,
  paddingBottom: 5,
};

export type AccordionItemProps = AccordionItemProviderProps &
  Omit<PropsOf<typeof chakra.div>, "onChange">;

const AccordionItem = React.forwardRef(
  (
    {
      isOpen,
      defaultIsOpen,
      isDisabled,
      isFocusable,
      id,
      onChange,
      ...props
    }: AccordionItemProps,
    ref: React.Ref<any>,
  ) => (
    <AccordionItemProvider
      {...{ isOpen, defaultIsOpen, isDisabled, isFocusable, id, onChange }}
    >
      <chakra.div data-chakra-accordion-item="" ref={ref} {...props} />
    </AccordionItemProvider>
  ),
);

export { Accordion, AccordionItem, AccordionPanel, AccordionButton };
