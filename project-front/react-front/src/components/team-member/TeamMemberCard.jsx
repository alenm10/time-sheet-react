import React, { Component } from 'react'
import { Accordion, Card, Button } from 'react-bootstrap'
import TeamMemberService from '../../services/TeamMembersService'
import Swal from "sweetalert2";

export default class TeamMemberCard extends Component {

    constructor(props) {
        super(props)

        console.log("props = ", props)
        this.state = {
            id: props.teamMember.id,
            status: (props.teamMember.status == "INACTIVE" && "0") || "1",
            role: {
                id: props.teamMember.roles[0].id
            },
            hoursPerWeek: props.teamMember.hoursPerWeek,
            username: props.teamMember.username,
            email: props.teamMember.email,
            name: props.teamMember.name,
        }

        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleHoursPerWeekChange = this.handleHoursPerWeekChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
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

    handleStatusChange(changeEvent) {
        console.log("statushcange = ", changeEvent.target.value)
        this.setState({ status: changeEvent.target.value })
    }

    handleRoleChange(changeEvent) {
        this.setState({
            role: {
                id: changeEvent.target.value
            }
        })
    }

    _handleDelete(id) {
        this.props._handleDelete(id);
    }

    handleSaveChanges() {
        console.log("save")
        console.log("teammember = ", this.state)
        if (!this.validate()) {
            alert("invalid input")
            return
        }
        TeamMemberService.updateTeamMember(this.state.id, this.state)
            .then(res => {
                console.log("Teammember updated res = ", res)
                Swal.fire({
                    title: 'Success!',
                    text: 'Team member successfully changed!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            })
            .catch(error => {
                console.log("error = ", error)
                // return to old data
                this.setState({ name: this.props.teamMember.name })
                this.setState({ email: this.props.teamMember.email })
                this.setState({ username: this.props.teamMember.username })
                this.setState({ hoursPerWeek: this.props.teamMember.hoursPerWeek })
                this.setState({
                    role: {
                        id: this.props.teamMember.roles[0].id
                    }
                })
                this.setState({ status: this.props.teamMember.status })

                Swal.fire({
                    title: 'Error!',
                    text: 'Team member with that name or email already exist!',
                    icon: 'error',
                    confirmButtonColor: '#DC143C',
                    confirmButtonText: 'OK'
                });
            });
    }

    handleDelete() {
        console.log("delete")
        TeamMemberService.deleteTeamMember(this.state.id)
            .then(res => {
                console.log("teammember deleted res = ", res)
                this._handleDelete(this.state.id)
                Swal.fire({
                    title: 'Success!',
                    text: 'Team member successfully deleted!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            })
            .catch(error => {
                console.log("error = ", error)
                //this.setState({ teamMember: this.props.category.clientName })
                Swal.fire({
                    title: 'Error!',
                    text: 'Team member can not be deleted!',
                    icon: 'error',
                    confirmButtonColor: '#DC143C',
                    confirmButtonText: 'OK'
                });
            });
    }

    handleResetPassword() {
        console.log("reset password = ", this.state.id)
        TeamMemberService.resetPassword(this.state.id)
            .then(res => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Password reset successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            });
    }

    validate() {
        let isValid = true;
        if (!this.state.name) {
            isValid = false;
        }
        if (!this.state.username) {
            isValid = false;
        }
        if (!this.state.email) {
            isValid = false;
        }
        if (typeof this.state.email !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.email)) {
                isValid = false;
            }
        }
        if (!this.state.hoursPerWeek || isNaN(this.state.hoursPerWeek)) {
            isValid = false;
        }
        if (!this.state.status) {
            isValid = false;
        }
        if (!this.state.role) {
            isValid = false;
        }

        return isValid;
    }
    render() {
        return (
            <div>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey={this.state.id}>{this.state.name}</Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={this.state.id}>
                        <Card.Body>
                            <div className="details">
                                <ul className="form">
                                    <li>
                                        <label style={{float:"left", paddingLeft:'5px'}}>Name:</label>
                                        <input type="text" className="in-text"
                                            value={this.state.name}
                                            onChange={this.handleNameChange} />
                                    </li>
                                    <li>
                                        <label style={{float:"left", paddingLeft:'5px'}}>Hours per week:</label>
                                        <input type="text" className="in-text"
                                            value={this.state.hoursPerWeek}
                                            onChange={this.handleHoursPerWeekChange} />
                                    </li>
                                </ul>
                                <ul className="form">
                                    <li>
                                        <label style={{float:"left", paddingLeft:'5px'}}>Username:</label>
                                        <input type="text" className="in-text"
                                            value={this.state.username}
                                            onChange={this.handleUsernameChange} />
                                    </li>
                                    <li>
                                        <label style={{float:"left", paddingLeft:'5px'}}>Email:</label>
                                        <input type="text" className="in-text"
                                            value={this.state.email}
                                            onChange={this.handleEmailChange} />
                                    </li>
                                </ul>
                                <ul className="form last">
                                    <li>
                                        <label>Status:</label>
                                        <span className="radio">
                                            <label>Inactive:</label>
                                            <input type="radio" value="0"
                                                onChange={this.handleStatusChange}
                                                checked={this.state.status == "0"} />
                                        </span>
                                        <span className="radio">
                                            <label>Active:</label>
                                            <input type="radio" value="1"
                                                onChange={this.handleStatusChange}
                                                checked={this.state.status == "1"} />
                                        </span>
                                    </li>
                                    <li>
                                        <label>Role:</label>
                                        <span className="radio">
                                            <label>Admin:</label>
                                            <input type="radio" value="1"
                                                onChange={this.handleRoleChange}
                                                checked={this.state.role.id == '1'} />
                                        </span>
                                        <span className="radio">
                                            <label>Worker:</label>
                                            <input type="radio" value="2"
                                                onChange={this.handleRoleChange}
                                                checked={this.state.role.id == '2'} />
                                        </span>
                                    </li>
                                </ul>
                                <div className="buttons" style={{flaot: "right"}}>
                                    <div className="inner">
                                        <Button variant="success" onClick={() =>
                                            this.handleSaveChanges()}>
                                            Save changes
                                        </Button>
                                        <Button variant="danger" onClick={() =>
                                            this.handleDelete()}>
                                            Delete
                                        </Button>
                                        <Button variant="btn orange" onClick={() =>
                                            this.handleResetPassword()}>
                                            Reset Password
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
