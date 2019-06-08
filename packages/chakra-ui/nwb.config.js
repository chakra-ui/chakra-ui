module.exports = {
  type: "react-component",
  npm: {
    esModules: true,
    umd: {
      global: "ChakraUI",
      externals: {
        react: "React",
        "react-dom": "ReactRouter"
      }
    }
  },
  babel: {
    plugins: ["babel-plugin-emotion"]
  }
};
