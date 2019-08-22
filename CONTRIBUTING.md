# Contributing

If you're reading this, you're awesome! Thank you for helping us make this project great and being a part of the Chakra UI community. Here are a few guidelines that will help you along the way.

## Submitting a pull request

Chakra UI is a community project, so pull requests are always welcome, but, before working on a large change, it is best to open an issue first to discuss it with the maintainers.

When in doubt, keep your pull requests small. To give a PR the best chance of getting accepted, don't bundle more than one feature or bug fix per pull request. It's always best to create two smaller PRs than one big one.

As with issues, please begin the title with [ComponentName].

### Branch Structure

At any given time, `master` represents the latest development version of the library.

Patches or hotfix releases are prepared on an independent branch.


### How to increase the chance of being accepted?


## Getting started

Please create a new branch from an up to date master on your fork. (Note, urgent hotfixes should be branched off the latest stable release rather than master)

1. Fork the Chakra UI repository on Github
2. Clone your fork to your local machine `git clone git@github.com:<yourname>/material-ui.git`
3. Create a branch `git checkout -b my-feature-branch`
4. Make your changes, lint, then push to to GitHub with `git push --set-upstream origin my-feature-branch`.
5. Visit GitHub and make your pull request.

If you have an existing local repository, please update it before you start, to minimise the chance of merge conflicts.
```sh
git remote add upstream git@github.com:chakra-ui/chakra-ui.git
git checkout master
git pull upstream master
git checkout -b my-feature-branch
yarn
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

Please follow the coding style of the project. Material-UI uses eslint, so if possible, enable linting in your editor to get real-time feedback. The linting rules can be run manually with the following command `npm run lint`.

You can also run `npm run prettier` to reformat the code.

Finally, when you submit a pull request, they are run again by Travis CI, but hopefully by then your code is already clean!

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
npm run build
```

Next, you link your local distribution of Chakra UI to any project you want to try your changes:

```shell
# From the root folder of any project
lerna link
```

Now, every time you import `chakra-ui` in your project, it is going to use your local distribution.


## License

By contributing your code to the chakra-ui GitHub repository, you agree to license your contribution under the MIT license.
