import React, { Component } from 'react'
import CreateTeamMemberDialog from './CreateTeamMemberDialog'
import { Accordion, Card, Button } from 'react-bootstrap'
import Pagination from '../Pagination'
import TeamMemberCard from './TeamMemberCard'
import TeamMembersService from '../../services/TeamMembersService'
import JSOG from 'jsog'

export default class TeamMembers extends Component {

    constructor(props) {
        super(props)

        this.state = {
            teamMembers: [],
            currentPage: 1,
            last: false
        }
    }

    componentDidMount() {
        this.getTeamMembers(this.state.currentPage)
    }

    getTeamMembers(page) {
        TeamMembersService.getTeamMembersByPage(page).then((res) => {
            console.log("res = ", JSOG.decode(res.data))
            this.setState({ teamMembers: JSOG.decode(res.data.content) });
            this.setState({ last: res.data.last });
        });
    }

    previousPage() {
        console.log("previous page")
        let prevPage = this.state.currentPage - 1
        this.setState({ currentPage: prevPage });
        this.getTeamMembers(prevPage)
    }

    nextPage() {
        console.log("next page")
        let nextPage = this.state.currentPage + 1
        this.setState({ currentPage: nextPage });
        this.getTeamMembers(nextPage)
    }

    delete(id) {
        this.setState(prevState => ({
            teamMembers: prevState.teamMembers.filter(el => el.id != id)
        }));
    }

    create(data) {
        console.log("data save = ", data)

        let newTeamMember = {
            id: data.id,
            name: data.name,
            username: data.username,
            email: data.email,
            hoursPerWeek: data.hoursPerWeek,
            roles: data.roles,
        }
        this.setState({ teamMembers: [...this.state.teamMembers, newTeamMember] })
    }

    render() {
        return (
            <div className="container">
                <div className="wrapper">
                    <section className="content">
                        <h2 style={{float:"left"}}><i className="ico team-member"></i>Team members</h2>
                        <CreateTeamMemberDialog
                            _handleCreate={this.create.bind(this)} />
                        <Accordion>
                            {
                                this.state.teamMembers.map(
                                    teamMember =>
                                        <TeamMemberCard
                                            key={teamMember.id}
                                            teamMember={teamMember}
                                            _handleDelete={this.delete.bind(this)} />
                                )
                            }
                        </Accordion>
                        <Pagination
                            currentPage={this.state.currentPage}
                            last={this.state.last}
                            _handlePreviousPage={this.previousPage.bind(this)}
                            _handleNextPage={this.nextPage.bind(this)} />
                    </section>
                </div>
            </div>

        )
    }
}
