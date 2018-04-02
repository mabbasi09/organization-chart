import React, { Component } from 'react'
import "./Popup.css"
import axios from 'axios'
import update from 'immutability-helper'


export class Popup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newUser: {
                first_name: '',
                last_name: '',
                title: '',
                manager_id: this.props.managerId
            },
            employees: this.props.employees
        }
    }

    findPerson(newUser, manager, callback) {
        if (newUser.manager_id === manager.id) {
            callback(newUser, manager)
            return true;
        
        } else if (manager.direct_reports.length === 0) {
            return false;
        
        } else {
            manager.direct_reports.map((next_manager) => {
                return this.findPerson(newUser, next_manager, callback)
            })
        }
    }

    addNewUser = (event) => {
        event.preventDefault()

        const user = this.state.newUser
        user[event.target.name] = event.target.value

        this.setState({
            newUser: user
        });
        // console.log(this.state.newUser)
        // console.log(this.state.employees)
    }

    submitUser = (event) => {
        event.preventDefault()

        const user = this.state.newUser;
        const root = this.state.employees[0];

        // this.findPerson(user, root, (newEmployee, manager)=> {
            
        //     console.log(manager.first_name + " is the manager of " + newEmployee.first_name)
        //     this.setState({
        //         manager
        //     })
        // })
        console.log(this.state.employees)

        // axios.post('http://localhost:3001/api/v1/employee/', user)
        // .then((response) => {
        //     const newUser = response.data.data;
        //     console.log(newUser)
        //     // this.findPerson()
        //     this.setState({
        //         employees: newUser
        //     }) 
        // })
        // .catch((error) => console.log(error))
    }

    render() {
        return (
            <form onSubmit={this.submitUser}>
                <label htmlFor="first_name">First name</label>
                <input id="first_name" name="first_name" value={this.state.first_name} onChange={this.addNewUser} type="text" />

                <label htmlFor="last_name">Last name</label>
                <input id="last_name" name="last_name" value={this.state.last_name} onChange={this.addNewUser} type="text" />

                <label htmlFor="title">Title</label>
                <input id="title" name="title" value={this.state.title} onChange={this.addNewUser} type="text" />

                <button onSubmit={this.addNewUser} className="addNewUserBtn">Submit</button>
                <button className="close-btn" onClick={this.props.closePopup}>Close</button>
            </form>
        )
    }
}

export default Popup