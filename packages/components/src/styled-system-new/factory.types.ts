import {
  Assign,
  Dict,
  DistributiveOmit,
  DistributiveUnion,
  Pretty,
} from "@chakra-ui/utils"
import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  FunctionComponent,
  Ref,
} from "react"
import { SystemStyleObject } from "./css.types"
import { MinimalNested } from "./generated/conditions.gen"
import { SystemProperties } from "./generated/system.gen"
import {
  RecipeConfig,
  RecipeSelection,
  RecipeVariantRecord,
} from "./recipe.types"

type ComponentProps<T extends ElementType> = DistributiveOmit<
  ComponentPropsWithoutRef<T>,
  "ref"
> & {
  ref?: Ref<ElementRef<T>>
}

interface PolymorphicProps {
  as?: ElementType
  asChild?: boolean
}

export type ChakraComponent<
  T extends ElementType,
  P extends Dict = {},
> = FunctionComponent<
  ComponentProps<T> & Assign<JsxStyleProps, P> & PolymorphicProps
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
    recipe: RecipeConfig<P>,
    options?: JsxFactoryOptions<Assign<T, RecipeSelection<P>>>,
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
  css?: SystemStyleObject | SystemStyleObject[]
}
