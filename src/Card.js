import React, {Component, Fragment} from 'react';
import {getData, saveData} from './Data.js'
import './Card.css';
import SelectPlanet from './SelectPlanet'

class Card extends Component {
  state = {
    name: this.props.item.name,
    birth_year: this.props.item.birth_year,
    homeplanet: '',
    homeworld: this.props.item.homeworld,
    edit_info: false,
    id: this.props.item.id
  }

  componentDidMount() {
    const {homeworld} = this.props.item
    let data = {
      path: `planets/${homeworld}`
    }
    getData(data).then((response) => this.setState({homeplanet: response.data.name})).catch((error) => console.error("Error: ", error))
  }

  editInfo = () => {
    this.setState({edit_info: true})
  }
  editName = (name) => {
    this.setState({name})
  }
  editBirthYear = (birth_year) => {
    this.setState({birth_year})
  }
  editHomeWorld = (selected) => {
    this.setState({homeplanet: selected.name, homeworld: selected.id})
  }
  saveInfo = () => {
    this.setState({edit_info: false})
    const {id, name, birth_year, homeworld} = this.state
    saveData({id, name, birth_year, homeworld}).then((response) => console.log("Saved Data")).catch((error) => console.error(error))
  }
  render() {
    const {image, id, homeworld} = this.props.item
    const {name, birth_year, homeplanet, edit_info} = this.state
    const imageUrl = `http://localhost:3008/${image}`
    const current = JSON.stringify({id: homeworld, name: homeplanet})
    return (<div className='card'>
      <div className='card-content'>
        <div key={id} className='card-name'>{
            edit_info
              ? <input type='text' value={name} onChange={(event) => this.editName(event.target.value)}/>
              : <span>{name}</span>
          }

        </div>
        <img src={imageUrl} alt='profile'/>
        <p>{
            edit_info
              ? <input type='text' value={birth_year} onChange={(event) => this.editBirthYear(event.target.value)}/>
              : <Fragment>
                  <span>Birthday:</span>
                  <span>{birth_year}</span>
                </Fragment>
          }
        </p>
        <p>
          {
            edit_info
              ? <SelectPlanet current={current} editHomeWorld={(selected) => this.editHomeWorld(selected)}/>
              : <Fragment>
                  <span>Home-World:</span>
                  <span>{homeplanet}</span>
                </Fragment>
          }
        </p>
        <label className="container">Mark as Favourites
          <input type="checkbox"/>
          <span className="checkmark"></span>
        </label>
      </div>
      {
        edit_info
          ? <button className='button' onClick={this.saveInfo}>Save</button>
          : <button className='button' onClick={this.editInfo}>Edit Info</button>
      }

    </div>);
  }
}

export default Card;
