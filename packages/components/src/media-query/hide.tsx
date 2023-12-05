import { useQuery } from "./media-query"
import { Visibility } from "./visibility"
import { ShowProps } from "./show"

export type HideProps = ShowProps

/**
 * `Hide` wraps a component to not render if the provided media query matches.
 *
 * @see Docs https://chakra-ui.com/docs/components/show-hide
 */
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
