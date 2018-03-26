import React, { Component } from 'react'
import {Employee} from "./Employee"
import styled from "styled-components"
import axios from 'axios'

const data = [ 
    {
    "id": 1,
    "name": "Dade Murphy",
    "title": "CEO",
    "direct_reports": [
        {
        "id": 2,
        "name": "Kate Libby",
        "title": "CTO",
        "direct_reports": [
            {
            "id": 5,
            "name": "Abdul Kareem",
            "title": "Translator",
            "direct_reports": []
            }
        ]
        },
        {
        "id": 3,
        "name": "Edward Vedder",
        "title": "CFO",
        "direct_reports": []
        }
    ]
    }
];


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
            console.log(response);
            this.setState({employees: response.data.data})
        })
        .catch((error) => {
            console.log(error);
        });
    }

    employees(data){
        const children = (employee) => {
            if(employee.length >= 0){
                return <ul>{this.employees(employee)}</ul>
            }
        }
        return data.map((node, index) => {
            return <Employee key={node.id} name={node.name} >
        {children(node.direct_reports)}
        </Employee>
        });
    }
        
    render(){
        return (
            <ul>
                {this.employees(this.state.employees)}
                {/* {this.state.employees.map((person) => {
                    return (
                        <h1 key={person.id} >{person.name}</h1>
                    )
                })} */}
            </ul>
        )
    }
}

export default OrgChart