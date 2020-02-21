import { createChakra } from "@chakra-ui/system"
import {
  BaseAccordionButton,
  BaseAccordionPanel,
  BaseAccordion,
  BaseAccordionItem,
} from "./Accordion.base"

export const AccordionButton = createChakra(BaseAccordionButton, {
  themeKey: "AccordionButton",
  baseStyle: {
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
})

export const AccordionPanel = createChakra(BaseAccordionPanel, {
  themeKey: "AccordionPanel",
  baseStyle: {
    paddingTop: 2,
    paddingX: 4,
    paddingBottom: 5,
  },
})

export const AccordionItem = createChakra(BaseAccordionItem)

export const Accordion = createChakra(BaseAccordion)
