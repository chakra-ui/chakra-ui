# Ideal Toast Spec

Add ToastProvider to the root

```jsx
<ToastProvider
  placement="top-right"
  motion={customVariants}
  component={CustomToastComponent}
  autoCloseTimeout={3000}
  toastSpacing={32} // this will control the `margin` value applied
>
  <App />
</ToastProvider>
```

User has access to a hook and non-hook functions to trigger toasts. Here's what
the hook version would look like:

> This is inspired by
> [react-toast-notification](https://github.com/jossmac/react-toast-notifications)

```jsx
function Example() {
  const {
    addToast,
    removeToast,
    removeAllToasts,
    updateToast,
    toasts,
  } = useToasts()

  return <button>Trigger</button>
}
```

For the non-hook version, we could export `toastManager` object that has all the
function.

```jsx
import { toastManager } from "@chakra-ui/react"

// To add we'll do this
toastManager.addToast(...)
```
