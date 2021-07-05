import * as React from "react";
import { Component } from "react";

import MyCard from "../MyCard";

export default class NewBundlesWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bundlesAddedRemoved: props.bundlesAddedRemoved,
            budgetListOpen: false,
        }
    }
    render() {
        return (

            <MyCard
                overrides={{
                    Root: {
                        style: ({ $theme }) => ({
                            backgroundColor: $theme.colors.accent300,
                        }),
                    },
                }}
                content={this.state.bundlesAddedRemoved}
            />
        )
    }
}