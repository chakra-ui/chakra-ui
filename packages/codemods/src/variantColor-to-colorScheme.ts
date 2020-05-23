import { Transform } from "jscodeshift";

const transformer: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  // need to figure out how to only modify chakra components
  root
    .find(j.JSXAttribute, {
      name: {
        type: "JSXIdentifier",
        name: "variantColor",
      },
      value: {
        type: "Literal",
      },
    })
    .find(j.JSXIdentifier)
    .replaceWith((nodePath) => {
      const { node } = nodePath;

      return j.identifier("colorScheme");
    });

  return root.toSource();
};

export default transformer;
