"use client"

import * as React from "react"
import { cva as pandaCva } from "../../styled-system-panda/css"
import { isCssProperty } from "../../styled-system-panda/jsx/is-valid-prop"
import { mergeProps } from "../merge-props"
import { mergeRefs } from "../merge-refs"
import { compact, cx, getElementRef, uniq } from "../utils"
import type { JsxFactory, StyledFactoryFn } from "./factory.types"
import { isHtmlProp, useResolvedProps } from "./use-resolved-props"

const exceptionPropMap: Record<string, string[]> = {
  path: ["d"],
  text: ["x", "y"],
  circle: ["cx", "cy", "r"],
  rect: ["width", "height", "x", "y", "rx", "ry"],
  ellipse: ["cx", "cy", "rx", "ry"],
  g: ["transform"],
  stop: ["offset", "stopOpacity"],
}

const hasProp = (obj: any, prop: string) =>
  Object.prototype.hasOwnProperty.call(obj, prop)

const createStyled = (tag: any, configOrCva: any = {}, options: any = {}) => {
  if (process.env.NODE_ENV !== "production") {
    if (tag === undefined) {
      throw new Error(
        "You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.",
      )
    }
  }

  if (hasProp(exceptionPropMap, tag)) {
    options.forwardProps ||= []
    const props = exceptionPropMap[tag as keyof typeof exceptionPropMap]
    options.forwardProps = uniq([...options.forwardProps, ...props])
  }

  const isReal = tag.__chakra_real === tag
  const baseTag = (isReal && tag.__chakra_base) || tag

  let identifierName: string | undefined
  let targetClassName: string | undefined

  if (options !== undefined) {
    identifierName = options.label
    targetClassName = options.target
  }

  const Styled = React.forwardRef((inProps: any, ref) => {
    const cvaFn = configOrCva.__cva__ ? configOrCva : pandaCva(configOrCva)
    const cvaRecipe = mergeCva(tag.__chakra_cva, cvaFn)

    const createShouldForwardProps = (fwdProps: string[]) => {
      return (prop: string, variantKeys: string[]) => {
        if (fwdProps.includes(prop)) return true
        return !variantKeys?.includes(prop) && !isCssProperty(prop)
      }
    }

    if (!options.shouldForwardProp && options.forwardProps) {
      options.shouldForwardProp = createShouldForwardProps(options.forwardProps)
    }

    const fallbackShouldForwardProp = (prop: string, variantKeys: string[]) => {
      if (prop === "theme") return false
      return !variantKeys?.includes(prop) && !isCssProperty(prop)
    }

    const shouldForwardProp =
      options.shouldForwardProp || fallbackShouldForwardProp

    const propsWithDefault = React.useMemo(
      () => Object.assign({}, options.defaultProps, compact(inProps)),
      [inProps],
    )

    const { props, styles } = useResolvedProps(
      propsWithDefault,
      cvaRecipe,
      shouldForwardProp,
    )

    const stylesClassName = typeof styles === "string" ? styles : ""

    let className = cx(stylesClassName, props.className, targetClassName)

    const shouldUseAs = !shouldForwardProp("as")
    let FinalTag = (shouldUseAs && props.as) || baseTag
    let finalProps: any = {}

    for (const prop in props) {
      if (shouldUseAs && prop === "as") continue

      if (isHtmlProp(prop)) {
        const nativeProp = prop.replace("html", "").toLowerCase()
        finalProps[nativeProp] = props[prop]
        continue
      }

      if (shouldForwardProp(prop)) {
        finalProps[prop] = props[prop]
      }
    }

    const classNameToUse = className.trim()
    if (classNameToUse) {
      finalProps.className = classNameToUse
    } else {
      Reflect.deleteProperty(finalProps, "className")
    }

    finalProps.ref = ref

    const forwardAsChild =
      options.forwardAsChild || options.forwardProps?.includes("asChild")

    if (props.asChild && !forwardAsChild) {
      const child = (
        React.isValidElement(props.children)
          ? React.Children.only(props.children)
          : React.Children.toArray(props.children).find(React.isValidElement)
      ) as React.ReactElement<any> | undefined

      if (!child) {
        throw new Error("[chakra-ui > factory] No valid child found")
      }

      FinalTag = child.type
      finalProps.children = null
      Reflect.deleteProperty(finalProps, "asChild")
      finalProps = mergeProps(finalProps, child.props)
      finalProps.ref = mergeRefs(ref, getElementRef(child))
    }

    if (finalProps.as && forwardAsChild) {
      const asTag = props.as
      finalProps.as = undefined
      return (
        <FinalTag asChild {...finalProps}>
          {React.createElement(asTag, null, finalProps.children)}
        </FinalTag>
      )
    }

    return <FinalTag {...finalProps} />
  })

  Styled.displayName =
    identifierName !== undefined
      ? identifierName
      : `chakra(${
          typeof baseTag === "string"
            ? baseTag
            : baseTag.displayName || baseTag.name || "Component"
        })`
  ;(Styled as any).__chakra_real = Styled
  ;(Styled as any).__chakra_base = baseTag
  ;(Styled as any).__chakra_forwardProp = options.shouldForwardProp
  ;(Styled as any).__chakra_cva = configOrCva

  Object.defineProperty(Styled, "toString", {
    value() {
      if (
        targetClassName === undefined &&
        process.env.NODE_ENV !== "production"
      ) {
        return "NO_COMPONENT_SELECTOR"
      }
      return `.${targetClassName}`
    },
  })

  return Styled
}

const styledFn = createStyled.bind(null) as unknown as JsxFactory

const componentCache = new Map()

const chakraImpl = new Proxy(styledFn, {
  apply(_, __, args: [any, any?, any?]) {
    return styledFn(...args)
  },
  get(_, el) {
    if (!componentCache.has(el)) {
      componentCache.set(el, styledFn(el as any))
    }
    return componentCache.get(el)
  },
})

export const chakra = chakraImpl as unknown as StyledFactoryFn

const mergeCva = (cvaA: any, cvaB: any) => {
  if (cvaA && !cvaB) return cvaA
  if (!cvaA && cvaB) return cvaB
  return cvaA.merge(cvaB)
}
