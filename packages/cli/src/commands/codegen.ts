import * as p from "@clack/prompts"
import { Command } from "commander"
import { execSync } from "node:child_process"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

/* ---------------------------------------------------------------------------
 * Embedded recipe-context files
 *
 * Panda codegen doesn't know about createRecipeContext / createSlotRecipeContext.
 * We ship the source inline and write it into the consumer's styled-system/jsx/
 * after every codegen run.
 * --------------------------------------------------------------------------- */

const CREATE_RECIPE_CONTEXT_MJS = `'use client'

import { cx, css, cva } from '../css/index.mjs';
import { chakra as styled } from './factory.mjs';
import { getDisplayName } from './factory-helper.mjs';
import * as recipes from '../recipes/index.mjs';
import { createContext, useContext, createElement, forwardRef } from 'react'

function resolveRecipe(options) {
  if (options != null && '__recipe__' in options) return options
  if (options != null && '__cva__' in options) return options
  if (typeof options === 'object' && options !== null) {
    if (options.key) return recipes[options.key]
    if (options.recipe) return options.recipe
  }
  throw new Error('createRecipeContext requires a recipe or { key }')
}

export function createRecipeContext(options) {
  const recipe = resolveRecipe(options)
  const isConfigRecipe = recipe.__recipe__ === true
  const recipeName = recipe.__name__

  const cvaFn = isConfigRecipe ? recipe : cva(recipe)

  const PropsContext = createContext(undefined)

  const usePropsContext = () => useContext(PropsContext)

  const withContext = (Component, options) => {
    const StyledComponent = styled(Component, {}, options)
    const componentName = getDisplayName(Component)

    const WithContext = forwardRef((inProps, ref) => {
      const propsContext = usePropsContext()
      const props = propsContext ? { ...propsContext, ...inProps } : inProps
      const { unstyled, ...restProps } = props

      const [variantProps, otherProps] = cvaFn.splitVariantProps(restProps)

      let className
      if (unstyled) {
        className = cx(props.className)
      } else if (isConfigRecipe) {
        className = cx(cvaFn(variantProps), props.className)
      } else {
        const styles = cvaFn.raw(variantProps)
        className = cx(css(styles), props.className)
      }

      return createElement(StyledComponent, {
        ...otherProps,
        className,
        ref,
      })
    })

    WithContext.displayName = componentName
    return WithContext
  }

  return {
    withContext,
    PropsProvider: PropsContext.Provider,
    usePropsContext,
  }
}
`

const CREATE_RECIPE_CONTEXT_DTS = `/* eslint-disable */
import type { ElementType } from "react"
import type {
  AsProps,
  ComponentProps,
  JsxFactoryOptions,
  UnstyledProps,
} from "../types/jsx"

interface RecipeFn {
  __type: any;
  (props?: any): string
}

type AnyRecipe = RecipeFn | { splitVariantProps: any; __type?: any }

type InferVariantProps<R extends AnyRecipe> = R extends RecipeFn
  ? R["__type"]
  : R extends { __type: infer VP } ? Partial<VP> : never

interface RecipeContextOptions {
  key?: string
  recipe?: AnyRecipe
}

type RecipeContextConsumer<
  T extends ElementType,
  R extends AnyRecipe,
> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<ComponentProps<T> & InferVariantProps<R>> &
    React.RefAttributes<any>
>

export interface RecipeContext<R extends AnyRecipe> {
  withContext: <T extends ElementType>(
    Component: T,
    options?: JsxFactoryOptions<ComponentProps<T>> | undefined,
  ) => RecipeContextConsumer<T, R>
  PropsProvider: React.Provider<Partial<InferVariantProps<R>>>
  usePropsContext: () => InferVariantProps<R> | undefined
}

export declare function createRecipeContext<R extends AnyRecipe>(
  recipe: R,
): RecipeContext<R>
export declare function createRecipeContext(
  options: RecipeContextOptions,
): RecipeContext<AnyRecipe>
`

