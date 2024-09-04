import { Prose } from "compositions/ui/prose"

// Used for syntax highlighting
const html = String.raw

const content = html` <h1>Title Heading 1</h1>
  <h2>Title Heading 2</h2>
  <h3>Title Heading 3</h3>
  <h4>Title Heading 4</h4>

  <h4>Title Heading 4 <code>testing</code></h4>

  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at dolor nec
    ex rutrum semper. Praesent ultricies purus eget lectus tristique egestas ac
    in lacus. Nulla eleifend lorem risus, sit amet dictum nisi gravida eget.
    Suspendisse odio sem, scelerisque congue luctus nec, scelerisque ultrices
    orci. Praesent tincidunt, risus ut commodo cursus, ligula orci tristique
    justo, vitae sollicitudin lacus risus dictum orci. Press <kbd>Ctrl</kbd> +
    <kbd>C</kbd> to copy
  </p>

  <p>
    Vivamus vel enim at lorem ultricies faucibus. Cras vitae ipsum ut quam
    varius dignissim a ac tellus. Aliquam maximus mauris eget tincidunt
    interdum. Fusce vitae massa non risus congue tincidunt. Pellentesque maximus
    elit quis eros lobortis dictum.
  </p>

  <hr />

  <p>
    Fusce placerat ipsum vel sollicitudin imperdiet. Morbi vulputate non diam at
    consequat. Donec vitae sem eu arcu auctor scelerisque vel in turpis.
    Pellentesque dapibus justo dui, quis egestas sapien porttitor in.
  </p>

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
  <h3>Code</h3>
  <pre><code>&lt;article&gt;
  &lt;h4&gt;Title Heading 4&lt;/h4&gt;
  &lt;p&gt;
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at dolor nec ex rutrum semper. Praesent ultricies purus eget lectus
    tristique egestas ac in lacus. Nulla eleifend lorem risus, sit amet dictum nisi gravida eget. Suspendisse odio sem, scelerisque congue
    luctus nec, scelerisque ultrices orci. Praesent tincidunt, risus ut commodo cursus, ligula orci tristique justo, vitae sollicitudin lacus risus dictum orci.
  &lt;/p&gt;
&lt;/article&gt;</code></pre>
  <p>
    Sometimes you&apos;d want to use <code>console.log</code>, and that would be
    just fine!
  </p>
  <h3>Links</h3>
  <p>
    If you want to learn more,
    <a href="https://chakra-ui.com">check out our docsite</a>!
  </p>
  <h3>Figure</h3>
  <p>
    Fusce placerat ipsum vel sollicitudin imperdiet. Morbi vulputate non diam at
    consequat. Donec vitae sem eu arcu auctor scelerisque vel in turpis.
    Pellentesque dapibus justo dui, quis egestas sapien porttitor in.
  </p>
  <figure>
    <img
      alt="Lagos, Nigeria"
      src="https://images.unsplash.com/photo-1593717191400-84f38ee95485?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2048&q=100"
    />
    <figcaption>Lagos, Nigeria</figcaption>
  </figure>
  <p>
    Fusce placerat ipsum vel sollicitudin imperdiet. Morbi vulputate non diam at
    consequat. Donec vitae sem eu arcu auctor scelerisque vel in turpis.
    Pellentesque dapibus justo dui, quis egestas sapien porttitor in.
  </p>
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
  </table>`

export const ProseSink = () => {
  return <Prose mx="auto" dangerouslySetInnerHTML={{ __html: content }} />
}
