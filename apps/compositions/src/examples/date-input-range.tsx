"use client"

import { DateInput, Icon } from "@chakra-ui/react"
import { LuArrowRight } from "react-icons/lu"

export const DateInputRange = () => {
  return (
    <DateInput.Root selectionMode="range">
      <DateInput.Label>Trip duration</DateInput.Label>

      <DateInput.Control gap="4">
        <DateInput.Segments index={0} maxW="fit-content" />
        <Icon color="fg.subtle" boxSize="4" as={LuArrowRight} />
        <DateInput.Segments index={1} maxW="fit-content" />
      </DateInput.Control>

      <DateInput.HiddenInput index={0} />
      <DateInput.HiddenInput index={1} />
    </DateInput.Root>
  )
}
