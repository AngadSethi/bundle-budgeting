import Fuse from "fuse.js";
import { BUNDLE_BUDGETS_URL } from "../shared/endPoints";

import * as React from "react";
import { Select, TYPE } from "baseui/select";
import { ListItem, ListItemLabel } from "baseui/list";

function SearchListItem(props) {
  return (
    <ListItem>
      <ListItemLabel description={props.item.item.owner}>
        {props.item.item.name}
      </ListItemLabel>
    </ListItem>
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
        // shouldSort: true,
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
          DropdownListItem: {
            component: SearchListItem,
          },
          Root: {
            style: {
              outline: "black 2px solid"
            }
          }
        }}
      />
    );
  }
}

export default Search;
