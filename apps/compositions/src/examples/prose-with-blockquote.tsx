import { Prose } from "compositions/ui/prose"

// Used for syntax highlighting
const html = String.raw

const content = html`
  <h3>Blockquotes</h3>
  <blockquote>This is a good looking blockquote!</blockquote>
  <p>And it can span into multiple lines:</p>
  <blockquote>
    Fusce placerat ipsum vel sollicitudin imperdiet. Morbi vulputate non diam at
    consequat. Donec vitae sem eu arcu auctor scelerisque vel in turpis.
    Pellentesque dapibus justo dui, quis egestas sapien porttitor in.
  </blockquote>
  <p>
    There&apos;s also <strong>strong</strong>, <b>b</b>, <em>em</em> support as
    well! But, let&apos;s display some code!
  </p>
`

export const ProseWithBlockquote = () => {
  return <Prose dangerouslySetInnerHTML={{ __html: content }} />
}
