let defaultPresets;

// We release a ES version of Material-UI.
// It's something that matches the latest official supported features of JavaScript.
// Nothing more (stage-1, etc), nothing less (require, etc).
if (process.env.BABEL_ENV === "es") {
  defaultPresets = [];
} else {
  defaultPresets = [
    [
      "@babel/preset-env",
      {
        modules: ["esm", "production-umd"].includes(process.env.BABEL_ENV)
          ? false
          : "commonjs",
      },
    ],
  ];
}

const defaultAlias = {
  "chakra-ui": "./src",
};

const productionPlugins = [
  [
    "babel-plugin-transform-react-remove-prop-types",
    {
      mode: "unsafe-wrap",
    },
  ],
];

module.exports = {
  presets: defaultPresets.concat(["@babel/preset-react"]),
  plugins: [
    ["@babel/plugin-proposal-object-rest-spread", { loose: true }],
    "@babel/plugin-transform-runtime",
    // for IE 11 support
    "@babel/plugin-transform-object-assign",
  ],
  ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
  env: {
    cjs: {
      plugins: productionPlugins,
    },
    esm: {
      plugins: [
        ...productionPlugins,
        ["@babel/plugin-transform-runtime", { useESModules: true }],
      ],
    },
    es: {
      plugins: [
        ...productionPlugins,
        ["@babel/plugin-transform-runtime", { useESModules: true }],
      ],
    },
    production: {
      plugins: [
        ...productionPlugins,
        ["@babel/plugin-transform-runtime", { useESModules: true }],
      ],
    },
    "production-umd": {
      plugins: [
        ...productionPlugins,
        ["@babel/plugin-transform-runtime", { useESModules: true }],
      ],
    },
    test: {
      sourceMaps: "both",
      plugins: [
        [
          "babel-plugin-module-resolver",
          {
            root: ["./"],
            alias: defaultAlias,
          },
        ],
      ],
    },
  },
};
