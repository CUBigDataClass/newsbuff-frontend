import React from "react";


export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: null};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        const searchTerm = this.state.value;

        if(searchTerm !== null)
        if (searchTerm !== this.props.year) {
               console.log(searchTerm);
               this.props.handleSearch(searchTerm);
      }
    }

    render() {
        return (
            <div>
            <input style={{width:'320px'}} type='text' value={this.state.value} placeholder="🔍 Search Articles... "  onChange={this.handleChange}/>
            </div>
            )
 
    }
}
