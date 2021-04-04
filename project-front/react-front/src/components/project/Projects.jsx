import React, { Component } from 'react'
import CreateProjectDialog from './CreateProjectDialog'
import ProjectCard from './ProjectCard'
import LettersFilter from '../LettersFilter'
import { Accordion } from 'react-bootstrap'
import Pagination from '../Pagination'
import ProjectService from '../../services/ProjectService'
import JSOG from 'jsog'

export default class Projects extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            projects: [],
            currentPage: 1,
            last: false,
            searchActive: false,
            searchTerm: '',
            filterActive: false,
            filterLetter: ''
        }
    }

    componentDidMount(){
        this.getProjects(this.state.currentPage)
    }

    getProjects(page) {
        ProjectService.getProjectsByPage(page).then((res) => {
            console.log("res = ", JSOG.decode(res.data))
            this.setState({ projects: JSOG.decode(res.data.content) });
            this.setState({ last: res.data.last });
        });
    }

    previousPage() {
        console.log("previous page")
        let prevPage = this.state.currentPage - 1
        this.setState({ currentPage: prevPage });
        this.setState({ currentPage: prevPage }, ()=>{
            if(this.state.searchActive){
                this.search(this.state.searchTerm)
            } else if(this.state.filterActive){
                this.filter(this.state.filterLetter)
            } else {
                this.getProjects(prevPage)
            }    
        });
    }

    nextPage() {
        console.log("next page")
        let nextPage = this.state.currentPage + 1
        this.setState({ currentPage: nextPage });
        this.setState({ currentPage: nextPage }, ()=> {
            if(this.state.searchActive){
                this.search(this.state.searchTerm)
            } else if(this.state.filterActive){
                this.filter(this.state.filterLetter)
            } else {
                this.getProjects(nextPage)
            }
        });
    }
    
    delete(id){
        this.setState(prevState => ({
            projects: prevState.projects.filter(el => el.id != id )
        }));
    }

    create(data) {
        console.log("create in parent = ", data)
        let newProject = {
            id: data.id,
            projectName: data.projectName,
            description: data.description,
            archive: data.archive,
            status: data.status,
            projectLead: {
                "id": data.projectLead.id,
                "name": data.projectLead.name,
            },
            client: {
                "id": data.client.id,
                "name": data.client.clientName
            },
        };
        this.setState({ projects: [...this.state.projects, newProject]})
    }

    search(projectName) {
        console.log("search = ", projectName)
        this.setState({ searchTerm: projectName })
        if (projectName == "") {
            this.setState({ searchActive: false })
            this.setState({ currentPage: 1 });
            this.getProjects(this.state.currentPage)
            return
        }
        this.setState({ filterActive: false })
        this.setState({ searchActive: true })
        ProjectService.getProjectsByName(projectName, this.state.currentPage)
            .then((res) => {
                this.setState({ projects: JSOG.decode(res.data.content) });
                this.setState({ last: res.data.last });

                //this.setState({ projects: JSOG.decode(res.data) });
                //this.setState({ last: true });
                //this.setState({ currentPage: 1 });
            })
            .catch(error => {
                console.log("error = ", error)
                this.setState({ projects: [] });
                this.setState({ last: true });
                this.setState({ currentPage: 1 });
            });
    }

    filter(letter) {
        console.log("filter parent = ", letter) 
        this.setState({ searchActive: false })
        this.setState({ filterActive: true })
        this.setState({ filterLetter: letter })

        ProjectService.getProjectsFilter(letter, this.state.currentPage)
            .then((res) => {
                console.log("res = ", res)
                this.setState({ projects: JSOG.decode(res.data.content) });
                this.setState({ last: res.data.last });

                //this.setState({ projects: JSOG.decode(res.data) });
                //this.setState({ last: true });
                //this.setState({ currentPage: 1 });
            })
            .catch(error => {
                console.log("error = ", error)
                this.setState({ projects: [] });
                this.setState({ last: true });
                this.setState({ currentPage: 1 });
            });
    }

    filterReset() {
        console.log("filter reset parent")  
        this.setState({ filterActive: false })
        this.setState({ filterLetter: '' })
        this.setState({ currentPage: 1 });
        this.getProjects(this.state.currentPage)

        //this.setState({ currentPage: 1 });
        //this.getProjects(this.state.currentPage)
    }

    render() {
        return (
            <div className="wrapper">
                <section className="content">
                    <h2 style={{float:"left"}}><i className="ico projects"></i>Projects</h2>
                    <CreateProjectDialog
                        _handleSearch={this.search.bind(this)}
                        _handleCreate={this.create.bind(this)}/>
                    <LettersFilter 
                        _handleFilter={this.filter.bind(this)}
                        _handleFilterReset={this.filterReset.bind(this)} />
                    <Accordion>
                        {
                            this.state.projects.map(
                                project =>
                                    <ProjectCard 
                                        key={project.id}
                                        project={project}
                                        _handleDelete={this.delete.bind(this)}/>
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
