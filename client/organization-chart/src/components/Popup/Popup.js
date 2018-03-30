import React, { Component } from 'react'
import "./Popup.css"
import axios from 'axios'


export class Popup extends Component {

    constructor() {
        super();
        // this.addNewUser = this.addNewUser.bind(this)
    }

    // componentDidMount() {
    //     axios.get('http://localhost:3001/api/v1/employee#index')
    //     .then((response) => {
    //         console.log(response.data.data)
    //         this.setState({employees: response.data.data})
    //     })
    //     .catch((error) => console.log(error))
    // }

    addNewUser = (event) => {
        event.preventDefault()
        const user = new FormData(event.target)
        console.log(user)

        axios.post('http://localhost:3001/api/v1/employee/', 
        {
            body: user
        })
        // .then((response) => {
        //     console.log(response.data)
        //     console.log(this.state.employees)
        // })
        // .catch((error) => console.log(error))
    }

    render(){
        return (
                <form onSubmit={this.addNewUser}>
                    <label htmlFor="first_name">First name</label>
                    <input id="first_name" name="first_name" type="text" />

                    <label htmlFor="last_name">Last name</label>
                    <input id="last_name" name="last_name" type="text" />

                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" type="text" />

                    <button className="addNewUserBtn">Submit</button>
                    <button onClick={this.props.closePopup}>Close</button>
                </form>
        )
    }
}

export default Popup