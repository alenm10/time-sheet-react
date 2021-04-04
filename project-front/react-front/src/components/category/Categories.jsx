import React, { Component } from 'react'
import CategoryCard from './CategoryCard'
import CreateCategoryDialog from './CreateCategoryDialog'
import Pagination from '../Pagination'
import { Accordion, Card, Button } from 'react-bootstrap'
import CategoryService from '../../services/CategoryService'

export default class Categories extends Component {

    constructor(props) {
        super(props)

        this.state = {
            categories: [],
            currentPage: 1,
            last: false
        }
        //this.previousPage = this.previousPage.bind(this);
        //this.nextPage = this.nextPage.bind(this);
    }

    componentDidMount() {
        /*CategoryService.getCategories().then((res) => {
            console.log("res = ", res.data)
            this.setState({ categories: res.data });
        });*/
        this.getCategories(this.state.currentPage)
    }

    getCategories(page) {
        console.log("get for page = ", page)
        CategoryService.getCategoriesByPage(page).then((res) => {
            console.log("res page = ", res)
            this.setState({ categories: res.data.content });
            this.setState({ last: res.data.last });
        });
    }

    previousPage() {
        console.log("previous page")
        let prevPage = this.state.currentPage - 1
        this.setState({ currentPage: prevPage });
        this.getCategories(prevPage)
    }

    nextPage() {
        console.log("next page")
        let nextPage = this.state.currentPage + 1
        this.setState({ currentPage: nextPage });
        this.getCategories(nextPage)
    }

    delete(id) {
        this.setState(prevState => ({
            categories: prevState.categories.filter(el => el.id != id)
        }));
    }

    create(data) {
        let newCategory = {
            id: data.id,
            name: data.name
        }
        this.setState({ categories: [...this.state.categories, newCategory] })
    }

    render() {
        return (
            <div className="wrapper">
                <section className="content">
                    <h2 style={{float:"left"}}><i className="ico clients"></i>Categories</h2>
                    <CreateCategoryDialog
                        _handleCreate={this.create.bind(this)} />
                    <Accordion>
                        {
                            this.state.categories.map(
                                category =>
                                    <CategoryCard
                                        key={category.id}
                                        category={category}
                                        _handleDelete={this.delete.bind(this)} />
                            )
                        }
                    </Accordion>
                    <Pagination 
                        currentPage={this.state.currentPage}
                        last={this.state.last}
                        _handlePreviousPage={this.previousPage.bind(this)}
                        _handleNextPage={this.nextPage.bind(this)}/>
                </section>
            </div>
        )
    }
}
