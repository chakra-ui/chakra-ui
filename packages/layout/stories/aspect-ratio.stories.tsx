import * as React from "react"
import { AspectRatio, Box } from "../src"

export default {
  title: "AspectRatio",
}

/**
 * Wrap a video in AspectRatio, and it is automatically
 * sized to the desired ratio.
 */
export const WithVideo = () => (
  <AspectRatio maxWidth="300px" ratio={1}>
    <iframe
      title="test"
      src="https://www.youtube.com/embed/QhBnZ6NPOY0"
      allowFullScreen
    />
  </AspectRatio>
)

/**
 * Wrap an image in AspectRatio, and it is automatically
 * sized to the desired ratio.
 */
export const WithImage = () => (
  <AspectRatio maxWidth="400px" ratio={4 / 3}>
    <img
      src="https://upload.wikimedia.org/wikipedia/en/7/7d/Minions_characters.png"
      alt="minions"
    />
  </AspectRatio>
)

/**
 * Embed a map in AspectRatio, and it is automatically
 * sized to the desired ratio.
 */
export const WithMap = () => (
  <AspectRatio maxWidth="600px" ratio={16 / 9}>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng"
      title="demo"
    />
  </AspectRatio>
)

/**
 * Embed a map in AspectRatio, and it is automatically
 * sized to the desired ratio.
 */
export const WithResponsive = () => (
  <AspectRatio
    maxWidth="300px"
    ratio={{ base: 1, sm: 4 / 3, md: 16 / 9, lg: 21 / 9 }}
  >
    <Box
      backgroundColor={{
        base: "red.500",
        sm: "red.400",
        md: "red.300",
        lg: "red.200",
      }}
    >
      Box
    </Box>
  </AspectRatio>
)
