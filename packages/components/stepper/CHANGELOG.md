# @chakra-ui/stepper

## 2.3.1

### Patch Changes

- Updated dependencies
  [[`3aaf0c3b1`](https://github.com/chakra-ui/chakra-ui/commit/3aaf0c3b19c64cdae29ac1893d199049cc4133ed)]:
  - @chakra-ui/icon@3.2.0

## 2.3.0

### Minor Changes

- [`754d9d4f4`](https://github.com/chakra-ui/chakra-ui/commit/754d9d4f48b4fef8d38cb1d5e342f3776d18e7c6)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - To improve support
  for the App Router, all components and hooks are exported with the
  `"use client"` directive.

### Patch Changes

- Updated dependencies
  [[`754d9d4f4`](https://github.com/chakra-ui/chakra-ui/commit/754d9d4f48b4fef8d38cb1d5e342f3776d18e7c6)]:
  - @chakra-ui/icon@3.1.0
  - @chakra-ui/react-context@2.1.0

## 2.2.0

### Minor Changes

- [#7613](https://github.com/chakra-ui/chakra-ui/pull/7613)
  [`7d27889c8`](https://github.com/chakra-ui/chakra-ui/commit/7d27889c8cff7d7616ea2b061b2a3a73a9bf83ef)
  Thanks [@Nicoka11](https://github.com/Nicoka11)! - Add support for
  `showLastSeparator` in the `Stepper` component to show the last separator in
  the `Stepper` component. By default, the last separator is hidden.

- [`88356ab02`](https://github.com/chakra-ui/chakra-ui/commit/88356ab0272435161bf47ca734f67a112c328dfb)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Add default
  `chakra-*` classnames to all component parts.

  - Expose `activeStepPercent`, `isCompleteStep`, and `isIncompleteStep` to
    `useStep` hook.

  - Add `StepIndicatorContent` component to reduce boilerplate for step
    indicator.

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@3.0.16

## 2.1.0

### Minor Changes

- [#7502](https://github.com/chakra-ui/chakra-ui/pull/7502)
  [`49a29a238`](https://github.com/chakra-ui/chakra-ui/commit/49a29a238439242e0959d74ebf48c84411581288)
  Thanks [@estheragbaje](https://github.com/estheragbaje)! - Introduce new
  `Stepper` component to model sequencial steps in a process.

  ```jsx live=false
  <Stepper index={activeStep}>
    {steps.map((step, index) => (
      <Step key={index}>
        <StepIndicator>
          <StepStatus
            complete={<StepIcon />}
            incomplete={<StepNumber />}
            active={<StepNumber />}
          />
        </StepIndicator>

        <Box>
          <StepTitle>{step.title}</StepTitle>
          <StepDescription>{step.description}</StepDescription>
        </Box>

        <StepSeparator />
      </Step>
    ))}
  </Stepper>
  ```

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@3.0.16
