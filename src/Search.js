import React from "react";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const newValue = event.target.value;
        console.log(newValue);
        if (newValue !== this.props.currentValue) {
            this.props.handleChange(newValue);
        }
    }

    render() {
        return (
            <Paper
                component="form"
                sx={{ mx: 2, mb: 1.5, p: '2px 4px', display: 'flex', alignItems: 'center' }}
            >
                <Typography sx={{ ml: 1}} style={{opacity: 0.3}}>🔍</Typography>
                <InputBase
                sx={{ ml: 1, flex: 1 }} style={{color: 'grey'}}
                placeholder="Search news articles..." onChange={this.handleChange}
                />
            </Paper>
        )
    }
}
