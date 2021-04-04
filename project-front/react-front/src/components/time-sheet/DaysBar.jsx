import React, { Component } from 'react'

export default class DaysBar extends Component {

    constructor(props) {
        super(props)
        console.log("daysbar = ", props)
        this.state = {
            activeDay: this.props.activeDay,
            datesList: this.props.datesList,
        }
    }

    handleDateChange(date) {
        console.log("date change in daysbar = ", date)
        //this._handleDateChange(date)
        this.setState({activeDay: date})
        this.props._handleDateChange(date);
    }
    render() {
        return (
            <div className="bottom">
                <ul className="days">
                    {
                        this.state.datesList.map(
                            (d, i) =>
                                <li style={{cursor: "pointer"}} 
                                    key={i} 
                                    className={(this.state.activeDay.getTime() === d.dateObj.getTime() && "active") || "" }>
                                    <a onClick={() => this.handleDateChange(d.dateObj)}>
                                        <b>{d.date}</b>
                                        <span>{d.day}</span>
                                    </a>
                                </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}
