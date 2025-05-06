import { Bleed, Box } from "@sh3yk0-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const BleedVertical = () => {
  return (
    <Box padding="10" rounded="sm" borderWidth="1px">
      <Bleed block="10">
        <DecorativeBox height="20">Bleed</DecorativeBox>
      </Bleed>
    </Box>
  )
}
