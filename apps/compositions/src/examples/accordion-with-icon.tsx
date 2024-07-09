import { Heading, Stack } from "@chakra-ui/react"
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemIcon,
  AccordionItemTrigger,
  AccordionRoot,
} from "compositions/ui/accordion"
import { LuBarChart, LuTags } from "react-icons/lu"

export const AccordionWithIcon = () => {
  return (
    <Stack width="full" maxW="400px">
      <Heading size="md">Product details</Heading>
      <AccordionRoot collapsible defaultValue={["info"]}>
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionItemTrigger>
              <AccordionItemIcon>{item.icon}</AccordionItemIcon>
              {item.title}
            </AccordionItemTrigger>
            <AccordionItemContent>{item.content}</AccordionItemContent>
          </AccordionItem>
        ))}
      </AccordionRoot>
    </Stack>
  )
}

const items = [
  {
    value: "info",
    icon: <LuTags />,
    title: "Product Info",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec odio vel dui euismod fermentum.",
  },
  {
    value: "stats",
    icon: <LuBarChart />,
    title: "Stats",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec odio vel dui euismod fermentum.",
  },
]
