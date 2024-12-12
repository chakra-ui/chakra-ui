import type { Assign } from "@ark-ui/react"
import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementType,
  FunctionComponent,
  JSX,
} from "react"
import type {
  Dict,
  DistributiveOmit,
  DistributiveUnion,
  Pretty,
} from "../utils"
import type { MinimalNested, SystemStyleObject } from "./css.types"
import type { SystemProperties } from "./generated/system.gen"
import type {
  RecipeDefinition,
  RecipeSelection,
  RecipeVariantRecord,
} from "./recipe.types"

export interface UnstyledProp {
  /**
   * If `true`, the element will opt out of the theme styles.
   */
  unstyled?: boolean
}

export interface PolymorphicProps {
  as?: ElementType
  asChild?: boolean
}

export interface HtmlProps {
  htmlSize?: number
  htmlWidth?: string | number
  htmlHeight?: string | number
  htmlTranslate?: "yes" | "no" | undefined
  htmlContent?: string
}

export type HtmlProp =
  | "color"
  | "size"
  | "translate"
  | "transition"
  | "width"
  | "height"
  | "content"

export type PatchHtmlProps<T> = DistributiveOmit<T, HtmlProp> & HtmlProps

export type JsxHtmlProps<T extends Dict, P extends Dict = {}> = Assign<
  PatchHtmlProps<T>,
  P
>

export type ChakraComponent<
  T extends ElementType,
  P extends Dict = {},
> = FunctionComponent<HTMLChakraProps<T, P> & { ref?: any }>

export type HTMLChakraProps<
  T extends ElementType,
  P extends Dict = {},
> = JsxHtmlProps<
  ComponentPropsWithoutRef<T>,
  Assign<JsxStyleProps, P> & PolymorphicProps
>

export type JsxElement<T extends ElementType, P extends Dict> =
  T extends ChakraComponent<infer A, infer B>
    ? ChakraComponent<A, Pretty<DistributiveUnion<P, B>>>
    : ChakraComponent<T, P>

export interface JsxFactory {
  <T extends ElementType>(component: T): ChakraComponent<T, {}>
  <T extends ElementType, P extends RecipeVariantRecord>(
    component: T,
    recipe: RecipeDefinition<P>,
    options?: JsxFactoryOptions<Assign<ComponentProps<T>, RecipeSelection<P>>>,
  ): JsxElement<T, RecipeSelection<P>>
}

type JsxElements = {
  [K in keyof JSX.IntrinsicElements]: ChakraComponent<K, {}>
}

export type StyledFactoryFn = JsxFactory & JsxElements

export type DataAttr = Record<
  `data-${string}`,
  string | number | undefined | null | boolean
>

export interface JsxFactoryOptions<TProps> {
  forwardProps?: string[]
  defaultProps?: Partial<TProps> & DataAttr
  forwardAsChild?: boolean
  shouldForwardProp?(prop: string, variantKeys: string[]): boolean
}

export interface JsxStyleProps
  extends SystemProperties,
    MinimalNested<SystemStyleObject> {
  css?:
    | SystemStyleObject
    | undefined
    | Omit<(SystemStyleObject | undefined)[], keyof any[]>
}

export type InferRecipeProps<T> =
  T extends ChakraComponent<any, infer P> ? P : {}
