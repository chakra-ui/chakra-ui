import {
  Assign,
  Dict,
  DistributiveOmit,
  DistributiveUnion,
  Pretty,
} from "@chakra-ui/utils"
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementType,
  FunctionComponent,
} from "react"
import { MinimalNested, SystemStyleObject } from "./css.types"
import { SystemProperties } from "./generated/system.gen"
import {
  RecipeDefinition,
  RecipeSelection,
  RecipeVariantRecord,
} from "./recipe.types"

export interface PolymorphicProps {
  as?: ElementType
  asChild?: boolean
}

interface HtmlProps {
  htmlWidth?: string | number
  htmlHeight?: string | number
  htmlTranslate?: "yes" | "no" | undefined
  htmlContent?: string
}

export type HtmlProp =
  | "color"
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

export type JsxElement<
  T extends ElementType,
  P extends Dict,
> = T extends ChakraComponent<infer A, infer B>
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

interface JsxFactoryOptions<TProps extends Dict> {
  defaultProps?: TProps
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

export type InferRecipeProps<T> = T extends ChakraComponent<any, infer P>
  ? P
  : {}
