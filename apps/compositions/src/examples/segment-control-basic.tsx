import { SegmentControl } from "compositions/ui/segment-control"

const items = ["React", "Vue", "Solid"]

export const SegmentControlBasic = () => {
  return <SegmentControl defaultValue="React" items={items} />
}
