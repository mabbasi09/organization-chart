import React, { Component } from 'react'

export class Employee extends Component {
    render(){
        return (
            <div>
                {this.props.name}
                {this.props.title}
                {this.props.children}
            </div>
        )
    }
}

export default Employee