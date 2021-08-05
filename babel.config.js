module.exports = {
  plugins: [
    "@chakra-ui/babel-plugin",
    "babel-plugin-annotate-pure-calls",
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
  presets: [
    "@babel/preset-typescript",
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        modules: false,
        loose: true,
        targets: {
          browsers:
            "Chrome >= 74, Safari >= 13.1, iOS >= 13.3, Firefox >= 78, Edge >= 79",
          node: 12,
        },
      },
    ],
  ],
}
