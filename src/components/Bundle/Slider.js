import * as React from "react";
import { Slider } from "baseui/slider";
import { Component } from "react";

export default class BudgetSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            budgetValue: [50]
        };
        this.setBudget = this.setBudget.bind(this);
    }

    render() {
        return (
            <Slider
                overrides={{
                    Root: {
                        style: {
                            width: "70%",

                        }
                    },
                    Thumb: {
                        style: {
                            width: "15px",
                            height: "15px",
                        }
                    }
                }}
                min={10}
                max={2000}
                value={this.state.budgetValue}
                onChange={({ value }) => value && this.setBudget(value)}
            // onFinalChange={({ value }) => console.log(value)}
            />
        );
    }
}