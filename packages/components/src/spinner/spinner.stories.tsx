import { Spinner } from "."

export default {
  title: "Feedback / Spinner",
}

export const basic = () => <Spinner />

export const color = () => <Spinner color="red.500" />

export const size = () => (
  <div>
    {["xl", "lg", "md", "sm", "xs"].map((size) => (
      <Spinner key={size} margin={3} color="green.500" size={size} />
    ))}
  </div>
)

export const speed = () => (
  <Spinner color="blue.500" emptyColor="gray.200" speed="0.8s" />
)

export const emptyColor = () => (
  <Spinner color="red.500" emptyColor="gray.200" />
)
