import { GuideCollection } from "@/.velite"
import {
  LuCode,
  LuGlobe,
  LuLayoutGrid,
  LuPaintbrush,
  LuSparkle,
  LuWrench,
} from "react-icons/lu"

const iconMap: Record<GuideCollection["id"], React.ElementType> = {
  components: LuLayoutGrid,
  "next-js": LuCode,
  recipe: LuSparkle,
  snippets: LuCode,
  styling: LuPaintbrush,
  theming: LuWrench,
  overview: LuGlobe,
}

interface CollectionIconProps {
  value: GuideCollection["id"] | null
}

export const CollectionIcon = (props: CollectionIconProps) => {
  const Icon = props.value ? iconMap[props.value] : null
  if (!Icon) return null
  return <Icon />
}
