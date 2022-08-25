import { render, fireEvent } from "@chakra-ui/test-utils"
import * as React from "react"
import { useOutsideClick } from "../src"

const OutsideClicker = ({ onOutsideClick }: { onOutsideClick: () => void }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  useOutsideClick({
    ref,
    handler: onOutsideClick,
  })
  return (
    <>
      <div ref={ref}>Element</div>
      <div>Outside</div>
    </>
  )
}

test("should register clicks on other elements, the body, and the document", async () => {
  let outsideClicks = 0
  const { getByText } = render(
    <OutsideClicker onOutsideClick={() => outsideClicks++} />,
  )
  const element = getByText("Element")
  const outsideElement = getByText("Outside")

  const click = (el: Node) => {
    fireEvent.mouseDown(el)
    fireEvent.mouseUp(el)
  }

  expect(outsideClicks).toEqual(0)

  click(element)
  expect(outsideClicks).toEqual(0)

  click(outsideElement)
  expect(outsideClicks).toEqual(1)

  click(document.body)
  expect(outsideClicks).toEqual(2)

  click(document)
  expect(outsideClicks).toEqual(3)
})
