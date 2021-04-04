import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import TeamMemberService from '../services/TeamMembersService'
import jwt from 'jwt-decode'
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [updatePassword, setUpdatePassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [toHome, setToHome] = useState((localStorage.getItem('token')));

  //console.log("login token = " + localStorage.getItem('token'));
  //console.log("login username = " + localStorage.getItem('username'));

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function updateUserPassword() {
    let teamMember = {
      "username": username,
      "password": newPassword,
    }
    console.log("updatepassword = ", teamMember)
    if (username.length == 0 || newPassword.length < 5) {
      Swal.fire({
        title: 'Error!',
        text: 'Password must be more than 5 characters long!',
        icon: 'error',
        confirmButtonColor: '#DC143C',
        confirmButtonText: 'OK'
      });
      return
    }
    TeamMemberService.updatePassword(teamMember)
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

  function handleCheck(event) {
    let newValue = true
    if (remember === "on" || remember === true) {
      newValue = false
    } 
    setRemember(newValue)
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (updatePassword) {
      updateUserPassword()
      return
    }
    let teamMember = {
      "username": username,
      "password": password,
    }
    TeamMemberService.login(teamMember)
      .then((res) => {
        console.log("res = ", res)
        const token = res.data.token;
        const user = jwt(token); // decode your token here
        console.log("user = ", user)
        localStorage.setItem('token', token);
        localStorage.setItem('role', user.role[0].authority);
        localStorage.setItem('username', user.sub);
        localStorage.setItem('id', user.id);
        localStorage.setItem('remember', remember);
        setUpdatePassword(user.updatePassword);
        if (user.updatePassword) {
          Swal.fire({
            title: 'Update password!',
            text: 'You need to update your password!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } else {
          setToHome(true)
        }
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
      <div className="wrapper centered">
        <div className="logo-wrap">
          <a href="index.html" className="inner">
            <img src="assets/img/logo-large.png" />
          </a>
        </div>
        <div className="centered-content-wrap">
          <div className="centered-block">
            <h1 style={{ float: "left" }}><b>Login</b></h1>
            <ul>
              <li>
                <input
                  type="text"
                  placeholder="Username"
                  className="in-text large"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} />
              </li>
              <li>
                <input
                  type="password"
                  placeholder="Password"
                  className="in-pass large"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </li>
              {updatePassword &&
                <input
                  type="password"
                  placeholder="New password"
                  className="in-pass large"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)} />
              }
              <li className="last">
                <div style={{ float: "left" }}>
                  <input
                    type="checkbox"
                    className="in-checkbox"
                    style={{ "marginRight": "10px" }}
                    id="remember"
                    checked={remember}
                    onChange={handleCheck} />
                  <label className="in-label" >Remember me</label>
                </div>
                <span className="right">
                  <a className="link" href="/forgot-password">Forgot password?</a>
                  <button className="btn orange" type="submit" onClick={handleSubmit} disabled={!validateForm()}>Login</button>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
