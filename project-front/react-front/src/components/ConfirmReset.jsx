import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import TeamMemberService from '../services/TeamMembersService'
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

export default function ConfirmReset() {
    const params = useParams();
    //console.log(params);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState(params.token);
    const [toLogin, setToLogin] = useState(false);

    function validateForm() {
        return password.length > 5 && confirmPassword.length > 5 && password == confirmPassword;
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(password, " ", confirmPassword, " ", token)
        //setToLogin(true)
        let resetObj = {
            'token': token,
            'password': password
        }
        TeamMemberService.resetForgotPassword(resetObj)
            .then((res) => {
                console.log("res = ", res)
                Swal.fire({
                    title: 'Success!',
                    text: 'Password successfully reset!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                setToLogin(true)
            })
            .catch(error => {
                console.log("error = ", error)
                Swal.fire({
                    title: 'Error!',
                    text: 'Error!',
                    icon: 'error',
                    confirmButtonColor: '#DC143C',
                    confirmButtonText: 'OK'
                });
            });
    }


    return (
        <>
            {toLogin ? <Redirect to="/" /> : null}
            <div class="wrapper centered">
                <div class="centered-content-wrap">
                    <div class="centered-block">
                        <h1>Confirm password reset</h1>
                        <ul>
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
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} />
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
