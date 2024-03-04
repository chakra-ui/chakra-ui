// import { useLatestRef } from "@chakra-ui/hooks"
// import * as React from "react"
// import { ToastId, createStandaloneToast, useToast } from "."
// import { Alert, Button, ButtonGroup, Text, chakra, useColorMode } from "../.."
// import { theme as base } from "../../theme"

// export default {
//   title: "Feedback / Toast",
// }

// export function ToastExample() {
//   const toast = useToast()
//   const id = "login-error-toast"
//   return (
//     <ButtonGroup>
//       <Button
//         onClick={() => {
//           if (toast.isActive(id)) return
//           toast({
//             id,
//             position: "top-left",
//             title: "Error Connecting...",
//             description: "You do not have permissions to perform this action.",
//             status: "error",
//             duration: null,
//             isClosable: true,
//             colorScheme: "red",
//             onCloseComplete: () => {
//               console.log("hello")
//             },
//           })
//         }}
//       >
//         Show Toast
//       </Button>
//       <Button onClick={() => toast.closeAll()}>Close all</Button>
//       <Button
//         onClick={() =>
//           toast.update(id, {
//             title: "Hooray 🥳🥳🥳!!!",
//             description: "You now have permissions to perform this action.",
//             status: "success",
//             duration: 3000,
//           })
//         }
//       >
//         Update
//       </Button>
//       <Button onClick={() => toast.close(id)}>Close One</Button>
//     </ButtonGroup>
//   )
// }

// export function CustomRender() {
//   const toast = useToast()
//   return (
//     <>
//       <Button
//         onClick={() =>
//           toast({
//             duration: null,
//             position: "top-right",
//             title: "Render Toast",
//             description: "Allows custom toast content",
//             render: ({ title, description }) => (
//               <chakra.div rounded="md" color="white" p={3} bg="blue.500">
//                 <b>{title}</b>
//                 <div>Hello World. {description}</div>
//               </chakra.div>
//             ),
//           })
//         }
//       >
//         Show Toast
//       </Button>
//       <Button
//         colorScheme="pink"
//         onClick={() =>
//           toast({
//             position: "bottom-right",
//             title: "Testing",
//             description: "This toast is working well",
//           })
//         }
//       >
//         Show Toastify
//       </Button>
//     </>
//   )
// }

// export function SuccessToast() {
//   const toast = useToast()
//   return (
//     <Button
//       onClick={() =>
//         toast({
//           position: "bottom",
//           title: "Account created.",
//           description: "We've created your account for you.",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//           onCloseComplete: () => {
//             console.log("close")
//           },
//         })
//       }
//     >
//       Show Success Toast
//     </Button>
//   )
// }

// export function WarningToast() {
//   const toast = useToast()
//   return (
//     <Button
//       onClick={() =>
//         toast({
//           title: "Warning.",
//           description: "This is a warning.",
//           status: "warning",
//           duration: 9000,
//           isClosable: true,
//         })
//       }
//     >
//       Show Warning Toast
//     </Button>
//   )
// }

// export function ErrorToast() {
//   const toast = useToast()
//   return (
//     <Button
//       onClick={() =>
//         toast({
//           title: "An error occurred.",
//           description: "Unable to create user account.",
//           status: "error",
//           duration: 9000,
//           isClosable: true,
//         })
//       }
//     >
//       Show Error Toast
//     </Button>
//   )
// }

// export const AllSides = () => {
//   const toast = useToast()

//   const positions = [
//     "top-left",
//     "top",
//     "top-right",
//     "bottom-left",
//     "bottom",
//     "bottom-right",
//   ] as const

//   return (
//     <>
//       <Button
//         onClick={() => {
//           positions.forEach((p) => {
//             toast({ position: p, title: p })
//           })
//         }}
//       >
//         Trigger
//       </Button>

//       <Button ml="40px" onClick={() => toast.closeAll()}>
//         Close all
//       </Button>
//     </>
//   )
// }

// export const ColorModeBug = () => {
//   const toast = useToast()
//   const { toggleColorMode } = useColorMode()
//   return (
//     <>
//       <Button
//         onClick={() =>
//           toast({
//             render() {
//               return <Alert.Root>test</Alert.Root>
//             },
//           })
//         }
//       >
//         Click me!
//       </Button>
//       <Button onClick={() => toggleColorMode()}>Toggle Mode</Button>
//     </>
//   )
// }

// export const CloseAllTopLeftToasts = () => {
//   const toast = useToast()

//   const positions = [
//     "top-left",
//     "top",
//     "top-right",
//     "bottom-left",
//     "bottom",
//     "bottom-right",
//   ] as const

//   return (
//     <>
//       <Button
//         onClick={() => {
//           positions.forEach((position) => {
//             toast({ position, title: position })
//           })
//         }}
//       >
//         Trigger
//       </Button>

//       <hr />
//       <Button onClick={() => toast.closeAll({ positions: ["top-left"] })}>
//         close all top-left
//       </Button>
//     </>
//   )
// }

// export const UseToastWithDefaults = () => {
//   const toast = useToast({
//     position: "top-right",
//     title: "asdf",
//   })

