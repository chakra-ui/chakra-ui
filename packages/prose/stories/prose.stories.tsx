import * as React from "react"
import { Container } from "@chakra-ui/layout"

import { Prose } from "../src"

export default {
  title: "Components / Typography / Prose",
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

export const basic = () => (
  <>
    <h1>A h1 outside of the Prose</h1>
    <Prose>
      <h1>Title Heading 1</h1>
      <h2>Title Heading 2</h2>
      <h3>Title Heading 3</h3>
      <h4>Title Heading 4</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at dolor
        nec ex rutrum semper. Praesent ultricies purus eget lectus tristique
        egestas ac in lacus. Nulla eleifend lorem risus, sit amet dictum nisi
        gravida eget. Suspendisse odio sem, scelerisque congue luctus nec,
        scelerisque ultrices orci. Praesent tincidunt, risus ut commodo cursus,
        ligula orci tristique justo, vitae sollicitudin lacus risus dictum orci.
      </p>
      <p>
        Vivamus vel enim at lorem ultricies faucibus. Cras vitae ipsum ut quam
        varius dignissim a ac tellus. Aliquam maximus mauris eget tincidunt
        interdum. Fusce vitae massa non risus congue tincidunt. Pellentesque
        maximus elit quis eros lobortis dictum.
      </p>
      <p>
        Fusce placerat ipsum vel sollicitudin imperdiet. Morbi vulputate non
        diam at consequat. Donec vitae sem eu arcu auctor scelerisque vel in
        turpis. Pellentesque dapibus justo dui, quis egestas sapien porttitor
        in.
      </p>
    </Prose>
  </>
)
