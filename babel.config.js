module.exports = {
  comments: false,
  plugins: [
    "babel-plugin-annotate-pure-calls",
    "@babel/plugin-proposal-class-properties",
    "@chakra-ui/babel-plugin",
  ],
  presets: [
    "@babel/preset-typescript",
    "@babel/preset-react",
    ["@babel/preset-env", { modules: false, loose: true }],
  ],
}
