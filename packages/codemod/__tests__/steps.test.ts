import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/steps"
import { applyTransform } from "./test-utils"

describe("steps transform", () => {
  describe("basic component transformations", () => {
    test("transforms Stepper to Steps.Root and wraps children in Steps.List", async () => {
      const input = `
import { Stepper, Step } from '@chakra-ui/react'

const steps = [{ title: 'First' }, { title: 'Second' }]

export default function App() {
  return (
    <Stepper index={1}>
      {steps.map((step, index) => (
        <Step key={index}>
          {step.title}
        </Step>
      ))}
    </Stepper>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Steps } from '@chakra-ui/react'

        const steps = [{ title: 'First' }, { title: 'Second' }]

        export default function App() {
          return (
            <Steps.Root step={1}>
              <Steps.List>
                {steps.map((step, index) => (
                  <Steps.Item key={index}>{step.title}</Steps.Item>
                ))}
              </Steps.List>
            </Steps.Root>
          )
        }
        "
      `)
    })

    test("transforms Step to Steps.Item", async () => {
      const input = `
import { Stepper, Step, StepTitle } from '@chakra-ui/react'

export default function App() {
  return (
    <Stepper index={0}>
      <Step>
        <StepTitle>First</StepTitle>
      </Step>
    </Stepper>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Steps } from '@chakra-ui/react'

        export default function App() {
          return (
            <Steps.Root step={0}>
              <Steps.List>
                <Steps.Item>
                  <Steps.Title>First</Steps.Title>
                </Steps.Item>
              </Steps.List>
            </Steps.Root>
          )
        }
        "
      `)
    })

    test("transforms StepIndicator to Steps.Indicator", async () => {
      const input = `
import { Stepper, Step, StepIndicator } from '@chakra-ui/react'

export default function App() {
  return (
    <Stepper index={0}>
      <Step>
        <StepIndicator />
      </Step>
    </Stepper>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Steps } from '@chakra-ui/react'

        export default function App() {
          return (
            <Steps.Root step={0}>
              <Steps.List>
                <Steps.Item>
                  <Steps.Indicator />
                </Steps.Item>
              </Steps.List>
            </Steps.Root>
          )
        }
        "
      `)
    })

    test("transforms StepStatus to Steps.Status", async () => {
      const input = `
import { Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber } from '@chakra-ui/react'

export default function App() {
  return (
    <Stepper index={0}>
      <Step>
        <StepIndicator>
          <StepStatus
            complete={<StepIcon />}
            incomplete={<StepNumber />}
            active={<StepNumber />}
          />
        </StepIndicator>
      </Step>
    </Stepper>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Steps } from '@chakra-ui/react'

        import { LuCheck } from 'react-icons/lu'

        export default function App() {
          return (
            <Steps.Root step={0}>
              <Steps.List>
                <Steps.Item>
                  <Steps.Indicator>
                    <Steps.Status
                      complete={<LuCheck />}
                      incomplete={<Steps.Number />}
                      current={<Steps.Number />}
                    />
                  </Steps.Indicator>
                </Steps.Item>
              </Steps.List>
            </Steps.Root>
          )
        }
        "
      `)
    })

    test("transforms StepTitle to Steps.Title", async () => {
      const input = `
import { Stepper, Step, StepTitle } from '@chakra-ui/react'

export default function App() {
  return (
    <Stepper index={0}>
      <Step>
        <StepTitle>First Step</StepTitle>
      </Step>
    </Stepper>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Steps } from '@chakra-ui/react'

        export default function App() {
          return (
            <Steps.Root step={0}>
              <Steps.List>
                <Steps.Item>
                  <Steps.Title>First Step</Steps.Title>
                </Steps.Item>
              </Steps.List>
            </Steps.Root>
          )
        }
        "
      `)
    })

    test("transforms StepDescription to Steps.Description", async () => {
      const input = `
import { Stepper, Step, StepDescription } from '@chakra-ui/react'

export default function App() {
  return (
    <Stepper index={0}>
      <Step>
        <StepDescription>Contact Info</StepDescription>
      </Step>
    </Stepper>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Steps } from '@chakra-ui/react'

        export default function App() {
          return (
            <Steps.Root step={0}>
              <Steps.List>
                <Steps.Item>
                  <Steps.Description>Contact Info</Steps.Description>
                </Steps.Item>
              </Steps.List>
            </Steps.Root>
          )
        }
        "
      `)
    })

    test("transforms StepSeparator to Steps.Separator", async () => {
      const input = `
import { Stepper, Step, StepSeparator } from '@chakra-ui/react'

export default function App() {
  return (
    <Stepper index={0}>
      <Step>
        <StepSeparator />
      </Step>
    </Stepper>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Steps } from '@chakra-ui/react'

        export default function App() {
          return (
            <Steps.Root step={0}>
              <Steps.List>
                <Steps.Item>
                  <Steps.Separator />
                </Steps.Item>
              </Steps.List>
            </Steps.Root>
          )
        }
        "
      `)
    })
  })

  describe("useSteps hook pattern", () => {
    test("transforms Stepper to Steps.RootProvider when using useSteps", async () => {
      const input = `
import { Stepper, Step, useSteps } from '@chakra-ui/react'

const steps = [{ title: 'First' }, { title: 'Second' }]

export default function App() {
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  })

  return (
    <Stepper index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          {step.title}
        </Step>
      ))}
    </Stepper>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Steps, useSteps } from '@chakra-ui/react'

        const steps = [{ title: 'First' }, { title: 'Second' }]

        export default function App() {
          const stepsApi = useSteps({
            defaultStep: 1,
            count: steps.length,
          })

          return (
            <Steps.RootProvider value={stepsApi}>
              {steps.map((step, index) => (
                <Steps.Item key={index}>{step.title}</Steps.Item>
              ))}
            </Steps.RootProvider>
          )
        }
        "
      `)
    })

    test("transforms useSteps index to defaultStep", async () => {
      const input = `
import { useSteps } from '@chakra-ui/react'

export default function App() {
  const steps = useSteps({
    index: 1,
    count: 3,
  })

  return null
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Steps, useSteps } from '@chakra-ui/react'

        export default function App() {
          const steps = useSteps({
            defaultStep: 1,
            count: 3,
          })

          return null
        }
        "
      `)
    })
  })

  describe("complete examples", () => {
    test("transforms complete stepper example", async () => {
      const input = `
import {
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  Box,
} from '@chakra-ui/react'

const steps = [
  { title: 'First', description: 'Contact Info' },
  { title: 'Second', description: 'Date & Time' },
  { title: 'Third', description: 'Select Rooms' },
]

export default function App() {
  return (
    <Stepper index={1}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Steps, Box } from '@chakra-ui/react'

        import { LuCheck } from 'react-icons/lu'

        const steps = [
          { title: 'First', description: 'Contact Info' },
          { title: 'Second', description: 'Date & Time' },
          { title: 'Third', description: 'Select Rooms' },
        ]

        export default function App() {
          return (
            <Steps.Root step={1}>
              <Steps.List>
                {steps.map((step, index) => (
                  <Steps.Item key={index}>
                    <Steps.Indicator>
                      <Steps.Status
                        complete={<LuCheck />}
                        incomplete={<Steps.Number />}
                        current={<Steps.Number />}
                      />
                    </Steps.Indicator>

                    <Box flexShrink="0">
                      <Steps.Title>{step.title}</Steps.Title>
                      <Steps.Description>{step.description}</Steps.Description>
                    </Box>

                    <Steps.Separator />
                  </Steps.Item>
                ))}
              </Steps.List>
            </Steps.Root>
          )
        }
        "
      `)
    })

    test("transforms stepper with useSteps hook", async () => {
      const input = `
import {
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  useSteps,
  Box,
} from '@chakra-ui/react'

const steps = [
  { title: 'First', description: 'Contact Info' },
  { title: 'Second', description: 'Date & Time' },
]

export default function App() {
  const { activeStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  return (
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
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Steps, useSteps, Box } from '@chakra-ui/react'

        import { LuCheck } from 'react-icons/lu'

        const steps = [
          { title: 'First', description: 'Contact Info' },
          { title: 'Second', description: 'Date & Time' },
        ]

        export default function App() {
          const stepsApi = useSteps({
            defaultStep: 0,
            count: steps.length,
          })

          return (
            <Steps.RootProvider value={stepsApi}>
              {steps.map((step, index) => (
                <Steps.Item key={index}>
                  <Steps.Indicator>
                    <Steps.Status
                      complete={<LuCheck />}
                      incomplete={<Steps.Number />}
                      current={<Steps.Number />}
                    />
                  </Steps.Indicator>
                  <Box>
                    <Steps.Title>{step.title}</Steps.Title>
                    <Steps.Description>{step.description}</Steps.Description>
                  </Box>
                  <Steps.Separator />
                </Steps.Item>
              ))}
            </Steps.RootProvider>
          )
        }
        "
      `)
    })
  })

  describe("props preservation", () => {
    test("preserves orientation and other props on Stepper", async () => {
      const input = `
import { Stepper, Step } from '@chakra-ui/react'

export default function App() {
  return (
    <Stepper index={1} orientation='vertical' height='400px' gap='0'>
      <Step>First</Step>
    </Stepper>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Steps } from '@chakra-ui/react'

        export default function App() {
          return (
            <Steps.Root step={1} orientation="vertical" height="400px" gap="0">
              <Steps.List>
                <Steps.Item>First</Steps.Item>
              </Steps.List>
            </Steps.Root>
          )
        }
        "
      `)
    })

    test("preserves size and colorScheme props", async () => {
      const input = `
import { Stepper, Step } from '@chakra-ui/react'

export default function App() {
  return (
    <Stepper size='lg' colorScheme='red' index={0}>
      <Step>First</Step>
    </Stepper>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Steps } from '@chakra-ui/react'

        export default function App() {
          return (
            <Steps.Root size="lg" colorScheme="red" step={0}>
              <Steps.List>
                <Steps.Item>First</Steps.Item>
              </Steps.List>
            </Steps.Root>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    test("no transformation for non-Chakra Stepper components", async () => {
      const input = `
import { Stepper } from './custom-stepper'

export default function App() {
  return (
    <Stepper>
      <Step>Custom</Step>
    </Stepper>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stepper } from './custom-stepper'

        export default function App() {
          return (
            <Stepper>
              <Step>Custom</Step>
            </Stepper>
          )
        }
        "
      `)
    })
  })
})
