import React, { Component } from 'react'
import { Accordion, Card, Button } from 'react-bootstrap'
import CategoryService from '../../services/CategoryService'
import Swal from "sweetalert2";

export default class CategoryCard extends Component {

    constructor(props) {
        super(props)

        console.log("props = ", props)
        this.state = {
            id: props.category.id,
            name: props.category.name,
        }
        this.handleNameChange = this.handleNameChange.bind(this);

    }

    handleNameChange(event) {
        this.setState({ name: event.target.value })
    }

    _handleDelete(id){
        this.props._handleDelete(id);
    }

    validate() {
        let isValid = true;

        if (!this.state.name) {
            isValid = false;
        }
    
        return isValid;
    }

    handleSaveChanges() {
        console.log("save")
        console.log("category = ", this.state)
        if(!this.validate()){
            alert("invalid input")
            return
        }
        CategoryService.updateCategory(this.state.id, this.state)
        .then(res => {
            console.log("category updated res = ", res)
            Swal.fire({
                title: 'Success!',
                text: 'Category successfully changed!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        })
        .catch(error => {
            console.log("error = ", error)
            // return to old name
            this.setState({ name: this.props.category.name })
            Swal.fire({
                title: 'Error!',
                text: 'Category with that name already exist!',
                icon: 'error',
                confirmButtonColor: '#DC143C',
                confirmButtonText: 'OK'
            });
        });
    }

    handleDelete() {
        console.log("delete")
        CategoryService.deleteCategory(this.state.id)
        .then(res => {
            console.log("category deleted res = ", res)
            this._handleDelete(this.state.id)
            Swal.fire({
                title: 'Success!',
                text: 'Category successfully deleted!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        })
        .catch(error => {
            console.log("error = ", error)
            this.setState({ name: this.props.category.name })
            Swal.fire({
                title: 'Error!',
                text: 'Category can not be deleted!',
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
                        <Accordion.Toggle as={Button} variant="link" eventKey={this.state.id}>{this.state.name}</Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={this.state.id}>
                        <Card.Body>
                            <div className="details">
                                <ul className="form">
                                    <li>
                                        <label style={{float:"left", paddingLeft:'9px'}}>Category name:</label>
                                        <input type="text" className="in-text"
                                            value={this.state.name}
                                            onChange={this.handleNameChange} />
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
            </div>
        )
    }
}
