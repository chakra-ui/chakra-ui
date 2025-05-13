"use client"

import {
  Badge,
  Combobox,
  Portal,
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

export const ComboboxWithMultiple = () => {
  const [searchValue, setSearchValue] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const filteredItems = useMemo(
    () =>
      skills.filter((item) =>
        item.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    [searchValue],
  )

  const collection = useMemo(
    () => createListCollection({ items: filteredItems }),
    [filteredItems],
  )

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    setSelectedSkills(details.value)
  }

  return (
    <Combobox.Root
      multiple
      closeOnSelect
      width="320px"
      value={selectedSkills}
      collection={collection}
      onValueChange={handleValueChange}
      onInputValueChange={(details) => setSearchValue(details.inputValue)}
    >
      <Wrap gap="2">
        {selectedSkills.map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
      </Wrap>

      <Combobox.Label>Select Skills</Combobox.Label>

      <Combobox.Control>
        <Combobox.Input />
        <Combobox.IndicatorGroup>
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
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
              <Combobox.Empty>No skills found</Combobox.Empty>
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
