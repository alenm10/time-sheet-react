import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ClientService from '../../services/ClientService'
import ProjectService from '../../services/ProjectService'
import CategoryService from '../../services/CategoryService'
import TeamMembersService from '../../services/TeamMembersService'

export default class ReportsSearchForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedTeamMember: '-1',
            selectedClient: '-1',
            selectedProject: '-1',
            selectedCategory: '-1',
            selectedStartDate: '',
            selectedEndDate: '',
            teamMembersSelect: [],
            clientsSelect: [],
            projectsSelect: [],
            filteredProjectsSelect: [],
            categoriesSelect: []
        }
        this.handleTeamMemberChange = this.handleTeamMemberChange.bind(this);
        this.handleClientChange = this.handleClientChange.bind(this);
        this.handleProjectChange = this.handleProjectChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);

        this.handleSearch = this.handleSearch.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    componentDidMount() {
        ClientService.getClients().then((res) => {
            console.log("clients = ", res.data)
            this.setState({ clientsSelect: res.data })
        });
        ProjectService.getProjects().then((res) => {
            console.log("projects = ", res.data)
            this.setState({ projectsSelect: res.data })
            this.setState({ filteredProjectsSelect: res.data })
        });
        TeamMembersService.getTeamMembers().then((res) => {
            console.log("teamMembers = ", res.data)
            this.setState({ teamMembersSelect: res.data })
        });
        CategoryService.getCategories().then((res) => {
            console.log("categories = ", res.data)
            this.setState({ categoriesSelect: res.data })
        });
    }

    handleSearch() {
        console.log("search = ", this.state)
        let searchObj = {
            project: this.state.selectedProject,
            client: this.state.selectedClient,
            teamMember: this.state.selectedTeamMember,
            category: this.state.selectedCategory,
            startDate: this.state.selectedStartDate,
            endDate: this.state.selectedEndDate
        }
        
        this.props._handleSearch(searchObj);
    }

    handleReset() {
        this.setState({ selectedTeamMember: "-1" })
        this.setState({ selectedClient: "-1" })
        this.setState({ selectedProject: "-1" })
        this.setState({ selectedCategory: "-1" })
        this.setState({ selectedStartDate: '' })
        this.setState({ selectedEndDate: '' })
        this.props._handleReset();
    }

    handleTeamMemberChange(event) {
        this.setState({ selectedTeamMember: event.target.value })
    }

    handleClientChange(event) {
        this.setState({ selectedClient: event.target.value })
        this.setState({ selectedProject: "-1" })
        this.setState(prevState => ({
            filteredProjectsSelect: prevState.projectsSelect.filter(project => project.client.id == event.target.value)
        }));
    }

    handleProjectChange(event) {
        this.setState({ selectedProject: event.target.value })
    }

    handleCategoryChange(event) {
        this.setState({ selectedCategory: event.target.value })
    }

    handleStartDateChange(date) {
        this.setState({ selectedStartDate: date })
    }

    handleEndDateChange(date) {
        this.setState({ selectedEndDate: date })
    }

    render() {
        return (
            <div className="grey-box-wrap reports">
                <ul className="form">
                    <li>
                        <label>Team member:</label>
                        <select
                            value={this.state.selectedTeamMember}
                            onChange={this.handleTeamMemberChange}>
                            <option value="-1">All</option>
                            {
                                this.state.teamMembersSelect.map(
                                    teamMember => {
                                        return <option key={teamMember.id} value={teamMember.id}>{teamMember.name}</option>
                                    }
                                )
                            }
                        </select>
                    </li>
                    <li>
                        <label>Category:</label>
                        <select
                            value={this.state.selectedCategory}
                            onChange={this.handleCategoryChange}>
                            <option value="-1">All</option>
                            {
                                this.state.categoriesSelect.map(
                                    category => {
                                        return <option key={category.id} value={category.id}>{category.name}</option>
                                    }
                                )
                            }
                        </select>
                    </li>
                </ul>
                <ul className="form">
                    <li>
                        <label>Client:</label>
                        <select
                            value={this.state.selectedClient}
                            onChange={this.handleClientChange}>
                            <option value="-1">All</option>
                            {
                                this.state.clientsSelect.map(
                                    client => {
                                        return <option key={client.id} value={client.id}>{client.clientName}</option>
                                    }
                                )
                            }
                        </select>
                    </li>
                    <li>
                        <label>Start date:</label>
                        <DatePicker
                            selected={this.state.selectedStartDate}
                            onChange={this.handleStartDateChange} />
                    </li>
                </ul>
                <ul className="form last">
                    <li>
                        <label>Project:</label>
                        <select
                            value={this.state.selectedProject}
                            onChange={this.handleProjectChange}>
                            <option value="-1">All</option>
                            {
                                this.state.filteredProjectsSelect.map(
                                    project => {
                                        return <option key={project.id} value={project.id}>{project.projectName}</option>
                                    }
                                )
                            }
                        </select>
                    </li>
                    <li>
                        <label>End date:</label>
                        <DatePicker
                            selected={this.state.selectedEndDate}
                            onChange={this.handleEndDateChange} />
                    </li>
                    <li>
                        <a className="btn orange right" onClick={this.handleReset}>Reset</a>
                        <a className="btn green right" onClick={this.handleSearch}>Search</a>
                    </li>
                </ul>
            </div>
        )
    }
}
