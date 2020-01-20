
import * as React from "react"
import { useProgress, ProgressProps }from "./Progress.hook"

export function Progress(props: ProgressProps){
  const hook = useProgress(props)
  return <div>This is a Progress component</div>
}

export default Progress
