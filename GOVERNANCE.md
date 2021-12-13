# Project Governance

This document describes how we manage the project, manage teams, and make
decisions for the Chakra UI React and Vue team.

For guidance on how to contribute to Chakra UI, please see our
[CONTRIBUTING.md](./CONTRIBUTING.md) guide.

For our code conduct, please see our [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## Roles within the project

- **Contributor**: A contributor is anyone who helps to improve the quality of
  the project's codebase, documentation or marketing.

- **Collaborator**: A collaborator is a consistent contributor who has been
  chosen by the Chakra UI team to help improve a specific feature/aspect of the
  project. This person is usually an "outside collaborator" who has triage/write
  access to the repo.

- **Maintainer**: A maintainer is a consistent collaborator who is trusted by
  the Chakra UI team and has shown ability to take ownership of a specific area
  in Chakra.

- **Lead Maintainer**: A lead maintainer is someone who leads and manages the
  execution of ideas for a specific area in Chakra. They're responsible for
  defining the direction, implementation and even recruiting
  maintainers/collaborators to help achieve the set goal.

## Shared Responsibility

Regardless of the role, there are 3 core things that every collaborator and
maintainer have in common:

1. They share responsibility in the project's success.
2. They have made a long-term, recurring time investment to improve the project.
3. They spend time doing whatever needs to be done, not necessarily what is the
   most interesting or fun.

Maintainers are often under-appreciated, because their work is behind the
scenes. It's easy to appreciate a really cool and technically advanced feature.
It's harder to appreciate the absence of bugs, the slow but steady improvement
in stability, or the reliability of a release process. But those things
distinguish a good project from a great one.

## How we make decisions

### On recruting new members

**Contributor >> Collaborator >> Maintainer (Team member)**

Maintainers are first and foremost contributors that have shown they are
committed to the long term success of a project. Contributors wanting to become
maintainers are expected to be deeply involved in contributing to the codebase,
documentation, pull request review, and triage of issues in the project for more
than 3 months.

Contributing alone doesn't make you become a maintainer. You'll need to build
trust with the current maintainers of the project and be a person that they can
depend on to make decisions in the best interest of the project.

Periodically, the existing maintainers curate a list of contributors that have
shown regular activity on the project over the prior months. From this list,
maintainer candidates are selected and proposed in the `#maintainers` channel in
Discord.

After a candidate has been informally proposed in the `#maintainers` channel,
the existing maintainers are allowed to shared their opinions, raise objections
and show their support. Afterwhich @segunadebayo will set up a call to formally
invite the person to the team.

### On adding new features / projects

For collaborators and contributors, every new feature idea or request starts out
with a Pull Request describing:

- The scope of the feature
- The problem it solves
- The proposed solution and API
- The proposed list of contributors who will manage the bug fixes,
  documentation, and support
- Any other information that'll be useful for the Chakra UI maintainers to
  understand the scope and nature of the project.

If a project is approved, a core maintainer will guide and work closely with the
author to bring the idea to life.

Community projects are solely maintained by the community and not maintained by
the core team.

### On compensating maintainers

Chakra UI is a growing open-source project and we try to ensure every maintainer
is compensated. We give:

- Quarterly compensation ($500-$2000) per maintainer, depending on the
  OpenCollective balance and contributions.
- Annual meetup in real life where we have fun together, work together and get
  to know each other.
- Access to premium software or courses to grow your skills and knowledge.
- Access to the internal projects.
- Free access to Chakra UI Pro components for use in side projects.

## Teams

**Triage**: They're active in reviewing issues, Github discussions, pull
requests. Their comments/opinions counts towards the decision to merge a code
change into the project. Triage team members are part of the organization but do
not have write access. We believe that becoming a reviewer is a core aspect in
the journey to becoming a maintainer.

**DevRel**: They're actively involved in promoting Chakra UI in the community,
monitoring Discord, creating educational content, improving the documentation,
and finding opportunities to integrate Chakra UI with new technologies (Next.js,
Gatsby, Redwood, etc)

**Core**: They're responsible for the overall quality and stewardship of the
project. They are people who understand a specific area of Chakra UI deeply
enough to improve, make changes and improve performance of the project.

**Funding**: They're actively involved in getting funding and sponsorship
opportunities for the project. Being open-source can leave the impression that
you're working for free. While this is the reality, we strive hard to ensure
that everyone is compensated for the work they do. No matter how little!

**Design**: They're responsible for creating the design system components used
in Chakra UI and documentation websites for the project. They also help create
marketing graphics, youtube thumbnails, etc. as needed.

**Experiments**: They're always working on the "next big thing", trying out new
approaches to existing problems or inventing novel solutions to long-standing
industry problems.

## Projects

Here's a list of project currently ongoing in the organization:

| Component     | Responsibility                                        | Leads                          |
| ------------- | ----------------------------------------------------- | ------------------------------ |
| React         | Build and maintain the react package                  | @segunadebayo                  |
| Vue           | Build and maintain the vue package                    | @codebender828                 |
| Styled System | Create a framework agnostic styling library           | @TimKolberger, @segunadebayo   |
| UI Machines   | Create a framework agnostic component logic library   | @segunadebayo                  |
| Docs          | Improve docs and translate to other languages Chinese | @lazarnikolov94, @estheragbaje |
| Content       | Create content, posts and videos                      | @lazarnikolov94, @estheragbaje |

## Team management policies

### Stepping down

Life priorities, interests, and passions can change. If you're a maintainer but
feel you must remove yourself from the project, inform other maintainers that
you intend to step down, and if possible, help find someone to pick up your
work. At the very least, ensure your work can be continued where you left off.

After you've informed other maintainers, create a pull request to remove
yourself from the `MAINTAINERS.md` file and add yourself to the
`HALL_OF_MAINTAINERS.md`

### Removal of inactive maintainers

Similar to the procedure for adding new maintainers, existing maintainers can be
removed from the team if they don't show significant activity on the project
within 6-8 months.

If a maintainer has shown insufficient activity over this period, a neutral
person will contact the maintainer to ask if they want to continue being a
maintainer. If the maintainer decides to step down as a maintainer, they open a
pull request to be removed from the `MAINTAINERS.md` file.

If an inactive maintainer didn't have the time to open their own pull request,
another maintainer may open up the pull request.

## Common questions

### I'm a maintainer. Should I make pull requests too?

Yes. Nobody should ever push to main directly. All changes should be made
through a pull request.

### How do we manage conflicts?

If you have a technical dispute that you feel has reached an dead-end with a
subset of the community, any contributor may open an issue, specifically
recommended an actionable step forward.

### Do we have meetings?

Yes, we meet every Thursday (9PM GST) to discuss status updates and share ideas
