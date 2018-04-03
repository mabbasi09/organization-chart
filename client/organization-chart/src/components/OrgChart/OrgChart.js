import React, { Component } from 'react'
import {Employee} from "../Employee/Employee"
import {AddUserForm} from "../AddUserForm/AddUserForm"
import "./OrgChart.css"
import axios from 'axios'


class OrgChart extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            employees: []
        }
    }

    updatedEmployees (data) {
        this.setState({employees: data})
    }

    deletedEmployees (data) {
        this.setState({employees: data})
    }

    findPerson(newUser, manager, callback){
        if (newUser.manager_id === manager.id) {
            callback(newUser, manager)
            return true;
        
        } else if (manager.direct_reports.length === 0) {
            return false;
        
        } else {
            manager.direct_reports.map((next_manager) => {
                return this.findnewUser(newUser, next_manager, callback)
            })
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/v1/employee#index')
        .then((response) => {
            this.setState({employees: response.data.data})
            console.log(this.state.employees)
        })
        .catch((error) => console.log(error))
    }

    getEmployees(data){
        const children = (reports) => {
            if(reports.length >= 0){
                return <div className="org-chart-tree">{this.getEmployees(reports)}</div>
            }
        }
        
        return data.map((person) => {
            return (
                <Employee key={person.id} person={person} allEmployees={this.updatedEmployees.bind(this)}
                         deletedEmployees={this.deletedEmployees.bind(this)}>
                        <div className="children-container">{children(person.direct_reports)}</div>
                </Employee>
            )
        });
    }

    render() {
        return (
            <div className="org-chart-tree">
                {this.getEmployees(this.state.employees)}
            </div >
        )
    }
}

export default OrgChart