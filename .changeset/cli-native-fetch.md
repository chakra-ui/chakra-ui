---
"@chakra-ui/cli": patch
---

Replace `node-fetch` with the native `fetch` API, using undici's `ProxyAgent`
for `HTTPS_PROXY` support.
