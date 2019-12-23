import { UseDescendantsReturn } from "../useDescendant";
import useIsomorphicEffect from "../useIsomorphicEffect";

export function useDefaultValue(
  descendants: UseDescendantsReturn,
  defaultValue: string | number,
) {
  const [state, actions] = descendants;
  useIsomorphicEffect(() => {
    if (defaultValue && state.items.length) {
      const option = state.items.find(option => option.value === defaultValue);
      if (option) {
        actions.select(option, true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.items]);
}

export function useValue(
  descendants: UseDescendantsReturn,
  value: string | number,
) {
  const [state, actions] = descendants;
  useIsomorphicEffect(() => {
    if (value && state.items.length) {
      const option = state.items.find(option => option.value === value);
      if (option) {
        actions.select(option, true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, state.items]);
}
