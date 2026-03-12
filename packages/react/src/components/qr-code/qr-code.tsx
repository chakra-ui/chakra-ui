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
  extends
    Assign<ArkQrCode.RootBaseProps, SlotRecipeProps<"qrCode">>,
    UnstyledProp {}

export interface QrCodeRootProps extends HTMLChakraProps<
  "div",
  QrCodeRootBaseProps
> {}

export const QrCodeRoot = withProvider<HTMLDivElement, QrCodeRootProps>(
  ArkQrCode.Root,
  "root",
  { forwardAsChild: true },
)
QrCodeRoot.displayName = "QrCodeRoot"

////////////////////////////////////////////////////////////////////////////////////

export interface QrCodeRootProviderBaseProps
  extends
    Assign<ArkQrCode.RootProviderBaseProps, SlotRecipeProps<"qrCode">>,
    UnstyledProp {}

export interface QrCodeRootProviderProps extends HTMLChakraProps<
  "div",
  QrCodeRootProviderBaseProps
> {}

export const QrCodeRootProvider = withProvider<
  HTMLDivElement,
  QrCodeRootProviderProps
>(ArkQrCode.RootProvider, "root", { forwardAsChild: true })
QrCodeRootProvider.displayName = "QrCodeRootProvider"

////////////////////////////////////////////////////////////////////////////////////

export const QrCodePropsProvider =
  PropsProvider as React.Provider<QrCodeRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface QrCodePatternProps
  extends HTMLChakraProps<"path">, UnstyledProp {}

export const QrCodePattern = withContext<SVGPathElement, QrCodePatternProps>(
  ArkQrCode.Pattern,
  "pattern",
  { forwardAsChild: true },
)
QrCodePattern.displayName = "QrCodePattern"

////////////////////////////////////////////////////////////////////////////////////

export interface QrCodeFrameProps
  extends HTMLChakraProps<"svg">, UnstyledProp {}

export const QrCodeFrame = withContext<SVGSVGElement, QrCodeFrameProps>(
  ArkQrCode.Frame,
  "frame",
  {
    forwardAsChild: true,
    defaultProps: { children: <QrCodePattern /> },
  },
)
QrCodeFrame.displayName = "QrCodeFrame"

////////////////////////////////////////////////////////////////////////////////////

export interface QrCodeOverlayProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

export const QrCodeOverlay = withContext<HTMLDivElement, QrCodeOverlayProps>(
  ArkQrCode.Overlay,
  "overlay",
  { forwardAsChild: true },
)
QrCodeOverlay.displayName = "QrCodeOverlay"

////////////////////////////////////////////////////////////////////////////////////

export interface QrCodeDownloadTriggerProps
  extends
    HTMLChakraProps<"button", ArkQrCode.DownloadTriggerBaseProps>,
    UnstyledProp {}

export const QrCodeDownloadTrigger = withContext<
  HTMLButtonElement,
  QrCodeDownloadTriggerProps
>(ArkQrCode.DownloadTrigger, "downloadTrigger", { forwardAsChild: true })
QrCodeDownloadTrigger.displayName = "QrCodeDownloadTrigger"