//   return <Button onClick={() => toast()}>toast</Button>
// }

// export const UseToastWithCustomContainerStyle = () => {
//   const toast = useToast({
//     position: "top",
//     title: "Container style is updated",
//     containerStyle: {
//       width: "800px",
//       maxWidth: "100%",
//       border: "20px solid red",
//     },
//   })

//   return (
//     <Button
//       onClick={() => {
//         toast()
//       }}
//     >
//       toast
//     </Button>
//   )
// }

// export const useToastCustomRenderUpdate = () => {
//   const [id, setId] = React.useState<ToastId | null>(null)
//   const toast = useToast()
//   const latestToastRef = useLatestRef(toast)

//   React.useEffect(() => {
//     if (id) {
//       const timeout = setTimeout(() => {
//         latestToastRef.current.update(id, {
//           render: () => (
//             <ButtonGroup>
//               <Button variant="outline">outline button after update</Button>
//               <Button variant="ghost">ghost button after update</Button>
//               <Button variant="link">link button after update</Button>
//             </ButtonGroup>
//           ),
//         })

//         setId(null)
//       }, 2000)

//       return () => clearTimeout(timeout)
//     }
//   }, [id, latestToastRef])

//   return (
//     <Button
//       onClick={() => {
//         const id = toast({
//           render: () => <Button variant="solid">solid button initially</Button>,
//         })

//         setId(id ?? null)
//       }}
//     >
//       toast
//     </Button>
//   )
// }

// export function StandAloneToast() {
//   const { ToastContainer, toast } = createStandaloneToast({
//     theme: {
//       ...base,
//       colors: {
//         green: {
//           500: "#bf3c3c",
//         },
//       },
//     },
//   })
//   return (
//     <>
//       <ToastContainer />

//       <Text fontSize="lg" fontWeight="bold">
//         This Text matches Theme font
//       </Text>
//       <ButtonGroup>
//         <Button
//           onClick={() => {
//             toast({
//               title: "Standalone Toast",
//               description: "Uses provided theme",
//               status: "success",
//               duration: 3000,
//               isClosable: true,
//               onCloseComplete: () => {
//                 console.log("hello")
//               },
//             })
//           }}
//         >
//           Standalone Toast With Custom Theme
//         </Button>
//       </ButtonGroup>
//     </>
//   )
// }

// export const AsyncToast = () => {
//   const toast = useToast()

//   const getResolve = () =>
//     new Promise<string>((resolve) => setTimeout(() => resolve("hello"), 2000))

//   const getReject = () =>
//     new Promise<string>((_, reject) => setTimeout(() => reject(), 2000))
//   const promiseOptions = {
//     loading: {
//       title: "Please wait ...",
//       duration: null,
//     },
//     success: {
//       title: "Wait is over you won!",
//     },
//     error: {
//       title: "Wait is over you loose",
//     },
//   }

//   return (
//     <ButtonGroup>
//       <Button onClick={() => toast.promise(getResolve(), promiseOptions)}>
//         Async toast [success]
//       </Button>
//       <Button onClick={() => toast.promise(getReject(), promiseOptions)}>
//         Async toast [error]
//       </Button>
//     </ButtonGroup>
//   )
// }

// export const ToastWithCustomIcon = () => {
//   const toast = useToast()
//   const id = "toast-with-custom-icon"

//   return (
//     <ButtonGroup>
//       <Button
//         onClick={() => {
//           if (toast.isActive(id)) return
//           toast({
//             id,
//             position: "top-left",
//             title: "Message me",
//             icon: (
//               <span role="img" aria-label="icon">
//                 💬
//               </span>
//             ),
//             duration: null,
//             isClosable: true,
//             onCloseComplete: () => {
//               console.log("hello")
//             },
//           })
//         }}
//       >
//         Show Toast
//       </Button>
//       <Button onClick={() => toast.closeAll()}>Close all</Button>
//       <Button
//         onClick={() =>
//           toast.update(id, {
//             title: "You have reached me!!!",
//             icon: (
//               <span role="img" aria-label="icon">
//                 🥳
//               </span>
//             ),
//             duration: 3000,
//           })
//         }
//       >
//         Update
//       </Button>
//       <Button onClick={() => toast.close(id)}>Close One</Button>
//     </ButtonGroup>
//   )
// }

// export function WithDoubleUpdate() {
//   const toast = useToast()
//   const toastIdRef = React.useRef<ToastId>()

//   function updateOne() {
//     if (toastIdRef.current) {
//       toast.update(toastIdRef.current, { description: "1st update" })
//     }
//   }

//   function updateTwo() {
//     if (toastIdRef.current) {
//       toast.update(toastIdRef.current, { description: "2nd update" })
//     }
//   }

//   function addToast() {
//     toastIdRef.current = toast({
//       position: "bottom-right",
//       description: "some text",
//     })
//   }

//   return (
//     <div>
//       <Button onClick={addToast} type="button">
//         Toast
//       </Button>

//       <Button onClick={updateOne} type="button" variant="outline">
//         Update last toast
//       </Button>

//       <Button onClick={updateTwo} type="button" variant="outline">
//         Update last toast 2
//       </Button>
//     </div>
//   )
// }
