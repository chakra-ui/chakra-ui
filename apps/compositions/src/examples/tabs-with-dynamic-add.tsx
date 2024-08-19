"use client"

import { Button, Heading, Tabs, Text } from "@chakra-ui/react"
import { CloseButton } from "compositions/ui/close-button"
import { useState } from "react"
import { LuPlus } from "react-icons/lu"

interface Item {
  title: string
  content: React.ReactNode
}

const items: Item[] = [
  { title: "Tab 1", content: "Tab Content 1" },
  { title: "Tab 2", content: "Tab Content 2" },
  { title: "Tab 3", content: "Tab Content 3" },
  { title: "Tab 4", content: "Tab Content 4" },
]

export const TabsWithDynamicAdd = () => {
  const [tabs, setTabs] = useState<Item[]>(items)
  const [selectedTab, setSelectedTab] = useState<string | null>(items[0].title)

  const addTab = () => {
    const newTabs = [...tabs]

    newTabs.push({
      title: `Tab ${tabs.length + 1}`,
      content: `Tab Body ${tabs.length + 1}`,
    })

    setTabs(newTabs)
    setSelectedTab(newTabs[newTabs.length - 1].title)
  }

  const removeTab = (title: string) => {
    if (tabs.length > 1) {
      const newTabs = [...tabs].filter((tab) => tab.title !== title)
      setTabs(newTabs)
    }
  }

  return (
    <Tabs.Root
      value={selectedTab}
      variant="outline"
      size="sm"
      onValueChange={(e) => setSelectedTab(e.value)}
    >
      <Tabs.List flex="1 1 auto">
        {tabs.map((item) => (
          <Tabs.Trigger value={item.title} key={item.title}>
            {item.title}{" "}
            <CloseButton
              size="xs"
              onClick={(e) => {
                e.stopPropagation()
                removeTab(item.title)
              }}
            />
          </Tabs.Trigger>
        ))}
        <Button
          alignSelf="center"
          ms="2"
          size="xs"
          variant="ghost"
          onClick={addTab}
        >
          <LuPlus /> Add Tab
        </Button>
      </Tabs.List>

      <Tabs.ContentGroup>
        {tabs.map((item) => (
          <Tabs.Content value={item.title} key={item.title}>
            <Heading size="xl" my="6">
              {item.content}
            </Heading>
            <Text>
              Dolore ex esse laboris elit magna esse sunt. Pariatur in veniam
              Lorem est occaecat do magna nisi mollit ipsum sit adipisicing
              fugiat ex. Pariatur ullamco exercitation ea qui adipisicing. Id
              cupidatat aute id ut excepteur exercitation magna pariatur. Mollit
              irure irure reprehenderit pariatur eiusmod proident Lorem deserunt
              duis cillum mollit.
            </Text>
          </Tabs.Content>
        ))}
      </Tabs.ContentGroup>
    </Tabs.Root>
  )
}
