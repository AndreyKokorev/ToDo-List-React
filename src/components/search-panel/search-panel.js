import React, { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component {
  
  state = {
    searchString: ''
  }

  onSearchChange = (e) => {
    const searchString = e.target.value;

    this.props.onSearchChange(searchString);

    this.setState({searchString})
  }

  render() {
    return (
      <input  type="text"
              className="form-control search-input"
              placeholder="type to search"
              onChange={this.onSearchChange}
              value={this.state.searchString}/>
    );
  } 
};

export default SearchPanel;
