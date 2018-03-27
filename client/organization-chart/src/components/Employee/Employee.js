import React, { Component } from 'react'
import styled from "styled-components"

const Items = styled.div`
    
`

export class Employee extends Component {
    render(){
        return (
            <Items>
                <button>Delete</button>
                <div>{this.props.first_name} {this.props.last_name}</div>
                <div>{this.props.title}</div>
                {this.props.children}
            </Items>
        )
    }
}

export default Employee