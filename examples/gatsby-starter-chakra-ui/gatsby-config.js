module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-chakra-ui",
      options: {
        isResettingCSS: true, // optional, default to true
        isUsingColorMode: true, // optional, default to true
      },
    },
  ],
};
