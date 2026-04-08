'use client'

import { cx, css, sva } from '../css/index.mjs';
import { styled } from './factory.mjs';
import { getDisplayName } from './factory-helper.mjs';
import { createContext, useContext, createElement, forwardRef } from 'react'

function createSafeContext(contextName) {
  const Context = createContext(undefined)
  const useStyleContext = (componentName, slot) => {
    const context = useContext(Context)
    if (context === undefined) {
      const componentInfo = componentName ? `Component "${componentName}"` : 'A component'
      const slotInfo = slot ? ` (slot: "${slot}")` : ''
      
      throw new Error(
        `${componentInfo}${slotInfo} cannot access ${contextName} because it's missing its Provider.`
      )
    }
    return context
  }
  return [Context, useStyleContext]
}

export function createStyleContext(recipe) {
  const isConfigRecipe = '__recipe__' in recipe
  const recipeName = isConfigRecipe && recipe.__name__ ? recipe.__name__ : undefined
  const contextName = recipeName ? `createStyleContext("${recipeName}")` : 'createStyleContext'
  
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
    WithRootProvider.displayName = `withRootProvider(${componentName})`
    
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
    WithProvider.displayName = `withProvider(${componentName})`
    
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
    
    WithContext.displayName = `withContext(${componentName})`
    
    return WithContext
  }

  return {
    withRootProvider,
    withProvider,
    withContext,
  }
}