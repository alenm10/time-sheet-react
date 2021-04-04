import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import TeamMemberService from '../services/TeamMembersService'
import jwt from 'jwt-decode'
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

export default function ChangePassword() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [toHome, setToHome] = useState(false);

    function validateForm() {
        return username.length > 0 && password.length > 0 && newPassword.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (localStorage.getItem('username') != username) {
            alert("wrong username")
            return
        }

        let teamMember = {
            "username": username,
            "oldPassword": password,
            "newPassword": newPassword
        }
        console.log(teamMember)
        TeamMemberService.changePassword(teamMember)
            .then((res) => {
                console.log("res = ", res)
                setToHome(true)
            })
            .catch(error => {
                console.log("error = ", error)
                Swal.fire({
                    title: 'Error!',
                    text: 'Wrong username or password!',
                    icon: 'error',
                    confirmButtonColor: '#DC143C',
                    confirmButtonText: 'OK'
                });
            });
    }

    return (
        <>
            {toHome ? <Redirect to="/home" /> : null}
            <div class="wrapper centered">
                <div class="centered-content-wrap">
                    <div class="centered-block">
                        <h1>Change password</h1>
                        <ul>
                            <li>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    class="in-text large"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} />
                            </li>
                            <li>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    class="in-pass large"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </li>
                            <li>
                                <input
                                    type="password"
                                    placeholder="New password"
                                    class="in-pass large"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)} />
                            </li>
                            <li class="last">
                                <span class="right">
                                    <button class="btn orange" type="submit" onClick={handleSubmit} disabled={!validateForm()}>Change password</button>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>

    );
}
