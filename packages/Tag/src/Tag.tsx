
import * as React from "react"
import { useTag, TagProps }from "./Tag.hook"

export function Tag(props: TagProps){
  const hook = useTag(props)
  return <div>This is a Tag component</div>
}

export default Tag
