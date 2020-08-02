import * as React from "react"
import renderer from "react-test-renderer"
import { chakra } from "../src"

const renderJSON = (el: React.ReactElement) => renderer.create(el).toJSON()

test("should render correctly", () => {
  const json = renderJSON(<chakra.div mt="40px">welcome</chakra.div>)
  expect(json).toMatchSnapshot()
})
