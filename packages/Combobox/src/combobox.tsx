import {
  chakra,
  omitThemingProps,
  PropsOf,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
} from "@chakra-ui/system"
import { InputProps } from "@chakra-ui/input"
import {
  cx,
  mergeRefs,
  ReactNodeOrRenderProp,
  __DEV__,
  runIfFn,
} from "@chakra-ui/utils"
import * as React from "react"
import {
  ComboboxContextProvider,
  useCombobox,
  UseComboboxReturn,
  UseComboboxProps,
  useComboboxInput,
  UseComboboxInputProps,
  useComboboxList,
  useComboboxListItem,
} from "./combobox.hook"

export type ComboboxProps = UseComboboxProps &
  ThemingProps & {
    children: ReactNodeOrRenderProp<UseComboboxReturn>
  }

/**
 * The wrapper component that provides context, state, and focus
 * management to its sub-components.
 *
 * It doesn't render any DOM node.
 */
export function Combobox(props: ComboboxProps) {
  const styles = useMultiStyleConfig("Combobox", props)
  const realProps = omitThemingProps(props)
  const comboboxCtx = useCombobox(realProps)
  const context = React.useMemo(() => comboboxCtx, [comboboxCtx])
  return (
    <ComboboxContextProvider value={context}>
      <StylesProvider value={styles}>
        {runIfFn(props.children, context)}
      </StylesProvider>
    </ComboboxContextProvider>
  )
}

if (__DEV__) {
  Combobox.displayName = "Combobox"
}

export type ComboboxInputProps = PropsOf<typeof chakra.input> &
  UseComboboxInputProps &
  InputProps

export const ComboboxInput = React.forwardRef(function StyledComboboxInput(
  props: ComboboxInputProps,
  ref: React.Ref<any>,
) {
  const styles = useMultiStyleConfig("Input", props)
  const realProps = omitThemingProps(props)
  const InputProps = useComboboxInput(realProps)
  const _className = cx("chakra-combobox-input", props.className)
  return (
    <chakra.input
      {...InputProps}
      ref={ref}
      __css={styles.field}
      className={_className}
    />
  )
})

//////////////////////////////////////////////////////////////////////////

export type ComboboxListProps = PropsOf<typeof chakra.div>

export const ComboboxList = React.forwardRef(function StyledComboboxList(
  props: ComboboxListProps,
  ref: React.Ref<any>,
) {
  const realProps = omitThemingProps(props)
  const comboboxList = useComboboxList(realProps)
  const styles = useStyles()
  return (
    <chakra.div
      {...comboboxList}
      ref={mergeRefs(comboboxList.ref, ref)}
      __css={{
        outline: 0,
        width: "100%",
        ...styles.comboboxList,
      }}
    />
  )
})

if (__DEV__) {
  ComboboxList.displayName = "ComboboxList"
}

//////////////////////////////////////////////////////////////////////////

export const ComboboxListItem = React.forwardRef(
  function StyledComboboxListItem(
    props: PropsOf<typeof chakra.button>,
    ref: React.Ref<any>,
  ) {
    const styles = useStyles()
    const realProps = omitThemingProps(props)
    const comboboxItem = useComboboxListItem(realProps)
    return (
      <chakra.button
        {...comboboxItem}
        __css={{
          textDecoration: "none",
          color: "inherit",
          userSelect: "none",
          display: "flex",
          width: "100%",
          alignItems: "center",
          textAlign: "left",
          flex: "0 0 auto",
          outline: 0,
          ...styles.comboboxListItem,
        }}
      />
    )
  },
)
