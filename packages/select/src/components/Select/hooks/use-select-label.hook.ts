import { useSelectContext } from "../select.component"

const useSelectLabel = () => {
  const { id } = useSelectContext()

  return {
    for: id,
  }
}

export default useSelectLabel
