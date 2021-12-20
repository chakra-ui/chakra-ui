//@ts-expect-error
const { getComputedStyle } = window
window.getComputedStyle = (elt) => getComputedStyle(elt)
