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
       const marks = [
            {
              value: 2020,
              label: 'Present',
            },
          ];
          
          function valuetext(value) {
            return `${value}°C`;
          }

        return (
            <div className="yearSlider">
                <Slider
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    marks={marks}
                    step={1}
                    min={2016}
                    max={2020}
                    defaultValue={2020}
                    onChange={this.handleChange}
                />
            </div>
            
            )
    }
}
