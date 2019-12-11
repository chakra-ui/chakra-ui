export function composeHooks<R1, R2, O1, O2 = R1>(
  hook1: (a: O1) => R1,
  hook2: (a: O2) => R2,
) {
  return (props: O1 & O2) => {
    let out1 = hook1(props);
    let out2 = hook2(out1 as any);
    return out2;
  };
}
