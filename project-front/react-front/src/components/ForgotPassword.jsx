import React, { useState } from "react";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
import TeamMemberService from '../services/TeamMembersService'

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        console.log("submit = ", email)
        if (!validate()) {
            alert("invalid email")
            return
        }

        TeamMemberService.forgotPassword(email)
            .then(res => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Email successfully sent!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            })
            .catch(error => {
                console.log("error = ", error)
                Swal.fire({
                    title: 'Error!',
                    text: 'Email does not exist!',
                    icon: 'error',
                    confirmButtonColor: '#DC143C',
                    confirmButtonText: 'OK'
                });
            });
    }

    function validate() {
        if (typeof email !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }

    }

    return (
        <div className="wrapper centered">
            <div className="logo-wrap">
                <a href="index.html" className="inner">
                    <img src="assets/img/logo-large.png" />
                </a>
            </div>
            <div className="centered-content-wrap">
                <div className="centered-block">
                    <h1>reset password</h1>
                    <ul>
                        <li>
                            <input
                                type="text"
                                placeholder="Email"
                                className="in-text large"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </li>
                        <li className="right">
                            <button className="btn orange" type="submit" onClick={handleSubmit} >Reset password</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
