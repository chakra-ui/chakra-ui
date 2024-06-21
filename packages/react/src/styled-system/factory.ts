"use client"

import { splitProps } from "@chakra-ui/utils"
import styled from "@emotion/styled"
import {
  Children,
  createElement,
  forwardRef,
  isValidElement,
  memo,
  useMemo,
} from "react"
import type { StyledFactoryFn } from "./factory.types"
import { mergeProps } from "./merge-props"
import { mergeRefs } from "./merge-refs"
import { useChakraContext } from "./provider"

const styledFn = (Dynamic: any, configOrCva: any = {}, options: any = {}) => {
  const Comp = forwardRef<any, any>(function Comp(props, ref) {
    const { css, cva, isValidProperty } = useChakraContext()

    const cvaFn = configOrCva.__cva__ ? configOrCva : cva(configOrCva)

    const defaultShouldForwardProp = (prop: string, variantKeys: string[]) =>
      !variantKeys.includes(prop) && !isValidProperty(prop)

    const forwardFn = options.shouldForwardProp || defaultShouldForwardProp
    const forwardAsChild = options.forwardAsChild || false

    const cvaRecipe = mergeCva(Dynamic.__cva, cvaFn)
    const __sfp = mergeShouldForwardProps(Dynamic, forwardFn)

    const {
      asChild,
      as: Element = Dynamic.__el || Dynamic,
      children,
      ...restProps
    } = props

    const assignStaticProps = (el: any) => {
      Object.assign(el, {
        displayName: `chakra(${getDisplayName(Dynamic)})`,
        __cva: cvaRecipe,
        __el: Dynamic,
        __sfp,
      })
    }

    const propsWithDefault = useMemo(
      () => Object.assign({}, options.defaultProps, restProps),
      [restProps],
    )

    const mixedProps = useMemo(() => {
      const [htmlProps, _a] = splitProps(propsWithDefault, [
        "htmlWidth",
        "htmlHeight",
        "htmlSize",
        "htmlTranslate",
      ])

      const [forwardedProps, _b] = splitProps(_a, (key) =>
        __sfp(key, cvaRecipe.variantKeys),
      )

      const [variantProps, _c] = splitProps(_b, cvaRecipe.variantKeys)
      const [styleProps, elementProps] = splitProps(_c, isValidProperty)

      return {
        htmlProps: getHtmlProps(htmlProps),
        forwardedProps,
        variantProps,
        styleProps,
        elementProps,
      }
    }, [cvaRecipe.variantKeys, __sfp, propsWithDefault, isValidProperty])

    const { css: cssStyles, ...propStyles } = mixedProps.styleProps

    const cvaStyles = useMemo(
      () => cvaRecipe(mixedProps.variantProps),
      [cvaRecipe, mixedProps.variantProps],
    )

    const finalChildren = children ?? propsWithDefault.children

    const styles = useMemo((): any => {
      return css(cvaStyles, ...toArray(cssStyles), propStyles)
    }, [css, cvaStyles, cssStyles, propStyles])

    const MemoizedElement = useMemo(
      () => styled(Element)(styles),
      [Element, styles],
    )

    if (!asChild || (asChild && forwardAsChild)) {
      assignStaticProps(MemoizedElement)

      const finalProps = {
        ref,
        ...mixedProps.forwardedProps,
        ...mixedProps.elementProps,
        ...mixedProps.htmlProps,
      }

      if (asChild && forwardAsChild) {
        finalProps.asChild = true
      }

      return createElement(MemoizedElement, finalProps, finalChildren)
    }

    const child = Children.only(finalChildren)

    if (!isValidElement(child)) {
      return child
    }

    const composedProps = mergeProps(
      mixedProps.forwardedProps,
      mixedProps.elementProps,
      child.props ?? {},
    )

    const composedRef = ref
      ? mergeRefs(ref, (child as any).ref)
      : (child as any).ref

    const element = styled(child.type as any)(styles)

    assignStaticProps(element)

    return createElement(element, {
      ref: composedRef,
      ...(composedProps as any),
    })
  })

  return memo(Comp)
}

const cache = new Map()

const chakraImpl = new Proxy(styledFn, {
  apply(_, __, args) {
    // @ts-ignore
    return styledFn(...args)
  },
  get(_, el) {
    if (!cache.has(el)) {
      cache.set(el, styledFn(el))
    }
    return cache.get(el)
  },
})

export const chakra = chakraImpl as unknown as StyledFactoryFn

const getDisplayName = (Component: any) => {
  if (typeof Component === "string") return Component
  return Component?.displayName || Component?.name || "Component"
}

const mergeShouldForwardProps = (el: any, shouldForwardProp: any) =>
  el.__sfp && shouldForwardProp
    ? (propName: string) => el.__sfp(propName) && shouldForwardProp(propName)
    : shouldForwardProp

const mergeCva = (cvaA: any, cvaB: any) => {
  if (cvaA && !cvaB) return cvaA
  if (!cvaA && cvaB) return cvaB
  return cvaA.merge(cvaB)
}

const getHtmlProps = (props: any) => {
  const htmlProps: any = {}
  for (const key in props) {
    if (key.startsWith("html")) {
      htmlProps[key.replace("html", "").toLowerCase()] = props[key]
    }
  }
  return htmlProps
}

const toArray = (val: any) => {
  const res = Array.isArray(val) ? val : [val]
  return res.filter(Boolean).flat()
}
