# @chakra-ui/tabs

An accessible tabs component.

The `Tab` and `TabPanel` elements are associated by their order in the tree.
None of the components are empty wrappers, each is associated with a real DOM
element in the document, giving you maximum control over styling and
composition.

## Installation

```sh
yarn add @chakra-ui/tabs

# or

npm i @chakra-ui/tabs
```

## Import components

```jsx
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
```

## Usage

```jsx
<Tabs>
  <TabList>
    <Tab>One</Tab>
    <Tab>Two</Tab>
    <Tab>Three</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
      <p>one!</p>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
```

### Tab variants and color schemes

Tabs come in 6 different variants to style the tabs: `line`,`enclosed`,
`enclosed-colored`, `soft-rounded`, `solid-rounded`. Each variant comes it
different color schemes.

```jsx
<Tabs variant="enclosed" colorScheme="red">
  <TabList>
    <Tab>One</Tab>
    <Tab>Two</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <p>one!</p>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
```

### Manually Activated Tabs

By default, `Tabs` are activated automatically. This means when you use the
arrow keys to change tabs, the tab is activated and focused.

The content of a `TabPanel` should ideally be preloaded. However, if switching
to a tab panel causes a network request and possibly a page refresh, there might
be some notable latency and this might affect the experience for keyboard and
screen reader users.

In this scenario, you should use a manually activated tab, it moves focus
without activating the tabs. With focus on a specifc tab, users can activate a
tab by pressing <kbd>Space</kbd> or <kbd>Enter</kbd>.

```jsx
<Tabs isManual variant="enclosed">
  <TabList>
    <Tab>One</Tab>
    <Tab>Two</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <p>one!</p>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
```

### Tab sizes

You can change the size of the tab by passing `size` prop. We support 3 sizes
`sm`, `md`, `lg`

```jsx
<Tabs size="md" variant="enclosed">
  <TabList>
    <Tab>One</Tab>
    <Tab>Two</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <p>one!</p>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
```
