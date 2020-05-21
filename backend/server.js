const http = require('http');
const EventEmitter = require('events').EventEmitter;

const io = require('socket.io-client');
const _ = require('lodash');

const config = require('./config.js');
const fetchCoordinates = require('./asyncData.js');
const getPostData = require('./getPostData.js');

const dataEmitter = new EventEmitter();
const socket = io(config.BUSTRONIC_URL); // socket instance

let optionSettings = {};

const optionHandler = function (data) {
    optionSettings = data;
};

// subscribe to option changes
dataEmitter.on('onOptionChange', optionHandler);

const server = http.createServer(async (req, res) => {
    // getting options
    if (req.url === '/api/options') {
        const options = (await getPostData(req)) || {};

        if (!Object.keys(options.length === 0)) {
            dataEmitter.emit('onOptionChange', JSON.parse(options));
        }
    }

    res.end();
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\r\r\n');
});

socket.on('connect', () => {
    console.log('Connection with Bustronic established. 200 OK');

    timerId = setInterval(() => {
        fetchCoordinates(config.UFAGORTRANS_URL)
            .then((data) => {
                const vehicles = data.anims;

                const parsedCoordinates = [];

                vehicles.map((vehicle) => {
                    parsedCoordinates.push(
                        _.pick(vehicle, config.requiredKeys),
                    );
                });

                socket.emit('vehicles:data', parsedCoordinates);

                socket.on('message', (data) => {
                    console.log('success:true', data);
                });
            })
            .catch((err) => {
                clearInterval(timerId);
                dataEmitter.off('onOptionChange', optionHandler);
                console.error(err);
            });
    }, config.INTERVAL);
});

server.listen(8000, '127.0.0.1', () =>
    console.log(`Server is running on port 8000`),
);
