import { For, useRecipe } from "../src"
import { Spinner } from "../src/components/spinner"

export default {
  title: "Feedback / Spinner",
}

export const Basic = () => <Spinner />

export const WithColor = () => <Spinner color="red.500" />

export const WithSizes = () => {
  const recipe = useRecipe("Spinner")
  return (
    <div>
      <For each={recipe.variantMap.size}>
        {(size) => (
          <Spinner key={size} margin={3} color="green.500" size={size} />
        )}
      </For>
    </div>
  )
}

export const WithSpeed = () => (
  <Spinner color="blue.500" emptyColor="gray.200" speed="0.8s" />
)

export const WithEmptyColor = () => (
  <Spinner color="red.500" emptyColor="gray.200" />
)
