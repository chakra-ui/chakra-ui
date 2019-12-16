## Component Framework for Chakra UI

We're currently looking to create a unified component framework to create
styled-system enabled components.

## Basic API

We'll provide a `chakra` function, just like `styled-component`. Users can
create any component using the `chakra.[element]`. The resulting component will
be a styled component and have all system props.

```jsx
<chakra.button>This is a chakra button</chakra.button>
```

## Ability to apply styles from theme

All chakra components can apply a style prop

```jsx
<chakra.h2 apply="styles.h1">This is a chakra heading</chakra.h2>
```

## Create custom components

We'll expose an utility function `createChakra` to help you create components
that have system props and is also fully typed, with support for generics.

Let's say we want to create a link button that read it's styles from theme

```jsx
const LinkButton = createChakra(Link, {
  themeKey: "components.button",
});
```

Now let's say we need to consume a hook within the component, here's what we'll
do

```jsx
const Button = createChakra("button", {
  hook: useButton,
  themeKey: "components.button",
});
```

The resulting component will be able to access 3 key props, `variant`,
`variantColor`, `variantSize`

```jsx
<Button variantColor="green" isDisabled variant="solid" variantSize="md">
  Button
</Button>
```

## Without createChakra

Without this utility, here's how you might need to consume a hook, which doesn't
feel like a good experience. Create chakra only makes this more convenient.

```jsx
const Tab = forwardRef(
  (
    props: React.ComponentProps<typeof chakra.button> & UseTabOptions,
    ref: React.Ref<any>,
  ) => {
    const tab = useTab(props, ref);
    return <chakra.button {...tab} />;
  },
);
```
