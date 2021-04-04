import React, { Component } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import Swal from "sweetalert2";
import ClientService from '../../services/ClientService';
import ProjectService from '../../services/ProjectService';
import TeamMembersService from '../../services/TeamMembersService';

export default class CreateProjectDialog extends Component {

    constructor() {
        super();
        this.state = {
            showHide: false,
            projectName: '',
            description: '',
            projectLead: '',
            client: '',
            errors: {},

            clientsSelect: [],
            teamMembersSelect: []
        }

        this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleProjectLeadChange = this.handleProjectLeadChange.bind(this);
        this.handleClientChange = this.handleClientChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount() {
        ClientService.getClients().then((res) => {
            console.log("clients = ", res.data)
            this.setState({ clientsSelect: res.data })

        });
        TeamMembersService.getAvailableTeamMembers().then((res) => {
            console.log("teammembers = ", res.data)
            this.setState({ teamMembersSelect: res.data })
        });
    }

    _handleCreate(project){
        this.props._handleCreate(project);
    }

    handleModalShowHide(save) {
        console.log("save or not = ", save)
        if (save) {
            console.log("save = ", this.state)
            if (this.validate()) {
                let project = {
                    projectName: this.state.projectName,
                    description: this.state.description,
                    projectLead: {
                        "id": this.state.projectLead
                    },
                    client: {
                        "id": this.state.client
                    },
                };
                console.log(project)
                ProjectService.createProject(project)
                .then(res =>{
                    console.log("project added res = ", res)
                    this._handleCreate(res.data)
                    this.setState({ showHide: !this.state.showHide })
                    Swal.fire({
                        title: 'Success!',
                        text: 'Project successfully added!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                      });
                })
                .catch(error => { 
                    console.log("error = ", error)
                    Swal.fire({
                        title: 'Error!',
                        text: 'Project name exist!',
                        icon: 'error',
                        confirmButtonColor: '#DC143C',
                        confirmButtonText: 'OK'
                      });
                });
            }
        } else {
            this.setState({ projectName: '' })
            this.setState({ description: '' })
            this.setState({ projectLead: '' })
            this.setState({ client: '' })
            this.setState({ errors: {} })
            this.setState({ showHide: !this.state.showHide })
        }
    }

    validate() {
        let errors = {};
        let isValid = true;

        if (!this.state.projectName) {
            isValid = false;
            errors["projectName"] = "Please enter project name.";
        }

        if (!this.state.description) {
            isValid = false;
            errors["description"] = "Please enter description.";
        }

        if (!this.state.projectLead || this.state.projectLead == "0") {
            isValid = false;
            errors["projectLead"] = "Please select projet lead.";
        }

        if (!this.state.client || this.state.client == "0") {
            isValid = false;
            errors["client"] = "Please select client.";
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    handleSearchChange(event) {
        let projectName = event.target.value
        if (event.key === "Enter") {
            console.log("do validate = ", projectName)
            this.props._handleSearch(projectName)
        }
    }

    handleProjectNameChange(event) {
        this.setState({ projectName: event.target.value })
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value })
    }

    handleProjectLeadChange(event) {
        this.setState({ projectLead: event.target.value })
    }

    handleClientChange(event) {
        this.setState({ client: event.target.value })
    }

    render() {
        return (
            <div>
                <div className="grey-box-wrap reports ico-member">
                    <Button className="link new-member-popup test" style={{ float:"left", backgroundColor: "transparent", borderColor: "transparent"}}
                        onClick={() => this.handleModalShowHide()}>
                        Create new project
                    </Button>
                    <div className="search-page">
                        <input
                            type="search"
                            name="search-clients"
                            className="in-search"
                            onKeyDown={this.handleSearchChange} />
                    </div>
                </div>
                <Modal show={this.state.showHide}>
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                        <Modal.Title>Create new project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Project name</Form.Label>
                                <Form.Control type="text" onChange={this.handleProjectNameChange} />
                                <div className="text-danger">{this.state.errors.projectName}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" onChange={this.handleDescriptionChange} />
                                <div className="text-danger">{this.state.errors.description}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicSelect">
                                <Form.Label>Project lead</Form.Label>
                                <Form.Control as="select" onChange={this.handleProjectLeadChange} >
                                    <option value="0">Select project lead</option>
                                    {
                                        this.state.teamMembersSelect.map(
                                            teamMember =>
                                                <option key={teamMember.id} value={teamMember.id}>
                                                    {teamMember.name}
                                                </option>
                                        )
                                    }
                                </Form.Control>
                                <div className="text-danger">{this.state.errors.projectLead}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicSelect">
                                <Form.Label>Client</Form.Label>
                                <Form.Control as="select" onChange={this.handleClientChange} >
                                    <option value="0">Select client</option>
                                    {
                                        this.state.clientsSelect.map(
                                            client =>
                                                <option key={client.id} value={client.id}>
                                                    {client.clientName}
                                                </option>
                                        )
                                    }

                                </Form.Control>
                                <div className="text-danger">{this.state.errors.client}</div>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() =>
                            this.handleModalShowHide(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() =>
                            this.handleModalShowHide(true)}>
                            Create project
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
