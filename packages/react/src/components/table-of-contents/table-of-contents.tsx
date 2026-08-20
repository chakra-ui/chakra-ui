"use client"

import { type HTMLArkProps } from "@ark-ui/react"
import { ark } from "@ark-ui/react/factory"
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react"
import { createContext } from "../../create-context"
import { useControllableState } from "../../hooks"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { dataAttr } from "../../utils"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useTableOfContentsStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "tableOfContents" })

export { useTableOfContentsStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface TableOfContentsValueChangeDetails {
  value: string[]
}

interface TableOfContentsContextValue {
  value: string[]
  register: (value: string) => VoidFunction
}

const [TableOfContentsContextProvider, useTableOfContentsContext] =
  createContext<TableOfContentsContextValue>({
    name: "TableOfContentsContext",
    hookName: "useTableOfContentsContext",
    providerName: "TableOfContentsRoot",
  })

interface TableOfContentsItemContextValue {
  value: string
  active: boolean
}

const [TableOfContentsItemContextProvider, useTableOfContentsItemContext] =
  createContext<TableOfContentsItemContextValue>({
    name: "TableOfContentsItemContext",
    hookName: "useTableOfContentsItemContext",
    providerName: "TableOfContentsItem",
  })

////////////////////////////////////////////////////////////////////////////////////

interface RootBaseProps extends HTMLArkProps<"nav"> {
  value?: string[] | undefined
  defaultValue?: string[] | undefined
  onValueChange?:
    | ((details: TableOfContentsValueChangeDetails) => void)
    | undefined
  /**
   * The margin around the viewport used to determine the active headings.
   * @default "-20% 0px -60%"
   */
  rootMargin?: string | undefined
}

const RootBase = forwardRef<HTMLElement, RootBaseProps>(
  function RootBase(props, ref) {
    const {
      value: valueProp,
      defaultValue = [],
      onValueChange,
      rootMargin = "-20% 0px -60%",
      children,
      ...restProps
    } = props
    const [registeredValues, setRegisteredValues] = useState<string[]>([])
    const [value, setValue] = useControllableState({
      value: valueProp,
      defaultValue,
      onChange: (nextValue) => onValueChange?.({ value: nextValue }),
      shouldUpdate: (prev, next) =>
        prev.length !== next.length ||
        prev.some((item, index) => item !== next[index]),
    })

    const register = useCallback((itemValue: string) => {
      setRegisteredValues((current) =>
        current.includes(itemValue) ? current : [...current, itemValue],
      )
      return () => {
        setRegisteredValues((current) =>
          current.filter((value) => value !== itemValue),
        )
      }
    }, [])

    useEffect(() => {
      const elements = registeredValues.flatMap((itemValue) => {
        const element = document.getElementById(itemValue)
        return element ? [element] : []
      })
      if (!elements.length || typeof IntersectionObserver === "undefined")
        return

      const visibleValues = new Set<string>()
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const itemValue = entry.target.id
            if (entry.isIntersecting) visibleValues.add(itemValue)
            else visibleValues.delete(itemValue)
          }

          if (visibleValues.size) {
            setValue(
              registeredValues.filter((itemValue) =>
                visibleValues.has(itemValue),
              ),
            )
          }
        },
        { rootMargin },
      )

      elements.forEach((element) => observer.observe(element))
      return () => observer.disconnect()
    }, [registeredValues, rootMargin, setValue])

    const context = useMemo(
      () => ({ value: value ?? [], register }),
      [register, value],
    )

    return (
      <TableOfContentsContextProvider value={context}>
        <ark.nav ref={ref} aria-label="Table of contents" {...restProps}>
          {children}
        </ark.nav>
      </TableOfContentsContextProvider>
    )
  },
)

export interface TableOfContentsRootBaseProps
  extends SlotRecipeProps<"tableOfContents">, UnstyledProp {}

export interface TableOfContentsRootProps
  extends
    Omit<HTMLChakraProps<"nav">, keyof RootBaseProps>,
    RootBaseProps,
    TableOfContentsRootBaseProps {}

export const TableOfContentsRoot = withProvider<
  HTMLElement,
  TableOfContentsRootProps
>(RootBase, "root", {
  forwardAsChild: true,
  forwardProps: ["value", "defaultValue", "onValueChange", "rootMargin"],
})

export const TableOfContentsRootPropsProvider =
  PropsProvider as React.Provider<TableOfContentsRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface TableOfContentsTitleProps
  extends HTMLChakraProps<"h2">, UnstyledProp {}

export const TableOfContentsTitle = withContext<
  HTMLHeadingElement,
  TableOfContentsTitleProps
>("h2", "title")

////////////////////////////////////////////////////////////////////////////////////

export interface TableOfContentsListProps
  extends HTMLChakraProps<"ol">, UnstyledProp {}

export const TableOfContentsList = withContext<
  HTMLOListElement,
  TableOfContentsListProps
>("ol", "list")

////////////////////////////////////////////////////////////////////////////////////

interface ItemBaseProps extends HTMLArkProps<"li"> {
  value: string
  depth?: number | undefined
}

const ItemBase = forwardRef<HTMLLIElement, ItemBaseProps>(
  function ItemBase(props, ref) {
    const { value, depth = 0, children, style, ...restProps } = props
    const context = useTableOfContentsContext()
    const active = context.value.includes(value)

    const itemContext = useMemo(() => ({ value, active }), [active, value])

    return (
      <TableOfContentsItemContextProvider value={itemContext}>
        <ark.li
          ref={ref}
          data-current={dataAttr(active)}
          data-depth={depth}
          style={{
            ...style,
            ["--table-of-contents-depth" as string]: depth,
          }}
          {...restProps}
        >
          {children}
        </ark.li>
      </TableOfContentsItemContextProvider>
    )
  },
)

export interface TableOfContentsItemProps
  extends Omit<HTMLChakraProps<"li">, "value">, UnstyledProp {
  value: string
  depth?: number | undefined
}

export const TableOfContentsItem = withContext<
  HTMLLIElement,
  TableOfContentsItemProps
>(ItemBase, "item", {
  forwardAsChild: true,
  forwardProps: ["value", "depth"],
})

////////////////////////////////////////////////////////////////////////////////////

const LinkBase = forwardRef<HTMLAnchorElement, HTMLArkProps<"a">>(
  function LinkBase(props, ref) {
    const { value, active } = useTableOfContentsItemContext()
    const { register } = useTableOfContentsContext()

    useEffect(() => register(value), [register, value])

    return (
      <ark.a
        ref={ref}
        href={`#${value}`}
        aria-current={active ? "location" : undefined}
        data-current={dataAttr(active)}
        {...props}
      />
    )
  },
)

export interface TableOfContentsLinkProps
  extends HTMLChakraProps<"a">, UnstyledProp {}

export const TableOfContentsLink = withContext<
  HTMLAnchorElement,
  TableOfContentsLinkProps
>(LinkBase, "link", { forwardAsChild: true })
