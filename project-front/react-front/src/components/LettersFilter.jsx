import React, { Component } from 'react'

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
    'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

export default class LettersFilter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: false,
            selectedLetter: ''
        }
    }

    selected(event){
        let letter = event.target.innerHTML
        console.log("selected = ", letter)
        if(letter == this.state.selectedLetter) {
            console.log("reset filter")
            this.setState({selectedLetter: ""})
            this.props._handleFilterReset()
        }else {
            this.setState({selectedLetter: letter})
            this.props._handleFilter(letter)
        }
    }

    render() {
       
        return (
            <div className="alpha">
                <ul>
                    {
                        letters.map(
                            letter =>
                                <li key={letter} style={{cursor: "pointer"}} className={(this.state.selectedLetter == letter && "active") || "" }>

                                    <a  
                                    onClick={this.selected.bind(this)}>{letter}</a>
                                </li>
                        )
                    }
                </ul>
            </div>
        )
    }

}
