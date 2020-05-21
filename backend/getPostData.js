const getPostData = function (req) {
    return new Promise(function (resolve, reject) {
        let body = '';

        req.on('data', function (chunk) {
            body += chunk;
        });

        req.on('end', function () {
            resolve(body);
        });
    });
};

module.exports = getPostData;
