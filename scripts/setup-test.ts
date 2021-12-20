//@ts-expect-error
const { getComputedStyle } = window
window.getComputedStyle = (elt) => getComputedStyle(elt)

Object.defineProperty(window, "requestAnimationFrame", {
  value: jest.fn((cb) => cb()),
})
