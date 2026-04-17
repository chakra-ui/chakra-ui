import { compact, getSlotRecipes, memo, splitProps } from '../helpers.mjs';
import { cva } from './cva.mjs';
import { cx } from './cx.mjs';

export function sva(config) {
  const slots = Object.entries(getSlotRecipes(config)).map(([slot, slotCva]) => [slot, cva(slotCva)])
  const defaultVariants = config.defaultVariants ?? {}

  const classNameMap = slots.reduce((acc, [slot, cvaFn]) => {
    if (config.className) acc[slot] = cvaFn.config.className
    return acc
  }, {})

  function svaFn(props) {
    const result = slots.map(([slot, cvaFn]) => [slot, cx(cvaFn(props), classNameMap[slot])])
    return Object.fromEntries(result)
  }

  function raw(props) {
    const result = slots.map(([slot, cvaFn]) => [slot, cvaFn.raw(props)])
    return Object.fromEntries(result)
  }

  const variants = config.variants ?? {};
  const variantKeys = Object.keys(variants);

  function splitVariantProps(props) {
    return splitProps(props, variantKeys);
  }
  const getVariantProps = (variants) => ({ ...defaultVariants, ...compact(variants) })

  const variantMap = Object.fromEntries(
    Object.entries(variants).map(([key, value]) => [key, Object.keys(value)])
  );

  return Object.assign(memo(svaFn), {
    __cva__: false,
    raw,
    config,
    variantMap,
    variantKeys,
    classNameMap,
    splitVariantProps,
    getVariantProps,
  })
}