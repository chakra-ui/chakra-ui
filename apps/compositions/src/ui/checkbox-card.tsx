import {
  CheckboxCard as ChakraCheckboxCard,
  CheckboxGroup,
} from "@chakra-ui/react"

interface CheckboxCardItemProps extends ChakraCheckboxCard.RootProps {
  addon?: React.ReactNode
}

export const CheckboxCardItem = (props: CheckboxCardItemProps) => {
  const { children, addon, ...rest } = props
  return (
    <ChakraCheckboxCard.Root {...rest}>
      <ChakraCheckboxCard.Control>
        {children}
        <ChakraCheckboxCard.HiddenInput />
        <ChakraCheckboxCard.Indicator />
      </ChakraCheckboxCard.Control>
      {addon && <ChakraCheckboxCard.Addon>{addon}</ChakraCheckboxCard.Addon>}
    </ChakraCheckboxCard.Root>
  )
}

export const CheckboxCardGroup = CheckboxGroup
export const CheckboxCardLabel = ChakraCheckboxCard.Label
