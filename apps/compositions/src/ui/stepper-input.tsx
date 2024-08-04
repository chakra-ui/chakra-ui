"use client"

import type { TextProps } from "@chakra-ui/react"
import { HStack, IconButton, NumberInput, Text } from "@chakra-ui/react"
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
        <ValueText />
        <IncrementTrigger />
      </HStack>
    </NumberInput.Root>
  )
}

const ValueText = (props: TextProps) => {
  return (
    <Text
      align="center"
      fontSize="lg"
      minW="3ch"
      fontWeight="medium"
      fontFeatureSettings="pnum"
      fontVariantNumeric="proportional-nums"
      {...props}
    >
      <NumberInput.Context>{(api) => api.value}</NumberInput.Context>
    </Text>
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
