import { chakra, HTMLChakraProps } from "@chakra-ui/system"
import { useAvatarStyles } from "./avatar-context"
import { AvatarOptions } from "./avatar-types"

export function initials(name: string) {
  const [firstName, lastName] = name.split(" ")
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0)
}

interface AvatarNameProps
  extends HTMLChakraProps<"div">,
    Pick<AvatarOptions, "name" | "getInitials"> {}
/**
 * The avatar name container
 */

export function AvatarName(props: AvatarNameProps) {
  const { name, getInitials, ...rest } = props
  const styles = useAvatarStyles()

  return (
    <chakra.div role="img" aria-label={name} {...rest} __css={styles.label}>
      {name ? getInitials?.(name) : null}
    </chakra.div>
  )
}

AvatarName.displayName = "AvatarName"
