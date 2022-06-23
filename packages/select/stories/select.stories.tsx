import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Box, Divider, Text } from "@chakra-ui/react"
import {
  AddIcon,
  ChatIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CopyIcon,
  MinusIcon,
  PhoneIcon,
} from "@chakra-ui/icons"
import React from "react"
import SelectOption from "../src/components/Select/components/select-option.component"
import Select from "../src/components/Select/select.component"
import SelectMenu from "../src/components/Select/components/select-menu.component"
import SelectSelector from "../src/components/Select/components/select-selector.component"
import SelectButton from "../src/components/Select/components/select-button.component"
import { SelectValue } from "../src/components/Select/interfaces/select.interface"

const selectStories: ComponentMeta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  argTypes: {
    children: {
      description: "Select input options",
      control: "none",
      type: { name: "other", value: "", required: true },
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    name: {
      description: "Select input name",
      table: {
        type: { summary: "string" },
      },
    },
    isDisabled: {
      description: "If true, the select or select option will be disabled",
      defaultValue: false,
      options: [true, false],
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: false,
        category: "Control Props",
      },
    },
    closeOnSelect: {
      description: "Overrides the parent menu's closeOnSelect prop.",
      defaultValue: true,
      options: [true, false],
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: true,
        category: "Control Props",
      },
    },
    invalid: {
      description: "If true, the select component will be invalid",
      defaultValue: false,
      options: [true, false],
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: false,
        category: "Control Props",
      },
    },
    variant: {
      description: "Select component variants",
      defaultValue: "outline",
      options: ["outline", "filled"],
      control: "select",
      table: {
        type: { summary: "outline | filled" },
        defaultValue: "outline",
        category: "Style Props",
      },
    },
    value: {
      description: "Select value",
      table: {
        type: { summary: "string | number" },
        category: "Control Props",
      },
    },
    isOpen: {
      description: "If `true` select container will be opened ",
      table: {
        type: { summary: "boolean" },
        category: "Control Props",
      },
    },
    clearable: {
      description:
        "The indicator presented to clear the values from the component",
      table: {
        type: { summary: "boolean" },
        category: "Control Props",
      },
    },
    required: {
      description: "If true, the select will be required field",
      table: {
        type: { summary: "boolean" },
        category: "Control Props",
      },
    },
    readonly: {
      description: "If true, the select will be readonly",
      table: {
        type: { summary: "boolean" },
        category: "Control Props",
      },
    },
    defaultValue: {
      description: "Default select value",
      table: {
        type: { summary: "SelectValue" },
        category: "Control Props",
      },
    },
    onOpen: {
      description: "Callback fired when select opens ",
      table: {
        type: { summary: "Callback", detail: "() => void" },
        category: "Control Props",
      },
    },
    onClose: {
      description: "Callback fired when select closes",
      table: {
        type: { summary: "Callback", detail: "() => void" },
        category: "Control Props",
      },
    },
    onChange: {
      description: "callback fired when children are triggered ",
      table: {
        type: { summary: "Callback", detail: "(value: SelectValue) => void" },
        category: "Control Props",
      },
    },
    id: {
      description: "Select option id value",
      table: {
        type: { summary: "string" },
        category: "Render Props",
      },
    },
    hideDefaultChevron: {
      description: "If true then default chevron icon will not be displayed",
      table: {
        type: { summary: "boolean" },
        category: "Render Props",
      },
    },
    placeholder: {
      description: "Select component placeholder",
      table: {
        type: { summary: "string" },
        category: "Render Props",
      },
    },
    leftIcon: {
      description: "Element placed after the children",
      table: {
        type: { summary: "ReactNode" },
        category: "Render Props",
      },
    },
    rightIcon: {
      description: "Element placed before the children",
      table: {
        type: { summary: "ReactNode" },
        category: "Render Props",
      },
    },
    size: {
      description: "Select component size",
      table: {
        type: { summary: "sm | md | lg" },
        category: "Style Props",
      },
    },
    rootProps: {
      description: "All <Box> properties",
      table: {
        type: { summary: "BoxProps" },
        category: "Style Props",
      },
    },
  },
  args: {
    children: undefined,
    name: "",
    value: "",
    isDisabled: false,
    invalid: false,
    variant: "outline",
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
}

