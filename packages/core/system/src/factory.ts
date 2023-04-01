import {
  type Assign,
  type HTMLPolymorphicComponents,
  type HTMLPolymorphicProps,
  polymorphicFactory,
} from "@polymorphic-factory/react"
import { ChakraStyledOptions, styled } from "./system"
import type { As, ChakraProps } from "./system.types"

export type {
  Assign,
  PropsOf,
  ComponentWithAs,
} from "@polymorphic-factory/react"

export type HTMLChakraComponents = HTMLPolymorphicComponents<ChakraProps>

export type HTMLChakraProps<T extends As> = Assign<
  HTMLPolymorphicProps<T>,
  ChakraProps
>

export const chakra = polymorphicFactory<ChakraProps, ChakraStyledOptions>({
  styled,
})
