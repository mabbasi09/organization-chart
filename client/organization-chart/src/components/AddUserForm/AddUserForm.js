import React, { Component } from 'react'
import "./AddUserForm.css"


export class AddUserForm extends Component {
    render(){
        return (
            <div>
                <button className="addUserBtn" onClick={this.props.onClick}>Add Employee</button>
            </div>
        )
    }
}

export default AddUserForm