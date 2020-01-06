import {
  Accordion as Accordions,
  AccordionItemProvider,
  AccordionItemProviderProps,
  useAccordionButton,
  useAccordionItemState as useAccordionState,
  useAccordionPanel,
} from "@chakra-ui/hooks";
import { createChakra, PropsOf } from "@chakra-ui/system";
import { Omit } from "@chakra-ui/utils";
import * as React from "react";
import { Icon } from "../Icon";

const AccordionButton = createChakra("button", {
  hook: useAccordionButton,
  themeKey: "AccordionButton",
  baseStyles: {
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
});

const AccordionPanel = createChakra("div", {
  hook: useAccordionPanel,
  themeKey: "AccordionPanel",
  dataAttr: "accordion-panel",
  baseStyles: {
    paddingTop: 2,
    paddingX: 4,
    paddingBottom: 5,
  },
});

const AccordionItemRoot = createChakra("div", { dataAttr: "accordion-item" });

export type AccordionItemProps = AccordionItemProviderProps &
  Omit<PropsOf<typeof AccordionItemRoot>, "onChange">;

const Accordion = React.forwardRef(
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
      <AccordionItemRoot ref={ref} {...props} />
    </AccordionItemProvider>
  ),
);

const AccordionIcon = (props: PropsOf<typeof Icon>) => {
  const { isOpen, isDisabled } = useAccordionState();
  return (
    <Icon
      aria-hidden
      focusable="false"
      size="1.25em"
      name="chevron-down"
      opacity={isDisabled ? 0.4 : 1}
      transform={isOpen ? "rotate(-180deg)" : undefined}
      transition="transform 0.2s"
      transformOrigin="center"
      {...props}
    />
  );
};

export {
  Accordions,
  useAccordionState,
  Accordion,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
};
