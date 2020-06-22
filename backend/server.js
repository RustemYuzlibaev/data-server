const server = require('http').createServer(handler);
const socketIOServer = require('socket.io')(server);
const EventEmitter = require('events').EventEmitter;
const socketIOClient = require('socket.io-client');
const _ = require('lodash');

const config = require('./config.js');
const fetchCoordinates = require('./asyncData.js');
const getPostData = require('./getPostData.js');

const dataEmitter = new EventEmitter();

// socket instance
const socket = socketIOClient(config.BUSTRONIC_URL); // http://api.bustronic.ru

let optionSettings = {};
const parsedCoordinates = [];

const optionHandler = function (data) {
    optionSettings = data;
};

// subscribe to option changes
dataEmitter.on('onOptionChange', optionHandler);

// HTTP Server
async function handler(req, res) {
    // getting options
    if (req.url === '/api/options') {
        const options = (await getPostData(req)) || {};

        if (!Object.keys(options.length === 0)) {
            dataEmitter.emit('onOptionChange', JSON.parse(options));
        }
    }

    res.end();
}

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\r\r\n');
});

server.listen(8000, '127.0.0.1', () =>
    console.log(`Server is running on port 8000`),
);

socketIOServer.on('connection', (socket) => {
    socket.emit('filteredData', JSON.stringify(parsedCoordinates));
});

socket.on('connect', () => {
    console.log('Connection with Bustronic established. 200 OK');

    timerId = setInterval(() => {
        fetchCoordinates(config.UFAGORTRANS_URL)
            .then((data) => {
                const vehicles = data.anims;

                vehicles.map((vehicle) => {
                    parsedCoordinates.push(
                        _.pick(vehicle, config.requiredKeys),
                    );
                });
                console.log(parsedCoordinates);

                socket.emit('vehicles:data', JSON.stringify(parsedCoordinates));

                socket.on('message', (backMessage) => {
                    console.log('Information status:', backMessage);
                });
            })
            .catch((err) => {
                clearInterval(timerId);
                dataEmitter.off('onOptionChange', optionHandler);
                console.error(err);
            });
    }, config.INTERVAL);
});
