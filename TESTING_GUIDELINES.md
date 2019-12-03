# Testing Guidelines

## Unit Testing Components

### Tools

- **[react-testing-library](https://github.com/testing-library/react-testing-library)**
- **[jest](https://jestjs.io/)**
 
If you are already familiar with RTL, good chances that you've been introduced
to the idea of testing **behavior** over **implementation details** (read [this](https://github.com/testing-library/react-testing-library#the-problem) if not).

The only thing to keep in mind here is that we want test what the component is doing and not how.
[here](https://kentcdodds.com/blog/testing-implementation-details) you can read more about that concept.


### Tests Location

Test files should be located in the component's folder within a dedicated **\__tests__** folder.
Most of the times, the test file will be named as the tested component and end with a **.test.tsx** extension.

For example, testing the Accordion component will lead to the following structure ```Accordion/__tests__/Accordion.test.tsx```

Testing other stuff (for example - a component's specific utility functions) you can add another file to the tests folder (```Accordion/__tests__/utils.test.tsx``` or similar)

### Important

- Use the custom **render** function (located in ```packages/tests/utils.tsx```) which wraps RTL's render function with the required *ThemeProvider* so we don't have to manually add it in every test.


- Don't (for now) wrap your tests in a "describe" function unless you explicitly need that for a reason.

- Try to avoid snapshot testing as much as possible.

- Test only the functionality of a component and not how it looks (there's a WIP for running visual tests on top of storybook).


- Make sure to look at a few examples before writing your first tests.