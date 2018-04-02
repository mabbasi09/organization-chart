import React, { Component } from 'react'
import {Popup} from "../Popup/Popup"
import "./Employee.css"


export class Employee extends Component {
    constructor(props){
        super(props)
        this.state = {
            showPopup: false
        }
    }

    togglePopup() {

        this.setState({
            showPopup: !this.state.showPopup
        })
    }

    render(){
        return (
            <div>
                <div className="employee">
                    <div className="employee-info">
                        <div onClick={this.getId}>
                            {this.props.first_name} {this.props.last_name}
                        </div>
                        <span><i>{this.props.title}</i></span>
                    </div>
                    <button className="add-employee-btn" onClick={this.togglePopup.bind(this)}>Add Employee</button>
                    
                    {this.state.showPopup ?
                        <Popup closePopup={this.togglePopup.bind(this)} 
                            managerId={this.props.userId} employees={this.props.allEmployees} /> 
                        :
                        null
                    }
                </div>
                
                {this.props.children}
            </div>
        )
    }
}

export default Employee