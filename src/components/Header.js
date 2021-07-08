import * as React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from "baseui/header-navigation";
import Search from "./Search";
import { H5 } from "baseui/typography";
import { Image } from "react-bootstrap";
import logo from "../logo.svg";
import { StyledNavLink } from "baseui/side-navigation";

export default function Header() {
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
        <NavigationItem>
          <StyledNavLink href="/">
            <Image src={logo} width={"85px"} height={"85px"} />
          </StyledNavLink>
        </NavigationItem>
        <NavigationItem>
          <StyledNavLink href="/">
            <H5 marginTop={0} marginBottom={0}>
              Bundle Budgeting
            </H5>
          </StyledNavLink>
        </NavigationItem>
      </NavigationList>
      <NavigationList $align={ALIGN.center} />
      <NavigationList $align={ALIGN.right}>
        <NavigationItem style={{ width: "200px", marginRight: "30px" }}>
          <Search />
        </NavigationItem>
      </NavigationList>
    </HeaderNavigation>
  );
}
