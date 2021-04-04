import React, { Component } from 'react'

export default class Pagination extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentPage: props.currentPage,
            last: props.last
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ currentPage: nextProps.currentPage });
        this.setState({ last: nextProps.last });
    }

    render() {
        return (
            <div className="pagination">
                <ul>
                    <li>
                        {
                            (this.state.currentPage != 1 && <a style={{cursor: "pointer"}} onClick={this.props._handlePreviousPage}>&lt;&lt;</a>)
                        }
                    </li>
                    <li>
                        <a>{this.state.currentPage}</a>
                    </li>
                    <li>
                        {
                            (this.state.last == false && <a style={{cursor: "pointer"}} onClick={this.props._handleNextPage}>&gt;&gt;</a>)
                        }
                    </li>
                </ul>
            </div>
        )
    }
}
