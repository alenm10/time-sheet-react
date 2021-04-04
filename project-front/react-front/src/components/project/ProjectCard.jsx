import React, { Component } from 'react'
import { Accordion, Card, Button } from 'react-bootstrap'
import ProjectService from '../../services/ProjectService'
import ClientService from '../../services/ClientService';
import TeamMembersService from '../../services/TeamMembersService';
import Swal from "sweetalert2";

export default class ProjectCard extends Component {

    constructor(props) {
        super(props);
        console.log("props in project card = ", props)

        this.state = {
            id: props.project.id,
            projectName: props.project.projectName,
            description: props.project.description,
            projectLead: {
                id: props.project.projectLead.id,
                name: props.project.projectLead.name
            },
            client: {
                id: props.project.client.id,
                name: props.project.client.clientName
            },
            archive: props.project.archive,
            status: (props.project.status == "ACTIVE") ? 0 : 1,

            clientsSelect: [],
            teamMembersSelect: []
        }

        this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleProjectLeadChange = this.handleProjectLeadChange.bind(this);
        this.handleClientChange = this.handleClientChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleArchiveChange = this.handleArchiveChange.bind(this);
    }

    componentDidMount() {
        ClientService.getClients().then((res) => {
            //console.log("clients = ", res.data)
            this.setState({ clientsSelect: res.data })

        });
        TeamMembersService.getAvailableTeamMembers().then((res) => {
            //console.log("teammembers = ", res.data)
            this.setState({ teamMembersSelect: res.data })
        });
    }

    _handleDelete(id) {
        this.props._handleDelete(id);
    }

    handleSaveChanges() {
        console.log("save changes state = ", this.state);
        if (this.validate()) {
            let project = {
                id: this.state.id,
                projectName: this.state.projectName,
                description: this.state.description,
                projectLead: {
                    "id": this.state.projectLead.id
                },
                client: {
                    "id": this.state.client.id
                },
                archive: this.state.archive,
                status: this.state.status
            };
    
            ProjectService.updateProject(this.state.id, project)
            .then(res => {
                console.log("Project updated res = ", res)
                Swal.fire({
                    title: 'Success!',
                    text: 'Project successfully changed!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            })
            .catch(error => {
                console.log("error = ", error)
                // return to old data
                this.setState({ projectName: this.props.project.projectName })
                this.setState({ description: this.props.project.description })
                this.setState({ projectLead: {
                    id: this.props.project.projectLead.id,
                    name: this.props.project.projectLead.name
                } })
                this.setState({ client: {
                    id: this.props.project.client.id,
                    name: this.props.project.client.clientName
                } })
                this.setState({ archive: this.props.project.archive })            
                this.setState({ status: this.props.project.status })
    
                Swal.fire({
                    title: 'Error!',
                    text: 'Project with that name already exist!',
                    icon: 'error',
                    confirmButtonColor: '#DC143C',
                    confirmButtonText: 'OK'
                });
            });
        }else{
			alert("invalid input data")
		}
        
    }

    validate() {
        let isValid = true;

        if (!this.state.projectName) {
            isValid = false;
        }

        if (!this.state.description) {
            isValid = false;
        }

        return isValid;
    }

    handleDelete() {
        console.log("delete")
        ProjectService.deleteProject(this.state.id)
        .then(res => {
            console.log("project deleted res = ", res)
            this._handleDelete(this.state.id)
            Swal.fire({
                title: 'Success!',
                text: 'Project successfully deleted!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        })
        .catch(error => {
            console.log("error = ", error)
            Swal.fire({
                title: 'Error!',
                text: 'Project can not be deleted!',
                icon: 'error',
                confirmButtonColor: '#DC143C',
                confirmButtonText: 'OK'
            });
        });
    }

    handleProjectNameChange(event) {
        this.setState({ projectName: event.target.value })
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value })
    }

    handleProjectLeadChange(event) {
        this.setState({projectLead: JSON.parse(event.target.value)})
    }

    handleClientChange(event) {
        this.setState({ client: JSON.parse(event.target.value) })
    }

    handleStatusChange(event) {
        this.setState({ status: event.target.value })
    }

    handleArchiveChange(event) {
        if (event.target.checked && !this.state.archive) {
            this.setState({ archive: true })
        } else if (event.target.checked && this.state.archive) {
            this.setState({ archive: false })
        }
    }
        render() {
            return (
                <div>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey={this.state.id}>{this.state.projectName}</Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={this.state.id}>
                            <Card.Body>
                                <div class="details">
                                    <ul class="form">
                                        <li>
                                            <label style={{float:"left", paddingLeft:'9px'}}>Project name:</label>
                                            <input type="text" className="in-text"
                                                value={this.state.projectName}
                                                onChange={this.handleProjectNameChange} />
                                        </li>
                                        <li>
                                            <label style={{float:"left", paddingLeft:'9px'}}>Lead:</label>
                                            <select
                                                onChange={this.handleProjectLeadChange}>
                                                <option value={JSON.stringify(this.state.projectLead)}>
                                                    {this.state.projectLead.name}
                                                </option>
                                                {
                                                    this.state.teamMembersSelect.map(
                                                        teamMember =>
                                                            <option value={JSON.stringify(teamMember)}>
                                                                {teamMember.name}
                                                            </option>

                                                    )
                                                }
                                            </select>
                                        </li>
                                    </ul>
                                    <ul class="form">
                                        <li>
                                            <label style={{float:"left", paddingLeft:'9px'}}>Description:</label>
                                            <input type="text" class="in-text"
                                                value={this.state.description}
                                                onChange={this.handleDescriptionChange} />
                                        </li>

                                    </ul>
                                    <ul class="form last">
                                        <li>
                                            <label style={{float:"left", paddingLeft:'9px'}}>Customer:</label>
                                            <select
                                                onChange={this.handleClientChange}>
                                                {
                                                    this.state.clientsSelect.map(
                                                        client => {
                                                            if (this.state.client.id == client.id) {
                                                                return <option value={JSON.stringify(client)} selected>
                                                                    {client.clientName}
                                                                </option>
                                                            } else {
                                                                return <option value={JSON.stringify(client)}>
                                                                    {client.clientName}
                                                                </option>
                                                            }
                                                        }

                                                    )
                                                }
                                            </select>
                                        </li>
                                        <li class="inline">
                                            <label>Status:</label>
                                            <span class="radio" style={{marginLeft:"10px"}}>
                                                <label for="inactive">Active:</label>
                                                <input type="radio" value="0"
                                                    onChange={this.handleStatusChange}
                                                    checked={this.state.status == 0} />

                                            </span>
                                            <span class="radio">
                                                <label for="active">Inactive:</label>
                                                <input type="radio" value="1"
                                                    onChange={this.handleStatusChange}
                                                    checked={this.state.status == 1} />
                                            </span>
                                            <span class="radio">
                                                <label for="active">Archive:</label>
                                                <input className="form-check-input" type="radio" 
                                                    onChange={this.handleArchiveChange}
                                                    checked={this.state.archive} />
                                            </span>
                                        </li>
                                    </ul>
                                    <div class="buttons" style={{float:"right", marginBottom:"10px"}}>
                                        <div class="inner">
                                            <Button variant="success" onClick={() =>
                                                this.handleSaveChanges()}>
                                                Save changes
                                            </Button>
                                            <Button variant="danger" onClick={() =>
                                                this.handleDelete()}>
                                                Delete
                                        </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </div>
            )
        }
    }
