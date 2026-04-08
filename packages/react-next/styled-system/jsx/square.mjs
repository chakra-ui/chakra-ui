import { createElement, forwardRef } from 'react'

import { splitProps } from '../helpers.mjs';
import { getSquareStyle } from '../patterns/square.mjs';
import { styled } from './factory.mjs';

export const Square = /* @__PURE__ */ forwardRef(function Square(props, ref) {
  const [patternProps, restProps] = splitProps(props, ["size"])

const styleProps = getSquareStyle(patternProps)
const mergedProps = { ref, ...styleProps, ...restProps }

return createElement(styled.div, mergedProps)
  })