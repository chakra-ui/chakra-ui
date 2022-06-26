import { ComponentMeta, ComponentStory } from "@storybook/react"
import { chakra, Stack } from "@chakra-ui/react"
import {
  AddIcon,
  ChatIcon,
  CheckIcon,
  CopyIcon,
  MinusIcon,
  PhoneIcon,
} from "@chakra-ui/icons"
import React from "react"
import SelectOption from "../src/components/select-option.component"
import Select from "../src/select"
import SelectMenu from "../src/components/select-menu.component"
import SelectTrigger from "../src/components/select-trigger.component"
import { SelectValue } from "../src/select.interface"

const selectStories: ComponentMeta<typeof Select> = {
  title: "Components / Forms / Select",
  component: Select,
  decorators: [
    (story: Function) => (
      <chakra.div maxW="560px" mx="auto" mt="40px">
        {story()}
      </chakra.div>
    ),
  ],
}

export const Default: ComponentStory<typeof Select> = () => {
  const [value, setValue] = React.useState<SelectValue>()

  return (
    <Stack>
      {[{}, { isDisabled: true }, { invalid: true }].map((props) => (
        <Select
          placeholder="Select an option..."
          value={value}
          onChange={setValue}
          {...props}
        >
          <SelectTrigger />
          <SelectMenu>
            <SelectOption value="value-1">Option 1</SelectOption>
            <SelectOption value="value-2">Option 2</SelectOption>
            <SelectOption value="value-3">Option 3</SelectOption>
          </SelectMenu>
        </Select>
      ))}
    </Stack>
  )
}

export const WithLeftTriggerIcon: ComponentStory<typeof Select> = () => {
  return (
    <Select placeholder="Select an option...">
      <SelectTrigger leftIcon={<CopyIcon />} />
      <SelectMenu>
        <SelectOption value="value-1">Option 1</SelectOption>
        <SelectOption value="value-2">Option 2</SelectOption>
        <SelectOption value="value-3">Option 3</SelectOption>
      </SelectMenu>
    </Select>
  )
}

export const WithCustomRightTriggerIcon: ComponentStory<typeof Select> = () => {
  return (
    <Select placeholder="Select an option...">
      <SelectTrigger
        rightIcon={(isOpen) => (isOpen ? <MinusIcon /> : <AddIcon />)}
      />
      <SelectMenu>
        <SelectOption value="value-1">Option 1</SelectOption>
        <SelectOption value="value-2">Option 2</SelectOption>
        <SelectOption value="value-3">Option 3</SelectOption>
      </SelectMenu>
    </Select>
  )
}

export const WithOptionGlobalIcon: ComponentStory<typeof Select> = () => {
  return (
    <Select
      leftIcon={<ChatIcon />}
      rightIcon={({ isSelected }) => isSelected && <CheckIcon />}
      placeholder="Please select value"
    >
      <SelectTrigger />
      <SelectMenu>
        <SelectOption value="value-1">Option 1</SelectOption>
        <SelectOption value="value-2">Option 2</SelectOption>
        <SelectOption value="value-3">Option 3</SelectOption>
      </SelectMenu>
    </Select>
  )
}

export const WithOptionIcons: ComponentStory<typeof Select> = () => {
  return (
    <Select
      leftIcon={<ChatIcon />}
      rightIcon={({ isSelected }) => isSelected && <CheckIcon />}
      placeholder="Please select value"
    >
      <SelectTrigger />
      <SelectMenu>
        <SelectOption value="value-1" leftIcon={<PhoneIcon />}>
          Option 1
        </SelectOption>
        <SelectOption value="value-2" leftIcon={<ChatIcon />}>
          Option 2
        </SelectOption>
        <SelectOption value="value-3" leftIcon={<CopyIcon />}>
          Option 3
        </SelectOption>
      </SelectMenu>
    </Select>
  )
}

export const WithCustomTrigger: ComponentStory<typeof Select> = () => {
  return (
    <Select
      leftIcon={<ChatIcon />}
      rightIcon={({ isSelected }) => isSelected && <CheckIcon />}
      placeholder="Please select value"
    >
      <SelectTrigger>Static Custom Trigger</SelectTrigger>
      <SelectMenu>
        <SelectOption value="value-1" leftIcon={<PhoneIcon />}>
          Option 1
        </SelectOption>
        <SelectOption value="value-2" leftIcon={<ChatIcon />}>
          Option 2
        </SelectOption>
        <SelectOption value="value-3" leftIcon={<CopyIcon />}>
          Option 3
        </SelectOption>
      </SelectMenu>
    </Select>
  )
}

export default selectStories
