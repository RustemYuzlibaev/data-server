import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { Loader } from './Loader';

import { turnOnLoader } from './../actions/index';

class Shape extends Component {
    onSend = (e) => {
        fetch('http://localhost:8000/api/options', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(this.props.options),
            mode: 'no-cors',
            credentials: 'omit',
        }).catch((err) => console.error('Server is not responding:', err));

        this.props.dispatch(turnOnLoader(true));

        window.scrollTo({ top: 200, left: 0, behavior: 'smooth' });
    };

    render() {
        const { provider, time, city, mode } = this.props.options;
        let isLoading = this.props.showLoader;
        let providerEl;

        if (!provider) {
            providerEl = <p>&nbsp;</p>;
        } else {
            providerEl = <p>{provider}</p>;
        }

        return (
            <div className="shape">
                <p className="shape__variable">
                    const <span className="shape__word">options</span>{' '}
                    &nbsp;=&nbsp; {'{'}
                </p>
                {provider ? (
                    <p className="shape__option">{provider},</p>
                ) : (
                    <p>&nbsp;</p>
                )}
                {time ? (
                    <p className="shape__option">{time},</p>
                ) : (
                    <p>&nbsp;</p>
                )}
                {city ? (
                    <p className="shape__option">{city},</p>
                ) : (
                    <p>&nbsp;</p>
                )}
                {mode ? (
                    <p className="shape__option">{mode},</p>
                ) : (
                    <p>&nbsp;</p>
                )}
                <p>{'}'}</p>

                <button className="shape__button-send" onClick={this.onSend}>
                    Send
                </button>
                {isLoading ? <Loader /> : ''}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { showLoader: state.loader.showLoader };
};

export default connect(mapStateToProps, null)(Shape);
