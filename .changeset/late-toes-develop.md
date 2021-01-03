---
"@chakra-ui/button": patch
"@chakra-ui/layout": patch
"@chakra-ui/modal": patch
"@chakra-ui/styled-system": patch
"@chakra-ui/tag": patch
---

## Button

- Update the style props applied for `leftIcon` and `rightIcon` to support RTL.
  Changed `ml` and `mr` to `marginStart` and `marginEnd` respectively.
- Update the style props applied when `isLoading` is `true`. Changed
  `marginRight` to `marginEnd`.

## Stack

- Update `directionStyles` to use logical CSS properties for RTL support.
  Changed `marginLeft` and `marginRight` to `marginStart` and `marginEnd`
  respectively.

## Styled System

- Add missing `borderStart`, and `borderEnd` for style and color.
- Sort `Object.assign` keys in `configs/border.ts` for better readability.

## Other RTL Fixes

- Alignment for close icon for `Tag`, `Modal`, and `Drawer` components to
  support RTL.

## Storybook

Add RTL storybook toolbar for make it easy to test layouts.

Packages added:

- `@storybook/addon-toolbars`
