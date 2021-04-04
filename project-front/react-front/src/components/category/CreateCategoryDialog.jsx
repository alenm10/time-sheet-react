import React, { Component } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import CategoryService from '../../services/CategoryService'
import Swal from "sweetalert2";

export default class CreateCategoryDialog extends Component {

    constructor() {
        super();
        this.state = {
            showHide: false,
            name: '',
            errors: {}
        }

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleModalShowHide(save) {
        if (save) {
            console.log("save = ", this.state)
            if (this.validate()) {
                console.log("validate == true")
                let category = {
                    name: this.state.name,
                };
                console.log(category);  
                CategoryService.createCategory(category)
                    .then(res => {
                        console.log("category added res = ", res.data)
                        this._handleCreate(res.data)
                        this.setState({ showHide: !this.state.showHide })
                        Swal.fire({
                            title: 'Success!',
                            text: 'Category successfully added!',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                    })
                    .catch(error => {
                        console.log("error = ", error)
                        Swal.fire({
                            title: 'Error!',
                            text: 'Category with that name already exist!',
                            icon: 'error',
                            confirmButtonColor: '#DC143C',
                            confirmButtonText: 'OK'
                        });
                    });              
            }
        } else {
            this.setState({ name: '' })
            this.setState({ errors: {} })
            this.setState({ showHide: !this.state.showHide })
        }
    }

    validate() {
        let errors = {};
        let isValid = true;

        if (!this.state.name) {
            isValid = false;
            errors["name"] = "Please enter category name.";
        }
    
        this.setState({
            errors: errors
        });

        return isValid;
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value })
    }
    
    _handleCreate(category){
        this.props._handleCreate(category);
    }

    render() {
        return (
            <div>
                <div className="grey-box-wrap reports">
                    <Button className="link new-member-popup" style={{ float:"left", backgroundColor: "transparent", borderColor: "transparent"}}  
                        onClick={() => this.handleModalShowHide()}>
                        Create new category
                    </Button>
                </div>
                <Modal show={this.state.showHide}>
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                        <Modal.Title>Create new category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Category name</Form.Label>
                                <Form.Control type="text" onChange={this.handleNameChange} />
                                <div className="text-danger">{this.state.errors.name}</div>
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
                            Create category
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
