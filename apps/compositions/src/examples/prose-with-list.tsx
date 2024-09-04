import { Prose } from "compositions/ui/prose"

// Used for syntax highlighting
const html = String.raw

const content = html`
  <h3>Lists</h3>
  <p>Let's look at some unordered lists. Things to buy:</p>
  <ul>
    <li>Milk</li>
    <li>Eggs</li>
    <li>Bread</li>
    <li>Chakra UI Pro license</li>
  </ul>
  <p>And some ordered lists. Things to do:</p>
  <ol>
    <li>Pay the bills</li>
    <li>Walk the dog</li>
    <li>Take out trash</li>
  </ol>
`

export const ProseWithList = () => {
  return <Prose dangerouslySetInnerHTML={{ __html: content }} />
}
