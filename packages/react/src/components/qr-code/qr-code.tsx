"use client"

import type { Assign } from "@ark-ui/react"
import { QrCode as ArkQrCode } from "@ark-ui/react/qr-code"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useQrCodeStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "qrCode" })

export { useQrCodeStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface QrCodeRootBaseProps
  extends Assign<ArkQrCode.RootBaseProps, SlotRecipeProps<"qrCode">>,
    UnstyledProp {}

export interface QrCodeRootProps
  extends HTMLChakraProps<"div", QrCodeRootBaseProps> {}

export const QrCodeRoot = withProvider<HTMLDivElement, QrCodeRootProps>(
  ArkQrCode.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface QrCodeRootProviderBaseProps
  extends Assign<ArkQrCode.RootProviderBaseProps, SlotRecipeProps<"qrCode">>,
    UnstyledProp {}

export interface QrCodeRootProviderProps
  extends HTMLChakraProps<"div", QrCodeRootProviderBaseProps> {}

export const QrCodeRootProvider = withProvider<
  HTMLDivElement,
  QrCodeRootProviderProps
>(ArkQrCode.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export const QrCodePropsProvider =
  PropsProvider as React.Provider<QrCodeRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface QrCodeFrameProps extends HTMLChakraProps<"svg"> {}

export const QrCodeFrame = withContext<SVGSVGElement, QrCodeFrameProps>(
  ArkQrCode.Frame,
  "frame",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface QrCodePatternProps extends HTMLChakraProps<"path"> {}

export const QrCodePattern = withContext<SVGPathElement, QrCodePatternProps>(
  ArkQrCode.Pattern,
  "pattern",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface QrCodeOverlayProps extends HTMLChakraProps<"div"> {}

export const QrCodeOverlay = withContext<HTMLDivElement, QrCodeOverlayProps>(
  ArkQrCode.Overlay,
  "overlay",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface QrCodeDownloadTriggerProps
  extends HTMLChakraProps<"button", ArkQrCode.DownloadTriggerBaseProps> {}

export const QrCodeDownloadTrigger = withContext<
  HTMLButtonElement,
  QrCodeDownloadTriggerProps
>(ArkQrCode.DownloadTrigger, "downloadTrigger", { forwardAsChild: true })
