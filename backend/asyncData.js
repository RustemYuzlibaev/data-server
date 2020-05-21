const fetch = require('node-fetch');

async function fetchData(URL) {
    try {
        const res = await fetch(URL); // make request
        return res.json(); // return incoming data
    } catch (error) {
        console.error(`ERROR: ${error.stack}`); // throw error, if any
    }
}

module.exports = fetchData;
