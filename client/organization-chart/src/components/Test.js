import React, { Component } from 'react'
import axios from 'axios'

export class Test extends Component {

    constructor(props){
        super(props)
        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/v1/employee')
        .then(response => {
            console.log(response.data.data)
            this.setState({employees: response.data.data[0]})
        })
        .catch(error => console.log(error))
    }

    render(){
        return (
            <div>
                <h1>{this.state.employees.first_name} {this.state.employees.last_name}</h1>
                <h3>{this.state.employees.title}</h3>
            </div>
        )
    }
}

export default Test