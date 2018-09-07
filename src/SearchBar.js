import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  handleOnChange = (event) => {
    this.props.setSearch(event.target.value)
  }
  render() {
    return (<div className='search-bar'>
      <input onChange={this.handleOnChange} placeholder='Search Your Destiny'/>
    </div>);
  }
}

export default SearchBar;
