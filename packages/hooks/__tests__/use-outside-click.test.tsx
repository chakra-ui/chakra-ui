import { fireEvent, render } from "@chakra-ui/test-utils"
import * as React from "react"
import { useOutsideClick } from "../src/use-outside-click"

const OutsideClicker = ({
  onOutsideClick,
  enabled = true,
}: {
  listenContextMenu?: boolean
  enabled?: boolean
  onOutsideClick: () => void
}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  useOutsideClick({
    enabled,
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

test("should register right clicks on other elements, the body, and the document", async () => {
  let outsideClicks = 0
  const { getByText } = render(
    <OutsideClicker
      onOutsideClick={() => outsideClicks++}
      listenContextMenu={true}
    />,
  )
  const element = getByText("Element")
  const outsideElement = getByText("Outside")

  const rightClick = (el: Node) => {
    fireEvent.mouseDown(el, { button: 2 })
    fireEvent.mouseUp(el, { button: 2 })
  }

  expect(outsideClicks).toEqual(0)

  rightClick(element)
  expect(outsideClicks).toEqual(0)

  rightClick(outsideElement)
  expect(outsideClicks).toEqual(1)

  rightClick(document.body)
  expect(outsideClicks).toEqual(2)

  rightClick(document)
  expect(outsideClicks).toEqual(3)
})

test("shouldn't register clicks on other elements, the body, and the document", async () => {
  let outsideClicks = 0
  const { getByText } = render(
    <OutsideClicker onOutsideClick={() => outsideClicks++} enabled={false} />,
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
  expect(outsideClicks).toEqual(0)

  click(document.body)
  expect(outsideClicks).toEqual(0)

  click(document)
  expect(outsideClicks).toEqual(0)
})
