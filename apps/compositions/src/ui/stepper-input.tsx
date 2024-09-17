import { HStack, IconButton, NumberInput } from "@chakra-ui/react"
import { LuMinus, LuPlus } from "react-icons/lu"

export interface StepperInputProps extends NumberInput.RootProps {
  label?: React.ReactNode
}

export const StepperInput = (props: StepperInputProps) => {
  const { label, ...rest } = props
  return (
    <NumberInput.Root {...rest} unstyled>
      {label && <NumberInput.Label>{label}</NumberInput.Label>}
      <HStack gap="2">
        <DecrementTrigger />
        <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
        <IncrementTrigger />
      </HStack>
    </NumberInput.Root>
  )
}

const DecrementTrigger = (props: NumberInput.DecrementTriggerProps) => {
  return (
    <NumberInput.DecrementTrigger {...props} asChild>
      <IconButton variant="outline" size="sm">
        <LuMinus />
      </IconButton>
    </NumberInput.DecrementTrigger>
  )
}

const IncrementTrigger = (props: NumberInput.IncrementTriggerProps) => {
  return (
    <NumberInput.IncrementTrigger {...props} asChild>
      <IconButton variant="outline" size="sm">
        <LuPlus />
      </IconButton>
    </NumberInput.IncrementTrigger>
  )
}
