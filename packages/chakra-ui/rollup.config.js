import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: "src/index.js",
    output: [
      {
        name: "ChakraUI",
        file: `dist/index.umd.js`,
        format: "umd",
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    ],
    external: [
      "react",
      "react-dom",
      "@emotion/core",
      "@emotion/styled",
      "emotion-theming"
    ],
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      resolve(),
      commonjs({
        include: ["node_modules/**"],
        namedExports: {
          "node_modules/prop-types/index.js": [
            "object",
            "func",
            "number",
            "oneOfType",
            "oneOf",
            "node",
            "string",
            "bool"
          ],
          "node_modules/@react-spring/shared/index.js": [
            "is",
            "createInterpolator",
            "useForceUpdate",
            "useOnce",
            "usePrev"
          ]
        }
      }),
      production && terser()
    ]
  }
];
