import { AspectRatio } from "@chakra-ui/react"

export const Iframe = (props: React.IframeHTMLAttributes<HTMLElement>) => {
  return (
    <AspectRatio ratio={16 / 9} mb="10" overflow="hidden" rounded="md">
      <iframe {...props} />
    </AspectRatio>
  )
}
