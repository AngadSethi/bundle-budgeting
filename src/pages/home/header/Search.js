import Fuse from "fuse.js";
import * as React from "react";
import { Select, TYPE } from "baseui/select";
import { ARTWORK_SIZES, ListItemLabel, MenuAdapter } from "baseui/list";
import { StatefulMenu } from "baseui/menu";
import ChevronRight from "baseui/icon/chevron-right";
import { generateBundleUrl } from "../../../shared/util";
import BUDGETS from "../../data/budgets-split";
import { useMemo } from "react";

function SearchMenu(props) {
  return (
    <StatefulMenu
      items={props.items}
      onItemSelect={({ item, event }) => {
        window.location = generateBundleUrl(item.item.name);
      }}
      overrides={{
        List: {
          style: {
            height: "300px",
            width: "100%",
          },
        },
        Option: {
          props: {
            overrides: {
              ListItem: {
                component: React.forwardRef((props, ref) => {
                  return (
                    <MenuAdapter
                      {...props}
                      ref={ref}
                      artworkSize={ARTWORK_SIZES.LARGE}
                      endEnhancer={() => <ChevronRight />}
                    >
                      <ListItemLabel description={props.item.item.owner}>
                        {props.item.item.name}
                      </ListItemLabel>
                    </MenuAdapter>
                  );
                }),
              },
            },
          },
        },
      }}
    />
  );
}

function Search(props) {
  const fuse = useMemo(() => {
    const options = {
      // isCaseSensitive: false,
      // includeScore: false,
      shouldSort: true,
      // includeMatches: false,
      // findAllMatches: false,
      // minMatchCharLength: 1,
      // location: 0,
      // threshold: 0.6,
      // distance: 100,
      // useExtendedSearch: false,
      // ignoreLocation: false,
      // ignoreFieldNorm: false,
      keys: ["name", "owner"],
    };
    return new Fuse(BUDGETS, options);
  }, []);

  return (
    <Select
      type={TYPE.search}
      placeholder="Search"
      openOnClick={false}
      filterOptions={(options, query) => {
        return fuse.search(query);
      }}
      getOptionLabel={({ option, optionState }) => {
        return option.item.name;
      }}
      overrides={{
        StatefulMenu: {
          component: SearchMenu,
          style: ({ $theme }) => ({
            zIndex: 200,
          }),
        },
        Root: {
          style: {
            outline: "black 2px solid",
            zIndex: 200,
          },
        },
        Popover: {
          props: {
            overrides: {
              Body: {
                style: ({ $theme }) => ({
                  zIndex: 2,
                }),
              },
            },
          },
        },
      }}
    />
  );
}

export default Search;
