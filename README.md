# DATA SERVER COMPONENT

**Data server** is a component of the **_Bustronic_** system. Its main job is to provide with real-time data timely. The server works in two widely accepted ways: _HTTP_ and _WebSocket_ protocols. The former is needed to grab information from third party services that share coordinates of the vehicles. The latter is for broadcasting these datasets in the fastest way possible further, to the analytics side.

#### WebSocket Protocol

> The WebSocket Protocol enables two-way communication between a client
> running untrusted code in a controlled environment to a remote host
> that has opted-in to communications from that code. -- https://tools.ietf.org/

#### Hypertext Transfer Protocol -- HTTP/1.1

> The Hypertext Transfer Protocol (HTTP) is an application-level
> protocol for distributed, collaborative, hypermedia information
> systems. It is a generic, stateless, protocol which can be used for
> many tasks beyond its use for hypertext, such as name servers and
> distributed object management systems, through extension of its
> request methods, error codes and headers. -- https://tools.ietf.org/

## Installation

1. type in terminal `cd './your-path-to-folder/data-server'`
2. run `npm install` (this will download all the dependencies)
3. `npm run start` (this runs backend server)
4. open another terminal (with running first one) and type `cd ../data-server/frontend`
5. `npm install && npm start` installs and runs fronted server
6. (optional) `npm run build` to create _dist_ folder with all files in it.

| Function name        | Description                           |
| -------------------- | ------------------------------------- |
| `fetchCoordinates()` | Fetch data from third party services. |
| `socket.emit()`      | Send data to analytics side           |

## Config file

```javascript
const UFAGORTRANS_URL = `http://glonass.ufagortrans.ru/`;
const BUSTRONIC_URL = 'http://api.bustronic.ru';
const FRONTEND_URL = 'http://127.0.0.1:3000';
const INTERVAL = 5000;

const requiredKeys = [
    'id',
    'lon',
    'lat',
    'lasttime',
    'gos_num',
    'rnum',
    'rtype',
];

module.exports = {
    UFAGORTRANS_URL,
    BUSTRONIC_URL,
    FRONTEND_URL,
    INTERVAL,
    requiredKeys,
};
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
