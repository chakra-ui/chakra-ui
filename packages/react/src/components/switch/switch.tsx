"use client"

import type { Assign } from "@ark-ui/react"
import { Switch as ArkSwitch, useSwitchContext } from "@ark-ui/react/switch"
import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createSlotRecipeContext,
} from "../../styled-system"
import { dataAttr } from "../../utils"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useSwitchStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "switch" })

export { useSwitchStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface SwitchRootProviderBaseProps
  extends Assign<ArkSwitch.RootProviderBaseProps, SlotRecipeProps<"switch">>,
    UnstyledProp {}

export interface SwitchRootProviderProps
  extends HTMLChakraProps<"label", SwitchRootProviderBaseProps> {}

export const SwitchRootProvider = withProvider<
  HTMLLabelElement,
  SwitchRootProviderProps
>(ArkSwitch.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SwitchRootBaseProps
  extends Assign<ArkSwitch.RootBaseProps, SlotRecipeProps<"switch">>,
    UnstyledProp {}

export interface SwitchRootProps
  extends HTMLChakraProps<"label", SwitchRootBaseProps> {}

export const SwitchRoot = withProvider<HTMLLabelElement, SwitchRootProps>(
  ArkSwitch.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export const SwitchPropsProvider =
  PropsProvider as React.Provider<SwitchRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface SwitchLabelProps
  extends HTMLChakraProps<"span", ArkSwitch.LabelBaseProps> {}

export const SwitchLabel = withContext<HTMLSpanElement, SwitchLabelProps>(
  ArkSwitch.Label,
  "label",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SwitchControlProps
  extends HTMLChakraProps<"span", ArkSwitch.ControlBaseProps> {}

export const SwitchControl = withContext<HTMLSpanElement, SwitchControlProps>(
  ArkSwitch.Control,
  "control",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SwitchThumbProps
  extends HTMLChakraProps<"span", ArkSwitch.ThumbBaseProps> {}

export const SwitchThumb = withContext<HTMLSpanElement, SwitchThumbProps>(
  ArkSwitch.Thumb,
  "thumb",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SwitchIndicatorProps extends HTMLChakraProps<"span"> {
  fallback?: React.ReactNode
}

export const SwitchIndicator = forwardRef<
  HTMLSpanElement,
  SwitchIndicatorProps
>(function SwitchIndicator(props, ref) {
  const api = useSwitchContext()
  const styles = useSwitchStyles()
  const { fallback, children, ...rest } = props
  return (
    <chakra.span
      ref={ref}
      data-checked={dataAttr(api.checked)}
      {...rest}
      css={[styles.indicator, props.css]}
    >
      {api.checked ? children : fallback}
    </chakra.span>
  )
})

////////////////////////////////////////////////////////////////////////////////////

export interface SwitchThumbIndicatorProps extends HTMLChakraProps<"span"> {
  fallback?: React.ReactNode
}

export const SwitchThumbIndicator = forwardRef<
  HTMLSpanElement,
  SwitchThumbIndicatorProps
>(function SwitchThumbIndicator(props, ref) {
  const api = useSwitchContext()
  const { fallback, children, ...rest } = props
  return (
    <chakra.span ref={ref} data-checked={dataAttr(api.checked)} {...rest}>
      {api.checked ? children : fallback}
    </chakra.span>
  )
})

////////////////////////////////////////////////////////////////////////////////////

export const SwitchContext = ArkSwitch.Context
export const SwitchHiddenInput = ArkSwitch.HiddenInput

export interface SwitchCheckedChangeDetails
  extends ArkSwitch.CheckedChangeDetails {}