const CREATE_SLOT_RECIPE_CONTEXT_MJS = `'use client'

import { cx, css, sva } from '../css/index.mjs';
import { chakra as styled } from './factory.mjs';
import { getDisplayName } from './factory-helper.mjs';
import * as recipes from '../recipes/index.mjs';
import { createContext, useContext, createElement, forwardRef } from 'react'

function createSafeContext(contextName) {
  const Context = createContext(undefined)
  const useStyleContext = (componentName, slot) => {
    const context = useContext(Context)
    if (context === undefined) {
      const componentInfo = componentName ? \`Component "\${componentName}"\` : 'A component'
      const slotInfo = slot ? \` (slot: "\${slot}")\` : ''

      throw new Error(
        \`\${componentInfo}\${slotInfo} cannot access \${contextName} because it's missing its Provider.\`
      )
    }
    return context
  }
  return [Context, useStyleContext]
}

function resolveSlotRecipe(options) {
  if (options != null && 'splitVariantProps' in options) return options
  if (typeof options === 'object' && options !== null) {
    if (options.key) return recipes[options.key]
    if (options.recipe) return options.recipe
  }
  throw new Error('createSlotRecipeContext requires a slot recipe or { key }')
}

export function createSlotRecipeContext(options) {
  const recipe = resolveSlotRecipe(options)
  const isConfigRecipe = '__recipe__' in recipe
  const recipeName = isConfigRecipe && recipe.__name__ ? recipe.__name__ : undefined
  const contextName = recipeName ? \`createSlotRecipeContext("\${recipeName}")\` : 'createSlotRecipeContext'

  const [StyleContext, useStyleContext] = createSafeContext(contextName)
  const svaFn = isConfigRecipe ? recipe : sva(recipe.config)

  const getResolvedProps = (props, slotStyles) => {
    const { unstyled, ...restProps } = props
    if (unstyled) return restProps
    if (isConfigRecipe) {
       return { ...restProps, className: cx(slotStyles, restProps.className) }
    }
    return { ...slotStyles, ...restProps }
  }

  const withRootProvider = (Component, options) => {
    const WithRootProvider = (props) => {
      const [variantProps, otherProps] = svaFn.splitVariantProps(props)

      const slotStyles = isConfigRecipe ? svaFn(variantProps) : svaFn.raw(variantProps)
      slotStyles._classNameMap = svaFn.classNameMap

      const mergedProps = options?.defaultProps
        ? { ...options.defaultProps, ...otherProps }
        : otherProps

      return createElement(StyleContext.Provider, {
        value: slotStyles,
        children: createElement(Component, mergedProps)
      })
    }

    const componentName = getDisplayName(Component)
    WithRootProvider.displayName = \`withRootProvider(\${componentName})\`

    return WithRootProvider
  }

  const withProvider = (Component, slot, options) => {
    const StyledComponent = styled(Component, {}, options)

    const WithProvider = forwardRef((props, ref) => {
      const [variantProps, restProps] = svaFn.splitVariantProps(props)

      const slotStyles = isConfigRecipe ? svaFn(variantProps) : svaFn.raw(variantProps)
      slotStyles._classNameMap = svaFn.classNameMap

      const propsWithClass = { ...restProps, className: restProps.className ?? options?.defaultProps?.className }
      const resolvedProps = getResolvedProps(propsWithClass, slotStyles[slot])
      return createElement(StyleContext.Provider, {
        value: slotStyles,
        children: createElement(StyledComponent, {
          ...resolvedProps,
          className: cx(resolvedProps.className, slotStyles._classNameMap[slot]),
          ref,
        })
      })
    })

    const componentName = getDisplayName(Component)
    WithProvider.displayName = \`withProvider(\${componentName})\`

    return WithProvider
  }

  const withContext = (Component, slot, options) => {
    const StyledComponent = styled(Component, {}, options)
    const componentName = getDisplayName(Component)

    const WithContext = forwardRef((props, ref) => {
      const slotStyles = useStyleContext(componentName, slot)

      const propsWithClass = { ...props, className: props.className ?? options?.defaultProps?.className }
      const resolvedProps = getResolvedProps(propsWithClass, slotStyles[slot])
      return createElement(StyledComponent, {
        ...resolvedProps,
        className: cx(resolvedProps.className, slotStyles._classNameMap[slot]),
        ref,
      })
    })

    WithContext.displayName = \`withContext(\${componentName})\`

    return WithContext
  }

  return {
    withRootProvider,
    withProvider,
    withContext,
  }
}
`

