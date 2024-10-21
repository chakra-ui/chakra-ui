import {
  BlitzHeading,
  HighlightHeading,
  Subheading,
} from "@/components/site/typography"
import { Box, Container, List, Span, Stack, Tabs } from "@chakra-ui/react"
import { LuBox, LuPaintBucket, LuType } from "react-icons/lu"
import { ExampleCode, ExampleCodeWrapper } from "../example"

const items = [
  {
    icon: <LuBox />,
    value: "site/design-tokens",
    label: "Tokens",
    description: "Streamline design decisions with semantic tokens",
  },
  {
    icon: <LuType />,
    value: "site/typography",
    label: "Typography",
    description: "Customise your font related properties in one place",
  },
  {
    icon: <LuPaintBucket />,
    value: "site/recipes",
    label: "Recipes",
    description: "Design components variants with ease",
  },
]

export const DesignSystemSection = () => {
  return (
    <Box as="section" py="20">
      <Container>
        <Stack
          gap={{ base: "10", md: "20" }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack align="flex-start" gap="4" flex="1" maxW="576px">
            <BlitzHeading my="4">Design System</BlitzHeading>
            <HighlightHeading query="Chakra UI" as="h2">
              Build your design system on top of Chakra UI
            </HighlightHeading>
            <Subheading textStyle="lg">
              Spend less time writing UI code and more time building a great
              experience for your customers.
            </Subheading>
            <List.Root variant="plain" align="start" gap="6" mt="4">
              {items.map((item) => (
                <List.Item key={item.value} gap="2">
                  <List.Indicator asChild>{item.icon}</List.Indicator>
                  <p>
                    {item.label}.{" "}
                    <Span color="fg.muted">{item.description}</Span>
                  </p>
                </List.Item>
              ))}
            </List.Root>
          </Stack>

          <Box flex="1" className="dark" flexShrink="0">
            <Tabs.Root
              rounded="lg"
              p="2"
              defaultValue={items[0].value}
              variant="subtle"
              shadow="inset"
              flex="1"
              bg="bg"
            >
              <Tabs.List p="2">
                {items.map((item) => (
                  <Tabs.Trigger key={item.value} value={item.value}>
                    {item.icon}
                    {item.label}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
              <Tabs.ContentGroup mt="2">
                {items.map((item) => (
                  <Tabs.Content key={item.value} value={item.value}>
                    <ExampleCodeWrapper bg="bg!" px="4" py="4">
                      <ExampleCode
                        name={item.value}
                        ext="ts"
                        showCopy={false}
                      />
                    </ExampleCodeWrapper>
                  </Tabs.Content>
                ))}
              </Tabs.ContentGroup>
            </Tabs.Root>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
