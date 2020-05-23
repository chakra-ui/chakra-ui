# @chakra-ui/toast

The toast is used to show alerts on top of an overlay.

The toast will close itself when the close button is clicked, or after a timeout
— the default is 5 seconds.

Toasts can be configured to appear at either the top or the bottom of an
application window, and it is possible to have more than one toast onscreen at a
time.

## Import component

```js
import useToast from "@chakra-ui/toast"
```

## Usage

```jsx
function ToastExample() {
  const toast = useToast()

  return (
    <Button
      onClick={() =>
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Show Toast
    </Button>
  )
}
```

### Positioning toast

By default, all the toasts will be positioned on the `top-right` of your
browser.

The following values are allowed: **top-right, top, top-left, bottom-right,
bottom, bottom-left**

```jsx
import * as React from "react"
import useToast from "@chakra-ui/toast"

const Position = () => {
  const toast = useToast()

  const notify = () => {
    toast({ title: "Success Notification !", status: "success" })
  }

  return <button onClick={notify}>Notify</button>
}
```

### Set autoClose delay or disable it

To change the show delay for any toast, simply pass the `duration` prop when
invoking the `toast` function.

> Note 🚨: If you pass `null` as the duration, the toast will always remain on
> screen.

```jsx
import * as React from "react"
import useToast from "@chakra-ui/toast"

const Duration = () => {
  const toast = useToast()

  const notify = () => {
    toast({
      duration: 5000,
      title: "I will close after 5 secs",
    })
  }

  return <button onClick={notify}>Notify</button>
}
```

### Render a custom toast component

Display a custom component instead of the default Toast UI.

We provide 2 key `props` to your component, `id`, and `onClose` to close the
toast (to build your custom close button).

```jsx
function Example() {
  const toast = useToast()

  return (
    <Button
      onClick={() => {
        toast({
          position: "bottom-left",
          render: (props) => (
            <Box m={3} color="white" p={3} bg="blue.500">
              Hello World
            </Box>
          ),
        })
      }}
    >
      Show Toast
    </Button>
  )
}
```

### Use a custom id

A custom `id` can be used to replace the one internal auto-generated toast `id`.
You can use a `number` or a `string`.

This is mostly useful when you need to prevent duplication of a specific toast.

### Prevent duplicate

To prevent duplicates, you can check if a given toast is active by calling
`toast.isActive(id)` like the snippet below. Or, you can use a custom `toastId`:

```js
import * as React from "react"
import useToast from "@chakra-ui/toast"

const Example = () => {
  const toast = useToast()

  const id = "login-toast"

  const notify = () => {
    if (!toast.isActive(id)) {
      toast({ title: "Dude! I cannot be duplicated" })
    }
  }

  return (
    <div>
      <button onClick={notify}>Notify</button>
    </div>
  )
}
```

### Update a toast

When you update a toast, the toast options and the content are inherited but
don't worry you can update them.

```js
import * as React from "react"
import useToast from "@chakra-ui/toast"

const Update = () => {
  const toast = useToast()

  const id = React.useRef(null)

  const notify = () => {
    id.current = toast({
      title: "Chidori is not available!",
      duration: null,
    })
  }

  const update = () => {
    toast.update(id.current, {
      title: "Sharingan is all you have!",
      status: "success",
      duration: 5000,
    })
  }

  return (
    <div>
      <button onClick={notify}>Notify</button>
      <button onClick={update}>Update</button>
    </div>
  )
}
```
