---
description: Draft a response for a GitHub issue
argument-hint: [issue-url]
---

## Context

You are responding to a GitHub issue in the Chakra UI repository. Your goal is
to provide a helpful, accurate, and well-formatted response that addresses the
user's problem.

## Task

Review the GitHub issue at **$ARGUMENTS** and:

1. **Analyze the issue**
   - Read the issue description and any code examples provided
   - Identify the root cause of the problem
   - Check if it's a bug, anti-pattern, or misunderstanding

2. **Research the solution**
   - Look at relevant examples in `apps/compositions/src/examples/`
   - Check component documentation if available
   - Reference the actual API and best practices in the codebase

3. **Draft a markdown response**
   - Explain the issue clearly and concisely
   - Provide a working solution with code examples
   - Use proper TypeScript/JSX formatting
   - Link to relevant examples or documentation
   - Save the response to a markdown file in the project root

4. **Response format**
   - Start with a brief explanation of the problem
   - Include a "## The Issue" section if needed
   - Provide a "## Solution" section with working code
   - Add links to relevant examples or docs
   - Keep the tone friendly and helpful

## Goal

A complete markdown file containing a well-crafted GitHub issue response that
can be copied and pasted as a comment.

## Example Response Structure

```markdown
[Brief explanation of the problem]

## The Issue

[Detailed explanation of why the issue occurs]

## Solution

[Working code example with explanation]

[Additional context or links to documentation]
```
