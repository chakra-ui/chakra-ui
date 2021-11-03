module.exports = {
  plugins: [
    "@chakra-ui/babel-plugin",
    "babel-plugin-annotate-pure-calls",
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
  presets: [
    "@babel/preset-typescript",
    "@babel/preset-react",
    ["@babel/preset-env"],
  ],
}
