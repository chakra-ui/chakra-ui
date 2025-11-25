---
"@chakra-ui/cli": patch
"@chakra-ui/react": patch
---

fix: CLI typegen custom outdir now generates correct imports

Fixed issue where using `--outdir` with CLI typegen resulted in broken relative
imports. Generated files now use absolute imports from `@chakra-ui/react` when
custom outdir is specified, ensuring types work regardless of output location.
