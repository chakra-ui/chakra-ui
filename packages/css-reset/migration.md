# Migration Notes

## Changes

- Add `focus-visible` support to CSS Reset. All you need to do is to install
  `focus-visible` and import it at the root of your application

```sh
# as a dependency
yarn add focus-visible

# at the root of your application
import "focus-visible/dist/focus-visible"
```

## Notes on using focus visible

Removing focus styles for mouse interactions might have negative impacts on
users with with low vision or cognitive impairments.

https://github.com/WICG/focus-visible/issues/128
