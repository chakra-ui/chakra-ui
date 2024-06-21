import { Avatar as ChakraAvatar } from "@chakra-ui/react"
import { forwardRef } from "react"

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>

interface AvatarOptions {
  name?: string
  src?: string
  srcSet?: string
  loading?: ImageProps["loading"]
}

export interface AvatarProps extends ChakraAvatar.RootProps, AvatarOptions {}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar(props, ref) {
    const { name, src, srcSet, loading, ...rest } = props
    return (
      <ChakraAvatar.Root ref={ref} {...rest}>
        <ChakraAvatar.Fallback>
          {name ? <ChakraAvatar.Initial name={name} /> : <ChakraAvatar.Icon />}
        </ChakraAvatar.Fallback>
        <ChakraAvatar.Image src={src} srcSet={srcSet} loading={loading} />
      </ChakraAvatar.Root>
    )
  },
)
