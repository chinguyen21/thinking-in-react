import React, { Component } from 'react'

//Components
import Navbar from './Navbar'
import { About } from './About'
import StudentContainer from './StudentContainer'
import Search from './Search'


const URL = "http://localhost:3000/wizards"

export default class App extends Component {

  state = {
    show: "about",
    wizards: [],
    crew: [],
    searchText: "",
    filter: '',
    Gryffindor: 0,
    Slytherin: 0,
    Ravenclaw: 0,
    Hufflepuff: 0
  }

  async componentDidMount() {
    const response = await fetch(URL)
    const wizards = await response.json()
    this.setState({
      wizards: wizards,
      Gryffindor: wizards.filter(wizard => wizard.house === "Gryffindor").map(wizard => wizard.points).reduce((total, ele) => total + ele, 0),
      Slytherin: wizards.filter(wizard => wizard.house === "Slytherin").map(wizard => wizard.points).reduce((total, ele) => total + ele, 0),
      Ravenclaw: wizards.filter(wizard => wizard.house === "Ravenclaw").map(wizard => wizard.points).reduce((total, ele) => total + ele, 0),
      Hufflepuff: wizards.filter(wizard => wizard.house === "Hufflepuff").map(wizard => wizard.points).reduce((total, ele) => total + ele, 0)
    })
  }

  showContainer = () => this.setState({show: "index"})
  showAbout = () => this.setState({show: "about"})
  showSearch = () => this.setState({show: "search"})

  searchHandler = (searchText) => {
    this.setState({ searchText })
  }

  handleFilter = (filter) => {
    this.setState({filter})
  }

  handleHousePoints = (wizard) => {
    this.setState({
      [wizard.house]: this.state[wizard.house] + 1
    })
  }

 addToCrew = (wizard) => {
   this.setState({
     crew: [...this.state.crew, wizard]
   })
 }

 removeFromCrew = (wizard) => {
   let newCrew = this.state.crew.filter(wiz => wiz.id !== wizard.id)
   this.setState({
     crew: newCrew
   })
 }

 createAWizard = (wizard) => this.setState({wizards: [...this.state.wizards, wizard]})

  render() {
    return (
      <>
        <Navbar showAbout={this.showAbout}
        gryPoints={this.state.Gryffindor}
        slyPoints={this.state.Slytherin}
        ravPoints={this.state.Ravenclaw}
        hufPoints={this.state.Hufflepuff}
        />
        {this.state.show === "about" ? <About showSearch={this.showSearch} showContainer={this.showContainer} /> : null}
        {this.state.show === "index" ? 
        <StudentContainer
          handleHousePoints={this.handleHousePoints}
          crew={this.state.crew}
          addToCrew={this.addToCrew}
          removeFromCrew={this.removeFromCrew}
          wizardsData={this.state.wizards} /> : null}
        {this.state.show === "search" ? 
        <Search
          createAWizard={this.createAWizard} 
          searchText={this.state.searchText} 
          wizardsData={this.state.wizards}
          filter={this.state.filter} 
          handleFilter={this.handleFilter} 
          searchHandler={this.searchHandler} /> : null}
      </>
    )
  }
}