const CREATE_SLOT_RECIPE_CONTEXT_DTS = `/* eslint-disable */
import type { ComponentType, ElementType } from "react"
import type {
  AsProps,
  ComponentProps,
  DataAttrs,
  JsxFactoryOptions,
} from "../types/jsx"

interface UnstyledProps {
  unstyled?: boolean | undefined
}

interface SlotRecipeFn {
  __type: any
  __slot: string;
  (props?: any): any
}
type SlotRecipe = { splitVariantProps: any; classNameMap?: any } | SlotRecipeFn

type InferSlot<R extends SlotRecipe> = R extends SlotRecipeFn
  ? R["__slot"]
  : string

interface WithProviderOptions<P = {}> {
  defaultProps?: (Partial<P> & DataAttrs) | undefined
}

type StyleContextProvider<
  T extends ElementType,
  R extends SlotRecipe,
> = ComponentType<ComponentProps<T> & UnstyledProps & AsProps>

type StyleContextRootProvider<
  T extends ElementType,
  R extends SlotRecipe,
> = ComponentType<ComponentProps<T> & UnstyledProps>

type StyleContextConsumer<T extends ElementType> = ComponentType<
  ComponentProps<T> & UnstyledProps & AsProps
>

interface SlotRecipeContextOptions {
  key?: string
  recipe?: SlotRecipe
}

export interface SlotRecipeContext<R extends SlotRecipe> {
  withRootProvider: <T extends ElementType>(
    Component: T,
    options?: WithProviderOptions<ComponentProps<T>> | undefined,
  ) => StyleContextRootProvider<T, R>
  withProvider: <T extends ElementType>(
    Component: T,
    slot: InferSlot<R>,
    options?: JsxFactoryOptions<ComponentProps<T>> | undefined,
  ) => StyleContextProvider<T, R>
  withContext: <T extends ElementType>(
    Component: T,
    slot: InferSlot<R>,
    options?: JsxFactoryOptions<ComponentProps<T>> | undefined,
  ) => StyleContextConsumer<T>
}

export declare function createSlotRecipeContext<R extends SlotRecipe>(
  recipe: R,
): SlotRecipeContext<R>
export declare function createSlotRecipeContext(
  options: SlotRecipeContextOptions,
): SlotRecipeContext<SlotRecipe>
`

function patchStyledSystem(cwd: string) {
  const jsxDir = resolve(cwd, "styled-system", "jsx")
  if (!existsSync(jsxDir)) {
    p.log.warn("styled-system/jsx not found, skipping patch")
    return
  }

  // Write embedded files
  const files: Record<string, string> = {
    "create-recipe-context.mjs": CREATE_RECIPE_CONTEXT_MJS,
    "create-recipe-context.d.ts": CREATE_RECIPE_CONTEXT_DTS,
    "create-slot-recipe-context.mjs": CREATE_SLOT_RECIPE_CONTEXT_MJS,
    "create-slot-recipe-context.d.ts": CREATE_SLOT_RECIPE_CONTEXT_DTS,
  }

  for (const [name, content] of Object.entries(files)) {
    writeFileSync(resolve(jsxDir, name), content)
  }

  // Ensure index.mjs has re-exports
  const indexMjsPath = resolve(jsxDir, "index.mjs")
  if (existsSync(indexMjsPath)) {
    let content = readFileSync(indexMjsPath, "utf-8")
    const mjsExports = [
      'export * from "./create-recipe-context.mjs";',
      'export * from "./create-slot-recipe-context.mjs";',
    ]
    for (const line of mjsExports) {
      if (!content.includes(line)) {
        content = content.trimEnd() + "\n" + line + "\n"
      }
    }
    writeFileSync(indexMjsPath, content)
  }

  // Ensure index.d.ts has re-exports
  const indexDtsPath = resolve(jsxDir, "index.d.ts")
  if (existsSync(indexDtsPath)) {
    let content = readFileSync(indexDtsPath, "utf-8")
    const dtsExports = [
      'export * from "./create-recipe-context";',
      'export * from "./create-slot-recipe-context";',
    ]
    for (const line of dtsExports) {
      if (!content.includes(line)) {
        content = content.trimEnd() + "\n" + line + "\n"
      }
    }
    writeFileSync(indexDtsPath, content)
  }

  p.log.success("Patched styled-system with recipe context helpers")
}

export const CodegenCommand = new Command("codegen")
  .description("Generate Panda CSS styled-system output")
  .option("--clean", "Clean output directory before generating")
  .option("--watch", "Watch for changes and regenerate")
  .action(async (opts) => {
    const cwd = process.cwd()
    const flags = [opts.clean && "--clean", opts.watch && "--watch"]
      .filter(Boolean)
      .join(" ")

    const cmd = `npx panda codegen ${flags}`.trim()

    p.log.step(`Running: ${cmd}`)
    try {
      execSync(cmd, { cwd, stdio: "inherit" })
      p.log.success("Codegen complete")
    } catch {
      p.log.error("Codegen failed")
      process.exit(1)
    }

    patchStyledSystem(cwd)

    // Also emit styles.css so consumers can import it directly without
    // needing the PostCSS plugin wired up correctly.
    p.log.step("Generating styles.css...")
    try {
      execSync("npx panda cssgen --outfile styled-system/styles.css", {
        cwd,
        stdio: "inherit",
      })
      p.log.success("Generated styled-system/styles.css")
    } catch {
      p.log.warn("cssgen failed — run 'npx panda cssgen' manually if needed")
    }
  })
