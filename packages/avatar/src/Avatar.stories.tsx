import React, { Fragment } from "react"
import { Avatar, AvatarBadge } from "."
import AvatarGroup from "./AvatarGroup"

export default {
  title: "Avatar",
}

export const Default = () => (
  <Fragment>
    {["xs", "sm", "md", "lg", "xl", "2xl"].map(size => (
      <Avatar
        mr={2}
        variantSize={size}
        name="Uchiha Itachi"
        src="https://uinames.com/api/photos/female/18.jpg"
      >
        <AvatarBadge size="1.25em" bg="green.500" />
      </Avatar>
    ))}
  </Fragment>
)

export const AvatarGroup_ = () => (
  <AvatarGroup variantSize="md" showBorder max={4}>
    <Avatar
      name="Daniel Powell"
      src="https://uinames.com/api/photos/male/16.jpg"
    />
    <Avatar name="Mark Clark" src="https://uinames.com/api/photos/male/7.jpg" />
    <Avatar
      name="Emily Beck"
      src="https://uinames.com/api/photos/female/3.jpg"
    />
    <Avatar
      name="Diane Weaver"
      src="https://uinames.com/api/photos/female/9.jpg"
    />
    <Avatar
      name="Barbara Obrien"
      src="https://uinames.com/api/photos/female/7.jpg"
    />
  </AvatarGroup>
)
