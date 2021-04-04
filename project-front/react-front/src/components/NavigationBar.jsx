import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Categories from './category/Categories';
import Clients from './client/Clients';
import Projects from './project/Projects';
import Reports from './report/Reports';
import TeamMembers from './team-member/TeamMembers';
import TimeSheet from './time-sheet/TimeSheet';
import Login from './Login';
import DayTimeSheet from './time-sheet/DayTimeSheet';

export default class NavigationBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            role: localStorage.getItem('role')
        }
    }

    render() {
        
        return (
            <Router>
                <div>
                    <nav>
                        <ul className="menu">
                            <li>
                                <a className="btn nav" style={{paddingLeft:"10px", paddingRight:"10px"}}><Link to="/time-sheet/">Time sheet</Link></a>
                            </li>
                            {
                                this.state.role == "ADMIN" && <li>
                                    <a className="btn nav" style={{paddingLeft:"10px", paddingRight:"10px"}}><Link to="/clients/">Clients</Link></a>
                                </li>
                            }
                            {
                                this.state.role == "ADMIN" && <li>
                                    <a className="btn nav" style={{paddingLeft:"10px", paddingRight:"10px"}}><Link to="/projects/">Projects</Link></a>
                                </li>
                            }
                            {
                                this.state.role == "ADMIN" && <li>
                                    <a className="btn nav"><Link to="/categories/">Categories</Link></a>
                                </li>
                            }
                            {
                                this.state.role == "ADMIN" && <li>
                                    <a className="btn nav" style={{paddingLeft:"10px", paddingRight:"10px"}}><Link to="/team-members/">Team members</Link></a>
                                </li>
                            }
                            {
                                this.state.role == "ADMIN" && <li className="last">
                                    <a className="btn nav" style={{paddingLeft:"10px", paddingRight:"10px"}}><Link to="/reports/">Reports</Link></a>
                                </li>
                            }
                        </ul>
                        <span className="line"></span>
                    </nav>
                    <Switch>

                        <Route path="/" exact component={TimeSheet}></Route>
                        <Route path="/home" exact component = {TimeSheet}></Route>
                        <Route path="/time-sheet" component={TimeSheet}></Route>
                        <Route path="/clients" component={Clients}></Route>
                        <Route path="/projects" component={Projects}></Route>
                        <Route path="/categories" component={Categories}></Route>
                        <Route path="/team-members" component={TeamMembers}></Route>
                        <Route path="/reports" component={Reports}></Route>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/day/:day" render={(props) => (
                            <DayTimeSheet key={props.match.params.day} {...props} />)
                        } />
                    </Switch>
                </div>
            </Router>
        )
    }
}
