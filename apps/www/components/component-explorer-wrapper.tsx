import { ComponentExplorer } from "./component-explorer"
import { ExamplePreview } from "./example"

export async function ComponentExplorerWrapper({ name }: { name: string }) {
  return (
    <ComponentExplorer
      Component={<ExamplePreview name={name} scope="examples" />}
      name={name}
    />
  )
}
