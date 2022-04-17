import React from "react";
import Slider from '@mui/material/Slider';
import './NewSlider.css';

export default class NewSlider extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(_event, newValue) {
        if (newValue !== this.props.currentValue) {
            this.props.handleChange(newValue);
        }
    }

    render() {
        return (
            <div className="slider">
                <Slider
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={this.props.minValue}
                    max={this.props.maxValue}
                    defaultValue={this.props.defaultValue}
                    onChange={this.handleChange}
                />
            </div>)
    }
}
