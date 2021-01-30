#!/usr/bin/env node
const { run } = require("../dist/index.js")

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
