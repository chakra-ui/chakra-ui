import { createElement, forwardRef } from 'react'

import { splitProps } from '../helpers.mjs';
import { getFlexStyle } from '../patterns/flex.mjs';
import { styled } from './factory.mjs';

export const Flex = /* @__PURE__ */ forwardRef(function Flex(props, ref) {
  const [patternProps, restProps] = splitProps(props, ["align","justify","direction","wrap","basis","grow","shrink"])

const styleProps = getFlexStyle(patternProps)
const mergedProps = { ref, ...styleProps, ...restProps }

return createElement(styled.div, mergedProps)
  })