import { AccordionBasic } from "compositions/examples/accordion-basic"
import { AccordionControlled } from "compositions/examples/accordion-controlled"
import { AccordionSizeTable } from "compositions/examples/accordion-size-table"
import { AccordionVariantTable } from "compositions/examples/accordion-variant-table"
import { AccordionWithIcon } from "compositions/examples/accordion-with-icon"
import { AccordionWithMultiple } from "compositions/examples/accordion-with-multiple"
import { Box } from "../src"

export default {
  title: "Components / Accordion",
  decorators: [(story: Function) => <Box padding="4">{story()}</Box>],
}

export const Basic = () => {
  return <AccordionBasic />
}

export const Variants = () => {
  return <AccordionVariantTable />
}

export const Sizes = () => {
  return <AccordionSizeTable />
}

export const Icon = () => {
  return <AccordionWithIcon />
}

export const WithMultiple = () => {
  return <AccordionWithMultiple />
}

export const Controlled = () => {
  return <AccordionControlled />
}
