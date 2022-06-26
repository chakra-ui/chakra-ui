import { useSelectContext } from "../select"

const useSelectLabel = () => {
  const { id } = useSelectContext()

  return {
    for: id,
  }
}

export default useSelectLabel
