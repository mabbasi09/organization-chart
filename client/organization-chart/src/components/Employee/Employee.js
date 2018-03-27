import React, { Component } from 'react'
import styled from "styled-components"

const Items = styled.div`
    background; lightyellow;
    color: white;
    border-radius: 25px 25px;
    border-right: 5px solid darkseagreen;
    border-left: 5px solid darkseagreen;
    border-bottom: 5px solid lightyellow
    margin: 0.5vw
`

export class Employee extends Component {
    render(){
        return (
            <div>
                <Items>
                    <div>{this.props.first_name} {this.props.last_name}</div>
                    {this.props.title}
                </Items>
                {this.props.children}
            </div>
        )
    }
}

export default Employee