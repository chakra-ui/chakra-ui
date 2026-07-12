"use client"

import { Field as ArkField } from "@ark-ui/react/field"
import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

const { withContext, PropsProvider } = createRecipeContext({
  key: "input",
})

/**
 * Base props for the Input component
 */
export interface InputBaseProps extends RecipeProps<"input">, UnstyledProp {}

/**
 * Input component is used to get user input in a text field.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Input placeholder="Enter your name" />
 *
 * // With Field wrapper for labels
 * <Field.Root>
 *   <Field.Label>Email</Field.Label>
 *   <Input type="email" placeholder="email@example.com" />
 *   <Field.HelperText>We'll never share your email.</Field.HelperText>
 * </Field.Root>
 *
 * // Different input types
 * <Input type="password" placeholder="Enter password" />
 * <Input type="email" placeholder="Enter email" />
 * <Input type="number" placeholder="Enter number" />
 *
 * // With validation states
 * <Field.Root invalid>
 *   <Field.Label>Username</Field.Label>
 *   <Input placeholder="Username" />
 *   <Field.ErrorText>Username is required</Field.ErrorText>
 * </Field.Root>
 *
 * // Disabled and readonly states
 * <Input disabled placeholder="Disabled" />
 * <Input readOnly value="Read only" />
 *
 * // With different sizes
 * <Input size="xs" placeholder="Extra small" />
 * <Input size="sm" placeholder="Small" />
 * <Input size="md" placeholder="Medium" />
 * <Input size="lg" placeholder="Large" />
 * ```
 *
 * @see {@link https://chakra-ui.com/docs/components/input Docs}
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/input/ WAI-ARIA Input Pattern}
 */
export interface InputProps extends HTMLChakraProps<"input", InputBaseProps> {}

/**
 * Input component for text entry
 *
 * @see {@link InputProps} for available props
 * @see {@link https://chakra-ui.com/docs/components/input Docs}
 */
export const Input = withContext<HTMLInputElement, InputProps>(ArkField.Input)

/**
 * Props provider for Input component
 * Allows passing props to nested Input components via context
 */
export const InputPropsProvider = PropsProvider as React.Provider<InputProps>
