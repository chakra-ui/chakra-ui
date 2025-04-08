"use client"

import { Box, Group, Input, InputGroup, Show } from "@chakra-ui/react"
import { LuCreditCard } from "react-icons/lu"
import { usePaymentInputs } from "react-payment-inputs"
import cardImages, { type CardImages } from "react-payment-inputs/images"

const images = cardImages as unknown as CardImages

const CardImage = (props: ReturnType<typeof usePaymentInputs>) => {
  const { meta, getCardImageProps } = props
  return (
    <Show
      when={meta.cardType}
      fallback={<LuCreditCard size={16} aria-hidden="true" />}
    >
      <svg {...getCardImageProps({ images })} />
    </Show>
  )
}

export const InputWithCardDetails = () => {
  const payment = usePaymentInputs()
  return (
    <Box spaceY="-1px">
      <InputGroup
        zIndex={{ _focusWithin: "1" }}
        endElement={<CardImage {...payment} />}
      >
        <Input roundedBottom="0" {...payment.getCardNumberProps()} />
      </InputGroup>
      <Group w="full" attached>
        <Input roundedTopLeft="0" {...payment.getExpiryDateProps()} />
        <Input roundedTopRight="0" {...payment.getCVCProps()} />
      </Group>
    </Box>
  )
}
