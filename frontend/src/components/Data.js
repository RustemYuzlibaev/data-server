import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';

import store from '../store';

import { BACKEND_URL as ENDPOINT } from '../../config.js';
import { turnOnLoader } from './../actions/index';

function Data({ dispatch }) {
    const [response, setResponse] = useState([]);

    function handler(data) {
        setResponse(JSON.parse(data));
        console.log('#run');

        dispatch(turnOnLoader(false));
    }

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);

        socket.on('filteredData', handler);
        return () => {
            socket.off('filteredData', handler);
        };
    }, []);

    const listItems = response.map((object) => {
        return (
            <li key={object.id}>
                <p>id: {object.id}</p>
                <p>lon: {object.lon}</p>
                <p>lat: {object.lat}</p>
                <p>lasttime: {object.lasttime}</p>
                <p>gos_num: {object.gos_num}</p>
                <p>rnum: {object.rnum}</p>
                <p>rtype: {object.rtype}</p>
                <p>speed: {object.speed}</p>
                <hr />
            </li>
        );
    });
    return (
        <div className="data">
            <h2 className="data__heading">Logging real-time data</h2>
            <ul className="data__list">{listItems}</ul>
        </div>
    );
}

export default connect(null, null)(Data);
