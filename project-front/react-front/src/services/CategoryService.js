import axios from 'axios';

const CATEGORIES_URL = "http://localhost:8080/categories/";

class CategoryService {

    createCategory(category) {
        return axios.post(CATEGORIES_URL, category, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    }

    getCategories() {
        return axios.get(CATEGORIES_URL, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    }

    getCategoriesByPage(pageNum) {
        return axios.get(CATEGORIES_URL + "page/" + pageNum, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    }

    updateCategory(id, category) {
        return axios.put(CATEGORIES_URL + id, category, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    }

    deleteCategory(id) {
        return axios.delete(CATEGORIES_URL + id, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    }
}

export default new CategoryService()