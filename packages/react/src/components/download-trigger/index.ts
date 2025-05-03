"use client"

import {
  DownloadTrigger as ArkDownloadTrigger,
  type DownloadTriggerBaseProps,
} from "@ark-ui/react/download-trigger"
import { type HTMLChakraProps, chakra } from "../../styled-system"

export interface DownloadTriggerProps
  extends HTMLChakraProps<"button">,
    DownloadTriggerBaseProps {}

export const DownloadTrigger = chakra(
  ArkDownloadTrigger,
  {},
  { forwardAsChild: true },
)
