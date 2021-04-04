import React, { Component } from 'react'

import { Button, Modal, Form } from 'react-bootstrap'
import TeamMemberService from '../../services/TeamMembersService'
import Swal from "sweetalert2";

export default class CreateTeamMemberDialog extends Component {

    constructor() {
        super();
        this.state = {
            showHide: false,
            selectedStatusOption: '',
            selectedRoleOption: '',
            hoursPerWeek: '',
            username: '',
            email: '',
            name: '',
            errors: {}
        }

        this.handleStatusOptionChange = this.handleStatusOptionChange.bind(this);
        this.handleRoleOptionChange = this.handleRoleOptionChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleHoursPerWeekChange = this.handleHoursPerWeekChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleModalShowHide(save) {
        console.log("save or not = ", save)
        if (save) {
            console.log("save = ", this.state)
            if (this.validate()) {
                console.log("validate == true")
                let teamMember = {
                    name: this.state.name,
                    username: this.state.username,
                    email: this.state.email,
                    hoursPerWeek: this.state.hoursPerWeek,
                    status: this.state.selectedStatusOption,
                    role: {
                        id: this.state.selectedRoleOption
                    }
                };
                console.log(teamMember);
                TeamMemberService.createTeamMember(teamMember)
                .then(res =>{
                    console.log("teammmeber added res = ", res)
                    this._handleCreate(res.data)
                    this.setState({ showHide: !this.state.showHide })
                    Swal.fire({
                        title: 'Success!',
                        text: 'Team member successfully added!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                      });
                })
                .catch(error => { 
                    console.log("error = ", error)
                    Swal.fire({
                        title: 'Error!',
                        text: 'Username or email already exist!',
                        icon: 'error',
                        confirmButtonColor: '#DC143C',
                        confirmButtonText: 'OK'
                      });
                });
            }else{
                console.log("validate == false")
            }
        }else{
            this.setState({ showHide: !this.state.showHide })
        }
    }

    validate() {
        let errors = {};
        let isValid = true;
        if (!this.state.name) {
            isValid = false;
            errors["name"] = "Please enter name.";
        }
        if (!this.state.username) {
            isValid = false;
            errors["username"] = "Please enter username.";
        }
        if (!this.state.email) {
            isValid = false;
            errors["email"] = "Please enter email.";
        }
        if (typeof this.state.email !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.email)) {
                isValid = false;
                errors["email"] = "Please enter valid email address.";
            }
        }
        if (!this.state.hoursPerWeek || isNaN(this.state.hoursPerWeek)) {
            isValid = false;
            errors["hoursPerWeek"] = "Please enter valid hours per week.";
        }
        if (!this.state.selectedStatusOption) {
            isValid = false;
            errors["selectedStatusOption"] = "Please select status.";
        }
        if (!this.state.selectedRoleOption) {
            isValid = false;
            errors["selectedRoleOption"] = "Please select role.";
        }
        
        this.setState({
            errors: errors
        });

        return isValid;
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value })
    }
    handleUsernameChange(event) {
        this.setState({ username: event.target.value })
    }
    handleEmailChange(event) {
        this.setState({ email: event.target.value })
    }
    handleHoursPerWeekChange(event) {
        this.setState({ hoursPerWeek: event.target.value })
    }

    handleStatusOptionChange(changeEvent) {
        this.setState({
            selectedStatusOption: changeEvent.target.value
        })
    }

    handleRoleOptionChange(changeEvent) {
        this.setState({
            selectedRoleOption: changeEvent.target.value
        })
    }

    _handleCreate(teamMember){
        this.props._handleCreate(teamMember);
    }

    render() {
        return (
            <div>
                <div className="grey-box-wrap reports ico-member">
                    <Button className="link new-member-popup test" style={{ float:"left", backgroundColor: "transparent", borderColor: "transparent"}}  
                        onClick={() => this.handleModalShowHide()}>
                        Create new member
                </Button>
                </div>
                <Modal show={this.state.showHide}>
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                        <Modal.Title>Create new member</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" onChange={this.handleNameChange} />
                                <div className="text-danger">{this.state.errors.name}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Hours per week</Form.Label>
                                <Form.Control type="text" onChange={this.handleHoursPerWeekChange} />
                                <div className="text-danger">{this.state.errors.hoursPerWeek}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" onChange={this.handleUsernameChange} />
                                <div className="text-danger">{this.state.errors.username}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" onChange={this.handleEmailChange} />
                                <div className="text-danger">{this.state.errors.email}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Label>Status</Form.Label>
                                <Form.Check inline label="Inactive" value="0" onChange={this.handleStatusOptionChange} checked={this.state.selectedStatusOption === '0'} />
                                <Form.Check inline label="Active" value="1" onChange={this.handleStatusOptionChange} checked={this.state.selectedStatusOption === '1'} />
                                <div className="text-danger">{this.state.errors.selectedStatusOption}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Label>Role</Form.Label>
                                <Form.Check inline label="Admin" value="1" onChange={this.handleRoleOptionChange} checked={this.state.selectedRoleOption === '1'} />
                                <Form.Check inline label="Worker" value="2" onChange={this.handleRoleOptionChange} checked={this.state.selectedRoleOption === '2'} />
                                <div className="text-danger">{this.state.errors.selectedRoleOption}</div>
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
                            Create team member
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
