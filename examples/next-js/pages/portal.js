import { Portal } from "@chakra-ui/react"

const Page = () => {
  return (
    <>
      outside portal
      <Portal>inside portal</Portal>
    </>
  )
}

export default Page
