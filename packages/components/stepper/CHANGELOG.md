# @chakra-ui/stepper

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
