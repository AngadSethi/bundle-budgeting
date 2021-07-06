import * as React from "react";
import { Slider } from "baseui/slider";

export default function BudgetSlider() {
    const [value, setValue] = React.useState([170]);
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
            value={value}
            onChange={({ value }) => value && setValue(value)}
            onFinalChange={({ value }) => console.log(value)}
        />
    );
}