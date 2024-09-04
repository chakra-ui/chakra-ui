import { Prose } from "compositions/ui/prose"

// Used for syntax highlighting
const html = String.raw

const content = html`
  <h3>Tables</h3>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Role</th>
        <th>GitHub Profile</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Segun</td>
        <td>Creator</td>
        <td>segunadebayo</td>
      </tr>
      <tr>
        <td>Chris</td>
        <td>Ark Wizard</td>
        <td>grizzlycodes</td>
      </tr>
      <tr>
        <td>Abraham</td>
        <td>Trouble maker</td>
        <td>anubra266</td>
      </tr>
      <tr>
        <td>Esther</td>
        <td>Developer Advocate</td>
        <td>estheragbaje</td>
      </tr>
    </tbody>
  </table>
`

export const ProseWithTable = () => {
  return <Prose dangerouslySetInnerHTML={{ __html: content }} />
}
