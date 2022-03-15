import * as React from "react"
import Benchmark, { Target } from "benchmark"
import { renderToString as render } from "react-dom/server"
import emotion from "@emotion/styled"
import { motion } from "framer-motion"
import { chakra } from "@chakra-ui/react"
import * as asciichart from "asciichart"
import * as fs from "fs"

const TITLE_MIN_LENGTH = 32

const cycleMessages: string[] = []
const suiteResults: number[][] = []

function getChart() {
  const colorsOrder = ["cyan", "blue", "lightgray", "lightred"]
  const legend = `
Plot legend - the higher the better
Suite color order: ${colorsOrder.slice(0, suiteResults.length - 1).join(", ")}`
  const chart = asciichart.plot(suiteResults, {
    height: 20,
    colors: colorsOrder.map((c) => asciichart[c]),
  })

  return [legend, chart].join("\n")
}

function createSuite(name: string) {
  const suite = new Benchmark.Suite(name)
  return suite
    .on("start", (e: React.SyntheticEvent<{ name: string }>) => {
      console.log("\nStarting:", e.currentTarget.name)
    })
    .on("error", (e: Error) => console.log(e))
    .on("cycle", (event: Event) => {
      const message = String(event.target)
      console.log("▸", message)
      cycleMessages.push(message)
    })
    .on("complete", (e: Benchmark.Event) => {
      const durations = Array.from(e.currentTarget as Target[]).flatMap(
        (x) => [x.hz, x.hz, x.hz, x.hz, x.hz, x.hz] as number[],
      )
      suiteResults.push(durations)
    })
}

const smallChakraStyleObject = {
  color: "gray.50",
  bg: "gray.800",
  rounded: "full",
}

const mediumChakraStyleObject = {
  color: "gray.50",
  bg: "gray.800",
  rounded: "full",
  _hover: {
    transform: "scale(1.05)",
  },
  _dark: {
    color: "gray.900",
    bg: "gray.400",
  },
}

const largeChakraStyleObject = {
  color: "gray.50",
  bg: "gray.800",
  rounded: "full",
  _hover: {
    transform: "scale(1.05)",
  },
  _dark: {
    color: "gray.900",
    bg: "gray.400",
  },
  sx: {
    ".additional-stuff": {
      color: "gray.50",
      bg: "gray.800",
      rounded: "full",
      _hover: {
        transform: "scale(1.05)",
      },
      _dark: {
        color: "gray.900",
        bg: "gray.400",
      },
      ".so-nested": {
        color: "gray.50",
        bg: "gray.800",
        rounded: "full",
        _hover: {
          transform: "scale(1.05)",
        },
        _dark: {
          color: "gray.900",
          bg: "gray.400",
        },
      },
    },
  },
}

const hulkChakraStyleObject = {
  ...largeChakraStyleObject,
  sx: {
    ".nested": largeChakraStyleObject,
    ".nested-2": largeChakraStyleObject,
  },
}

const smallCSSStyleObject = {
  color: "gray",
  background: "black",
  borderRadius: "9999px",
}

const mediumCSSStyleObject = {
  color: "gray",
  background: "black",
  borderRadius: "9999px",
  "&:hover": {
    transform: "scale(1.05)",
  },
  '[data-theme="dark"] &': {
    color: "gray.900",
    bg: "gray.400",
  },
}

const largeCSSStyleObject = {
  color: "gray",
  background: "black",
  borderRadius: "9999px",
  "&:hover": {
    transform: "scale(1.05)",
  },
  '[data-theme="dark"] &': {
    color: "black",
    bg: "#b4d455",
  },
  ".additional-stuff": {
    color: "gray",
    background: "black",
    borderRadius: "9999px",
    "&:hover": {
      transform: "scale(1.05)",
    },
    '[data-theme="dark"] &': {
      color: "blue",
      background: "#b4d455",
    },
    ".so-nested": {
      color: "gray",
      background: "black",
      borderRadius: "9999px",
      "&:hover": {
        transform: "scale(1.05)",
      },
      _dark: {
        color: "blue",
        background: "green",
      },
    },
  },
}

const hulkCSSStyleObject = {
  ...largeCSSStyleObject,
  ".nested": largeCSSStyleObject,
  ".nested-2": largeCSSStyleObject,
}

export async function runProfilingSuites() {
  createSuite("chakra")
    .add(`chakra`.padEnd(TITLE_MIN_LENGTH), () => {
      render(<chakra.div />)
    })
    .add(`chakra small style object`.padEnd(TITLE_MIN_LENGTH), () => {
      render(<chakra.div {...smallChakraStyleObject} />)
    })
    .add(`chakra medium style object`.padEnd(TITLE_MIN_LENGTH), () => {
      render(<chakra.div {...mediumChakraStyleObject} />)
    })
    .add(`chakra large style object`.padEnd(TITLE_MIN_LENGTH), () => {
      render(<chakra.div {...largeChakraStyleObject} />)
    })
    .add(`chakra hulk style object`.padEnd(TITLE_MIN_LENGTH), () => {
      render(<chakra.div {...hulkChakraStyleObject} />)
    })
    .run()

  createSuite("emotion (baseline)")
    .add(`emotion`.padEnd(TITLE_MIN_LENGTH), () => {
      const EmotionDiv = emotion.div()
      render(<EmotionDiv />)
    })
    .add(`emotion small CSS object`.padEnd(TITLE_MIN_LENGTH), () => {
      const EmotionDiv = emotion.div(smallCSSStyleObject)
      render(<EmotionDiv />)
    })
    .add(`emotion medium CSS object`.padEnd(TITLE_MIN_LENGTH), () => {
      const EmotionDiv = emotion.div(mediumCSSStyleObject)
      render(<EmotionDiv />)
    })
    .add(`emotion large CSS object`.padEnd(TITLE_MIN_LENGTH), () => {
      const EmotionDiv = emotion.div(largeCSSStyleObject)
      render(<EmotionDiv />)
    })
    .add(`emotion hulk CSS object`.padEnd(TITLE_MIN_LENGTH), () => {
      const EmotionDiv = emotion.div(hulkCSSStyleObject)
      render(<EmotionDiv />)
    })
    .run()

  createSuite("framer-motion (baseline)")
    .add(`framer-motion`.padEnd(TITLE_MIN_LENGTH), () => {
      render(<motion.div />)
    })
    .run()
}

/**
 * @example
 *
 * ```bash
 * export CHAKRA_REACT_VERSION=$(grep version packages/react/package.json | awk -F \" '{print $4}')
 * yarn profile --out benchmark/output-v${CHAKRA_REACT_VERSION}.txt
 * ```
 */
async function main() {
  console.log("Benchmark of initial render durations")
  const outIndex = process.argv.findIndex((a) => a.indexOf("--out") !== -1)
  const out =
    outIndex !== -1
      ? process.argv.slice().splice(outIndex + 1, 1)?.[0]
      : undefined

  await runProfilingSuites()

  const chart = getChart()
  console.log(chart)

  if (!out) return

  console.log(`\n\nWriting to "${out}"`)
  const content = cycleMessages.join("\n")
  fs.writeFileSync(out, content)
}

if (
  typeof module !== "undefined" &&
  typeof require !== "undefined" &&
  module === require.main
) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
