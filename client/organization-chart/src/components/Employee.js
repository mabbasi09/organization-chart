import React, { Component } from 'react'

class Employee extends Component {
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