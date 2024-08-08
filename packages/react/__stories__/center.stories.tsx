import { CenterBasic } from "compositions/examples/center-basic"
import { CenterWithAbsolute } from "compositions/examples/center-with-absolute"
import { CenterWithIcons } from "compositions/examples/center-with-icons"
import { CenterWithInline } from "compositions/examples/center-with-inline"
import { CenterWithSquare } from "compositions/examples/center-with-square"

export default {
  title: "Layout / Center",
}

export const Basic = () => {
  return <CenterBasic />
}

export const WithAbsolute = () => {
  return <CenterWithAbsolute />
}

export const WithIcons = () => {
  return <CenterWithIcons />
}

export const WithInline = () => {
  return <CenterWithInline />
}

export const WithSquare = () => {
  return <CenterWithSquare />
}
