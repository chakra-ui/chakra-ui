module.exports = {
  plugins: [
    "@chakra-ui/babel-plugin",
    "babel-plugin-annotate-pure-calls",
    "@babel/plugin-proposal-class-properties",
    ["@babel/plugin-proposal-private-methods", { loose: false }],
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

/**
* Though the "loose" option was set to "true" in your @babel/preset-env config,
it will not be used for @babel/plugin-proposal-private-property-in-object since
the "loose" mode option was set to "false" for @babel/plugin-proposal-private-methods.

The "loose" option must be the same for
@babel/plugin-proposal-class-properties,
@babel/plugin-proposal-private-methods,
@babel/plugin-proposal-private-property-in-object (when they are enabled):

you can silence this warning by explicitly adding
        ["@babel/plugin-proposal-private-property-in-object", { "loose": false }]
*/