const ExampleContainer = ({
  header,
  children,
}: {
  header: string
  children: React.ReactNode
}) => {
  return (
    <Box m={15}>
      <Text as="h2">{header}</Text>
      <Divider mb={5} />
      <Box>{children}</Box>
    </Box>
  )
}

export const SelectComponent: ComponentStory<typeof Select> = (props) => {
  const [value, onChange] = React.useState<SelectValue>()

  return (
    <Box>
      <Text as="h1">Select component</Text>
      <Divider mb={10} />
      <Box>Selected: {value}</Box>
      <Select {...props} value={value} onChange={onChange} placeholder="Select">
        <SelectSelector />
        <SelectMenu>
          <SelectOption value="value-1">Option 1</SelectOption>
          <SelectOption value="value-2">Option 2</SelectOption>
          <SelectOption value="value-3">Option 3</SelectOption>
        </SelectMenu>
      </Select>
      <Divider my={10} />
      <Text as="h1">Examples</Text>
      <ExampleContainer header="1. Selector with left icon">
        <Select
          value={value}
          onChange={onChange}
          placeholder="Please select value"
        >
          <SelectSelector leftIcon={<CopyIcon />} />
          <SelectMenu>
            <SelectOption value="value-1">Option 1</SelectOption>
            <SelectOption value="value-2">Option 2</SelectOption>
            <SelectOption value="value-3">Option 3</SelectOption>
          </SelectMenu>
        </Select>
      </ExampleContainer>
      <ExampleContainer header="2. Selector with custom right icon">
        <Select
          value={value}
          onChange={onChange}
          placeholder="Please select value"
        >
          <SelectSelector
            rightIcon={(isOpen) => (isOpen ? <MinusIcon /> : <AddIcon />)}
          />
          <SelectMenu>
            <SelectOption value="value-1">Option 1</SelectOption>
            <SelectOption value="value-2">Option 2</SelectOption>
            <SelectOption value="value-3">Option 3</SelectOption>
          </SelectMenu>
        </Select>
      </ExampleContainer>
      <ExampleContainer header="3. Select options with icon">
        <Select
          leftIcon={<ChatIcon />}
          rightIcon={({ isSelected }) => isSelected && <CheckIcon />}
          value={value}
          onChange={onChange}
          placeholder="Please select value"
        >
          <SelectSelector />
          <SelectMenu>
            <SelectOption value="value-1">Option 1</SelectOption>
            <SelectOption value="value-2">Option 2</SelectOption>
            <SelectOption value="value-3">Option 3</SelectOption>
          </SelectMenu>
        </Select>
      </ExampleContainer>
      <ExampleContainer header="4. Select options with custom icon">
        <Select
          value={value}
          onChange={onChange}
          placeholder="Please select value"
        >
          <SelectSelector />
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
      </ExampleContainer>
      <ExampleContainer header="5. Select custom button (trigger)">
        <Select
          value={value}
          onChange={onChange}
          placeholder="Please select value"
        >
          <SelectButton
            rightIcon={(isOpen: boolean) =>
              isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />
            }
          >
            Trigger
          </SelectButton>
          <SelectMenu>
            <SelectOption value="value-1">Option 1</SelectOption>
            <SelectOption value="value-2">Option 2</SelectOption>
            <SelectOption value="value-3">Option 3</SelectOption>
          </SelectMenu>
        </Select>
      </ExampleContainer>
      <ExampleContainer header="6. Select with render props">
        <Select
          value={value}
          onChange={onChange}
          placeholder="Please select value"
        >
          {({ isOpen, option }) => (
            <>
              <SelectButton
                rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              >
                Selected: {option?.label ?? "none"}
              </SelectButton>
              <SelectMenu>
                <SelectOption value="value-1">Option 1</SelectOption>
                <SelectOption value="value-2">Option 2</SelectOption>
                <SelectOption value="value-3">Option 3</SelectOption>
              </SelectMenu>
            </>
          )}
        </Select>
      </ExampleContainer>
    </Box>
  )
}

SelectComponent.storyName = "Select"

export default selectStories
