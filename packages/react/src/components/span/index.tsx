"use client"

import { type HTMLChakraProps, chakra } from "../../styled-system/index.ts"

export interface SpanProps extends HTMLChakraProps<"span"> {}

export const Span = chakra("span")

Span.displayName = "Span"
