"use client"

import {
  Accordion,
  Box,
  Button,
  HStack,
  Input,
  Separator,
  Stack,
  Text,
  Tour,
  type TourStep,
  useTour,
} from "@chakra-ui/react"
import { useState } from "react"
import { TourOverlay } from "./tour-parts"

const lineItems = [
  { name: "Chakra Pro — Figma Kit", price: "$149.00" },
  { name: "Chakra Pro — Icon Library", price: "$249.00" },
]

type Section = "contact" | "shipping" | "payment" | "review"

export const TourFormGuide = () => {
  const [open, setOpen] = useState<Section>("contact")

  const focusAfter = (id: string) =>
    setTimeout(() => document.querySelector<HTMLElement>(id)?.focus(), 50)

  const steps: TourStep[] = [
    {
      id: "contact",
      type: "tooltip",
      target: () =>
        document.querySelector<HTMLElement>("#checkout-contact-email"),
      title: "We'll only email your receipt",
      description: "No marketing unless you ask — promise.",
      effect: ({ show }) => {
        setOpen("contact")
        focusAfter("#checkout-contact-email")
        show()
        return () => {}
      },
      actions: [{ label: "Next", action: "next" }],
    },
    {
      id: "address",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#checkout-address"),
      title: "Start typing, we'll finish",
      description: "Google-powered autocomplete fills city, state, and zip.",
      effect: ({ show }) => {
        setOpen("shipping")
        focusAfter("#checkout-address")
        show()
        return () => {}
      },
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "payment",
      type: "tooltip",
      target: () =>
        document.querySelector<HTMLElement>("#checkout-saved-cards"),
      title: "Pay faster with Link",
      description: "One-tap checkout across any site that uses Chakra Pay.",
      effect: ({ show }) => {
        setOpen("payment")
        show()
        return () => {}
      },
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "promo",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#checkout-promo"),
      title: "Have a code?",
      description:
        "Promos apply to your subtotal and show up in the breakdown instantly.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "total",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#checkout-total"),
      title: "No surprise fees",
      description: "Shipping and taxes are locked in before you hit Pay.",
      effect: ({ show }) => {
        setOpen("review")
        show()
        return () => {}
      },
      actions: [
        { label: "Back", action: "prev" },
        { label: "Done", action: "dismiss" },
      ],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Stack gap="3" maxW="3xl">
      <Button size="sm" alignSelf="flex-start" onClick={() => tour.start()}>
        Walk me through checkout
      </Button>

      <HStack align="start" gap="6">
        <Accordion.Root
          flex="1"
          collapsible
          value={[open]}
          onValueChange={(d) => d.value[0] && setOpen(d.value[0] as Section)}
        >
          <Section id="contact" label="1 · Contact">
            <Input id="checkout-contact-email" placeholder="you@example.com" />
          </Section>
          <Section id="shipping" label="2 · Shipping">
            <Stack gap="2">
              <Input id="checkout-address" placeholder="Street address" />
              <HStack gap="2">
                <Input placeholder="City" />
                <Input placeholder="State" />
                <Input placeholder="Zip" />
              </HStack>
            </Stack>
          </Section>
          <Section id="payment" label="3 · Payment">
            <Stack id="checkout-saved-cards" gap="2">
              <Box borderWidth="1px" borderRadius="md" p="3">
                <Text fontSize="sm" fontWeight="medium">
                  Visa •••• 4242
                </Text>
                <Text fontSize="xs" color="fg.muted">
                  Saved via Chakra Pay
                </Text>
              </Box>
              <Button variant="outline" size="sm">
                Use a different card
              </Button>
            </Stack>
          </Section>
          <Section id="review" label="4 · Review">
            <Stack gap="2">
              <HStack>
                <Input id="checkout-promo" placeholder="Promo code" />
                <Button variant="outline" size="sm">
                  Apply
                </Button>
              </HStack>
              <Button>Pay $398.00</Button>
            </Stack>
          </Section>
        </Accordion.Root>

        <Box w="260px" borderWidth="1px" borderRadius="md" p="4" flexShrink="0">
          <Text fontWeight="semibold" mb="3">
            Order summary
          </Text>
          <Stack gap="2" fontSize="sm">
            {lineItems.map((i) => (
              <HStack key={i.name} justify="space-between">
                <Text>{i.name}</Text>
                <Text>{i.price}</Text>
              </HStack>
            ))}
            <Separator />
            <HStack justify="space-between">
              <Text>Subtotal</Text>
              <Text>$398.00</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Shipping</Text>
              <Text>Free</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Tax</Text>
              <Text>$0.00</Text>
            </HStack>
            <Separator />
            <HStack
              id="checkout-total"
              justify="space-between"
              fontWeight="semibold"
            >
              <Text>Total</Text>
              <Text>$398.00</Text>
            </HStack>
          </Stack>
        </Box>
      </HStack>

      <Tour.Root tour={tour}>
        <TourOverlay />
      </Tour.Root>
    </Stack>
  )
}

const Section = (props: {
  id: Section
  label: string
  children: React.ReactNode
}) => (
  <Accordion.Item value={props.id}>
    <Accordion.ItemTrigger>
      <Text fontWeight="medium" fontSize="sm" flex="1" textAlign="left">
        {props.label}
      </Text>
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>{props.children}</Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>
)
