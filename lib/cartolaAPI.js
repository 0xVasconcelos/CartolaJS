var request = require('request').defaults({
  baseUrl: 'https://api.cartolafc.globo.com/'
});

var glbId = null;

function cartolaAPI(token) {
  if (typeof token != 'Object') {
    glbId = null;
  }
  if (token.glbId)
    glbId = token.glbId;
  else
    glbId = null;
}

cartolaAPI.prototype.partidas = function(fn) {
  var self = this;
  self._baseRequest('/partidas', fn);
}

cartolaAPI.prototype.clubes = function(fn) {
  var self = this;
  self._baseRequest('/clubes', fn);
}

cartolaAPI.prototype.patrocinadores = function(fn) {
  var self = this;
  self._baseRequest('/patrocinadores', fn);
}

cartolaAPI.prototype.statusMercado = function(fn) {
  var self = this;
  self._baseRequest('/mercado/status', fn);
}

cartolaAPI.prototype.mercadoAtletas = function(fn) {
  var self = this;
  self._baseRequest('/atletas/mercado', fn);
}

cartolaAPI.prototype.rodadas = function(fn) {
  var self = this;
  self._baseRequest('/rodadas', fn);
}

cartolaAPI.prototype.meuTime = function(fn, err) {
  var self = this;
  self._baseRequest('/auth/time', fn);
}

cartolaAPI.prototype.meuTimeInfo = function(fn) {
  var self = this;
  self._baseRequest('/auth/time/info', fn);
}

cartolaAPI.prototype.noticias = function(fn) {
  var self = this;
  self._baseRequest('/auth/noticias', fn);
}

cartolaAPI.prototype.minhasLigas = function(fn) {
  var self = this;
  self._baseRequest('/auth/ligas', fn);
}

cartolaAPI.prototype.liga = function(liga, fn) {
  var self = this;
  self._baseRequest('/auth/liga/' + liga, fn);
}

cartolaAPI.prototype.escalarTime = function(obj, fn) {
  var self = this;
  self._basePost('/auth/time/salvar', fn, obj);
}

cartolaAPI.prototype._basePost = function(method, fn, obj) {
  request.post({
    uri: method,
    headers: {
      'X-GLB-Token': glbId
    },
    body: JSON.stringify(obj)
  }, function(err, res, body) {
    if (body && res && res.statusCode !== 200 || err) {
      fn(null, body)
    } else {
      try {
        body = JSON.parse(body);
        fn(body, null);
      } catch (e) {
        fn(null, e);
      }
    }
  });
}

cartolaAPI.prototype._baseRequest = function(method, fn, obj, err) {
  request.get({
    uri: method,
    headers: {
      'X-GLB-Token': glbId
    }
  }, function(err, res, body) {
    if (body && res && res.statusCode !== 200 || err) {
      fn(null, body)
    } else {
      try {
        body = JSON.parse(body);
        fn(body, null);
      } catch (e) {
        fn(null, e);
      }
    }
  });
}

module.exports = cartolaAPI;
