import { Image } from "@sh3yk0-ui/react"

export const ImageWithAspectRatio = () => {
  return (
    <Image
      src="https://wallpapercave.com/uwp/uwp4261619.png"
      alt="Naruto vs Sasuke"
      aspectRatio={4 / 3}
      width="300px"
    />
  )
}
