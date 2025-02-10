import {
  Box,
  type ComboboxRootProps,
  Heading,
  Stack,
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
import { useState } from "react"

const companies = ["Apple", "Amazon", "Meta", "Netflix", "Google"]

export const ComboboxSelectionBehavior = () => {
  return (
    <Stack gap={8} p={4}>
      <BehaviorExample behavior="replace" />
      <BehaviorExample behavior="clear" />
      <BehaviorExample behavior="preserve" />
    </Stack>
  )
}

function BehaviorExample({
  behavior,
}: {
  behavior: ComboboxRootProps["selectionBehavior"]
}) {
  const [value, setValue] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")

  const collection = createListCollection({ items: companies })

  const descriptions = {
    replace: "Selected item replaces the input value",
    clear: "Input value is cleared after selection",
    preserve: "Input value is preserved after selection",
  }

  return (
    <Box>
      <Stack mb={4}>
        <Heading as="h3">{behavior} Selection</Heading>
        <Text textStyle="sm" color="gray.600">
          {descriptions[behavior as keyof typeof descriptions]}
        </Text>
      </Stack>

      <ComboboxRoot
        multiple
        value={value}
        inputValue={inputValue}
        collection={collection}
        selectionBehavior={behavior}
        onValueChange={(details) => setValue(details.value)}
        onInputValueChange={(details) => setInputValue(details.inputValue)}
      >
        <ComboboxLabel>Select Companies</ComboboxLabel>

        {behavior !== "replace" && (
          <Stack direction="row">
            {value.map((company) => (
              <Box
                as="span"
                px={2}
                py={1}
                rounded="sm"
                bg="blue.100"
                textStyle="sm"
                key={company}
              >
                {company}
              </Box>
            ))}
          </Stack>
        )}

        <ComboboxInput />

        <ComboboxContent>
          <ComboboxItemGroup label="Company">
            {collection.items.map((item) => (
              <ComboboxItem key={item} item={item}>
                {item}
              </ComboboxItem>
            ))}
          </ComboboxItemGroup>
        </ComboboxContent>
      </ComboboxRoot>

      <Box mt={2} p={2} bg="gray.50" rounded="sm">
        <Box textStyle="sm">
          <Box>Selected: {value.join(", ") || "none"}</Box>
          <Box>Input Value: {inputValue || "empty"}</Box>
        </Box>
      </Box>
    </Box>
  )
}
