import type { Assign } from "@ark-ui/react"
import {
  Presence as ArkPresence,
  type PresenceProps as ArkPresenceProps,
} from "@ark-ui/react/presence"
import { type HTMLChakraProps, chakra } from "../../styled-system"

export interface PresenceProps
  extends Assign<HTMLChakraProps<"div">, ArkPresenceProps> {}

export const Presence = chakra(ArkPresence)
