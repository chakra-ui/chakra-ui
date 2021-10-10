---
"@chakra-ui/cli": patch
---

If tsconfig.json didn't have the settings for ts-node it ended up giving this
error because it could only use CommonJS. I just override one of the user
project settings to be able to use CommonJS.
