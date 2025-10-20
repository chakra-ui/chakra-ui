"use client"

import { Button, Collapsible, Stack } from "@chakra-ui/react"
import { LuChevronDown } from "react-icons/lu"
import { LoremIpsum } from "react-lorem-ipsum"

export const CollapsiblePartialHeight = () => (
  <Collapsible.Root collapsedHeight="100px">
    <Collapsible.Content
      _closed={{
        shadow: "inset 0 -12px 12px -12px var(--shadow-color)",
        shadowColor: "blackAlpha.500",
      }}
    >
      <Stack padding="4" borderWidth="1px" rounded="l2">
        <LoremIpsum p={1} />
        <LoremIpsum p={1} />
      </Stack>
    </Collapsible.Content>
    <Collapsible.Trigger asChild mt="4">
      <Button variant="outline" size="sm">
        <Collapsible.Context>
          {(api) => (api.open ? "Show Less" : "Show More")}
        </Collapsible.Context>
        <Collapsible.Indicator
          transition="transform 0.2s"
          _open={{ transform: "rotate(180deg)" }}
        >
          <LuChevronDown />
        </Collapsible.Indicator>
      </Button>
    </Collapsible.Trigger>
  </Collapsible.Root>
)
