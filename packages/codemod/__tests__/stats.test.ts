import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/stats"
import { applyTransform } from "./test-utils"

describe("stats transform", () => {
  describe("basic component transformations", () => {
    test("transforms Stat to Stat.Root", async () => {
      const input = `
import { Stat, StatLabel, StatNumber } from '@chakra-ui/react'

export default function App() {
  return (
    <Stat>
      <StatLabel>Collected Fees</StatLabel>
      <StatNumber>£0.00</StatNumber>
    </Stat>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stat } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stat.Root>
              <Stat.Label>Collected Fees</Stat.Label>
              <Stat.ValueText>£0.00</Stat.ValueText>
            </Stat.Root>
          )
        }
        "
      `)
    })

    test("transforms StatLabel to Stat.Label", async () => {
      const input = `
import { Stat, StatLabel } from '@chakra-ui/react'

export default function App() {
  return (
    <Stat>
      <StatLabel>Total Sales</StatLabel>
    </Stat>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stat } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stat.Root>
              <Stat.Label>Total Sales</Stat.Label>
            </Stat.Root>
          )
        }
        "
      `)
    })

    test("transforms StatNumber to Stat.ValueText", async () => {
      const input = `
import { Stat, StatNumber } from '@chakra-ui/react'

export default function App() {
  return (
    <Stat>
      <StatNumber>1,234</StatNumber>
    </Stat>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stat } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stat.Root>
              <Stat.ValueText>1,234</Stat.ValueText>
            </Stat.Root>
          )
        }
        "
      `)
    })

    test("transforms StatHelpText to Stat.HelpText", async () => {
      const input = `
import { Stat, StatHelpText } from '@chakra-ui/react'

export default function App() {
  return (
    <Stat>
      <StatHelpText>Feb 12 - Feb 28</StatHelpText>
    </Stat>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stat } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stat.Root>
              <Stat.HelpText>Feb 12 - Feb 28</Stat.HelpText>
            </Stat.Root>
          )
        }
        "
      `)
    })
  })

  describe("StatArrow transformations", () => {
    test("transforms StatArrow with type='increase' to Stat.UpIndicator", async () => {
      const input = `
import { Stat, StatArrow, StatHelpText } from '@chakra-ui/react'

export default function App() {
  return (
    <Stat>
      <StatHelpText>
        <StatArrow type='increase' />
        23.36%
      </StatHelpText>
    </Stat>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stat } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stat.Root>
              <Stat.HelpText>
                <Stat.UpIndicator />
                23.36%
              </Stat.HelpText>
            </Stat.Root>
          )
        }
        "
      `)
    })

    test("transforms StatArrow with type='decrease' to Stat.DownIndicator", async () => {
      const input = `
import { Stat, StatArrow, StatHelpText } from '@chakra-ui/react'

export default function App() {
  return (
    <Stat>
      <StatHelpText>
        <StatArrow type='decrease' />
        9.05%
      </StatHelpText>
    </Stat>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stat } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stat.Root>
              <Stat.HelpText>
                <Stat.DownIndicator />
                9.05%
              </Stat.HelpText>
            </Stat.Root>
          )
        }
        "
      `)
    })

    test("handles both increase and decrease arrows in same component", async () => {
      const input = `
import { Stat, StatLabel, StatNumber, StatArrow, StatHelpText } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Stat>
        <StatLabel>Sent</StatLabel>
        <StatNumber>345,670</StatNumber>
        <StatHelpText>
          <StatArrow type='increase' />
          23.36%
        </StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Clicked</StatLabel>
        <StatNumber>45</StatNumber>
        <StatHelpText>
          <StatArrow type='decrease' />
          9.05%
        </StatHelpText>
      </Stat>
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stat } from '@chakra-ui/react'

        export default function App() {
          return (
            <>
              <Stat.Root>
                <Stat.Label>Sent</Stat.Label>
                <Stat.ValueText>345,670</Stat.ValueText>
                <Stat.HelpText>
                  <Stat.UpIndicator />
                  23.36%
                </Stat.HelpText>
              </Stat.Root>
              <Stat.Root>
                <Stat.Label>Clicked</Stat.Label>
                <Stat.ValueText>45</Stat.ValueText>
                <Stat.HelpText>
                  <Stat.DownIndicator />
                  9.05%
                </Stat.HelpText>
              </Stat.Root>
            </>
          )
        }
        "
      `)
    })
  })

  describe("StatGroup transformations", () => {
    test("transforms StatGroup to Stat.Root", async () => {
      const input = `
import { StatGroup, Stat, StatLabel, StatNumber } from '@chakra-ui/react'

export default function App() {
  return (
    <StatGroup>
      <Stat>
        <StatLabel>Sent</StatLabel>
        <StatNumber>345,670</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Clicked</StatLabel>
        <StatNumber>45</StatNumber>
      </Stat>
    </StatGroup>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stat } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stat.Root>
              <Stat.Root>
                <Stat.Label>Sent</Stat.Label>
                <Stat.ValueText>345,670</Stat.ValueText>
              </Stat.Root>
              <Stat.Root>
                <Stat.Label>Clicked</Stat.Label>
                <Stat.ValueText>45</Stat.ValueText>
              </Stat.Root>
            </Stat.Root>
          )
        }
        "
      `)
    })
  })

  describe("complete examples", () => {
    test("transforms complete stat with all components", async () => {
      const input = `
import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react'

export default function App() {
  return (
    <Stat>
      <StatLabel>Collected Fees</StatLabel>
      <StatNumber>£0.00</StatNumber>
      <StatHelpText>Feb 12 - Feb 28</StatHelpText>
    </Stat>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stat } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stat.Root>
              <Stat.Label>Collected Fees</Stat.Label>
              <Stat.ValueText>£0.00</Stat.ValueText>
              <Stat.HelpText>Feb 12 - Feb 28</Stat.HelpText>
            </Stat.Root>
          )
        }
        "
      `)
    })

    test("transforms StatGroup with complete stat components", async () => {
      const input = `
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'

export default function App() {
  return (
    <StatGroup>
      <Stat>
        <StatLabel>Sent</StatLabel>
        <StatNumber>345,670</StatNumber>
        <StatHelpText>
          <StatArrow type='increase' />
          23.36%
        </StatHelpText>
      </Stat>

      <Stat>
        <StatLabel>Clicked</StatLabel>
        <StatNumber>45</StatNumber>
        <StatHelpText>
          <StatArrow type='decrease' />
          9.05%
        </StatHelpText>
      </Stat>
    </StatGroup>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stat } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stat.Root>
              <Stat.Root>
                <Stat.Label>Sent</Stat.Label>
                <Stat.ValueText>345,670</Stat.ValueText>
                <Stat.HelpText>
                  <Stat.UpIndicator />
                  23.36%
                </Stat.HelpText>
              </Stat.Root>
              <Stat.Root>
                <Stat.Label>Clicked</Stat.Label>
                <Stat.ValueText>45</Stat.ValueText>
                <Stat.HelpText>
                  <Stat.DownIndicator />
                  9.05%
                </Stat.HelpText>
              </Stat.Root>
            </Stat.Root>
          )
        }
        "
      `)
    })
  })

  describe("props preservation", () => {
    test("preserves props on Stat components", async () => {
      const input = `
import { Stat, StatLabel, StatNumber } from '@chakra-ui/react'

export default function App() {
  return (
    <Stat px={4} py={2} bg="gray.100">
      <StatLabel fontSize="sm">Total</StatLabel>
      <StatNumber fontSize="2xl" fontWeight="bold">1,234</StatNumber>
    </Stat>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stat } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stat.Root px={4} py={2} bg="gray.100">
              <Stat.Label fontSize="sm">Total</Stat.Label>
              <Stat.ValueText fontSize="2xl" fontWeight="bold">
                1,234
              </Stat.ValueText>
            </Stat.Root>
          )
        }
        "
      `)
    })

    test("preserves other props on StatArrow", async () => {
      const input = `
import { Stat, StatArrow, StatHelpText } from '@chakra-ui/react'

export default function App() {
  return (
    <Stat>
      <StatHelpText>
        <StatArrow type='increase' color="green.500" />
        23.36%
      </StatHelpText>
    </Stat>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stat } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stat.Root>
              <Stat.HelpText>
                <Stat.UpIndicator color="green.500" />
                23.36%
              </Stat.HelpText>
            </Stat.Root>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    test("no transformation for non-Chakra Stat components", async () => {
      const input = `
import { Stat } from './custom-stats'

export default function App() {
  return (
    <Stat>
      <StatLabel>Custom</StatLabel>
    </Stat>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stat } from './custom-stats'

        export default function App() {
          return (
            <Stat>
              <StatLabel>Custom</StatLabel>
            </Stat>
          )
        }
        "
      `)
    })

    test("handles nested Stat components", async () => {
      const input = `
import { Box, Stat, StatLabel, StatNumber } from '@chakra-ui/react'

export default function App() {
  return (
    <Box>
      <Stat>
        <StatLabel>Outer</StatLabel>
        <StatNumber>123</StatNumber>
      </Stat>
    </Box>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box, Stat } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box>
              <Stat.Root>
                <Stat.Label>Outer</Stat.Label>
                <Stat.ValueText>123</Stat.ValueText>
              </Stat.Root>
            </Box>
          )
        }
        "
      `)
    })
  })
})
