import type { ReactNode } from "react"
import { renderToString } from "react-dom/server"
// Run:     pnpm bench
// Compare: pnpm bench --outputJson base.json   (on the base revision)
//          pnpm bench --compare base.json      (on the branch)
//
// Validated against #9698: reintroducing 04a1a07f1e (memo stripped from
// `cssFn`, `mergeFn` and `transform`) shows up here as 0.39x-0.52x, far
// outside the +-5% noise floor.

import { bench } from "vitest"
import {
  Badge,
  Box,
  Button,
  ChakraProvider,
  Field,
  Heading,
  Input,
  Skeleton,
  Stack,
  Text,
  createSystem,
  defaultConfig,
  defaultSystem,
} from "../src"

// Function-level benchmarks mislead here: `cssFn` and `transform` memoize the
// layer above style resolution, so work that looks hot in isolation barely
// runs during a render. These mount real trees instead.

// Shape from #10878: a data table of recipe components, most of them
// identical and visually inert. 30 rows => 90 buttons, 60 badges, 210 skeletons.
function DataTable({ rows }: { rows: number }) {
  return (
    <Box>
      {Array.from({ length: rows }, (_, row) => (
        <Box key={row} display="flex" gap="2" padding="2">
          {Array.from({ length: 7 }, (_, cell) => (
            <Skeleton key={cell} loading={false}>
              cell
            </Skeleton>
          ))}
          <Badge colorPalette="gray">ok</Badge>
          <Badge colorPalette="green">live</Badge>
          <Button variant="ghost" size="xs">
            edit
          </Button>
          <Button variant="ghost" size="xs">
            copy
          </Button>
          <Button variant="ghost" size="xs">
            open
          </Button>
        </Box>
      ))}
    </Box>
  )
}

// Shape from #9698: a dialog body of form controls, mounted when it opens.
function DialogForm({ fields }: { fields: number }) {
  return (
    <Stack gap="4" padding="6">
      <Heading size="lg">Settings</Heading>
      {Array.from({ length: fields }, (_, i) => (
        <Field.Root key={i} invalid={i % 7 === 0}>
          <Field.Label>Field {i}</Field.Label>
          <Input size={i % 2 ? "sm" : "md"} variant="outline" />
          <Field.HelperText>Helper text {i}</Field.HelperText>
        </Field.Root>
      ))}
      <Stack direction="row" gap="3">
        <Button variant="subtle" size="sm">
          Cancel
        </Button>
        <Button variant="solid" size="sm" colorPalette="blue">
          Save
        </Button>
      </Stack>
    </Stack>
  )
}

// Every instance differs, so the style caches miss far more often.
const VARIANTS = ["solid", "subtle", "outline", "ghost"] as const
const SIZES = ["xs", "sm", "md", "lg"] as const
const PALETTES = ["gray", "red", "blue", "green", "purple"] as const

function VariedPage({ rows }: { rows: number }) {
  return (
    <Box padding="4">
      {Array.from({ length: rows }, (_, i) => (
        <Box
          key={i}
          borderWidth="1px"
          padding={i % 3 ? "2" : "4"}
          marginTop="2"
          rounded={i % 2 ? "sm" : "md"}
        >
          <Text fontSize={i % 2 ? "sm" : "md"}>Row {i}</Text>
          <Badge colorPalette={PALETTES[i % PALETTES.length]}>tag</Badge>
          <Button
            variant={VARIANTS[i % VARIANTS.length]}
            size={SIZES[i % SIZES.length]}
            colorPalette={PALETTES[i % PALETTES.length]}
          >
            Action {i}
          </Button>
        </Box>
      ))}
    </Box>
  )
}

const withProvider = (node: ReactNode, system = defaultSystem) => (
  <ChakraProvider value={system}>{node}</ChakraProvider>
)

// Rendering allocates heavily, so a short run is dominated by GC pauses and
// the margin of error swamps the regression being looked for. Long warmups
// and long sample windows keep it inside a couple of percent.
const options = { time: 2000, warmupTime: 1000 }

/* -----------------------------------------------------------------------------
 * System creation, so boot cost can be read separately from render cost
 * -----------------------------------------------------------------------------*/

bench(
  "createSystem(defaultConfig)",
  () => {
    createSystem(defaultConfig)
  },
  options,
)

/* -----------------------------------------------------------------------------
 * Server render, shared system. The most stable signal: no teardown, no jsdom.
 * -----------------------------------------------------------------------------*/

bench(
  "ssr: data table (30 rows)",
  () => {
    renderToString(withProvider(<DataTable rows={30} />))
  },
  options,
)

bench(
  "ssr: dialog form (40 fields)",
  () => {
    renderToString(withProvider(<DialogForm fields={40} />))
  },
  options,
)

bench(
  "ssr: varied page (80 rows)",
  () => {
    renderToString(withProvider(<VariedPage rows={80} />))
  },
  options,
)

/* -----------------------------------------------------------------------------
 * Client mount is deliberately absent. Mounting into jsdom measured at
 * +-9% to +-13% rme here, wide enough to hide a 1.5x regression, and the
 * failure modes it would add over server rendering are effects and
 * reconciliation rather than style resolution. Server rendering runs the
 * hooks that matter (`useRecipe`'s `useMemo`, `useRecipeResult`) and holds
 * +-5%, so regressions in style resolution show up here just as clearly.
 * -----------------------------------------------------------------------------*/
