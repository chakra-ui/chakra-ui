# Contributing

If you're reading this, you're awesome! Thank you for helping us make this project great and being a part of the Chakra UI community. Here are a few guidelines that will help you along the way.

## Submitting a pull request

Chakra UI is a community project, so pull requests are always welcome, but, before working on a large change, it is best to open an issue first to discuss it with the maintainers.

As with issues, please begin the title with [ComponentName].

## Getting Started

This project uses

- [Lerna](https://lerna.js.org/) to manage multiple libs
- [Storybook](https://storybook.js.org/) for a great development experience
- [Next](https://nextjs.org/) for a blazing fast website.

Before doing anything else, run these commands:

```
git clone git@github.com:chakra-ui/chakra-ui.git
cd chakra-ui
yarn install
yarn bootstrap
yarn core:build
```

## Root Repo Scripts:

```sh
yarn bootstrap    # bootstraps lerna so all dependencies get
                  # linked for cross-component development

yarn storybook        # starts storybook server

yarn docs:dev         # runs the documentation site locally

yarn core:build        # build the component library

yarn release      # publishes changed packages
```

### Running the documentation site

The documentation site is built with Next but we created a simple command to run it.

```sh
npm run docs:dev
```
You can now access the documentation site [locally](http://localhost:3000).
Changes to the docs will hot reload the site.

### Building locally

To use the provided build scripts with yarn you have to install `npm@^10`.
Depending on the package you want to build just run `npm run core:build`.

### Coding style

TODO

## How do I add a new demo in the documentation?

TODO

#### Edit the page Markdown file.

The Markdown file is the source for the website documentation. So, whatever you wrote there will be reflected on the website.

In this case, the file you need to edit is `packages/chakra-ui-docs/pages/`, and I'm going to add a description about the component.

## How do I use my local distribution of chakra-ui in any project?

Sometimes it is good to test your changes in a real world scenario, in order to do that you can install your local distribution of Chakra UI in any project with [lerna link](https://github.com/lerna/lerna/tree/master/commands/link).

First, you have to build your local distribution of Chakra UI:

```shell
# From the root of the project
yarn build
```

Next, you link your local distribution of Chakra UI to any project you want to try your changes:

```shell
# From the root folder of any project
lerna link
```

Now, every time you import from `@chakra-ui/core` in your project, it is going to use your local distribution.


## License

By contributing your code to the chakra-ui GitHub repository, you agree to license your contribution under the MIT license.
