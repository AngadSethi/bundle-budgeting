import * as React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from "baseui/header-navigation";
import Search from "./Search";
import { StyledLink } from "baseui/link";
import { H5 } from "baseui/typography";
import { Image } from "react-bootstrap";
import logo from "../logo.svg";

export default function Header() {
  console.log(logo);
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
          <Image src={logo} width={"85px"} height={"85px"} />
        </NavigationItem>
        <NavigationItem>
          <H5 marginTop={0} marginBottom={0}>
            Bundle Budgeting
          </H5>
        </NavigationItem>
      </NavigationList>
      <NavigationList $align={ALIGN.center} />
      <NavigationList $align={ALIGN.right}>
        <NavigationItem>
          <StyledLink href="/">Home</StyledLink>
        </NavigationItem>
        <NavigationItem style={{ width: "200px" }}>
          <Search />
        </NavigationItem>
      </NavigationList>
    </HeaderNavigation>
  );
}
