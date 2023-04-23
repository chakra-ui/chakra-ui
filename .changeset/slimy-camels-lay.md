---
"@chakra-ui/stepper": minor
"@chakra-ui/react": minor
---

Introduce new `Stepper` component to model sequencial steps in a process.

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
