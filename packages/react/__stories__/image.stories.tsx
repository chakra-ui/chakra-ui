import { Image } from "../src/components/image"

export default {
  title: "Components / Image",
}

export const Basic = () => (
  <Image
    width={["100px", "200px"]}
    src="https://bit.ly/dan-abramov"
    alt="welcome"
  />
)

export const WithFit = () => (
  <Image
    src="https://bit.ly/sage-adebayo"
    fit="cover"
    width="400px"
    height="300px"
  />
)
