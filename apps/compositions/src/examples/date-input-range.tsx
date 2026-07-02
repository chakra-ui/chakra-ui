"use client"

import { Box, type BoxProps, DateInput, Icon } from "@chakra-ui/react"
import { LuArrowRight } from "react-icons/lu"

const segmentBoxStyle: BoxProps = {
  borderWidth: "1px",
  borderColor: "border",
  borderRadius: "l2",
  px: "3",
  h: "10",
  display: "flex",
  alignItems: "center",
  _focusWithin: { borderColor: "colorPalette.focusRing" },
}

export const DateInputRange = () => {
  return (
    <DateInput.Root selectionMode="range" width="fit-content">
      <DateInput.Label>Trip duration</DateInput.Label>
      <DateInput.Control border="none" bg="transparent" px="0" height="auto">
        <Box {...segmentBoxStyle}>
          <DateInput.Segments index={0} />
        </Box>
        <Icon color="fg.muted" boxSize="4">
          <LuArrowRight />
        </Icon>
        <Box {...segmentBoxStyle}>
          <DateInput.Segments index={1} />
        </Box>
      </DateInput.Control>
      <DateInput.HiddenInput index={0} />
      <DateInput.HiddenInput index={1} />
    </DateInput.Root>
  )
}
