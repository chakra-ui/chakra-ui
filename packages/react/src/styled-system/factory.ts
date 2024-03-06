import { splitProps } from "@chakra-ui/utils"
import styled from "@emotion/styled"
import {
  Children,
  ElementRef,
  ElementType,
  createElement,
  forwardRef,
  isValidElement,
  memo,
  useMemo,
} from "react"
import { StyledFactoryFn } from "./factory.types"
import { mergeProps } from "./merge-props"
import { mergeRefs } from "./merge-refs"
import { useSystemContext } from "./provider"

const styledFn = (Dynamic: any, configOrCva: any = {}, options: any = {}) => {
  const Comp = forwardRef<any, any>(function Comp(props, ref) {
    const { css, cva, isValidProperty } = useSystemContext()

    const cvaFn = configOrCva.__cva__ ? configOrCva : cva(configOrCva)

    const defaultShouldForwardProp = (prop: string, variantKeys: string[]) =>
      !variantKeys.includes(prop) && !isValidProperty(prop)

    const forwardFn = options.shouldForwardProp || defaultShouldForwardProp

    const __cva = mergeCva(Dynamic.__cva, cvaFn)
    const __sfp = mergeShouldForwardProps(Dynamic, forwardFn)

    const {
      asChild,
      as: Element = Dynamic.__el || Dynamic,
      children,
      ...restProps
    } = props

    const assign = (el: any) => {
      Object.assign(el, {
        displayName: `chakra.${getDisplayName(Dynamic)}`,
        __cva: __cva,
        __el: Dynamic,
        __sfp,
      })
    }

    const combinedProps = useMemo(
      () => Object.assign({}, options.defaultProps, restProps),
      [restProps],
    )

    const res = useMemo(() => {
      const [htmlProps, _a] = splitProps(combinedProps, [
        "htmlWidth",
        "htmlHeight",
        "htmlSize",
        "htmlTranslate",
      ])
      const [forwardedProps, _b] = splitProps(_a, (key) =>
        __sfp(key, __cva.variantKeys),
      )
      const [variantProps, _c] = splitProps(_b, __cva.variantKeys)
      const [styleProps, elementProps] = splitProps(_c, isValidProperty)
      return {
        htmlProps: getHTMLProps(htmlProps),
        forwardedProps,
        variantProps,
        styleProps,
        elementProps,
      }
    }, [__cva.variantKeys, __sfp, combinedProps, isValidProperty])

    const { css: cssStyles, ...propStyles } = res.styleProps
    const cvaStyles = useMemo(
      () => __cva(res.variantProps),
      // eslint-disable-next-line
      [res.variantProps],
    )

    const _children = combinedProps.children ?? children

    const styles = useMemo((): any => {
      return css(cvaStyles, ...toArray(cssStyles), propStyles)
    }, [css, cvaStyles, cssStyles, propStyles])

    if (!asChild) {
      // eslint-disable-next-line
      const element = useMemo(() => styled(Element)(styles), [Element, styles])

      assign(element)

      return createElement(
        element,
        {
          ref,
          ...res.forwardedProps,
          ...res.elementProps,
          ...res.htmlProps,
        },
        _children,
      )
    }

    const onlyChild = Children.only(_children)

    if (!isValidElement(onlyChild)) return onlyChild

    const composedProps = mergeProps(restProps, onlyChild.props ?? {})

    const composedRef = ref
      ? mergeRefs(ref, (onlyChild as any).ref)
      : (onlyChild as any).ref

    // eslint-disable-next-line
    const element = useMemo(
      () => styled(onlyChild.type as any)(styles),
      [onlyChild.type, styles],
    )

    assign(element)

    return createElement(element, {
      ref: composedRef,
      ...composedProps,
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

const getHTMLProps = (props: any) => {
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
  return res.filter(Boolean)
}

function _forwardRef<P, T extends ElementType>(
  component: React.ForwardRefRenderFunction<ElementRef<T>, P>,
) {
  return forwardRef(component) as React.ForwardRefExoticComponent<
    React.PropsWithoutRef<P> & React.RefAttributes<T>
  >
}

export { _forwardRef as forwardRef }
