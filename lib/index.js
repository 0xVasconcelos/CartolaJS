var globoAuth = require('./auth');
var cartolaAPI = require('./cartolaAPI');



var CartolaAPI = {};

CartolaAPI.auth = globoAuth;
CartolaAPI.api = cartolaAPI;


module.exports = CartolaAPI;
