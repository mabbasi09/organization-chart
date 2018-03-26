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
        axios.get('http://localhost:3001/api/v1/employees')
        .then(response => {
            console.log(response.status)
            this.setState({employees: response.data})
        })
        .catch(error => console.log(error))
    }

    render(){
        return (
            <div>Testing </div>
        )
    }
}

export default Test