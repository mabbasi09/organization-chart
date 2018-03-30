import React, { Component } from 'react'
// import 'bootstrap/dist/css/bootstrap.css'
// import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import "./AddUserForm.css"

export class AddUserForm extends Component {
    render(){
        return (
            <div className="employee-form">
                {/* <form>
                    <label htmlFor="first_name">First name</label>
                    <input id="first_name" name="first_name" type="text" />

                    <label htmlFor="last_name">Last name</label>
                    <input id="last_name" name="last_name" type="text" />

                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" type="text" />

                    <label htmlFor="manager_id">Manager</label>
                    <input id="manager_id" name="manager_id" type="text" />

                    <button className="addUserBtn" onClick={this.props.onClick}>Add Employee</button>
                </form> */}
            </div>
            // <div>
            //     <button className="addUserBtn" onClick={this.props.onClick}>Add Employee</button>
            // </div>
        )
    }
}

export default AddUserForm