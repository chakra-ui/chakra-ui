---
"@chakra-ui/cli": patch
---

Fixed an issue where the CLI did not resolve custom tsconfig paths.

🚨 Please note that only the first alias target from the string array will be
resolved.

```json5
// tsconfig.json
{
  //...
  compilerOptions: {
    baseUrl: "src",
    paths: {
      "@alias/*": ["target/*"],
      //           ^-- only the first target will be resolved
    },
  },
}
```
