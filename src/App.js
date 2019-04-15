import React, {
  Component
} from 'react';
import './App.css';
import Card from './Card.js';
import SearchBar from "./SearchBar.js";
import star from './images/star.svg';
import wars from './images/wars.svg';
import {
  paginateData,
  searchData
} from './Data.js';
import ReactPaginate from 'react-paginate';

class App extends Component {
  state = {
    people: [],
    totalCount: 0,
    search: '',
    page: 1,
    limit: 10
  }

  componentDidMount() {
    // let data = {
    //   path: "people"
    // }
    // getData(data).then((response) => this.setState({people: response.data})).catch((error) => console.error("Error: ", error))
    const {
      limit,
      page
    } = this.state
    paginateData({
      page,
      limit
    }).then((response) => {
      this.setState({
        people: response.data,
        totalCount: response.headers['x-total-count']
      })
    }).catch((error) => console.error("Error: ", error))
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      search,
      limit,
      page
    } = this.state
    if (prevState.search !== search || prevState.page !== page) {
      if (!!search) {
        searchData({
          search,
          page,
          limit
        }).then((response) => this.setState({
          people: response.data,
          totalCount: response.headers['x-total-count']
        })).catch((error) => console.error("Error: ", error))
      } else {
        paginateData({
          page,
          limit
        }).then((response) => this.setState({
          people: response.data,
          totalCount: response.headers['x-total-count']
        })).catch((error) => console.error("Error: ", error))
      }
    }
  }

  setSearch = (search) => {
    this.setState({
      search,
      page: 1
    })
  }

  handlePageClick = (page) => {
    this.setState({
      page: page.selected + 1
    })
  }

  render() {
      const {
        people,
        totalCount
      } = this.state
      const pageCount = Math.ceil(totalCount / 10)
      console.log(pageCount)
      return ( < div className = 'content' >
          <
          div className = 'logo' >
          <
          img src = {
            star
          }
          alt = "star-logo" / >
          <
          span className = 'interview-text' > The Interview < /span> <
          img src = {
            wars
          }
          alt = "wars-logo" / >
          <
          /div> <
          div >
          <
          SearchBar setSearch = {
            (search) => this.setSearch(search)
          }
          /> <
          button type = "button"
          className = "favourites-btn" > Show - Favourites < /button> <
          /div>

          <
          div className = "cards" > {
            (people && people.length) ?
            people.map((data) => < Card key = {
                data.id
              }
              item = {
                data
              }
              />): < div > Nothing to display < /div>
            } <
            /div> <
            div id = "react-paginate" >
            <
            ReactPaginate previousLabel = {
              "<Previous"
            }
            nextLabel = {
              "Next>"
            }
            breakLabel = {
              < a href = "" > ... < /a>} breakClassName={"breakClassName"} pageCount={pageCount} pageRangeDisplayed={1} marginRangeDisplayed={1} onPageChange={this.handlePageClick} containerClassName={"pagination"} subContainerClassName={"pages pagination"} activeClassName={"active"} previousClassName={"previousClassName"} nextClassName={"nextClassName"} disabledClassName={"disabledClassName"} pageLinkClassName={"pageLinkClassName"}/ >
              <
              /div>

              <
              /div>);
            }
          }

          export default App;
