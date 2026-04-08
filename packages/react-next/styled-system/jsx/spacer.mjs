import { createElement, forwardRef } from 'react'

import { splitProps } from '../helpers.mjs';
import { getSpacerStyle } from '../patterns/spacer.mjs';
import { styled } from './factory.mjs';

export const Spacer = /* @__PURE__ */ forwardRef(function Spacer(props, ref) {
  const [patternProps, restProps] = splitProps(props, ["size"])

const styleProps = getSpacerStyle(patternProps)
const mergedProps = { ref, ...styleProps, ...restProps }

return createElement(styled.div, mergedProps)
  })