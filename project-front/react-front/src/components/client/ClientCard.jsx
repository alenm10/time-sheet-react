import React, { Component } from 'react'
import { Accordion, Card, Button } from 'react-bootstrap'
import ClientService from '../../services/ClientService'
import Swal from "sweetalert2";

const country_list = ["United Kingdom","France","Germany","Greece",
                    "Hungary","Italy","Monaco","Montenegro",
                    "Netherlands","Poland","Portugal","Romania","Serbia",
                    "Slovenia","Spain","Ukraine","Denmark","Estonia",
                    "Finland","Ireland","Norway","Sweden","Switzerland", "Turkey"]

export default class ClientCard extends Component {
    constructor(props) {
        super(props)

        console.log("props = ", props)
        this.state = {
            id: props.client.id,
            clientName: props.client.clientName,
            postalCode: props.client.postalCode,
            address: props.client.address,
            country: props.client.country,
            city: props.client.city,
        }
        this.handleClientNameChange = this.handleClientNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handlePostalCodeChange = this.handlePostalCodeChange.bind(this);
    }

    _handleDelete(id){
        this.props._handleDelete(id);
    }

    handleClientNameChange(event) {
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

    validate() {
        let isValid = true;

        if (!this.state.clientName) {
            isValid = false;
        }

        if (!this.state.address) {
            isValid = false;
        }

        if (!this.state.postalCode) {
            isValid = false;
        }

        if (!this.state.city) {
            isValid = false;
        }

        if (!this.state.country || this.state.country === "0") {
            isValid = false;
        }

        return isValid;
    }

    handleSaveChanges() {
        console.log("save")
        console.log("client = ", this.state)
        if(!this.validate()){
            alert("indalid inpt data")
            return
        }
        ClientService.updateClient(this.state.id, this.state)
        .then(res => {
            console.log("Client updated res = ", res)
            Swal.fire({
                title: 'Success!',
                text: 'Client successfully changed!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        })
        .catch(error => {
            console.log("error = ", error)
            // return to old data
            this.setState({ clientName: this.props.client.clientName })
            this.setState({ address: this.props.client.address })
            this.setState({ postalCode: this.props.client.postalCode })
            this.setState({ city: this.props.client.city })
            this.setState({ country: this.props.client.country })
            
            Swal.fire({
                title: 'Error!',
                text: 'Client with that name already exist!',
                icon: 'error',
                confirmButtonColor: '#DC143C',
                confirmButtonText: 'OK'
            });
        });
    }

    handleDelete() {
        console.log("delete")
        ClientService.deleteClient(this.state.id)
        .then(res => {
            console.log("client deleted res = ", res)
            this._handleDelete(this.state.id)
            Swal.fire({
                title: 'Success!',
                text: 'Client successfully deleted!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        })
        .catch(error => {
            console.log("error = ", error)
            this.setState({ clientName: this.props.category.clientName })
            Swal.fire({
                title: 'Error!',
                text: 'Client can not be deleted!',
                icon: 'error',
                confirmButtonColor: '#DC143C',
                confirmButtonText: 'OK'
            });
        });
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey={this.state.id}>{this.state.clientName}</Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={this.state.id}>
                        <Card.Body>
                            <div className="details">
                                <ul className="form">
                                    <li>
                                        <label style={{float:"left", paddingLeft:'9px'}}>Client client name:</label>
                                        <input type="text" className="in-text"
                                            value={this.state.clientName}
                                            onChange={this.handleClientNameChange} />
                                    </li>
                                    <li>
                                        <label style={{float:"left", paddingLeft:'9px'}}>Zip/Postal code:</label>
                                        <input type="text" className="in-text" 
                                            value={this.state.postalCode}
                                            onChange={this.handlePostalCodeChange}/>
                                    </li>
                                </ul>
                                <ul className="form">
                                    <li>
                                        <label style={{float:"left", paddingLeft:'9px'}}>Address:</label>
                                        <input type="text" className="in-text" 
                                            value={this.state.address}
                                            onChange={this.handleAddressChange}/>
                                    </li>
                                    <li>
                                        <label style={{float:"left", paddingLeft:'5px'}}>Country:</label>
                                        <select value={this.state.country} onChange={this.handleCountryChange}>
                                            {
                                                country_list.map(
                                                    country => {
                                                        return <option key={country} value={country}>{country}</option>
                                                    }
                                                )
                                            }
                                        </select>
                                    </li>
                                </ul>
                                <ul className="form last">
                                    <li>
                                        <label style={{float:"left", paddingLeft:'10px'}}>City:</label>
                                        <input type="text" className="in-text" 
                                            value={this.state.city}
                                            onChange={this.handleCityChange}/>
                                    </li>
                                </ul>
                                <div className="buttons">
                                    <div className="inner">
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
            </div >
        )
    }
}
