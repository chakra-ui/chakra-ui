import { createElement, forwardRef } from 'react'

import { splitProps } from '../helpers.mjs';
import { getCqStyle } from '../patterns/cq.mjs';
import { chakra } from './factory.mjs';

export const Cq = /* @__PURE__ */ forwardRef(function Cq(props, ref) {
  const [patternProps, restProps] = splitProps(props, ["name","type"])

const styleProps = getCqStyle(patternProps)
const mergedProps = { ref, ...styleProps, ...restProps }

return createElement(chakra.div, mergedProps)
  })