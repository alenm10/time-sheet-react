import React, { Component } from 'react'
import ClientCard from './ClientCard'
import CreateClientDialog from './CreateClientDialog'
import Pagination from '../Pagination'
import LettersFilter from '../LettersFilter'
import { Accordion, Card, Button } from 'react-bootstrap'
import ClientService from '../../services/ClientService'
import JSOG from 'jsog'

export default class Clients extends Component {

    constructor(props) {
        super(props)

        this.state = {
            clients: [],
            currentPage: 1,
            last: false,
            searchActive: false,
            searchTerm: '',
            filterActive: false,
            filterLetter: ''
        }
    }

    componentDidMount() {
        this.getClients(this.state.currentPage)
    }

    getClients(page) {
        ClientService.getClientsByPage(page).then((res) => {
            console.log("res = ", JSOG.decode(res.data))
            this.setState({ clients: JSOG.decode(res.data.content) });
            this.setState({ last: res.data.last });
        });
    }

    previousPage() {
        console.log("previous page")
        let prevPage = this.state.currentPage - 1
        this.setState({ currentPage: prevPage }, ()=>{
            if(this.state.searchActive){
                this.search(this.state.searchTerm)
            } else if(this.state.filterActive){
                this.filter(this.state.filterLetter)
            } else {
                this.getClients(prevPage)
            }    
        });
    }

    nextPage() {
        console.log("next page")
        let nextPage = this.state.currentPage + 1
        this.setState({ currentPage: nextPage }, ()=> {
            if(this.state.searchActive){
                this.search(this.state.searchTerm)
            } else if(this.state.filterActive){
                this.filter(this.state.filterLetter)
            } else {
                this.getClients(nextPage)
            }
        });
    }

    delete(id) {
        this.setState(prevState => ({
            clients: prevState.clients.filter(el => el.id != id)
        }));
    }

    create(data) {
        let newClient = {
            id: data.id,
            clientName: data.clientName,
            postalCode: data.postalCode,
            address: data.address,
            city: data.city,
            country: data.country,
        }
        this.setState({ clients: [...this.state.clients, newClient] })
    }

    search(clientName) {
        console.log("search = ", clientName)
        this.setState({ searchTerm: clientName })
        if (clientName == "") {
            this.setState({ searchActive: false })
            this.setState({ currentPage: 1 });
            this.getClients(this.state.currentPage)
            return
        }
        this.setState({ filterActive: false })
        this.setState({ searchActive: true })
        ClientService.getClientsByName(clientName, this.state.currentPage)
            .then((res) => {
                console.log(res.data)
                this.setState({ clients: JSOG.decode(res.data.content) });
                this.setState({ last: res.data.last });

                //this.setState({ clients: JSOG.decode(res.data) });
                //this.setState({ last: true });
                //this.setState({ currentPage: 1 });
            })
            .catch(error => {
                console.log("error = ", error)
                this.setState({ clients: [] });
                this.setState({ last: true });
                this.setState({ currentPage: 1 });
            });
    }

    filter(letter) {
        console.log("filter parent = ", letter) 
        this.setState({ searchActive: false })
        this.setState({ filterActive: true })
        this.setState({ filterLetter: letter })
        
        ClientService.getClientsFilter(letter, this.state.currentPage)
            .then((res) => {
                console.log("res = ", res)
                this.setState({ clients: JSOG.decode(res.data.content) });
                this.setState({ last: res.data.last });

                //this.setState({ clients: JSOG.decode(res.data) });
                //this.setState({ last: true });
                //this.setState({ currentPage: 1 });
            })
            .catch(error => {
                console.log("error = ", error)
                this.setState({ clients: [] });
                this.setState({ last: true });
                this.setState({ currentPage: 1 });
            });
    }

    filterReset() {
        console.log("filter reset parent")  
        this.setState({ filterActive: false })
        this.setState({ filterLetter: '' })
        this.setState({ currentPage: 1 });
        this.getClients(this.state.currentPage)
    }

    render() {
        return (
            <div className="wrapper">
                <section className="content">
                    <h2 style={{float:"left"}}><i className="ico clients"></i>Clients</h2>
                    <CreateClientDialog
                        _handleSearch={this.search.bind(this)}
                        _handleCreate={this.create.bind(this)} />
                    <LettersFilter 
                        _handleFilter={this.filter.bind(this)}
                        _handleFilterReset={this.filterReset.bind(this)} />
                    <Accordion>
                        {
                            this.state.clients.map(
                                client =>
                                    <ClientCard
                                        key={client.id}
                                        client={client}
                                        _handleDelete={this.delete.bind(this)} />
                            )
                        }
                    </Accordion>
                    <Pagination
                        currentPage={this.state.currentPage}
                        last={this.state.last}
                        _handlePreviousPage={this.previousPage.bind(this)}
                        _handleNextPage={this.nextPage.bind(this)} />
                </section>
            </div>
        )
    }
}
