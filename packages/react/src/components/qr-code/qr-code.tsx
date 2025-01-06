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
  extends Assign<ArkQrCode.RootProps, SlotRecipeProps<"qrCode">>,
    UnstyledProp {}

export interface QrCodeRootProps
  extends HTMLChakraProps<"div", QrCodeRootBaseProps> {}

export const QrCodeRoot = withProvider<HTMLDivElement, QrCodeRootProps>(
  ArkQrCode.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface QrCodeRootProviderProps
  extends Assign<ArkQrCode.RootProviderProps, SlotRecipeProps<"qrCode">>,
    UnstyledProp {}

export const QrCodeRootProvider = withProvider<
  HTMLDivElement,
  QrCodeRootProviderProps
>(ArkQrCode.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export const QrCodePropsProvider =
  PropsProvider as React.Provider<QrCodeRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface QrCodeFrameProps extends HTMLChakraProps<"div"> {}

export const QrCodeFrame = withContext<HTMLDivElement, QrCodeFrameProps>(
  ArkQrCode.Frame,
  "frame",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface QrCodePatternProps extends HTMLChakraProps<"div"> {}

export const QrCodePattern = withContext<HTMLDivElement, QrCodePatternProps>(
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
