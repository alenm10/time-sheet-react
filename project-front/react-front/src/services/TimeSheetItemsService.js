import axios from 'axios';

const TIME_SHEET_ITEMS_URL = "http://localhost:8080/time-sheet-items/";

class TimeSheetItemsService {

    create(timeSheetItem) {
        return axios.post(TIME_SHEET_ITEMS_URL, timeSheetItem, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    }

    getItems() {
        return axios.get(TIME_SHEET_ITEMS_URL, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    }

    getItemsForDate(dateString) {
        console.log("dateObj = ", dateString)
        return axios.get(TIME_SHEET_ITEMS_URL + "date/" + dateString, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    }

    getItemsForMonth(month) {
        console.log("get for month = ", month)
        console.log("token here = ", localStorage.getItem('token'))
        return axios.get(TIME_SHEET_ITEMS_URL + "month/" + month, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    }

    update(id, timeSheetItem) {
        return axios.put(TIME_SHEET_ITEMS_URL + id, timeSheetItem, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    }

    delete(id) {
        return axios.delete(TIME_SHEET_ITEMS_URL + id, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    }
}

export default new TimeSheetItemsService()