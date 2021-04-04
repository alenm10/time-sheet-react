import axios from 'axios';

const CLIENTS_URL = "http://localhost:8080/clients/";

class ClientService {

    createClient(client) {
        return axios.post(CLIENTS_URL, client, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    }

    getAllClients() {
        return axios.get(CLIENTS_URL, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    }

    getClientsByPage(pageNum) {
        return axios.get(CLIENTS_URL + "page/" + pageNum, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    }

    getClientsByName(clientName, pageNum) {
        console.log("search for page = ", pageNum)
        return axios.get(CLIENTS_URL + "search/" + clientName + "/" + pageNum, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    }

    getClientsFilter(letter, pageNum) {
        console.log("filter for page = ", pageNum)
        return axios.get(CLIENTS_URL + "filter/" + letter + "/" + pageNum, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    }

    getClients() {
        return axios.get(CLIENTS_URL + "select-option", { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    }

    deleteClient(id) {
        return axios.delete(CLIENTS_URL + id, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    }

    updateClient(id, client) {
        return axios.put(CLIENTS_URL + id, client, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    }
}

export default new ClientService()
