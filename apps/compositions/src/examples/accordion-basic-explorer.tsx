import { Accordion, Flex, Heading, Icon, Stack } from "@chakra-ui/react"
import { LuChartBarStacked, LuChevronDown, LuTags } from "react-icons/lu"

export const AccordionBasicExplorer = () => {
  return (
    <Stack width="full" maxW="400px">
      <Heading size="md">Product details</Heading>
      <Accordion.Root collapsible defaultValue={["info"]}>
        {items.map((item) => (
          <Accordion.Item key={item.value} value={item.value}>
            <Accordion.ItemTrigger
              display="flex"
              cursor="pointer"
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex align="center" gap={2}>
                <Icon fontSize="lg" color="fg.subtle">
                  {item.icon}
                </Icon>
                {item.title}
              </Flex>
              <Accordion.ItemIndicator>
                <LuChevronDown />
              </Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>{item.content}</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
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
    icon: <LuChartBarStacked />,
    title: "Stats",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec odio vel dui euismod fermentum.",
  },
]
