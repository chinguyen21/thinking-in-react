import React, {Component} from 'react'

class StudentCard extends Component {

    state={
        points: this.props.wizard.points
    }

    handlePoints =(wizard) => {
        this.props.handleHousePoints(wizard)
        let updateWizard = {points: wizard.points + 1}
        let reqPackage = {}
        reqPackage.headers = {"Content-Type":"application/json"}
        reqPackage.method = "PATCH"
        reqPackage.body = JSON.stringify(updateWizard)

        fetch(`http://localhost:3000/wizards/${wizard.id}`, reqPackage)
        .then(res => res.json())
        .then(uWizard => {
            this.setState({points: uWizard.points})
        })
    }

    render(){
    return (
        <div className="col-sm-3 mb-1">
            <div className="card text-center">
                <img onClick={() => this.props.clickAction(this.props.wizard)} src={this.props.wizard.image} className="card-img-top" alt="..." />
                <div className="card-body" >
                    <h5 className="card-title">{this.props.wizard.name}</h5>
                    <p className="card-text"></p>
                </div>
                <div className="card-footer" >
                    <small className="text-muted">{this.props.wizard.house}</small><br></br>
                    <small onClick={() => this.handlePoints(this.props.wizard)} className="text-muted">Points: {this.state.points}</small>
                </div>
            </div>
        </div>
    )}
}

export default StudentCard;