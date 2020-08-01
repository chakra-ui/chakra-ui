import { chakra } from "@chakra-ui/core"
import * as React from "react"

type SidebarHeadingProps = {
  title?: string
  children: React.ReactNode
}

const SidebarHeading = (props: SidebarHeadingProps) => {
  const { title, children } = props
  return (
    <chakra.h4 fontSize="1.2rem" fontWeight="semibold" my="1.25rem">
      <h4>{title}</h4>
      <div>{children}</div>
    </chakra.h4>
  )
}

export default SidebarHeading
