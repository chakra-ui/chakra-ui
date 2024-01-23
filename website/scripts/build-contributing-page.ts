import fs from 'fs'
import path from 'path'

function main() {
  const contributingFile = fs
    .readFileSync(path.join(process.cwd(), 'CONTRIBUTING.md'))
    .toString()

  const mdxCompleteFile = `---
title: Contributing to Chakra UI
description:
  'Thanks for being interested in contributing! We want contributing to Chakra
  UI to be enjoyable, and educational for anyone and everyone'
tags: ['contributing']
---

${contributingFile}`

  fs.writeFileSync(
    path.join(process.cwd(), 'content', 'getting-started', 'contributing.mdx'),
    mdxCompleteFile,
  )
}

main()
