import React, { Component } from 'react'

//Components
import Form from './AddWizardForm'
import StudentCard from './StudentCard'

export default class Search extends Component {
    state={
        checkedPoint: false
    }

    filteredStudents = () => {
        let filteredStudents = this.props.wizardsData.filter(
                wiz => wiz.name.toLowerCase().includes(this.props.searchText.toLowerCase())
            )
        filteredStudents = filteredStudents.filter(wiz => wiz.house.includes(this.props.filter))
        if(this.state.checkedPoint) {filteredStudents = filteredStudents.sort((a,b) => a.points > b.points ? 1 : -1)}
            return filteredStudents
    }

    // componentDidMount(){
    //     this.filteredStudents()
    // }

    filteredStudents = () => {
        let filteredStudents = this.props.wizardsData.filter(
                wiz => wiz.name.toLowerCase().includes(this.props.searchText.toLowerCase())
            )
        filteredStudents = filteredStudents.filter(wiz => wiz.house.includes(this.props.filter))
        if(this.state.checkedPoint) {filteredStudents = filteredStudents.sort((a,b) => a.points > b.points ? 1 : -1)}
            return filteredStudents
    }

    handleCheck = () => {
        this.setState({checkedPoint: true})
    }


    render() {
    
        return (
            <div className="container mt-5">
                < Form createAWizard={this.props.createAWizard} />
                <form>
                    <div className="form-group">
                        <label htmlFor="search-text">Search by student name:</label>
                        <input onChange={(e) => this.props.searchHandler(e.target.value)} type="text" className="form-control" id="search-text" placeholder="harry potter"/>
                    </div>
                    <div>
                        <strong>Sort by:</strong>
                        <label>
                            <input type="radio" value="points" checked={this.checkedPoint} onChange={this.handleCheck}/>
                                Number of house points
                        </label>
                        <br/>
                        <label>
                        <strong>Filter:</strong>
                            <select onChange={event => this.props.handleFilter(event.target.value)}>
                            <option value="">All</option>
                            <option value="Gryffindor">Gryffindor</option>
                            <option value="Slytherin">Slytherin</option>
                            <option value="Ravenclaw">Ravenclaw</option>
                            <option value="Hufflepuff">Hufflepuff</option>
                            </select>
                        </label>
                    </div>
                </form>
                <div className="row justify-content-md-center">
                    {this.filteredStudents().map(wiz => <StudentCard key={wiz.id} wizard={wiz} />)}
                </div>
            </div>
        )
    }
}
