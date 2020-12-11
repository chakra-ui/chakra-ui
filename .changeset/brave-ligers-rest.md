---
"@chakra-ui/pin-input": patch
"@chakra-ui/number-input": patch
"@chakra-ui/system": minor
---

## Pin Input

### 🐛 Bug Fix

- Fix issue where copy-paste doesn't work for pin-input

## Number Input

### 🐛 Bug Fix

- Fix issue where number input doesn't work when using with form libraries that
  use `ref` as entry point to setting initial values (e.g React hook form).

  We improved `useNumberInput` to sync the initial values in the `ref` passed to
  `NumberInputField` with the internal state.

## System

### 🚀 Feature

Add support for custom `shouldForwardProp` function in the `chakra` factory
function.
