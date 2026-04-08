import { createElement, forwardRef } from 'react'

import { splitProps } from '../helpers.mjs';
import { getBleedStyle } from '../patterns/bleed.mjs';
import { styled } from './factory.mjs';

export const Bleed = /* @__PURE__ */ forwardRef(function Bleed(props, ref) {
  const [patternProps, restProps] = splitProps(props, ["inline","block"])

const styleProps = getBleedStyle(patternProps)
const mergedProps = { ref, ...styleProps, ...restProps }

return createElement(styled.div, mergedProps)
  })