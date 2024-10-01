"use client"

/**
 * Forked from https://github.com/emotion-js/emotion/blob/main/packages/styled/src/base.js
 * but optimized for Chakra UI. All credits to the original authors.
 *
 * This also serves a bridge to React 19's style tag hoisting features.
 */
import emotionIsPropValid from "@emotion/is-prop-valid"
import { ThemeContext, withEmotionCache } from "@emotion/react"
import { serializeStyles } from "@emotion/serialize"
//@ts-ignore
import { useInsertionEffectAlwaysWithSyncFallback } from "@emotion/use-insertion-effect-with-fallbacks"
import {
  getRegisteredStyles,
  insertStyles,
  registerStyles,
} from "@emotion/utils"
import * as React from "react"
import { mergeProps } from "../merge-props"
import { mergeRefs } from "../merge-refs"
import { compact, cx, interopDefault } from "../utils"
import type { JsxFactory, StyledFactoryFn } from "./factory.types"
import { useChakraContext } from "./provider"
import { useResolvedProps } from "./use-resolved-props"

const isPropValid = interopDefault(emotionIsPropValid)

const testOmitPropsOnStringTag = isPropValid
const testOmitPropsOnComponent = (key: string) => key !== "theme"

const composeShouldForwardProps = (tag: any, options: any, isReal: boolean) => {
  let shouldForwardProp
  if (options) {
    const optionsShouldForwardProp = options.shouldForwardProp
    shouldForwardProp =
      tag.__emotion_forwardProp && optionsShouldForwardProp
        ? (propName: string) =>
            tag.__emotion_forwardProp(propName) &&
            optionsShouldForwardProp(propName)
        : optionsShouldForwardProp
  }

  if (typeof shouldForwardProp !== "function" && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp
  }

  return shouldForwardProp
}

let isBrowser = typeof document !== "undefined"

const Insertion = ({ cache, serialized, isStringTag }: any) => {
  registerStyles(cache, serialized, isStringTag)

  const rules = useInsertionEffectAlwaysWithSyncFallback(() =>
    insertStyles(cache, serialized, isStringTag),
  )

  if (!isBrowser && rules !== undefined) {
    let serializedNames = serialized.name
    let next = serialized.next
    while (next !== undefined) {
      serializedNames = cx(serializedNames, next.name)
      next = next.next
    }
    return (
      <style
        {...{
          [`data-emotion`]: cx(cache.key, serializedNames),
          dangerouslySetInnerHTML: { __html: rules },
          nonce: cache.sheet.nonce,
        }}
      />
    )
  }
  return null
}

const createStyled = (tag: any, configOrCva: any = {}, options: any = {}) => {
  if (process.env.NODE_ENV !== "production") {
    if (tag === undefined) {
      throw new Error(
        "You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.",
      )
    }
  }

  const isReal = tag.__emotion_real === tag
  const baseTag = (isReal && tag.__emotion_base) || tag

  let identifierName: string | undefined
  let targetClassName: string | undefined

  if (options !== undefined) {
    identifierName = options.label
    targetClassName = options.target
  }

  let styles: any[] = []

  const Styled: any = withEmotionCache((inProps: any, cache, ref) => {
    const { cva, isValidProperty } = useChakraContext()

    const cvaFn = configOrCva.__cva__ ? configOrCva : cva(configOrCva)
    const cvaRecipe = mergeCva(tag.__emotion_cva, cvaFn)

    const createShouldForwardProps = (props: string[]) => {
      return (prop: string, variantKeys: string[]) => {
        if (props.includes(prop)) return true
        return !variantKeys?.includes(prop) && !isValidProperty(prop)
      }
    }

    if (!options.shouldForwardProp && options.forwardProps) {
      options.shouldForwardProp = createShouldForwardProps(options.forwardProps)
    }

    const shouldForwardProp = composeShouldForwardProps(tag, options, isReal)

    const initShouldForwardProp = (prop: string, variantKeys: string[]) => {
      const emotionSfp =
        typeof tag === "string" && tag.charCodeAt(0) > 96
          ? testOmitPropsOnStringTag
          : testOmitPropsOnComponent
      const chakraSfp = !variantKeys?.includes(prop) && !isValidProperty(prop)
      return emotionSfp(prop) && chakraSfp
    }

    const defaultShouldForwardProp = shouldForwardProp || initShouldForwardProp

    const propsWithDefault = React.useMemo(
      () => Object.assign({}, options.defaultProps, compact(inProps)),
      [inProps],
    )

    const { props, styles: styleProps } = useResolvedProps(
      propsWithDefault,
      cvaRecipe,
      defaultShouldForwardProp,
    )

    const shouldUseAs = !defaultShouldForwardProp("as")

    let FinalTag = (shouldUseAs && props.as) || baseTag

    let className = ""
    let classInterpolations: any[] = [styleProps]
    let mergedProps: any = props
    if (props.theme == null) {
      mergedProps = {}
      for (let key in props) {
        mergedProps[key] = props[key]
      }
      mergedProps.theme = React.useContext(ThemeContext)
    }

    if (typeof props.className === "string") {
      className = getRegisteredStyles(
        cache.registered,
        classInterpolations,
        props.className,
      )
    } else if (props.className != null) {
      className = cx(className, props.className)
    }

    const serialized = serializeStyles(
      styles.concat(classInterpolations),
      cache.registered,
      mergedProps,
    )
    className = cx(className, `${cache.key}-${serialized.name}`)

    if (targetClassName !== undefined) {
      className = cx(className, targetClassName)
    }

    const finalShouldForwardProp =
      shouldUseAs && shouldForwardProp === undefined
        ? initShouldForwardProp
        : defaultShouldForwardProp

    let newProps: any = {}

    for (let key in props) {
      if (shouldUseAs && key === "as") continue

      if (finalShouldForwardProp(key)) {
        newProps[key] = props[key]
      }
    }

    newProps.className = className.trim()
    newProps.ref = ref

    if (props.asChild && !options.forwardAsChild) {
      const child = React.Children.only(props.children)
      FinalTag = child.type
      newProps.children = null
      newProps = mergeProps(newProps, child.props)
      newProps.ref = mergeRefs(ref, child.ref)
    }

    return (
      <>
        <Insertion
          cache={cache}
          serialized={serialized}
          isStringTag={typeof FinalTag === "string"}
        />
        <FinalTag {...newProps} />
      </>
    )
  })

  Styled.displayName =
    identifierName !== undefined
      ? identifierName
      : `Styled(${
          typeof baseTag === "string"
            ? baseTag
            : baseTag.displayName || baseTag.name || "Component"
        })`

  Styled.__emotion_real = Styled
  Styled.__emotion_base = baseTag
  Styled.__emotion_forwardProp = options.shouldForwardProp
  Styled.__emotion_cva = configOrCva

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

const cache = new Map()

const chakraImpl = new Proxy(styledFn, {
  apply(_, __, args) {
    // @ts-ignore
    return styledFn(...args)
  },
  get(_, el) {
    if (!cache.has(el)) {
      cache.set(el, styledFn(el as any))
    }
    return cache.get(el)
  },
})

export const chakra = chakraImpl as unknown as StyledFactoryFn

const mergeCva = (cvaA: any, cvaB: any) => {
  if (cvaA && !cvaB) return cvaA
  if (!cvaA && cvaB) return cvaB
  return cvaA.merge(cvaB)
}
