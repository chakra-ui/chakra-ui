const BABEL_ENV = process.env.BABEL_ENV
const cjs = BABEL_ENV !== undefined && BABEL_ENV === "cjs"

module.exports = {
  plugins: [
    "@chakra-ui/babel-plugin",
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
  presets: [
    "@babel/preset-typescript",
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        bugfixes: true,
        modules: cjs ? "commonjs" : false,
        loose: true,
        targets: "> 1%, not dead, not ie 11, not op_mini all",
      },
    ],
  ],
}
