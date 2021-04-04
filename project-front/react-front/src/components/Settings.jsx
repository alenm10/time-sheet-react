import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import TeamMemberService from '../services/TeamMembersService'
import jwt from 'jwt-decode'
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

export default function Settings() {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [hoursPerWeek, setHoursPerWeek] = useState("");
    const [hoursPerWeekError, setHoursPerWeekError] = useState("");
    const [status, setStatus] = useState("");
    const [statusError, setStatusError] = useState("");
    
    const [toHome, setToHome] = useState(false);

    useEffect(() => {
        console.log("component did mount")
        TeamMemberService.getLoggedUser()
            .then((res) => {
                console.log("res = ", res)
                setName(res.data.name)
                setEmail(res.data.email)
                setUsername(res.data.username)
                setHoursPerWeek(res.data.hoursPerWeek)
                setStatus((res.data.status == "INACTIVE" && "0") || "1")
            })
            .catch(error => {
                console.log("error = ", error)
                Swal.fire({
                    title: 'Error!',
                    text: 'You have to log in first!',
                    icon: 'error',
                    confirmButtonColor: '#DC143C',
                    confirmButtonText: 'OK'
                });
            });
    }, []);

    /*function validateForm() {
        return username.length > 0 && name.length > 0 && email.length > 0 && !isNaN(hoursPerWeek);
    }*/

    function validate() {
        let errors = {};
        let isValid = true;
        if (!name) {
            isValid = false;
            setNameError("Please enter name.");
        } else{
            setNameError("");    
        }
        if (!username) {
            isValid = false;
            setUsernameError("Please enter username.");
        } else {
            setUsernameError("");    
        }

        if (!email) {
            isValid = false;
            setEmailError("Please enter email.");
        } else {
            setEmailError("");
        }
        if (typeof email !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                isValid = false;
                setEmailError("Please enter valid email address.");
            } else {
                setEmailError("");
            }
        }
        if (!hoursPerWeek || isNaN(hoursPerWeek)) {
            isValid = false;
            setHoursPerWeekError("Please enter valid hours per week.");
        } else {
            setHoursPerWeekError("");
        }
        if (!status) {
            isValid = false;
            setStatusError("Please select status.");
        } else {
            setStatusError("");
        }
        
        return isValid;
    }
    function handleSubmit(event) {
        event.preventDefault();

        let teamMember = {
            "name": name,
            "email": email,
            "username": username,
            "hoursPerWeek": hoursPerWeek,
            "status": status
        }
        console.log(teamMember)
        if (validate()) {
            console.log("valid form")
        }
        TeamMemberService.updateProfile(teamMember)
            .then((res) => {
                console.log("res updated = ", res.data)
                setToHome(true)
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
    }

    return (
        <>
            {toHome ? <Redirect to="/home" /> : null}
            <div className="wrapper centered">
                <div className="centered-content-wrap">
                    <div className="centered-block">
                        <h1>Profile settings</h1>

                        <Form>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                                <div className="text-danger">{nameError}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Hours per week</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={hoursPerWeek}
                                    onChange={(e) => setHoursPerWeek(e.target.value)} />
                                <div className="text-danger">{hoursPerWeekError}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} />
                                <div className="text-danger">{usernameError}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                                <div className="text-danger">{emailError}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Label>Status</Form.Label>
                                <Form.Check style={{marginLeft:"10px"}} inline label="Inactive" value="0" onChange={(e) => setStatus(e.target.value)} checked={status === '0'} />
                                <Form.Check inline label="Active" value="1" onChange={(e) => setStatus(e.target.value)} checked={status === '1'} />
                                <div className="text-danger">{statusError}</div>
                            </Form.Group>
                        </Form>
                    <ul>
                        <li className="last">
                            <span className="right">
                                <button className="btn orange" type="submit" onClick={handleSubmit} >Update profile</button>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
}
