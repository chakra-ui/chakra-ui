import { createElement, forwardRef } from 'react'

import { splitProps } from '../helpers.mjs';
import { getDividerStyle } from '../patterns/divider.mjs';
import { chakra } from './factory.mjs';

export const Divider = /* @__PURE__ */ forwardRef(function Divider(props, ref) {
  const [patternProps, restProps] = splitProps(props, ["orientation","thickness","color"])

const styleProps = getDividerStyle(patternProps)
const mergedProps = { ref, ...styleProps, ...restProps }

return createElement(chakra.div, mergedProps)
  })