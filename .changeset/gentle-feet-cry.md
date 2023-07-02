---
"@chakra-ui/storybook-addon": patch
---

Improve build and exports

- Export a `preview` object containing the provider decorator
- Modify tsup config for improved build and to generate `.dts` files for prod
- Use up-to-date decorator function type for Provider decorator
  - Turns the first argument for the story into a function which returns the
    preview.
