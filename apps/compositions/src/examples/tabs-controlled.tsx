"use client"

import { Tabs } from "@chakra-ui/react"
import { useState } from "react"

export const TabsControlled = () => {
  const [value, setValue] = useState<string | null>("first")

  return (
    <Tabs.Root value={value} onValueChange={(e) => setValue(e.value)}>
      <Tabs.List>
        <Tabs.Trigger value="first">First tab</Tabs.Trigger>
        <Tabs.Trigger value="second">Second tab</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="first">First panel</Tabs.Content>
      <Tabs.Content value="second">Second panel</Tabs.Content>
    </Tabs.Root>
  )
}
