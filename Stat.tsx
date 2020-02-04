
import * as React from "react"
import { useStat, StatProps }from "./Stat.hook"

export function Stat(props: StatProps){
  const hook = useStat(props)
  return <div>This is a Stat component</div>
}

export default Stat
