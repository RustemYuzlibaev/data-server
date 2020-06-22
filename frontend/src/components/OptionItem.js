import React, { Component } from 'react';

export default class OptionItem extends Component {
    constructor(props) {
        super(props);
        this.onHandleClick = this.onHandleClick.bind(this);
    }

    onHandleClick(e) {
        this.props.handleClick(e.target.innerText);
    }

    render() {
        return (
            <li className="options__item" onClick={this.onHandleClick}>
                <a className="options__link">{this.props.option}</a>
            </li>
        );
    }
}
