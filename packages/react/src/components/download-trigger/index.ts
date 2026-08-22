"use client"

import {
  DownloadTrigger as ArkDownloadTrigger,
  type DownloadTriggerBaseProps,
} from "@ark-ui/react/download-trigger"
import { type HTMLChakraProps, createRecipeContext } from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const { withContext } = createRecipeContext({ key: "downloadTrigger" })

////////////////////////////////////////////////////////////////////////////////////

export interface DownloadTriggerProps
  extends HTMLChakraProps<"button">, DownloadTriggerBaseProps {}

export const DownloadTrigger = withContext<
  HTMLButtonElement,
  DownloadTriggerProps
>(ArkDownloadTrigger, { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export { useDownload } from "@ark-ui/react/download-trigger"
export type {
  DownloadableData,
  UseDownloadProps,
  UseDownloadReturn,
} from "@ark-ui/react/download-trigger"
