import React, { Component } from 'react'
import UserRight from './UserRight'
import NavigationBar from './NavigationBar';

export default class Header extends Component {
    render() {
        return (
            <div>
                <header className="header">
                    <div className="top-bar"></div>
                    <div className="wrapper">
                        <a className="logo" style={{ float: "left", "marginLeft": "12px" }}>
                            <img src="assets/img/logo.png" alt="VegaITSourcing Timesheet" />
                        </a>
                        <UserRight/>
                        <NavigationBar/>
                    </div>
                </header>
            </div>
        )
    }
}
