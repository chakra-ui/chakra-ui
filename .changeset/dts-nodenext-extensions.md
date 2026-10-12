---
"@chakra-ui/react": patch
"@chakra-ui/charts": patch
"@chakra-ui/cli": patch
---

Write relative imports with explicit `.ts`/`.tsx` extensions and build the
declarations with `moduleResolution: "nodenext"`, so the published types resolve
for consumers on `node16`/`nodenext` (previously every named import, e.g.
`import { Button } from "@chakra-ui/react"`, failed with "has no exported
member"). `chakra typegen` emits the same extensions.
