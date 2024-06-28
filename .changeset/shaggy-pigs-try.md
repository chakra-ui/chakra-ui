---
"@chakra-ui/react": minor
---

Redesign `Stepper` component. It's now called `Steps` and manages the state
internally, no need to use `useSteps` anymore.

We've also improved the accessibility of the component by leveraging the tabs
pattern and adding the required ARIA attributes.

```tsx
<Steps.Root defaultIndex={0} count={2}>
  <Steps.List>
    <Steps.Item index={0}>
      <Steps.Trigger>
        <Steps.Title>Step 1</Steps.Title>
      </Steps.Trigger>
      <Steps.Separator />
    </Steps.Item>

    <Steps.Item index={1}>
      <Steps.Trigger>
        <Steps.Title>Step 2</Steps.Title>
      </Steps.Trigger>
      <Steps.Separator />
    </Steps.Item>
  </Steps.List>

  <Steps.Content index={0}>Step 1</Steps.Content>
  <Steps.Content index={1}>Step 2</Steps.Content>
  <Steps.CompleteContent>Complete</Steps.CompleteContent>
</Steps.Root>
```

Using the CLI, you can also scaffold an already composed stepper component

```sh
chakra composition add steps
```
