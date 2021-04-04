import React, { Component } from 'react'
import DaysBar from './DaysBar'
import TimeSheetItem from './TimeSheetItem'
import ClientService from '../../services/ClientService'
import ProjectService from '../../services/ProjectService'
import TimeSheetItemsService from '../../services/TimeSheetItemsService'
import Swal from "sweetalert2";
import JSOG from 'jsog'

const daysMap = {
    "Mon": "Monday",
    "Tue": "Tuesday",
    "Wed": "Wednesday",
    "Thu": "Thursday",
    "Fri": "Friday",
    "Sat": "Saturday",
    "Sun": "Sunday"
}

const monthsMap = {
    "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4,
    "May": 5, "Jun": 6, "Jul": 7, "Aug": 8,
    "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12,
}

export default class DayTimeSheet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: this.props.match.params.day,
            dateString: new Date(this.props.match.params.day).toDateString(),
            currentDate: new Date(this.props.match.params.day),
            year: this.props.match.params.day.split('-')[0],
            timeSheetItems: [],
            datesList: [
                this.addDays(new Date(this.props.match.params.day), -3),
                this.addDays(new Date(this.props.match.params.day), -2),
                this.addDays(new Date(this.props.match.params.day), -1),
                this.addDays(new Date(this.props.match.params.day), 0),
                this.addDays(new Date(this.props.match.params.day), 1),
                this.addDays(new Date(this.props.match.params.day), 2),
                this.addDays(new Date(this.props.match.params.day), 3),
            ],
            clientsSelect: [],
            projectsSelect: [],
            totalHours: 0
        }
        this.prevWeek = this.prevWeek.bind(this);
        this.nextWeek = this.nextWeek.bind(this);
    }

    prevWeek() {
        console.log("previous week")
        let prevWeekDay = new Date(new Date(this.state.date).setDate(this.state.currentDate.getDate() - 7));
        let fulldate = prevWeekDay.toLocaleString().split(",")[0].split("/")
        let datePath = fulldate[2]+"-"+fulldate[0]+"-"+fulldate[1]
        this.props.history.replace(`/day/${datePath}`); 
    }

    nextWeek() {
        console.log("next week")
        let nextWeekDay = new Date(new Date(this.state.date).setDate(this.state.currentDate.getDate() + 7));
        let fulldate = nextWeekDay.toLocaleString().split(",")[0].split("/")
        let datePath = fulldate[2]+"-"+fulldate[0]+"-"+fulldate[1]
        this.props.history.replace(`/day/${datePath}`);         
    }

    componentDidMount() {
        TimeSheetItemsService.getItemsForDate(this.state.date).then((res) => {
            console.log("res = ", JSOG.decode(res.data))
            this.setState({ timeSheetItems: JSOG.decode(res.data) })
            let totalH = 0
            for (let item of this.state.timeSheetItems) {
                totalH += item.time + item.overtime
            }
            this.setState({ totalHours: totalH })
        });
    }

    addDays(d, days) {
        let result = new Date(d);
        result.setDate(result.getDate() + days);
        let stringdate = result.toDateString();
        let res = {
            date: stringdate.split(" ")[1] + " " + stringdate.split(" ")[2],
            day: daysMap[stringdate.split(" ")[0]],
            dateObj: result
        }
        return res;
    }

    dateChange(newCurrentDate) {
        this.setState({ currentDate: newCurrentDate })
        this.setState({ dateString: newCurrentDate.toDateString() })
        //console.log(newCurrentDate, " ", newCurrentDate.toDateString())
        let date = this.formatDateString(newCurrentDate.toDateString())
        TimeSheetItemsService.getItemsForDate(date).then((res) => {
            console.log("res = ", JSOG.decode(res.data))
            this.setState({ timeSheetItems: JSOG.decode(res.data) })
            let totalH = 0
            for (let item of this.state.timeSheetItems) {
                totalH += item.time + item.overtime
            }
            this.setState({ totalHours: totalH })
        });
    }

    formatDateString(dateString) {
        // Fri Mar 05 2021
        let splited = dateString.split(" ")
        let res = splited[3] + "-" + monthsMap[splited[1]] + "-" + splited[2]
        return res
    }

    update(timeSheetItem) {
        timeSheetItem.date = this.state.currentDate
        console.log("timeSheetItem in parent update = ", timeSheetItem)
        //find old hours
        let oldHours = 0
        for (let item of this.state.timeSheetItems) {
            if (item.id == timeSheetItem.id) {
                oldHours = item.time + item.overtime
            }
        }
        console.log("old hours = ", oldHours)
        TimeSheetItemsService.update(timeSheetItem.id, timeSheetItem)
            .then(res => {
                console.log("timeSheetItem updated res = ", res.data)
                //update total hours
                this.setState(prevState => ({
                    totalHours: prevState.totalHours - oldHours + res.data.time + res.data.overtime
                }));

                Swal.fire({
                    title: 'Success!',
                    text: 'Time Sheet item successfully update!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
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

    save(timeSheetItem) {
        timeSheetItem.date = this.state.currentDate
        console.log("timeSheetItem in parent save = ", timeSheetItem)
        TimeSheetItemsService.create(timeSheetItem)
            .then(res => {
                console.log("timeSheetItem added res = ", res.data)
                this.setState({ timeSheetItems: [...this.state.timeSheetItems, res.data] })

                //update total hours
                this.setState(prevState => ({
                    totalHours: prevState.totalHours + res.data.time + res.data.overtime
                }));

                Swal.fire({
                    title: 'Success!',
                    text: 'Time Sheet item successfully added!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
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
            <div className="wrapper">
                <section className="content">
                    <h2 style={{float:"left"}}><i className="ico timesheet"></i>TimeSheet</h2>
                    <div className="grey-box-wrap">
                        <div className="top">
                            <a className="prev" style={{cursor: "pointer"}} onClick={this.prevWeek}><i className="zmdi zmdi-chevron-left"></i>previous week</a>
                            <span className="center">{this.state.dateString}</span>
                            <a className="next" style={{cursor: "pointer"}} onClick={this.nextWeek}>next week<i className="zmdi zmdi-chevron-right"></i></a>
                        </div>
                        <DaysBar
                            activeDay={this.state.currentDate}
                            datesList={this.state.datesList}
                            _handleDateChange={this.dateChange.bind(this)} />
                    </div>
                    <table className="default-table">
                        <thead>
                            <tr>
                                <th>
                                    Client <em>*</em>
                                </th>
                                <th>
                                    Project <em>*</em>
                                </th>
                                <th>
                                    Category <em>*</em>
                                </th>
                                <th>Description</th>
                                <th className="small">
                                    Time <em>*</em>
                                </th>
                                <th className="small">Overtime</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TimeSheetItem
                                create={true}
                                _handleSave={this.save.bind(this)} />
                            <tr style={{ 'borderBottom': '2px solid black' }}>
                                <td colSpan="100%"></td>
                            </tr>
                            {
                                this.state.timeSheetItems.map(
                                    (item, i) =>
                                        <TimeSheetItem
                                            key={item.id}
                                            create={false}
                                            timeSheetItem={item}
                                            _handleUpdate={this.update.bind(this)} />
                                )
                            }
                        </tbody>
                    </table>
                    <div className="total">
                        <a href="/time-sheet"><i></i>back to monthly view</a>
                        <span>Total hours: <em>{this.state.totalHours}</em></span>
                    </div>
                </section>
            </div>
        )
    }
}
