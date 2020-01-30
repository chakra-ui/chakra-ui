import * as React from "react";
import {
  MenuHookReturn,
  useMenu,
  useMenuDisclosure,
  useMenuList,
  useMenuItem,
} from "./Menu.hook";
import { createContext } from "@chakra-ui/utils";
import { PropsOf } from "@chakra-ui/system";

const [MenuProvider, useMenuContext] = createContext<MenuHookReturn>();

export function Menu({ children, context }: any) {
  const menuContext = useMenu({ context });
  return <MenuProvider value={menuContext}>{children}</MenuProvider>;
}

export function BaseMenuButton(props: PropsOf<"button">) {
  const context = useMenuContext();
  const buttonProps = useMenuDisclosure({ context, ...props });
  return <button {...props} {...buttonProps} />;
}

export function BaseMenuList(props: PropsOf<"div">) {
  const context = useMenuContext();
  const listProps = useMenuList({ context, ...props });
  return <div {...props} {...listProps} />;
}

export function BaseMenuItem(props: PropsOf<"div">) {
  const context = useMenuContext();
  const itemProps = useMenuItem({ context, ...props });
  return <div {...props} {...itemProps} />;
}
