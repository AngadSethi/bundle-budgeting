import React, { Component } from "react";
import "../switch.css"
class ToggleMode extends Component {
    render() {
        return (
            <div className="toggle-switch">
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider" />
                </label>
            </div>
        );
    }
}

export default ToggleMode;