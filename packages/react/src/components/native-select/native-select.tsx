"use client"

import { Field as ArkField, useFieldContext } from "@ark-ui/react/field"
import { forwardRef } from "react"
import { createContext } from "../../create-context"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createSlotRecipeContext,
} from "../../styled-system"
import { cx, dataAttr } from "../../utils"
import { ChevronDownIcon } from "../icons"

interface NativeSelectBaseProps {
  disabled?: boolean
  invalid?: boolean
}

const [NativeSelectBasePropsProvider, useNativeSelectBaseProps] =
  createContext<NativeSelectBaseProps>({
    name: "NativeSelectBasePropsContext",
    hookName: "useNativeSelectBaseProps",
    providerName: "<NativeSelectRoot />",
    strict: false,
  })

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  useClassNames,
  useStyles: useNativeSelectStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "nativeSelect" })

export { useNativeSelectStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface NativeSelectRootBaseProps
  extends SlotRecipeProps<"nativeSelect">,
    UnstyledProp,
    NativeSelectBaseProps {}

export interface NativeSelectRootProps
  extends HTMLChakraProps<"div", NativeSelectRootBaseProps> {}

export const NativeSelectRoot = withProvider<
  HTMLDivElement,
  NativeSelectRootProps
>("div", "root", {
  wrapElement(element, props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const field = useFieldContext()

    const disabled = Boolean(field?.disabled ?? props.disabled)
    const invalid = Boolean(field?.invalid ?? props.invalid)

    return (
      <NativeSelectBasePropsProvider value={{ disabled, invalid }}>
        {element}
      </NativeSelectBasePropsProvider>
    )
  },
})

////////////////////////////////////////////////////////////////////////////////////

export const NativeSelectPropsProvider =
  PropsProvider as React.Provider<NativeSelectRootBaseProps>

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

  const { disabled, invalid } = useNativeSelectBaseProps()
  const styles = useNativeSelectStyles()
  const classNames = useClassNames()

  return (
    <StyledSelect
      disabled={disabled}
      data-invalid={dataAttr(invalid)}
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
  const { disabled, invalid } = useNativeSelectBaseProps()
  const classNames = useClassNames()
  return (
    <chakra.div
      {...props}
      data-disabled={dataAttr(disabled)}
      data-invalid={dataAttr(invalid)}
      className={cx(classNames.indicator, props.className)}
      css={[styles.indicator, props.css]}
    >
      {props.children ?? <ChevronDownIcon />}
    </chakra.div>
  )
}
