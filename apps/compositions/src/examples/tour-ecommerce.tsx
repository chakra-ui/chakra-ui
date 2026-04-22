"use client"

import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Circle,
  HStack,
  IconButton,
  NumberInput,
  Stack,
  Text,
  Tour,
  type TourStep,
  createToaster,
  useTour,
} from "@chakra-ui/react"
import { useState } from "react"
import { LuHeart, LuShoppingCart } from "react-icons/lu"
import { TourOverlay } from "./tour-parts"

const toaster = createToaster({ placement: "top-end", overlap: true })

export const TourEcommerce = () => {
  const [cart, setCart] = useState(0)
  const [color, setColor] = useState<"indigo" | "rose" | "slate">("indigo")

  const tour = useTour({
    steps,
    onStatusChange(details) {
      if (details.status === "completed") return
      if (details.stepId === "add" && details.status === "idle") return
    },
  })

  return (
    <Stack gap="4" maxW="lg">
      <HStack justify="space-between">
        <Button size="sm" onClick={() => tour.start()}>
          Take the tour
        </Button>
        <HStack gap="1">
          <LuShoppingCart />
          <Badge colorPalette="purple" variant="solid">
            {cart}
          </Badge>
        </HStack>
      </HStack>

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg="bg.panel">
        <Box
          id="store-gallery"
          h="200px"
          bgGradient="to-br"
          gradientFrom={swatchBg[color].from}
          gradientTo={swatchBg[color].to}
          position="relative"
        >
          <svg
            viewBox="0 0 200 160"
            width="60%"
            height="70%"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <rect
              x="20"
              y="30"
              width="160"
              height="100"
              rx="12"
              fill="white"
              opacity="0.9"
            />
            <rect
              x="40"
              y="10"
              width="140"
              height="100"
              rx="12"
              fill="white"
              opacity="0.6"
            />
            <rect
              x="60"
              y="50"
              width="120"
              height="8"
              rx="4"
              fill={swatchBg[color].accent}
            />
            <rect
              x="60"
              y="66"
              width="80"
              height="6"
              rx="3"
              fill="currentColor"
              opacity="0.3"
            />
          </svg>
        </Box>

        <Stack gap="3" p="4">
          <HStack justify="space-between" align="start">
            <Stack gap="0">
              <HStack gap="2">
                <Text fontWeight="semibold">Chakra Pro — Figma Kit</Text>
                <Badge colorPalette="purple">Popular</Badge>
              </HStack>
              <Text textStyle="sm" color="fg.muted">
                40+ pages · 300+ components · auto-layout
              </Text>
            </Stack>
            <Stack gap="0" align="end">
              <Text fontWeight="bold" textStyle="xl">
                $149
              </Text>
              <Text
                textStyle="xs"
                color="fg.muted"
                textDecoration="line-through"
              >
                $199
              </Text>
            </Stack>
          </HStack>

          <HStack id="store-swatches" gap="2">
            {(["indigo", "rose", "slate"] as const).map((c) => (
              <Circle
                key={c}
                size="6"
                bg={swatchBg[c].accent}
                borderWidth={color === c ? "2px" : "1px"}
                borderColor={color === c ? "fg" : "border"}
                cursor="pointer"
                onClick={() => setColor(c)}
              />
            ))}
          </HStack>

          <HStack id="store-qty">
            <Text textStyle="sm">Quantity</Text>
            <NumberInput.Root
              defaultValue="1"
              min={1}
              max={50}
              size="sm"
              w="100px"
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
          </HStack>

          <HStack id="store-add" gap="2">
            <Button
              flex="1"
              onClick={() => {
                setCart((c) => c + 1)
                toaster.success({ title: "Added to cart", duration: 1500 })
              }}
            >
              Add to cart — $149
            </Button>
            <IconButton aria-label="Wishlist" variant="outline">
              <LuHeart />
            </IconButton>
          </HStack>

          <HStack
            id="store-reviews"
            gap="3"
            p="3"
            borderWidth="1px"
            borderRadius="md"
          >
            <AvatarGroup size="sm">
              <Avatar.Root>
                <Avatar.Fallback name="Ana Lima" />
              </Avatar.Root>
              <Avatar.Root>
                <Avatar.Fallback name="Dev Patel" />
              </Avatar.Root>
              <Avatar.Root>
                <Avatar.Fallback name="Mei Chen" />
              </Avatar.Root>
            </AvatarGroup>
            <Stack gap="0">
              <Text textStyle="sm" fontWeight="medium">
                4.9 · 2,341 reviews
              </Text>
              <Text textStyle="xs" color="fg.muted">
                Designers · Devs · PMs
              </Text>
            </Stack>
          </HStack>
        </Stack>
      </Box>

      <Tour.Root tour={tour}>
        <TourOverlay />
      </Tour.Root>
    </Stack>
  )
}

const swatchBg = {
  indigo: { from: "indigo.200", to: "indigo.500", accent: "#6366f1" },
  rose: { from: "rose.200", to: "rose.500", accent: "#f43f5e" },
  slate: { from: "slate.200", to: "slate.500", accent: "#475569" },
} as const

const steps: TourStep[] = [
  {
    id: "gallery",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#store-gallery"),
    title: "Preview every screen",
    description: "Hover to scrub through 40+ pages included in the kit.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "swatches",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#store-swatches"),
    title: "Three ready themes 🎨",
    description:
      "Indigo ships default. Rose and Slate are just a token swap away.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "qty",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#store-qty"),
    title: "Team licenses",
    description: "Increase quantity for per-seat pricing — 20% off at 5+.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "add",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#store-add"),
    title: "One-click checkout",
    description:
      "Apple Pay, Link, or card. Your license key arrives in under 30s.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "reviews",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#store-reviews"),
    title: "Read what designers think",
    description:
      "Filter by role (designer, dev, PM) to see reviews like yours.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Done", action: "dismiss" },
    ],
  },
]
