import React from "react";
import Slider from '@mui/material/Slider';
import './YearSlider.css';

export default class YearSlider extends React.Component {
    handleChange(_event, newValue) {
        console.log(newValue);
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
