import React, { Component } from 'react'

//Components
import StudentCard from './StudentCard'
import CrewContainer from './CrewContainer'

export default class StudentContainer extends Component {
    render() {
        return (
            <div className="container m-3">
                <CrewContainer clickAction={this.props.removeFromCrew} crew={this.props.crew} />
                <div className="row justify-content-md-center">
                    {this.props.wizardsData.map(
                        wiz => <StudentCard clickAction={this.props.addToCrew} key={wiz.id} 
                        wizard={wiz} handleHousePoints={this.props.handleHousePoints}/>
                    )}
                </div>
            </div>
        )
    }
}
