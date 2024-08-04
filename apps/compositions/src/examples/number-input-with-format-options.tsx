import { Stack } from "@chakra-ui/react"
import { NumberInputField, NumberInputRoot } from "compositions/ui/number-input"

export const NumberInputWithFormatOptions = () => {
  return (
    <Stack gap="5" maxW="200px">
      <NumberInputRoot
        defaultValue="5"
        step={0.01}
        formatOptions={{
          style: "percent",
        }}
      >
        <NumberInputField />
      </NumberInputRoot>

      <NumberInputRoot
        defaultValue="45"
        formatOptions={{
          style: "currency",
          currency: "EUR",
          currencyDisplay: "code",
          currencySign: "accounting",
        }}
      >
        <NumberInputField />
      </NumberInputRoot>

      <NumberInputRoot
        defaultValue="4"
        formatOptions={{
          style: "unit",
          unit: "inch",
          unitDisplay: "long",
        }}
      >
        <NumberInputField />
      </NumberInputRoot>
    </Stack>
  )
}
