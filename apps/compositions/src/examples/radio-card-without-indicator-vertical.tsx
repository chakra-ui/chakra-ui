import { HStack, Icon } from "@chakra-ui/react"
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "compositions/ui/radio-card"
import { RiAppleFill, RiBankCardFill, RiPaypalFill } from "react-icons/ri"

export const RadioCardWithoutIndicatorVertical = () => {
  return (
    <RadioCardRoot
      orientation="vertical"
      align="center"
      maxW="400px"
      defaultValue="paypal"
    >
      <RadioCardLabel>Payment method</RadioCardLabel>
      <HStack>
        {items.map((item) => (
          <RadioCardItem
            label={item.title}
            icon={
              <Icon fontSize="2xl" color="fg.muted">
                {item.icon}
              </Icon>
            }
            indicator={false}
            key={item.value}
            value={item.value}
          />
        ))}
      </HStack>
    </RadioCardRoot>
  )
}

const items = [
  { value: "paypal", title: "Paypal", icon: <RiPaypalFill /> },
  { value: "apple-pay", title: "Apple Pay", icon: <RiAppleFill /> },
  { value: "card", title: "Card", icon: <RiBankCardFill /> },
]
