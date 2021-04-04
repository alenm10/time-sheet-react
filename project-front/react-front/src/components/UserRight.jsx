import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

export default class UserRight extends Component {

    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout(e) {
        localStorage.clear();
    }

    render() {
        return (
            <ul className="user right">
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {localStorage.getItem('username')}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/change-password">Change password</Dropdown.Item>
                        <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                        <Dropdown.Item href="/">Export all data</Dropdown.Item>
                        <Dropdown.Item href="/"  onClick={this.logout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ul>
        )
    }
}
