import React, { Component } from 'react'
import {Employee} from "../Employee/Employee"
import styled from "styled-components"
import axios from 'axios'

const Container = styled.div`
    height: 150px;
    width: 150px;
    margin: 10px;
    float: left;

`

class OrgChart extends Component {

    constructor(props){
        super(props)
        this.state = {
            employees: []
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

    getEmployees(data){
        const children = (reports) => {
            if(reports.length >= 0){
                return <Container>{this.getEmployees(reports)}</Container>
            }
        }
        return data.map((person) => {
            return <Employee key={person.id} first_name={person.first_name} last_name={person.last_name} title={person.title}>
                        {children(person.direct_reports)}
                </Employee>
        });
    }
        
    render(){
        return (
            <Container>
                <div>
                    <button class="addUserBtn">Add new user</button>
                </div>
                {this.getEmployees(this.state.employees)}
            </Container>
        )
    }
}

export default OrgChart