---
"@chakra-ui/docs": patch
---

- Migrated from `next-mdx-enhanced` to `next-mdx-remote`
- Generate Headings from `mdx` before rendering instead of rendered
  `React.Element`
- removed `getUserData` generation if there is an `author` mentioned in
  frontmatter because we partially ran into rate limits from `octokit/rest` but
  didn't used the data at all
