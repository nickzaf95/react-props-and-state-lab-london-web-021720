import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
      this.setState({
        filters: {
          type: event.target.value
        }
      })
  }

  onFindPetsClick = (event) => {
      if (this.state.filters.type === 'all') {
        fetch('/api/pets')
        .then(response => response.json())
        .then(stuff => this.setState({
          pets: stuff
        }))
      } else {
        fetch(`/api/pets?type=${this.state.filters.type}`)
        .then(response => response.json())
        .then(stuff => this.setState({
          pets: stuff
        }))
      }
  }

  onAdoptPet = (identity) => {
    this.state.pets.find(pet => pet.id === identity).isAdopted = true
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
