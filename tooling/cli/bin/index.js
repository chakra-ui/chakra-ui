#!/usr/bin/env node
const { run } = require("../dist/chakra-ui-cli.cjs")

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
