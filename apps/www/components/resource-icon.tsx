import { Icon } from "@chakra-ui/react"
import {
  IoDocumentText,
  IoLink,
  IoLogoGithub,
  IoLogoNpm,
} from "react-icons/io5"

export const ResourceIcon = (props: any) => {
  return (
    <Icon asChild fontSize="lg" color="fg.muted">
      {(() => {
        switch (props.type) {
          case "github":
            return <IoLogoGithub />
          case "npm":
            return <IoLogoNpm />
          case "docs":
            return <IoDocumentText />
          default:
            return <IoLink />
        }
      })()}
    </Icon>
  )
}
