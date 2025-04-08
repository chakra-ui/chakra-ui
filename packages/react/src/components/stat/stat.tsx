"use client"

import { forwardRef, useMemo } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createSlotRecipeContext,
  useSlotRecipe,
} from "../../styled-system"
import { ArrowDownIcon, ArrowUpIcon } from "../icons"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useStatStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "stat" })

export { useStatStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface StatRootBaseProps
  extends SlotRecipeProps<"stat">,
    UnstyledProp {}

export interface StatRootProps
  extends HTMLChakraProps<"dl", StatRootBaseProps> {}

export const StatRoot = withProvider<HTMLDListElement, StatRootProps>(
  "dl",
  "root",
)

export const StatPropsProvider =
  PropsProvider as React.Provider<StatRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface StatLabelProps extends HTMLChakraProps<"dt"> {}

export const StatLabel = withContext<HTMLElement, StatLabelProps>("dt", "label")

////////////////////////////////////////////////////////////////////////////////////

export interface StatValueTextProps extends HTMLChakraProps<"dd"> {}

export const StatValueText = withContext<HTMLElement, StatValueTextProps>(
  "dd",
  "valueText",
)

////////////////////////////////////////////////////////////////////////////////////

export interface StatHelpTextProps extends HTMLChakraProps<"span"> {}

export const StatHelpText = withContext<HTMLElement, StatHelpTextProps>(
  "span",
  "helpText",
)

////////////////////////////////////////////////////////////////////////////////////

export interface StatValueUnitProps extends HTMLChakraProps<"span"> {}

export const StatValueUnit = withContext<HTMLElement, StatValueUnitProps>(
  "span",
  "valueUnit",
)

////////////////////////////////////////////////////////////////////////////////////

export interface StatUpIndicatorProps extends HTMLChakraProps<"span"> {}

export const StatUpIndicator = withContext<HTMLElement, StatUpIndicatorProps>(
  "span",
  "indicator",
  {
    defaultProps: {
      "data-type": "up",
      children: <ArrowUpIcon />,
    },
  },
)

////////////////////////////////////////////////////////////////////////////////////

export interface StatDownIndicatorProps extends HTMLChakraProps<"span"> {}

export const StatDownIndicator = withContext<
  HTMLElement,
  StatDownIndicatorProps
>("span", "indicator", {
  defaultProps: {
    "data-type": "down",
    children: <ArrowDownIcon />,
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface StatGroupProps
  extends SlotRecipeProps<"stat">,
    HTMLChakraProps<"div"> {}

export const StatGroup = forwardRef<HTMLDivElement, StatGroupProps>(
  function StatGroup(props, ref) {
    const recipe = useSlotRecipe({ key: "stat" })
    const [variantProps, localProps] = useMemo(
      () => recipe.splitVariantProps(props),
      [props, recipe],
    )
    return (
      <PropsProvider value={variantProps}>
        <chakra.div
          ref={ref}
          role="group"
          display="flex"
          flexWrap="wrap"
          justifyContent="space-around"
          alignItems="flex-start"
          {...localProps}
        />
      </PropsProvider>
    )
  },
)
