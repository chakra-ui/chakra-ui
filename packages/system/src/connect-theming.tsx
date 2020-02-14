import * as React from "react";
import { createContext } from "@chakra-ui/utils";
import { getDisplayName } from "./createChakra/create-chakra.utils";

interface ThemingProps {
  variantSize?: string;
  variant?: string;
  variantColor?: string;
}

function connect<PP>({
  parent: Parent,
  children,
  applyToParent,
}: {
  parent: React.ComponentType<PP>;
  children: React.FC[];
  applyToParent?: boolean;
}) {
  const [Provider, useContext] = createContext<ThemingProps>();

  // @ts-ignore
  Provider.displayName = `${getDisplayName(Parent)}ThemeConnect`;

  type NewParentProps = ThemingProps & {
    children?: React.ReactNode;
  } & PP;

  function NewParent({
    variantSize,
    variant,
    variantColor,
    ...props
  }: NewParentProps) {
    const themingProps = { variantSize, variant, variantColor };
    return (
      // @ts-ignore
      <Parent {...(applyToParent && themingProps)} {...props}>
        <Provider value={themingProps}>{props.children}</Provider>
      </Parent>
    );
  }

  NewParent.displayName = `connect(${getDisplayName(Parent)})`;

  function inject<P>(Element: React.ComponentType<P>) {
    //@ts-ignore
    const Comp = React.forwardRef((props: P, ref: P["ref"]) => {
      const themingProps = useContext();
      return <Element ref={ref} {...themingProps} {...props} />;
    });
    return Comp;
  }

  const newChildren = children.map(inject);

  return { parent: NewParent, children: newChildren };
}

export default connect;
