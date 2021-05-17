# @chakra-ui/react-env

React component and hook for handling window and document object in iframe or
ssr environment

> This is an internal utility, not intended for public usage.

## Installation

```sh
yarn add @chakra-ui/react-env
# or
npm i @chakra-ui/react-env
```

## Usage

To get it working, you need to wrap your app in `EnvironmentProvider` and call
the `useEnvironment` hook anywhere in your app to get access to the correct
`window` and `document`.

```jsx
import { EnvironmentProvider } from "@chakra-ui/react-env"

// in your App
const App = ({ children }) => {
  return <EnvironmentProvider>{children}</EnvironmentProvider>
}

// read the environment
const WindowSize = () => {
  const { window } = useEnvironment()
  return (
    <pre>
      {JSON.stringify({
        w: window.innerWidth,
        h: window.innerHeight,
      })}
    </pre>
  )
}
```

If you wrap specific aspects of your app within an `iframe`, you'll need to wrap
the content in the iframe in `EnvironmentProvider` to provide the correct
`window` and `document` to its content.

```jsx
// in your app
const EmbeddedIFrame = () => {
  return (
    <Frame>
      <EnvironmentProvider>
        <WindowSize />
      </EnvironmentProvider>
    </Frame>
  )
}
```

## Contribution

Yes please! See the
[contributing guidelines](https://github.com/chakra-ui/chakra-ui/blob/master/CONTRIBUTING.md)
for details.

## Licence

This project is licensed under the terms of the
[MIT license](https://github.com/chakra-ui/chakra-ui/blob/master/LICENSE).
