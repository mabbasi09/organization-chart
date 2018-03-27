import React, { Component } from 'react'
import {Employee} from "../Employee/Employee"
import {AddUserForm} from "../AddUserForm/AddUserForm"

import styled from "styled-components"
import axios from 'axios'

const Container = styled.div`
    background-color: grey;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
`

class OrgChart extends Component {

    constructor(props){
        super(props)
        this.state = {
            employees: []
        }
    }

    findPerson(newUser, manager, callback){
        if (newUser.manager_id === manager.id) {
            callback(newUser, manager)
            return true;
        
        } else if (manager.direct_reports.length === 0) {
            console.log("nobody here!!")
            return false;
        
        } else {
            manager.direct_reports.map((next_manager) => {
                return this.findnewUser(newUser, next_manager, callback)
            })
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/v1/employee')
        .then((response) => {
            console.log(response.data.data)
            this.setState({employees: response.data.data})
        })
        .catch((error) => console.log(error))
    }

    //will cache internal data for easy access later
    employeeCache = {}

    getEmployees(data){
        const children = (reports) => {
            if(reports.length >= 0){
                return <Container>{this.getEmployees(reports)}</Container>
            }
        }
        return data.map((person) => {
            var numKey = parseInt(person.id)
            this.employeeCache[numKey] = person
            return (
                <Employee key={person.id} first_name={person.first_name} last_name={person.last_name} title={person.title}>
                        {children(person.direct_reports)}
                </Employee>
            )
        });
    }
    
    addNewUser = () => {
        axios.post('http://localhost:3001/api/v1/employee', 
        {
            id: '',
            first_name: '',
            last_name: '',
            title: '',
            manager_id: ''
        })
        .then((response) => {
            console.log(this.employeeCache)
            console.log(response.data)
            // this.state.employees.push(response.data)
        })
        .catch((error) => console.log(error))
    }

    render(){
        return (
            <Container>
                <AddUserForm onClick={this.addNewUser}/>
                {this.getEmployees(this.state.employees)}
            </Container>
        )
    }
}

export default OrgChart