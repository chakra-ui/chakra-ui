# Live Regions

ARIA Live Regions are used to communicate important information to screen reader
software.

## Installation

```sh
yarn add @chakra-ui/live-region
```

## Import components

```jsx
import { LiveRegion, useLiveRegion } from "@chakra-ui/live-region"
```

## Usage

```jsx
import { useLiveRegion } from "@chakra-ui/live-region"

function Example() {
  const region = useLiveRegion()
  return (
    <button
      onClick={() => {
        region.speak("Filtering categories was successful")
      }}
    >
      Click me
    </button>
  )
}
```
