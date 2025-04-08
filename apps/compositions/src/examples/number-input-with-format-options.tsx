import { NumberInput, Stack } from "@chakra-ui/react"

export const NumberInputWithFormatOptions = () => {
  return (
    <Stack gap="5" maxW="200px">
      <NumberInput.Root
        defaultValue="5"
        step={0.01}
        formatOptions={{
          style: "percent",
        }}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>

      <NumberInput.Root
        defaultValue="45"
        formatOptions={{
          style: "currency",
          currency: "EUR",
          currencyDisplay: "code",
          currencySign: "accounting",
        }}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>

      <NumberInput.Root
        defaultValue="4"
        formatOptions={{
          style: "unit",
          unit: "inch",
          unitDisplay: "long",
        }}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
    </Stack>
  )
}
