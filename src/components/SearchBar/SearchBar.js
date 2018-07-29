import React from 'react';
import './Searchbar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({searchQuery: event.target.value});
  }

  handleSearch(event) {
    this.props.searchSpotify(this.state.searchQuery);
    event.preventDefault();
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleChange} />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    )
  }
};

export default SearchBar;
