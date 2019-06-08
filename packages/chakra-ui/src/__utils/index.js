export const genId = prefix =>
  `${prefix}-${Math.random()
    .toString(32)
    .substr(2, 8)}`;
