/* eslint-disable react-hooks/rules-of-hooks */
import React from "react"
import { Portal, PortalManager } from "."

export default {
  title: "Portal",
  decorators: [
    (StoryFn: any) => (
      <PortalManager>
        <StoryFn />
      </PortalManager>
    ),
  ],
}

export const basicPortal = () => {
  return (
    <>
      <p>Welcome</p>
      <Portal>This text has been portaled</Portal>
    </>
  )
}

function Wrapper(props: any) {
  const { offset, color, children } = props
  return (
    <div
      style={{
        position: "fixed",
        top: offset || "46%",
        left: offset || "46%",
        width: "200px",
        paddingTop: "20px",
        paddingBottom: "20px",
        paddingLeft: "20px",
        paddingRight: "20px",
        backgroundColor: color,
        textAlign: "center",
      }}
    >
      {children}
    </div>
  )
}

export const nestedPortals = () => {
  return (
    <Portal>
      <Wrapper color="red">Welcome</Wrapper>
      <Portal>
        <Wrapper offset="40%" color="green">
          Welcome
        </Wrapper>
        <Portal>
          <Wrapper offset="30%" color="tomato">
            Welcome
          </Wrapper>
        </Portal>
      </Portal>
    </Portal>
  )
}
