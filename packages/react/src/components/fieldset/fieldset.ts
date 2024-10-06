"use client"

import type { Assign } from "@ark-ui/react"
import { ark } from "@ark-ui/react/factory"
import { Fieldset } from "@ark-ui/react/fieldset"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  createSlotRecipeContext,
} from "../../styled-system"

const { withProvider, withContext } = createSlotRecipeContext({
  key: "fieldset",
})

interface FieldsetRootBaseProps
  extends Assign<Fieldset.RootBaseProps, SlotRecipeProps<"fieldset">> {}

export interface FieldsetRootProps
  extends HTMLChakraProps<"fieldset", FieldsetRootBaseProps> {}

export const FieldsetRoot = withProvider<
  HTMLFieldSetElement,
  FieldsetRootProps
>(Fieldset.Root, "root")

export interface FieldsetErrorTextProps
  extends HTMLChakraProps<"span", Fieldset.ErrorTextBaseProps> {}

export const FieldsetErrorText = withContext<
  HTMLSpanElement,
  FieldsetErrorTextProps
>(Fieldset.ErrorText, "errorText")

export interface FieldsetHelperTextProps
  extends HTMLChakraProps<"span", Fieldset.HelperTextBaseProps> {}

export const FieldsetHelperText = withContext<
  HTMLSpanElement,
  FieldsetHelperTextProps
>(Fieldset.HelperText, "helperText")

export interface FieldsetLegendProps
  extends HTMLChakraProps<"legend", Fieldset.LegendBaseProps> {}

export const FieldsetLegend = withContext<
  HTMLLegendElement,
  FieldsetLegendProps
>(Fieldset.Legend, "legend")

export interface FieldsetContentProps extends HTMLChakraProps<"div"> {}

export const FieldsetContent = withContext<
  HTMLDivElement,
  FieldsetContentProps
>(ark.div, "content")

export const FieldsetContext = Fieldset.Context
