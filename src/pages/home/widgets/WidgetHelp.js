import * as React from "react";
import { Alert } from "baseui/icon";
import { StatefulTooltip } from "baseui/tooltip";
export default function HelpIcon(props) {
    return (
        <div align="right">
            <StatefulTooltip
                overrides={{
                    Arrow: {
                        style: {
                            width: "75px",
                            height: "10px",
                        }
                    }
                }}
                content={() => (
                    <p >
                        {props.help}
                    </p>
                )}
                returnFocus
                autoFocus
            >
                <Alert />
            </StatefulTooltip>
        </div>

    );
}

