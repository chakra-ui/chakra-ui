---
"@chakra-ui/cli": patch
---

Fixes issues with `tokens` command hanging forever if theme workers run into
errors during runtime. Now when an error is discovered within a worker an
`{ err: string }` object is passed to the parent which will cause the promise to
reject. This will in turn, pass the same `err` upwards to allow the command to
exit gracefully, printing the `err` in question to `stdout`
