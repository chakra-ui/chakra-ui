import { useQuery } from "./media-query"
import { Visibility } from "./visibility"
import { ShowProps } from "./show"

export type HideProps = ShowProps

export function Hide(props: HideProps) {
  const { children, ssr } = props
  const query = useQuery(props)
  return (
    <Visibility breakpoint={query} hide ssr={ssr}>
      {children}
    </Visibility>
  )
}

Hide.displayName = "Hide"
