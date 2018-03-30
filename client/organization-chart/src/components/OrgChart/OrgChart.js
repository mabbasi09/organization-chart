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

    //will cache internal data for easy access later
    employeeCache = {}

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
            console.log(response.data.data)
            this.setState({employees: response.data.data})
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
            // var numKey = parseInt(person.id)
            // this.employeeCache[numKey] = person
            // console.log(this.employeeCache)
            return (
                <Employee key={person.id} userId={person.id} first_name={person.first_name} last_name={person.last_name} title={person.title}>
                        {children(person.direct_reports)}
                </Employee>
            )
        });
    }

    render(){
        return (
            <div className="org-chart-tree">
                <AddUserForm onClick={this.addNewUser}/>
                {this.getEmployees(this.state.employees)}
            </div >
        )
    }
}

export default OrgChart