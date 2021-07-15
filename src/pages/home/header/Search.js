import Fuse from "fuse.js";
import { BUNDLE_BUDGETS_URL } from "../../../shared/endPoints";

import * as React from "react";
import { Select, TYPE } from "baseui/select";
import { ARTWORK_SIZES, ListItemLabel, MenuAdapter } from "baseui/list";
import { groupBy } from "underscore";
import { StatefulMenu } from "baseui/menu";
import ChevronRight from "baseui/icon/chevron-right";
import { generateBundleUrl } from "../../../shared/util";

function SearchMenu(props) {
  const ITEMS = groupBy(props.items.__ungrouped, (item) => {
    const parts = item.item.name.split(".");
    return parts.length > 0
      ? parts[parts.length - 1].toUpperCase()
      : "Generic".toUpperCase();
  });
  return (
    <StatefulMenu
      items={ITEMS}
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

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      budgetsList: [],
      value: "",
      options: {
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
      },
    };

    this.fuse = null;
  }

  componentDidMount() {
    fetch(BUNDLE_BUDGETS_URL)
      .then((result) => result.json())
      .then((budgets) => {
        this.setState({
          budgetsList: budgets,
        });

        this.fuse = new Fuse(budgets, this.state.options);
      });
  }

  render() {
    return (
      <Select
        value={this.state.value}
        type={TYPE.search}
        placeholder="Search"
        openOnClick={false}
        filterOptions={(options, query) => {
          if (this.fuse !== null) {
            return this.fuse.search(query);
          }
          return [];
        }}
        getOptionLabel={({ option, optionState }) => {
          return option.item.name;
        }}
        onChange={(params) => {
          console.log(params);
          // Redirect to bundle page
        }}
        overrides={{
          StatefulMenu: {
            component: SearchMenu,
          },
          Root: {
            style: {
              outline: "black 2px solid",
            },
          },
        }}
      />
    );
  }
}

export default Search;
