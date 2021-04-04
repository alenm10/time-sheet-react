import axios from 'axios';

const TEAM_MEMBERS_URL = "http://localhost:8080/team-members/";
const AUTH_URL = "http://localhost:8080/auth/";

class TeamMembersService {

    createTeamMember(teamMember) {
        return axios.post(AUTH_URL + "register", teamMember, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    }

    login(teamMember) {
        return axios.post(AUTH_URL + "login", teamMember);
    }

    updatePassword(teamMember) {
        return axios.post(AUTH_URL + "update", teamMember, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    }

    changePassword(teamMember) {
        return axios.put(TEAM_MEMBERS_URL + "password", teamMember, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    }
    
    resetPassword(id) {
        return axios.get(TEAM_MEMBERS_URL + "reset-password/" + id, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    }

    getTeamMembers(){
        return axios.get(TEAM_MEMBERS_URL + "select-option", { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    }

    getAllTeamMembers(){
        return axios.get(TEAM_MEMBERS_URL, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    }
    
    getTeamMembersByPage(pageNum) {
        return axios.get(TEAM_MEMBERS_URL + "page/" + pageNum, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    }

    deleteTeamMember(id) {
        return axios.delete(TEAM_MEMBERS_URL + id, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    }

    updateTeamMember(id, teamMember) {
        return axios.put(TEAM_MEMBERS_URL + id, teamMember, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    }
    
    updateProfile(teamMember) {
        return axios.put(TEAM_MEMBERS_URL + "update-profile", teamMember, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    }

    getAvailableTeamMembers() {
        return axios.get(TEAM_MEMBERS_URL + 'available', { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    }

    getLoggedUser() {
        return axios.get(TEAM_MEMBERS_URL + 'logged-user', { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    }

    forgotPassword(email) {
        return axios.post(AUTH_URL + "forgot-password/" + email);
    }

    resetForgotPassword(resetObj) {
        return axios.post(AUTH_URL + "reset-forgot-password", resetObj);    
    }
}

export default new TeamMembersService()