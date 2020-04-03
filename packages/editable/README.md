# @chakra-ui/editable

EditableText is used for inline renaming of some text. It appears as normal UI
text but transforms into a text input field when the user clicks or focuses on
it.

## Installation

```sh
yarn add @chakra-ui/editable

# or

npm i @chakra-ui/editable
```

## Import component

```js
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/core"
```

## Usage

```jsx
<Editable defaultValue="Take some chakra">
  <EditablePreview />
  <EditableInput />
</Editable>
```
