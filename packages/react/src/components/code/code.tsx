"use client"

import * as React from "react"
import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

// Create a context for the Code component using Chakra's recipe system
const { withContext, PropsProvider } = createRecipeContext({
  key: "code", // Unique key to identify this recipe
})

// Base props for the Code component
export interface CodeBaseProps extends RecipeProps<"code">, UnstyledProp {}

// Props including standard HTML <code> element props
export interface CodeProps extends HTMLChakraProps<"code", CodeBaseProps> {}

// Create the Code component using the recipe context
export const Code = withContext<HTMLElement, CodeProps>("code")

// Wrap the original Code component to inject default right padding
export const PaddedCode = React.forwardRef<HTMLElement, CodeProps>(
  (props, ref) => (
    <Code
      ref={ref}
      style={{ paddingRight: "1rem", ...props.style }}
      {...props}
    />
  ),
)

// Add default right padding to avoid text touching the right border
// This ensures long code lines have space on the right

// Export the context provider for wrapping children if needed
export const CodePropsProvider = PropsProvider as React.Provider<CodeBaseProps>
