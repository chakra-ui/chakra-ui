#!/usr/bin/env node
import { run } from "../dist/index.js"

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
