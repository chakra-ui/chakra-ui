#!/usr/bin/env node
import { run } from "../dist/esm/index.mjs"

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
