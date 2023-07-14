import { chakra } from "../system"

export * from "./menu.stories"

export default {
  title: "Components / Overlay / Menu",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="500px" mx="auto" mt="40px">
        {story()}
      </chakra.div>
    ),
  ],
}
