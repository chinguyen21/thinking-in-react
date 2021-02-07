import React, { Component } from 'react'

//Components
import StudentCard from './StudentCard'

export default class CrewContainer extends Component {
    render() {
        return (
            <div className="border border-success">
            <h2 className="text-center">Your Hogwarts Crew</h2>
            <div className="card-group m-2 p-1 bg-primary">
                {this.props.crew.map(
                    wiz => <StudentCard clickAction={this.props.clickAction} key={wiz.id} wizard={wiz}/>
                )}
            </div>
            </div>
        )
    }
}
