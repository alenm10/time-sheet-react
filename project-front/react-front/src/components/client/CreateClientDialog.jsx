import React, { Component } from 'react'

import { Button, Modal, Form } from 'react-bootstrap'
import ClientService from '../../services/ClientService'
import Swal from "sweetalert2";

const country_list = ["United Kingdom", "France", "Germany", "Greece",
    "Hungary", "Italy", "Monaco", "Montenegro",
    "Netherlands", "Poland", "Portugal", "Romania", "Serbia",
    "Slovenia", "Spain", "Ukraine", "Denmark", "Estonia",
    "Finland", "Ireland", "Norway", "Sweden", "Switzerland", "Turkey"]
export default class CreateClientDialog extends Component {

    constructor() {
        super();
        this.state = {
            showHide: false,
            clientName: '',
            address: '',
            city: '',
            country: '',
            postalCode: '',
            errors: {}
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handlePostalCodeChange = this.handlePostalCodeChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleModalShowHide(save) {
        if (save) {
            console.log("save = ", this.state)
            if (this.validate()) {
                console.log("validate == true")
                let client = {
                    clientName: this.state.clientName,
                    address: this.state.address,
                    postalCode: this.state.postalCode,
                    city: this.state.city,
                    country: this.state.country,
                };
                console.log(client);
                ClientService.createClient(client)
                    .then(res => {
                        console.log("client added res = ", res)
                        this._handleCreate(res.data)
                        this.setState({ showHide: !this.state.showHide })
                        Swal.fire({
                            title: 'Success!',
                            text: 'Client successfully added!',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                    })
                    .catch(error => {
                        console.log("error = ", error)
                        Swal.fire({
                            title: 'Error!',
                            text: 'Client with that name already exist!',
                            icon: 'error',
                            confirmButtonColor: '#DC143C',
                            confirmButtonText: 'OK'
                        });
                    });
            }
        } else {
            this.setState({ clientName: '' })
            this.setState({ address: '' })
            this.setState({ postalCode: '' })
            this.setState({ country: '' })
            this.setState({ city: '' })
            this.setState({ errors: {} })
            this.setState({ showHide: !this.state.showHide })
        }
    }

    validate() {
        let errors = {};
        let isValid = true;

        if (!this.state.clientName) {
            isValid = false;
            errors["clientName"] = "Please enter client name.";
        }

        if (!this.state.address) {
            isValid = false;
            errors["address"] = "Please enter address.";
        }

        if (!this.state.postalCode) {
            isValid = false;
            errors["postalCode"] = "Please enter postal code.";
        }

        if (!this.state.city) {
            isValid = false;
            errors["city"] = "Please enter city.";
        }

        if (!this.state.country || this.state.country === "0") {
            isValid = false;
            errors["country"] = "Please select country.";
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    handleSearchChange(event) {
        let clientName = event.target.value
        if (event.key === "Enter") {
            console.log("do validate = ", clientName)
            this.props._handleSearch(clientName)
        }
    }

    handleNameChange(event) {
        this.setState({ clientName: event.target.value })
    }

    handleCityChange(event) {
        this.setState({ city: event.target.value })
    }

    handlePostalCodeChange(event) {
        this.setState({ postalCode: event.target.value })
    }

    handleAddressChange(event) {
        this.setState({ address: event.target.value })
    }

    handleCountryChange(event) {
        this.setState({ country: event.target.value })
    }

    _handleCreate(client) {
        this.props._handleCreate(client);
    }

    render() {
        return (
            <div>
                <div className="grey-box-wrap reports">
                    <Button className="link new-member-popup" style={{ float:"left", backgroundColor: "transparent", borderColor: "transparent"}}  
                        onClick={() => this.handleModalShowHide()}>
                        Create new client
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
                        <Modal.Title>Create new client</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Client name</Form.Label>
                                <Form.Control type="text" onChange={this.handleNameChange} />
                                <div className="text-danger">{this.state.errors.clientName}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" onChange={this.handleAddressChange} />
                                <div className="text-danger">{this.state.errors.address}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" onChange={this.handleCityChange} />
                                <div className="text-danger">{this.state.errors.city}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Postal code</Form.Label>
                                <Form.Control type="text" onChange={this.handlePostalCodeChange} />
                                <div className="text-danger">{this.state.errors.postalCode}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicSelect">
                                <Form.Label>Country</Form.Label>
                                <Form.Control as="select" onChange={this.handleCountryChange}>
                                    <option value="0">Select country</option>
                                    {
                                        country_list.map(
                                            country =>
                                                <option key={country} value={country}>{country}</option>
                                        )
                                    }
                                </Form.Control>
                                <div className="text-danger">{this.state.errors.country}</div>
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
                            Create client
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
