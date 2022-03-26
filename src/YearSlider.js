import React from "react";
import Slider from '@mui/material/Slider';
import './YearSlider.css';

export default class YearSlider extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(_event, newYear) {
        if (newYear !== this.props.year) {
            console.log(newYear);
            this.props.handleYearChange(newYear);
        }
    }

    render() {
        return (
            <div className="yearSlider">
                <Slider
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={2016}
                    max={2020}
                    defaultValue={2020}
                    onChange={this.handleChange}
                />
            </div>)
    }
}
