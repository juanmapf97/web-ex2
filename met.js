const request = require('request');

const metSearch = function (query, callback) {
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`;

    request({url: url, json: true}, function(error, response) {
        if (error) {
            callback('Sucedió un error al llamar el servicio search', undefined);
        } else if (response.body.total == 0) {
            callback(`No se encontraron elementos que contengan la palabra enviada`);
        } else {
            const objectId = response.body.objectIDs[0];
            metObject(objectId, (error, response) => {
                callback(error, response);
            });
        }
    });
}

const metObject = function(id, callback) {
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;

    request({url: url, json: true}, function(error, response) {
        if (error) {
            callback('Sucedió un error al llamar el servicio object', undefined);
        } else if (response.body.message == 'Not found') {
            callback('No se encontraron elementos con este object id', undefined);
        } else {
            callback(undefined, {
                artist : response.body.constituents[0].name,
                title: response.body.title,
                year: response.body.objectEndDate,
                technique: response.body.medium,
                metUrl: response.body.objectURL
              });
        }
    });
}

module.exports = {
    metSearch: metSearch,
    metObject: metObject
}