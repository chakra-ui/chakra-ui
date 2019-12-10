const rootOptions = [
  "m",
  "mt",
  "mr",
  "mb",
  "ml",
  "mx",
  "my",
  "margin",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "marginY",
  "marginX",
  "flex",
  "flexBasis",
  "width",
  "minWidth",
  "maxWidth",
  "maxW",
  "minW",
  "w",
  "zIndex",
  "top",
  "right",
  "bottom",
  "left",
  "position",
  "pos",
];

const splitProps = props => {
  const rootProps = {};
  const selectProps = {};
  for (const key in props) {
    if (rootOptions.includes(key)) {
      rootProps[key] = props[key];
    } else {
      selectProps[key] = props[key];
    }
  }
  return [rootProps, selectProps];
};

export default splitProps;
