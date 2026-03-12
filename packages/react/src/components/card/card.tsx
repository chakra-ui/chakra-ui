"use client"

import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useCardStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "card" })

export { useCardStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface CardRootBaseProps
  extends SlotRecipeProps<"card">, UnstyledProp {}

export interface CardRootProps extends HTMLChakraProps<
  "div",
  CardRootBaseProps
> {}

export const CardRoot = withProvider<HTMLDivElement, CardRootProps>(
  "div",
  "root",
)
CardRoot.displayName = "CardRoot"

////////////////////////////////////////////////////////////////////////////////////

export const CardPropsProvider =
  PropsProvider as React.Provider<CardRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface CardBodyProps extends HTMLChakraProps<"div">, UnstyledProp {}

export const CardBody = withContext<HTMLDivElement, CardBodyProps>(
  "div",
  "body",
)
CardBody.displayName = "CardBody"

////////////////////////////////////////////////////////////////////////////////////

export interface CardHeaderProps extends HTMLChakraProps<"div">, UnstyledProp {}

export const CardHeader = withContext<HTMLDivElement, CardHeaderProps>(
  "div",
  "header",
)
CardHeader.displayName = "CardHeader"

////////////////////////////////////////////////////////////////////////////////////

export interface CardFooterProps extends HTMLChakraProps<"div">, UnstyledProp {}

export const CardFooter = withContext<HTMLDivElement, CardFooterProps>(
  "div",
  "footer",
)
CardFooter.displayName = "CardFooter"

////////////////////////////////////////////////////////////////////////////////////

export interface CardTitleProps extends HTMLChakraProps<"h2">, UnstyledProp {}

export const CardTitle = withContext<HTMLHeadingElement, CardTitleProps>(
  "h3",
  "title",
)
CardTitle.displayName = "CardTitle"

////////////////////////////////////////////////////////////////////////////////////

export interface CardDescriptionProps
  extends HTMLChakraProps<"p">, UnstyledProp {}

export const CardDescription = withContext<
  HTMLParagraphElement,
  CardDescriptionProps
>("p", "description")
CardDescription.displayName = "CardDescription"
