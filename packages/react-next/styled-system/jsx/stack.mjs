import { createElement, forwardRef } from 'react'

import { splitProps } from '../helpers.mjs';
import { getStackStyle } from '../patterns/stack.mjs';
import { styled } from './factory.mjs';

export const Stack = /* @__PURE__ */ forwardRef(function Stack(props, ref) {
  const [patternProps, restProps] = splitProps(props, ["align","justify","direction","gap"])

const styleProps = getStackStyle(patternProps)
const mergedProps = { ref, ...styleProps, ...restProps }

return createElement(styled.div, mergedProps)
  })