import React, { Component } from 'react'
import {Popup} from "../Popup/Popup"
import "./Employee.css"
import axios from 'axios'


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

    deleteEmployee = () => {
        const userId = this.props.person.id.toString()
        console.log(userId)

        axios.delete('http://localhost:3001/api/v1/employee/' + userId)
        .then((response) => {
            console.log(response)
            this.props.deletedEmployees([response.data.data])
        })
        .catch((error) => console.log(error))
    }

    render(){
        return (
            <div>
                <div className="employee">
                    <div className="employee-info">
                        <div onClick={this.getId}>
                            {this.props.person.first_name} {this.props.person.last_name}
                        </div>
                        <span><i>{this.props.person.title}</i></span>
                    </div>

                    <button className="add-btn" onClick={this.togglePopup.bind(this)}>Add Employee</button>
                    
                    <button className="update-btn">Update</button>
                    <button onClick={this.deleteEmployee} className="delete-btn">Delete</button>

                    {this.state.showPopup ?
                        <Popup closePopup={this.togglePopup.bind(this)} 
                            managerId={this.props.person.id} employees={this.props.allEmployees} /> 
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