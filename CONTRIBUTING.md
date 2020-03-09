# Contributing

If you're reading this, you're awesome! Thank you for helping us make this
project great and being a part of the Chakra UI community. Here are a few
guidelines that will help you along the way.

## Branch naming convention

Branches created to address issues should be named in the following format:

- Issue Type/Issue-ID-Issue Summary

`Issue Type` - Shows the type of issue being worked on, and could be any one of
the following:

- fix (any fix to an existing feature to correct an anomaly).
- feature (a new, working functionality).
- chore (a task that doesn't change the behavior of the library. e.g
  documentation, tests addition, etc).

`Issue ID` - The issue ID assigned by Github.

`Issue Summary` - Short description of the issue being worked on.

## Submitting a pull request

Chakra UI is a community project, so pull requests are always welcome. But
before working on a large change, it is best to open an issue first to discuss
it with the maintainers. If no issue exists addressing the change you would like
implemented, feel free to create one.

If you decide to work on an already opened issue, do check the comments thread
of that particular issue just incase someone else is already working on a fix.
Should there be no one assigned that issue, indicate you are working on that
issue by leaving a comment in the thread. This is to ensure nobody else takes up
that same issue.

Assuming you get the green light to work on the opened issue, the following
steps would guide you on how to submit a PR:-

- Create a fork of the chakra-ui repository
- Create a branch out of the `master` branch of your forked repository,
  following the branch naming convention above.
- It is advisable to make atomic commits, as this would help other maintainers
  understand the changes made. Also, working on small changes per single PR is
  advisable as those are easy to review and maintain.
- When you are sure your change works as intended, proceed to raise a PR against
  the `chakra-ui` master branch

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
yarn build
```

## Root Repo Scripts:

```sh
yarn bootstrap    # bootstraps lerna so all dependencies get
                  # linked for cross-component development

yarn storybook        # starts storybook server

yarn docs         # runs the documentation site locally

yarn build        # build the component library

yarn release      # publishes changed packages
```

### Running the documentation site

The documentation site is built with Next but we created a simple command to run
it.

```sh
yarn docs
```

You can now access the documentation site [locally](http://localhost:3000).
Changes to the docs will hot reload the site.

### Building locally

Just run `yarn build`

### Coding style

TODO

## How do I add a new demo in the documentation?

TODO

#### Edit the page Markdown file.

The Markdown file is the source for the website documentation. So, whatever you
wrote there will be reflected on the website.

In this case, the file you need to edit is `packages/docs/pages/`, and I'm going
to add a description about the component.

## How do I use my local distribution of chakra-ui in any project?

First, you have to build your local distribution of Chakra UI:

```sh
# From the root of the project
yarn build
```

Now, every time you import from `@chakra-ui/*` in your project, it is going to
use your local distribution.

## License

By contributing your code to the chakra-ui GitHub repository, you agree to
license your contribution under the MIT license.
