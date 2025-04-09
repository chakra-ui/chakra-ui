"use client"

import {
  Badge,
  Combobox,
  Portal,
  Text,
  Wrap,
  createListCollection,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "GraphQL",
  "PostgreSQL",
]

export const ComboboxMultiDefault = () => {
  const [searchValue, setSearchValue] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const filteredItems = useMemo(
    () =>
      skills.filter((item) =>
        item.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    [searchValue],
  )

  const collection = createListCollection({
    items: filteredItems,
  })

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    setSelectedSkills(details.value)
  }

  return (
    <Combobox.Root
      multiple
      width="320px"
      value={selectedSkills}
      collection={collection}
      onValueChange={handleValueChange}
      onInputValueChange={(details) => setSearchValue(details.inputValue)}
    >
      <Combobox.Label>Select Skills</Combobox.Label>
      <Wrap gap="2">
        {selectedSkills.map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
      </Wrap>

      <Combobox.Control>
        <Combobox.Input />
        <Combobox.Trigger />
        <Combobox.ClearTrigger />
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.ItemGroup>
              <Combobox.ItemGroupLabel>Skills</Combobox.ItemGroupLabel>
              {filteredItems.map((item) => (
                <Combobox.Item key={item} item={item}>
                  {item}
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
              {filteredItems.length === 0 && (
                <Text textStyle="sm" p={2} color="gray.500">
                  No skills found
                </Text>
              )}
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
