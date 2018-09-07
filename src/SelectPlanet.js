import React, {Component} from 'react';
import {getData} from './Data.js'

class SelectPlanet extends Component {
  state = {
    current: this.props.current,
    planets: []

  }
  componentDidMount() {
    let data = {
      path: `planets`
    }
    getData(data).then((response) => this.setState({planets: response.data})).catch((error) => console.error("Error: ", error))
  }

  handleOnChange = (event) => {
    const selected = JSON.parse(event.target.value)
    this.setState({current: event.target.value})
    this.props.editHomeWorld(selected)
  }

  render() {
    const {planets, current} = this.state
    return (<select name="planets" onChange={this.handleOnChange} value={current}>
      {
        planets.map((planet) => {
          const value = JSON.stringify({id: planet.id, name: planet.name})
          return (<option key={planet.id} value={value}>{planet.name}</option>)
        })
      }
    </select>)
  }
}
export default SelectPlanet;
