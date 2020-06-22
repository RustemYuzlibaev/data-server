import React, { Component } from 'react';

import DropDown from './DropDown';
import Data from './Data';
import { Heading } from './Heading';
import Shape from './Shape';

export default class App extends Component {
    state = {
        provider: '',
        time: '',
        city: '',
        mode: '',
    };

    getValue = (value, type) => {
        this.setState({ [type]: value });
    };

    render() {
        return (
            <div>
                <Heading />
                <DropDown getValue={this.getValue} />
                <Shape options={this.state} />
                <Data />
            </div>
        );
    }
}
