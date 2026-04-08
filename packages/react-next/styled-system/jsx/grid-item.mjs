import { createElement, forwardRef } from 'react'

import { splitProps } from '../helpers.mjs';
import { getGridItemStyle } from '../patterns/grid-item.mjs';
import { styled } from './factory.mjs';

export const GridItem = /* @__PURE__ */ forwardRef(function GridItem(props, ref) {
  const [patternProps, restProps] = splitProps(props, ["colSpan","rowSpan","colStart","rowStart","colEnd","rowEnd"])

const styleProps = getGridItemStyle(patternProps)
const mergedProps = { ref, ...styleProps, ...restProps }

return createElement(styled.div, mergedProps)
  })