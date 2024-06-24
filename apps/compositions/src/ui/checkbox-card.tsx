import {
  CheckboxCard as ChakraCheckboxCard,
  CheckboxGroup,
} from "@chakra-ui/react"

interface CheckboxCardItemProps extends ChakraCheckboxCard.RootProps {}

export const CheckboxCardItem = (props: CheckboxCardItemProps) => {
  const { children, ...rest } = props
  return (
    <ChakraCheckboxCard.Root {...rest}>
      <ChakraCheckboxCard.Control>
        {children}
        <ChakraCheckboxCard.HiddenInput />
        <ChakraCheckboxCard.Indicator />
      </ChakraCheckboxCard.Control>
    </ChakraCheckboxCard.Root>
  )
}

export const CheckboxCardGroup = CheckboxGroup
export const CheckboxCardLabel = ChakraCheckboxCard.Label
