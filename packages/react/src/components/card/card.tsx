"use client"

import { createSlotRecipeContext } from "@chakra-ui/styled-system/jsx"
import { card } from "@chakra-ui/styled-system/recipes/card"
import type {
  HTMLChakraProps,
  SlotRecipeProps,
  UnstyledProp,
} from "../../styled-system"

const { withProvider, withContext } = createSlotRecipeContext(card)

export interface CardRootBaseProps
  extends SlotRecipeProps<"card">, UnstyledProp {}

export interface CardRootProps extends HTMLChakraProps<
  "div",
  CardRootBaseProps
> {}

export const CardRoot = withProvider("div", "root")

export interface CardBodyProps extends HTMLChakraProps<"div">, UnstyledProp {}

export const CardBody = withContext("div", "body")

export interface CardHeaderProps extends HTMLChakraProps<"div">, UnstyledProp {}

export const CardHeader = withContext("div", "header")

export interface CardFooterProps extends HTMLChakraProps<"div">, UnstyledProp {}

export const CardFooter = withContext("div", "footer")

export interface CardTitleProps extends HTMLChakraProps<"h2">, UnstyledProp {}

export const CardTitle = withContext("h3", "title")

export interface CardDescriptionProps
  extends HTMLChakraProps<"p">, UnstyledProp {}

export const CardDescription = withContext("p", "description")
