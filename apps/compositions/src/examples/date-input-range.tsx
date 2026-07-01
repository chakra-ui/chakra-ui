"use client"

import { DateInput, Icon } from "@chakra-ui/react"
import { LuArrowRight } from "react-icons/lu"

export const DateInputRange = () => {
  return (
    <DateInput.Root selectionMode="range" maxWidth="22rem">
      <DateInput.Label>Trip duration</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments
          index={0}
          bg="bg.muted"
          borderRadius="l2"
          px="2"
          py="1"
        />
        <Icon color="fg.muted" boxSize="4">
          <LuArrowRight />
        </Icon>
        <DateInput.Segments
          index={1}
          bg="bg.muted"
          borderRadius="l2"
          px="2"
          py="1"
        />
      </DateInput.Control>
      <DateInput.HiddenInput index={0} />
      <DateInput.HiddenInput index={1} />
    </DateInput.Root>
  )
}
