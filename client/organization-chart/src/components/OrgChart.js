import React, { Component } from 'react'
// import {Employee} from "./Employee"
import styled from "styled-components"
const data = fetch('https://localhost:3001/api/v1/employee')

const sameData = data
console.log(data)

class OrgChart extends Component {
    constructor(){
        super()
    }

    employees(data){
        const children = (employee) => {
            if(employee.length >= 0){
                return <ul>{this.employees(employee)}</ul>
            }
        }
    }
    // return data.map(node, index) => {
    //     return <Employee key={node.id} name={node.name} >
    //     {children(node.direct_reports)}
    //     </Employee>
    // }

    render(){
        return (
            <ul>
                {this.employees(sameData)}
            </ul>
        )
    }
}

export default OrgChart