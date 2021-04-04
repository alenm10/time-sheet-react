import React, { Component } from 'react'
import ClientService from '../../services/ClientService'
import ProjectService from '../../services/ProjectService'
import CategoryService from '../../services/CategoryService'
import Swal from "sweetalert2";

export default class TimeSheetItem extends Component {
    constructor(props) {
        super(props)
        console.log("props TimeSheetItem = ", props)
        this.state = {
            create: this.props.create,
            clientsSelect: [],
            projectsSelect: [],
            filteredProjectsSelect: [],
            categoriesSelect: [],
            client: (this.props.timeSheetItem && this.props.timeSheetItem.client.id) || "-1",
            project: (this.props.timeSheetItem && this.props.timeSheetItem.project.id) || "-1",
            category: (this.props.timeSheetItem && this.props.timeSheetItem.category.id) || "-1",
            description: (this.props.timeSheetItem && this.props.timeSheetItem.description) || "",
            time: (this.props.timeSheetItem && this.props.timeSheetItem.time) || 0,
            overtime: (this.props.timeSheetItem && this.props.timeSheetItem.overtime) || '0',
            timeSheetItem: this.props.timeSheetItem //only if create == false
        }
        console.log(this.state)
        this.handleClientChange = this.handleClientChange.bind(this);
        this.handleProjectChange = this.handleProjectChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleOvertimeChange = this.handleOvertimeChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
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
        CategoryService.getCategories().then((res) => {
            console.log("categories = ", res.data)
            this.setState({ categoriesSelect: res.data })
        });
    }

    handleClientChange(event) {
        let selectedClient = event.target.value;
        this.setState({ client: selectedClient })
        this.setState({ project: -1 })
        this.setState(prevState => ({
            filteredProjectsSelect: prevState.projectsSelect.filter(project => project.client.id == selectedClient)
        }));
    }

    _handleSave(timeSheetItem) {
        this.props._handleSave(timeSheetItem);
    }

    _handleUpdate(timeSheetItem) {
        this.props._handleUpdate(timeSheetItem);
    }

    handleCreate() {
        let timeSheetItem = {
            description: this.state.description,
            time: this.state.time,
            overtime: this.state.overtime,
            //date: "1401685200",
            project: {
                id: this.state.project
            },
            teamMember: {
                id: localStorage.getItem('id')
            },
            category: {
                id: this.state.category,
            },
            client: {
                id: this.state.client
            }
        }
        console.log("submit = ", timeSheetItem)
        this._handleSave(timeSheetItem)
        this.setState({ description: "" })
        this.setState({ time: 0 })
        this.setState({ overtime: 0 })
        this.setState({ project: "-1" })
        this.setState({ client: "-1" })
        this.setState({ category: "-1" })
    }

    handleSubmit(event) {
        //event.preventDefault();
        if (event.key === "Enter") {
            if (this.validate()) {
                if (this.state.create) {
                    console.log("crate")
                    this.handleCreate()
                } else {
                    //handle update
                    console.log("old item = ", this.state.timeSheetItem);
                    let timeSheetItem = {
                        id: this.state.timeSheetItem.id,
                        //date: this.state.timeSheetItem.date,
                        description: this.state.description,
                        time: this.state.time,
                        overtime: this.state.overtime,
                        project: {
                            id: this.state.project
                        },
                        teamMember: {
                            id: localStorage.getItem('id')
                        },
                        category: {
                            id: this.state.category,
                        },
                        client: {
                            id: this.state.client
                        }
                    }
                    console.log("changed = ", timeSheetItem)
                    this._handleUpdate(timeSheetItem)
                }
            }
        } else {
            console.log("not enter")
        }
    }

    validate() {
        if (!this.state.client || this.state.client == -1) {
            alert("Select client!");
            return false;
        }
        if (!this.state.project || this.state.project == -1) {
            alert("Select project!");
            return false;
        }
        if (!this.state.category || this.state.category == -1) {
            alert("Select category!");
            return false;
        }
        if (!this.state.time || isNaN(this.state.time) || this.state.time <= 0) {
            alert("Invalid hours per week!");
            return false;
        }
        if (!this.state.overtime || isNaN(this.state.overtime) || this.state.overtime < 0) {
            alert("Invalid overtime!");
            return false;
        }
        return true;
    }

    handleProjectChange(event) {
        this.setState({ project: event.target.value })
    }

    handleCategoryChange(event) {
        this.setState({ category: event.target.value })
    }

    handleDescriptionChange(event) {
        console.log(event.target.value)
        this.setState({ description: event.target.value })
    }
    handleTimeChange(event) {
        this.setState({ time: event.target.value })
    }
    handleOvertimeChange(event) {
        this.setState({ overtime: event.target.value })
    }
    render() {
        return (
            <tr>
                <td>
                    <select
                        value={this.state.client}
                        onChange={this.handleClientChange}>
                        <option value="-1">Choose client</option>
                        {
                            this.state.clientsSelect.map(
                                client => {
                                    return <option key={client.id} value={client.id}>{client.clientName}</option>
                                }
                            )
                        }
                    </select>
                </td>
                <td>
                    <select
                        value={this.state.project}
                        onChange={this.handleProjectChange}>
                        <option value="-1">Choose project</option>
                        {
                            this.state.filteredProjectsSelect.map(
                                project => {
                                    return <option key={project.id} value={project.id}>{project.projectName}</option>
                                }
                            )
                        }
                    </select>
                </td>
                <td>
                    <select
                        value={this.state.category}
                        onChange={this.handleCategoryChange}>
                        <option value="-1">Choose category</option>
                        {
                            this.state.categoriesSelect.map(
                                category => {
                                    return <option key={category.id} value={category.id}>{category.name}</option>
                                }
                            )
                        }
                    </select>
                </td>
                <td>
                    <input type="text"
                        value={this.state.description}
                        className="in-text medium"
                        onKeyDown={this.handleSubmit}
                        onChange={this.handleDescriptionChange} />
                </td>
                <td className="small">
                    <input type="text"
                        value={this.state.time}
                        className="in-text xsmall"
                        onKeyDown={this.handleSubmit}
                        onChange={this.handleTimeChange} />
                </td>
                <td className="small">
                    <input type="text"
                        value={this.state.overtime}
                        className="in-text xsmall"
                        onKeyDown={this.handleSubmit}
                        onChange={this.handleOvertimeChange} />
                </td>

            </tr>
        )
    }
}
