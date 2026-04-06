"use client"

/**
 * Chakra v4 Static Factory — Zero Emotion.
 *
 * Drop-in replacement for factory.tsx. Produces the same `chakra.div`,
 * `chakra.button` components but without Emotion.
 *
 * Key difference: when `css()` in SystemContext returns class name strings
 * (from Panda's runtime), `useResolvedProps` returns `styles` as a string.
 * This factory just uses that string as className — no serialization needed.
 *
 * Every existing Chakra component works unchanged because they only interact
 * with `chakra.button` via `css={...}` and `className={...}` props.
 */
import * as React from "react"
import { mergeProps } from "../merge-props"
import { mergeRefs } from "../merge-refs"
import { compact, cx, getElementRef, uniq } from "../utils"
import type { JsxFactory, StyledFactoryFn } from "./factory.types"
import { useChakraContext } from "./provider"
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

/**
 * Simple prop validity check — replaces @emotion/is-prop-valid.
 * Forwards known HTML attributes + data-* + aria-* + event handlers.
 */
const isForwardableProp = (prop: string, isStringTag: boolean) => {
  if (!isStringTag) return prop !== "theme"
  if (prop.startsWith("on") && prop[2] === prop[2]?.toUpperCase()) return true
  if (prop.startsWith("data-") || prop.startsWith("aria-")) return true
  return /^(role|id|className|style|ref|key|children|tabIndex|htmlFor|autoFocus|disabled|hidden|title|lang|dir|slot|form|name|value|checked|selected|readOnly|required|placeholder|type|href|target|rel|src|alt|loading|width|height|action|method|autoComplete|download|open|controls|loop|muted|poster|preload|wrap|rows|cols|maxLength|minLength|pattern|step|min|max|multiple|accept|capture|crossOrigin|sizes|srcSet|useMap|nonce|defer|async|noValidate|formAction|formMethod|formTarget|formNoValidate|formEncType|inputMode|enterKeyHint|is|itemProp|itemScope|itemType|itemID|itemRef|about|content|datatype|inlist|prefix|property|resource|rev|typeof|vocab|accessKey|contentEditable|contextMenu|draggable|dropzone|spellCheck|translate|radioGroup|results|security|unselectable)$/.test(
    prop,
  )
}

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

  const isReal = tag.__emotion_real === tag
  const baseTag = (isReal && tag.__emotion_base) || tag

  let identifierName: string | undefined
  let targetClassName: string | undefined

  if (options !== undefined) {
    identifierName = options.label
    targetClassName = options.target
  }

  const Styled = React.forwardRef((inProps: any, ref) => {
    const { isValidProperty } = useChakraContext()
    const cvaFn = configOrCva.__cva__
      ? configOrCva
      : useChakraContext().cva(configOrCva)
    const cvaRecipe = mergeCva(tag.__emotion_cva, cvaFn)

    const isStringTag = typeof baseTag === "string"

    const createShouldForwardProps = (fwdProps: string[]) => {
      return (prop: string, variantKeys: string[]) => {
        if (fwdProps.includes(prop)) return true
        return !variantKeys?.includes(prop) && !isValidProperty(prop)
      }
    }

    if (!options.shouldForwardProp && options.forwardProps) {
      options.shouldForwardProp = createShouldForwardProps(options.forwardProps)
    }

    const fallbackShouldForwardProp = (prop: string, variantKeys: string[]) => {
      const htmlSfp = isForwardableProp(prop, isStringTag)
      const chakraSfp = !variantKeys?.includes(prop) && !isValidProperty(prop)
      return htmlSfp && chakraSfp
    }

    const shouldForwardProp =
      options.shouldForwardProp || fallbackShouldForwardProp

    const propsWithDefault = React.useMemo(
      () => Object.assign({}, options.defaultProps, compact(inProps)),
      [inProps],
    )

    // useResolvedProps does all the heavy lifting:
    // - Splits props into variants, style props, element props
    // - Calls cvaRecipe(variantProps) to get styles
    // - Calls css(cvaStyles, ...cssArray, propStyles)
    //
    // In v4 static mode, css() returns a class name STRING (from Panda).
    // In v3 emotion mode, css() returns a style OBJECT.
    const { props, styles } = useResolvedProps(
      propsWithDefault,
      cvaRecipe,
      shouldForwardProp,
    )

    // In v4 static mode: styles is a class name string like "p_4 bg_red.500"
    // In v3 emotion mode: styles is a CSS object like { padding: "var(--spacing-4)" }
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

    // asChild support
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

    // Zero Emotion — just render the element with class names.
    // No <Insertion> component, no serializeStyles, no style injection.
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

  // Keep __emotion_* for backward compat — some internal code checks these
  ;(Styled as any).__emotion_real = Styled
  ;(Styled as any).__emotion_base = baseTag
  ;(Styled as any).__emotion_forwardProp = options.shouldForwardProp
  ;(Styled as any).__emotion_cva = configOrCva

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

// @ts-ignore
const styledFn = createStyled.bind() as unknown as JsxFactory

const componentCache = new Map()

const chakraImpl = new Proxy(styledFn, {
  apply(_, __, args) {
    // @ts-ignore
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
