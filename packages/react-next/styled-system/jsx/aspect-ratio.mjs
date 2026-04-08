import { createElement, forwardRef } from 'react'

import { splitProps } from '../helpers.mjs';
import { getAspectRatioStyle } from '../patterns/aspect-ratio.mjs';
import { styled } from './factory.mjs';

export const AspectRatio = /* @__PURE__ */ forwardRef(function AspectRatio(props, ref) {
  const [patternProps, restProps] = splitProps(props, ["ratio"])

const styleProps = getAspectRatioStyle(patternProps)
const mergedProps = { ref, ...styleProps, ...restProps }

return createElement(styled.div, mergedProps)
  })