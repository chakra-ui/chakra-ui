"use client"

import { Field as ArkField } from "@ark-ui/react/field"
import { cx, dataAttr } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { createContext } from "../../create-context"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createSlotRecipeContext,
} from "../../styled-system"
import { ChevronDownIcon } from "../icons"

export const [NativeSelectDisabledProvider, useNativeSelectDisabledContext] =
  createContext<boolean>({
    name: "NativeSelectDisabledContext",
    hookName: "useNativeSelectDisabledContext",
    providerName: "<NativeSelect />",
    strict: false,
  })

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  useClassNames,
  useStyles: useNativeSelectStyles,
} = createSlotRecipeContext({ key: "nativeSelect" })

export { useNativeSelectStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface NativeSelectRootProps
  extends HTMLChakraProps<"div">,
    SlotRecipeProps<"nativeSelect">,
    UnstyledProp {
  disabled?: boolean
}

export const NativeSelectRoot = withProvider<
  HTMLDivElement,
  NativeSelectRootProps
>("div", "root", {
  wrapElement(element, props) {
    return (
      <NativeSelectDisabledProvider value={!!props.disabled}>
        {element}
      </NativeSelectDisabledProvider>
    )
  },
})

////////////////////////////////////////////////////////////////////////////////////

type Omitted = "disabled" | "required" | "readOnly" | "size"

export interface NativeSelectFieldProps
  extends Omit<HTMLChakraProps<"select">, Omitted> {
  placeholder?: string
}

const StyledSelect = chakra(ArkField.Select, {}, { forwardAsChild: true })

export const NativeSelectField = forwardRef<
  HTMLSelectElement,
  NativeSelectFieldProps
>(function NativeSelectField(props, ref) {
  const { children, placeholder, ...restProps } = props

  const styles = useNativeSelectStyles()
  const classNames = useClassNames()

  return (
    <StyledSelect
      {...(restProps as any)}
      ref={ref}
      className={cx(classNames.field, props.className)}
      css={[styles.field, props.css]}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {children}
    </StyledSelect>
  )
})

////////////////////////////////////////////////////////////////////////////////////

export interface NativeSelectIndicatorProps extends HTMLChakraProps<"div"> {}

export function NativeSelectIndicator(props: NativeSelectIndicatorProps) {
  const styles = useNativeSelectStyles()
  const disabled = useNativeSelectDisabledContext()
  const classNames = useClassNames()

  return (
    <chakra.div
      {...props}
      data-disabled={dataAttr(disabled)}
      className={cx(classNames.indicator, props.className)}
      css={[styles.indicator, props.css]}
    >
      {props.children ?? <ChevronDownIcon />}
    </chakra.div>
  )
}
