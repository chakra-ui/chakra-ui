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
        modules: false,
        loose: true,
        targets: "> 1%, not dead, not ie 11, not op_mini all",
      },
    ],
  ],
}
