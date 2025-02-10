"use client"

import {
  Box,
  type Combobox,
  Flex,
  Text,
  createListCollection,
} from "@chakra-ui/react"
import {
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemGroup,
  ComboboxLabel,
  ComboboxRoot,
} from "compositions/ui/combobox"
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

  const collection = createListCollection({ items: skills })

  const filteredItems = useMemo(
    () =>
      skills.filter((item) =>
        item.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    [searchValue],
  )

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    setSelectedSkills(details.value)
  }

  return (
    <ComboboxRoot
      multiple
      width="320px"
      value={selectedSkills}
      collection={collection}
      onValueChange={handleValueChange}
      onInputValueChange={(details) => setSearchValue(details.inputValue)}
    >
      <ComboboxLabel>Select Skills</ComboboxLabel>
      <Flex gap={1} flexWrap="wrap">
        {selectedSkills.map((skill) => (
          <Box
            px={2}
            py={1}
            as="span"
            key={skill}
            rounded="sm"
            fontSize="xs"
            background="blue.100"
          >
            {skill}
          </Box>
        ))}
      </Flex>
      <ComboboxInput />
      <ComboboxContent>
        <ComboboxItemGroup label="Skills">
          {filteredItems.map((item) => (
            <ComboboxItem key={item} item={item}>
              {item}
            </ComboboxItem>
          ))}
          {filteredItems.length === 0 && (
            <Text textStyle="sm" p={2} color="gray.500">
              No skills found
            </Text>
          )}
        </ComboboxItemGroup>
      </ComboboxContent>
    </ComboboxRoot>
  )
}
