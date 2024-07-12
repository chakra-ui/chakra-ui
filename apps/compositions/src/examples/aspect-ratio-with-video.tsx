import { AspectRatio } from "@chakra-ui/react"

export const AspectRatioWithVideo = () => {
  return (
    <AspectRatio maxW="560px" ratio={1}>
      <iframe
        title="naruto"
        src="https://www.youtube.com/embed/QhBnZ6NPOY0"
        allowFullScreen
      />
    </AspectRatio>
  )
}
