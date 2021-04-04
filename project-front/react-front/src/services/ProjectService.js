import axios from 'axios';

const PROJECTS_URL = "http://localhost:8080/projects/";

class ProjectService {

    createProject(project) {
        return axios.post(PROJECTS_URL, project, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    }

    getAllProjects() {
        return axios.get(PROJECTS_URL, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });    
    }

    getProjectsByPage(page) {
        return axios.get(PROJECTS_URL + "page/" + page, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })

    }

    getProjectsByName(projectName, pageNum) {
        return axios.get(PROJECTS_URL + "search/" + projectName + "/" + pageNum, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    }

    getProjectsFilter(letter, pageNum) {
        return axios.get(PROJECTS_URL + "filter/" + letter + "/" + pageNum, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    }

    deleteProject(id) {
        return axios.delete(PROJECTS_URL + id, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    }

    getProjects(){
        return axios.get(PROJECTS_URL + "select-option", { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    }
    
    updateProject(id, project) {
        return axios.put(PROJECTS_URL + id, project, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });    
    }
}

export default new ProjectService()
