import React, { Component } from 'react'
import ReportsSearchForm from './ReportsSearchForm'
import TimeSheetItemsService  from '../../services/TimeSheetItemsService'
import JSOG from 'jsog'

export default class Reports extends Component {

    constructor(props) {
        super(props)

        this.state = {
            reports: [], 
            filteredReports: [],
            totalHours: 0
        }
    }

    componentDidMount() {
        TimeSheetItemsService.getItems().then((res) => {
            console.log("res = ", JSOG.decode(res.data))
            this.setState({ reports: JSOG.decode(res.data) })
            this.setState({ filteredReports: JSOG.decode(res.data) })
            this.setState({ totalHours: this.calculateTotalHours(this.state.reports) })
        });
    }

    search(searchObj) {
        console.log("search in parent = ", searchObj)
        let reportItems = this.state.reports

        if(searchObj.teamMember != "-1") {
            console.log("filter by teammeber")
            reportItems = reportItems.filter(item => item.teamMember.id == searchObj.teamMember)
        }
        if(searchObj.client != "-1") {
            console.log("filter by client")
            reportItems = reportItems.filter(item => item.client.id == searchObj.client)
        }
        if(searchObj.project != "-1") {
            console.log("filter by project")
            reportItems = reportItems.filter(item => item.project.id == searchObj.project)
        }
        if(searchObj.category != "-1") {
            console.log("filter by category")
            reportItems = reportItems.filter(item => item.category.id == searchObj.category)
        }

        if(searchObj.startDate != "") {
            console.log("search by startdate")
            reportItems = reportItems.filter(item => new Date(item.date) >= searchObj.startDate)
        }
        
        if(searchObj.endDate != "") {
            console.log("search by enddate")
            reportItems = reportItems.filter(item => new Date(item.date) <= searchObj.endDate)
        }
        
        this.setState({ totalHours: this.calculateTotalHours(reportItems) })
        this.setState({ filteredReports: reportItems })
    }

    reset() {
        console.log("reset")
        this.setState({ totalHours: this.calculateTotalHours(this.state.reports) })
        this.setState({ filteredReports: this.state.reports })
    }

    calculateTotalHours(list) {
        let totalH = 0
        for (let item of list) {
                totalH += item.time + item.overtime
        }
        return totalH
    }
    
    render() {
        return (
            <div className="wrapper">
                <section className="content">
                    <h2 style={{float:"left"}}><i className="ico report"></i>Reports</h2>
                    <ReportsSearchForm 
                        _handleSearch={this.search.bind(this)}
                        _handleReset={this.reset.bind(this)}/>
                    <table className="default-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Team member</th>
                                <th>Projects</th>
                                <th>Categories</th>
                                <th>Description</th>
                                <th className="small">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.filteredReports.map(
                                    report =>
                                        <tr key={report.id}>
                                            <td style={{textAlign: "left"}}>{report.date}</td>
                                            <td style={{textAlign: "left"}}>{report.teamMember.name}</td>
                                            <td style={{textAlign: "left"}}>{report.project.projectName}</td>
                                            <td style={{textAlign: "left"}}>{report.category.name}</td>
                                            <td style={{textAlign: "left"}}>{report.description}</td>
                                            <td className="small">{report.time + report.overtime}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="total">
                        <span>Report total: <em>{this.state.totalHours}</em></span>
                    </div>

                </section>
            </div>
        )
    }
}
