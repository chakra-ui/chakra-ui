---
"@chakra-ui/react-env": patch
---

Fix issue where `EnviromentProvider` causes suspense boundary to throw hydration
errors.

Always render the `env` getter element to ensure consistent behavior in all
environments.
