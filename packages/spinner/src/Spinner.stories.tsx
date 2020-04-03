import * as React from "react"
import { Spinner } from "./Spinner"

export default {
  title: "Spinner",
}

/**
 * A simple spinner.
 */

export const basic = () => <Spinner color="red.500" />

/**
 * Pass the `color` prop to change the background color of
 * the moving section of the spinner.
 */

export const color = () => <Spinner color="red.500" />

/**
 * Pass the `size` prop to change the size of the spinner.
 */

export const size = () => (
  <div>
    {["xl", "lg", "md", "sm", "xs"].map(size => (
      <Spinner key={size} margin={3} color="red.500" size={size} />
    ))}
  </div>
)

/**
 * Pass the `speed` prop to change the animation speed of the spinner.
 */

export const speed = () => (
  <Spinner color="red.500" emptyColor="gray.200" speed="0.65s" />
)

/**
 * Pass the `emptyColor` prop to change the background color of the spinner.
 */

export const emptyColor = () => (
  <Spinner color="red.500" emptyColor="gray.200" />
)
