import React, { Component } from 'react'
import { enGB } from 'date-fns/locale'
import { Calendar } from 'react-nice-dates'
import TimeSheetItemsService from '../../services/TimeSheetItemsService'
import 'react-nice-dates/build/style.css'
import Swal from "sweetalert2";

//import { Calendar } from '../react-nice-dates'
//import '../react-nice-dates/build/style.css'
//https://reactnicedates.hernansartorio.com/

export default class TimeSheet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
            totalHours: '0'
        }
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
    }

    componentDidMount() {
        this.handleMonthChange(this.state.currentDate)
    }

    handleDayClick(date) {
        let fulldate = date.toLocaleString().split(",")[0].split("/")
        let datePath = fulldate[2] + "-" + fulldate[0] + "-" + fulldate[1]
        this.props.history.push(`/day/${datePath}`);
    }

    handleMonthChange(date) {
        console.log("date = ", date)
        this.setState({ currentDate: date })
        TimeSheetItemsService.getItemsForMonth(date.getMonth())
            .then((res) => {
                console.log("res = ", res)
                this.setState({ totalHours: res.data })            
            })
            .catch(error => {
                console.log("error = ", error)
                Swal.fire({
                    title: 'Error!',
                    text: 'Error!',
                    icon: 'error',
                    confirmButtonColor: '#DC143C',
                    confirmButtonText: 'OK'
                });
            });
    }

    render() {
        return (
            <div>
                <div className="wrapper">
                    <section className="content">
                        <h2><i className="ico timesheet"></i>TimeSheet</h2>
                        <Calendar
                            onDayClick={this.handleDayClick}
                            month={this.state.currentDate}
                            onMonthChange={this.handleMonthChange}
                            locale={enGB} />
                        <div className="total">
                            <span>Total hours: <em>{this.state.totalHours}</em></span>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
