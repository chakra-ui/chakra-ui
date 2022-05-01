---
"@chakra-ui/toast": major
"@chakra-ui/react": major
---

> Please note: There are **no breaking changes** to the hook `useToast`. There
> are only breaking changes to `createStandaloneToast`.

### Breaking changes to `createStandaloneToast`

Chakra UI v1 rendered the toast container DOM element for you. In v2 you need to
render the `ToastContainer` in your application code. This allows you have only
one React root in your application.

#### @chakra-ui/react v1

```ts
import { createStandaloneToast } from "@chakra-ui/toast"

const toast = createStandaloneToast()
toast({ title: "Chakra UI" })
```

#### @chakra-ui/react v2

```tsx
import * as ReactDOM from "react-dom/client"
import { createStandaloneToast } from "@chakra-ui/toast"

const { ToastContainer, toast } = createStandaloneToast()

// render the ToastContainer in your React root
const rootElement = document.getElementById("root")
ReactDOM.createRoot(yourRootElement).render(
  <>
    <App />
    <ToastContainer />
  </>,
)

toast({ title: "Chakra UI" })
```
