import { RadioCard as ChakraRadioCard } from "@chakra-ui/react"

interface RadioCardItemProps extends ChakraRadioCard.ItemProps {
  addon?: React.ReactNode
}

export const RadioCardItem = (props: RadioCardItemProps) => {
  const { children, addon, ...rest } = props
  return (
    <ChakraRadioCard.Item {...rest}>
      <ChakraRadioCard.ItemHiddenInput />
      <ChakraRadioCard.ItemControl>
        {children}
        <ChakraRadioCard.ItemIndicator />
      </ChakraRadioCard.ItemControl>
      {addon}
    </ChakraRadioCard.Item>
  )
}

export const RadioCardRoot = ChakraRadioCard.Root
export const RadioCardLabel = ChakraRadioCard.Label
