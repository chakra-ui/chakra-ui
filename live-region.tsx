
import * as React from "react"
import { uselive-region, live-regionProps }from "./live-region.hook"

export function live-region(props: live-regionProps){
  const hook = uselive-region(props)
  return <div>This is a live-region component</div>
}

export default live-region
