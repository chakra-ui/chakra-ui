---
"@chakra-ui/toast": major
"@chakra-ui/react": major
---

Add support for React 18.

### Breaking changes for `createStandaloneToast`

With React <17 Chakra UI was able to render the toast container DOM element for
you. To allow Chakra UI to support all React versions >=16.8 you need to render
the DOM element in your application code.

#### before

```ts
import { createStandaloneToast } from "@chakra-ui/toast"

const toast = createStandaloneToast()
toast({ title: "Chakra UI" })
```

#### with React 17

```tsx
import { createStandaloneToast } from "@chakra-ui/toast"
import * as ReactDOM from "react-dom"

const toastContainerElement = document.createElement("div")
window.document.body.append(toastContainerElement)

const { ToastContainer, toast } = createStandaloneToast()
ReactDOM.render(<ToastContainer />, toastContainerElement)

toast({ title: "Chakra UI" })
```

#### with React 18

```tsx
import { createStandaloneToast } from "@chakra-ui/toast"
import * as ReactDOM from "react-dom/client"

const toastContainerElement = document.createElement("div")
window.document.body.append(toastContainerElement)

const { ToastContainer, toast } = createStandaloneToast()
const root = ReactDOM.createRoot(toastContainerElement)
root.render(<ToastContainer />)

toast({ title: "Chakra UI" })
```
