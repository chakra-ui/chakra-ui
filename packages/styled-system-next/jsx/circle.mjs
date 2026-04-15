import { createElement, forwardRef } from 'react'

import { splitProps } from '../helpers.mjs';
import { getCircleStyle } from '../patterns/circle.mjs';
import { chakra } from './factory.mjs';

export const Circle = /* @__PURE__ */ forwardRef(function Circle(props, ref) {
  const [patternProps, restProps] = splitProps(props, ["size"])

const styleProps = getCircleStyle(patternProps)
const mergedProps = { ref, ...styleProps, ...restProps }

return createElement(chakra.div, mergedProps)
  })