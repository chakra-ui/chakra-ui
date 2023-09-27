import { chakra } from "@chakra-ui/system"
import { Rating } from "../src"

export default {
  title: "Components / Forms / Rating",
}

export const Basic = () => <Rating max={5} />

export const Large = () => <Rating max={10} />
