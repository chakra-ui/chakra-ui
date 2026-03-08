# @chakra-ui/charts

## 3.34.1

## 3.34.0

### Patch Changes

- [`d5e7073`](https://github.com/chakra-ui/chakra-ui/commit/d5e7073c4bec28e90b22f35c117bb29ac2d724ff)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **Upgrade
  recharts** to 3.7.0
  - **Prefer responsive prop** over `ResponsiveContainer` when using
    `Chart.Root`. The `responsive` prop avoids React 19 compatibility issues
    that `ResponsiveContainer` can trigger.
  - **React 19 + immer fix**: If you see "lanes" is read-only errors, add
    `immer: ">=11.0.1"` to your package manager's overrides.

## 3.33.0

## 3.32.0

## 3.31.0

## 3.30.0

## 3.29.0

## 3.28.1

## 3.28.0

## 3.27.1

## 3.27.0

## 3.26.0

## 3.25.0

## 3.24.2

## 3.24.1

## 3.24.0

## 3.23.0

## 3.22.0

## 3.21.1

## 3.21.0

## 3.20.0

### Patch Changes

- [#10071](https://github.com/chakra-ui/chakra-ui/pull/10071)
  [`77d9bec`](https://github.com/chakra-ui/chakra-ui/commit/77d9bec3b955c59efffa5526b0267072473a7ff5)
  Thanks [@gaurav-132](https://github.com/gaurav-132)! - Fix issue where
  `formatter` prop doesn't take effect in the tooltip

## 3.19.2

## 3.19.1

## 3.19.0

## 3.18.0

## 3.17.0

## 3.16.1

## 3.16.0

## 3.15.1

### Patch Changes

- [`3dca2e8`](https://github.com/chakra-ui/chakra-ui/commit/3dca2e88d6d6bcd9253661d61523454036e81375)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - **BarList,
  BarSegment**: Rename `showTooltip` with `tooltip` prop to support custom
  tooltips.

## 3.15.0

### Patch Changes

- [`d1782c8`](https://github.com/chakra-ui/chakra-ui/commit/d1782c8e9604f5186b202d95beada6b4813da7db)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Initial release of
  the `@chakra-ui/charts` package.
