import type {
  Assign,
  Dict,
  DistributiveOmit,
  DistributiveUnion,
  Pretty,
} from "@chakra-ui/utils"
import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementType,
  FunctionComponent,
} from "react"
import type { MinimalNested, SystemStyleObject } from "./css.types"
import type { SystemProperties } from "./generated/system.gen"
import type {
  RecipeDefinition,
  RecipeSelection,
  RecipeVariantRecord,
} from "./recipe.types"

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

type PatchHtmlProps<T> = DistributiveOmit<T, HtmlProp> & HtmlProps

type AssignHtmlProps<T extends Dict, P extends Dict = {}> = Assign<
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
> = AssignHtmlProps<
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

export interface JsxFactoryOptions<TProps> {
  defaultProps?: TProps
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

export interface UnstyledProp {
  /**
   * If `true`, the element will opt out of the theme styles.
   */
  unstyled?: boolean
}

export type PropGetterFn<T extends keyof JSX.IntrinsicElements, P = unknown> = (
  props?: Partial<Omit<JSX.IntrinsicElements[T], HtmlProp | keyof P>> & P,
  ref?: any,
) => JSX.IntrinsicElements[T] & { ref?: any } & {
  [key in `data-${string}`]?: any
}
