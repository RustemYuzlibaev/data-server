import React, { Component } from 'react';
import OptionItem from './OptionItem';

import * as option from './listOptions';

class DropDown extends Component {
    treatValue = (value) => {
        if (option.providers.includes(value)) {
            this.props.getValue(value, 'provider');
        }

        if (option.intervals.includes(value)) {
            this.props.getValue(value, 'time');
        }

        if (option.cities.includes(value)) {
            this.props.getValue(value, 'city');
        }

        if (option.modes.includes(value)) {
            this.props.getValue(value, 'mode');
        }
    };

    render() {
        return (
            <ul className="category">
                <li className="category__item">
                    <a className="category__link">Provider</a>
                    <ul className="options">
                        <OptionItem
                            option="UfaGorTrans"
                            handleClick={this.treatValue}
                        />
                        <OptionItem
                            option="WikiRoutes"
                            handleClick={this.treatValue}
                        />
                    </ul>
                </li>

                <li className="category__item">
                    <a className="category__link">Time span</a>
                    <ul className="options">
                        <OptionItem
                            option="3 seconds"
                            handleClick={this.treatValue}
                        />
                        <OptionItem
                            option="5 seconds"
                            handleClick={this.treatValue}
                        />
                        <OptionItem
                            option="10 seconds"
                            handleClick={this.treatValue}
                        />
                        <OptionItem
                            option="20 seconds"
                            handleClick={this.treatValue}
                        />
                        <OptionItem
                            option="30 seconds"
                            handleClick={this.treatValue}
                        />
                    </ul>
                </li>
                <li className="category__item">
                    <a className="category__link">City / Town</a>
                    <ul className="options">
                        <OptionItem
                            option="Ufa"
                            handleClick={this.treatValue}
                        />
                        <OptionItem
                            option="Kazan"
                            handleClick={this.treatValue}
                        />
                        <OptionItem
                            option="Moscow"
                            handleClick={this.treatValue}
                        />
                        <OptionItem
                            option="Yekaterinburg"
                            handleClick={this.treatValue}
                        />
                        <OptionItem
                            option="Novosibirsk"
                            handleClick={this.treatValue}
                        />
                    </ul>
                </li>
                <li className="category__item">
                    <a className="category__link">Parsing mode</a>
                    <ul className="options">
                        <OptionItem
                            option="none"
                            handleClick={this.treatValue}
                        />
                        <OptionItem
                            option="normalized"
                            handleClick={this.treatValue}
                        />
                        <OptionItem
                            option="minimized"
                            handleClick={this.treatValue}
                        />
                    </ul>
                </li>
            </ul>
        );
    }
}

export default DropDown;
