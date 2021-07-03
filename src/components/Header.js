import * as React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from "baseui/header-navigation";
import Search from "./Search";

export default function Example() {
  return (
    <HeaderNavigation
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            backgroundColor: $theme.colors.background,
          }),
        },
      }}
    >
      <NavigationList $align={ALIGN.left}>
        <NavigationItem>Bundle Budgeting</NavigationItem>
      </NavigationList>
      <NavigationList $align={ALIGN.center} />
      <NavigationList $align={ALIGN.right}>
        <NavigationItem style={{ width: "200px" }}>
          <Search />
        </NavigationItem>
      </NavigationList>
    </HeaderNavigation>
  );
}
