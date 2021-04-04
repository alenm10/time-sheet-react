import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="footer">
                    <div className="wrapper">
                        <ul>
                            <li>
                                <span>Copyright. VegaITSourcing All rights reserved</span>
                            </li>
                        </ul>
                        <ul className="right">
                            <li>
                                <a href="javascript:;">Terms of service</a>
                            </li>
                            <li>
                                <a href="javascript:;" className="last">Privacy policy</a>
                            </li>
                        </ul>
                    </div>
                </footer>
            </div>
        )
    }
}
