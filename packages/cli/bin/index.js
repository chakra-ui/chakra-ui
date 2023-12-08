#!/usr/bin/env node
const { run } = require("../dist/cjs/index.cjs")

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
