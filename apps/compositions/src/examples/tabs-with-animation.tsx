import { Box, Flex, Tabs } from "@chakra-ui/react"

const items = [
  {
    title: "1",
    content: "Dolore ex esse laboris elit magna esse sunt",
  },
  {
    title: "2",
    content:
      "Pariatur in veniam Lorem est occaecat do magna nisi mollit ipsum sit adipisicing fugiat ex.",
  },
]

export const TabsWithAnimation = () => {
  return (
    <Flex minH="dvh">
      <Tabs.Root defaultValue="1" width="full">
        <Tabs.List>
          {items.map((item, index) => (
            <Tabs.Trigger key={index} value={item.title}>
              Tab {item.title}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Box pos="relative" minH="200px" width="full">
          {items.map((item, index) => (
            <Tabs.Content
              key={index}
              value={item.title}
              position="absolute"
              inset="0"
              _open={{
                animationName: "fade-in, scale-in",
                animationDuration: "300ms",
              }}
              _closed={{
                animationName: "fade-out, scale-out",
                animationDuration: "120ms",
              }}
            >
              {item.content}
            </Tabs.Content>
          ))}
        </Box>
      </Tabs.Root>
    </Flex>
  )
}
