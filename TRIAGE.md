Thanks for showing interesting in Chakra triage! This document serves as an
overview of the triage team for our repository. It covers topics such as the
importance of triage in an open-source project, the goals of the triage team,
and the triage process itself.

# 🕵️‍️ What is triage?

Triage is the process by which we manage community input coming into our
repository. Whether it is a feature request, a bug report, a pull request, or
something else entirely, each item requires direct attention from an
organization member in order to parse and understand what it is the user expects
of the library or is trying to accomplish.

Users with the "triage" role are granted permissions to manage issues and pull
requests, which includes adding labels and milestones, opening and closing
issues, and more.

Effective use of this responsibility is an essential part of the process that
maintains Chakra's growth.

# 🥇 Why is triage important?

Along with writing code and documentation, triage is one of the most important
parts of an open-source project.

## 🗣 User engagement

Our users are our project's lifeblood. They come from many different backgrounds
and situations, and have many different issues and needs.

Engaging with them as fellow humans, demonstrating their importance to us by
responding to them in a timely fashion, and helping them accomplish their goals
are some of the most important tasks we have as an organization.

The triage team plays a huge part in this. By being the direct face of the
organization in managing issues and pull requests, team members have a unique
opportunity to make our users feel welcome and respected, and to demonstrate to
them that we're working our hardest to make Chakra the best it can be.

## ⏱ Time management

None of us is getting paid to work on this project and we all have busy lives
outside of Chakra, so contributor time is one of the most important resources we
have available to us.

As a growing project with an ever-larger number of users,
[Chakra receives a large volume of issues and pull requests each week](https://github.com/chakra-ui/chakra-ui/pulse).
Each of these needs to be addressed in some way, and addressing them takes time.
Given enough issues and pull requests, a contributor could dedicate all of their
time to managing these alone. Trust me, I know from experience.

Having an effective triage team will offload some of the burden of this
time-consuming process from contributors, so they can focus directly on code and
documentation.

## 🏎 Velocity

To keep the development and documentation processes running smoothly, it is
important that each piece of input from the community is groomed, labeled,
assigned a level of effort and importance, attached to a version milestone, and
possibly assigned to a specific individual or project.

This enables contributors to understand what work is available at any given time
and provides them with the information they need to get started immediately,
without having to first read through long issue threads or ask questions of the
user.

It allows them to focus on the work to be done, which means more will be
accomplished in less time.

## 🌐 Building a web of knowledge

Chakra is a large project with lots of moving parts. It can be hard for us as
members of the organization to keep up with everything going on, so imagine how
it must feel to be a user new to the project or unfamiliar with how we work.

Triage team members can make this easier by helping users find their way around
the project.

Pull requests linked to corresponding issues allow users to see the work that
has been done on an issue. Linking to other issues and discussions provides
users with context around the problems we face and the direction we're heading.
Guiding users to the documentation helps them learn.

# ✨ Goals

- contributors have a list of issues that are well-groomed, allowing them to
  quickly understand each issue and the work required to resolve it
- users feel welcome and respected
- you're having fun!

# 📋 Triage process

This section documents the triage process. It is impossible to plan out a
scenario for each possible interaction, but this gives an overview of what it is
triage team members should be doing.

## Issues

- respond to new issues in a timely manner
- groom each issue to validate that it has all the information a contributor
  will need to work on it
- categorize the issue using labels to provide context
  - effort: an estimate of how much time an issue might take to resolve
  - priority: the importance of a particular issue
    - this might be better left for contributors to add a label for, unless the
      issue is urgent
  - type: whether the issue is a bug report, feature request, documentation or
    website issue, etc.
  - topic: what areas of the project the issue relates to (a11y, browser
    support, design, tooling, etc.)

### Bug reports

- validate that the report is accurate and not caused by user error
- request additional information if the report is unclear
- request a reproduction of the issue in CodeSandbox
- if the bug has already been reported, close the issue and link the user to the
  existing issue

### Feature requests

- if the feature already exists, point the user to the relevant docs
- make sure the user has explained the request well enough that a maintainer can
  determine if it is something we'd like to add to Chakra
- if it makes sense, ask the user to provide examples of the API they imagine
  for the feature and/or examples of how the feature would be used

## Pull requests

- validate that the pull request template has been filled out
- link the pull request to any related issues
- categorize the pull request using labels to provide context
  - type: whether the issue is a bug report, feature request, documentation or
    website issue, etc.
  - topic: what areas of the project the issue relates to (a11y, browser
    support, design, tooling, etc.)
