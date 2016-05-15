/*
auth.js

Autentica as credenciais nos servidores da Globo.com e retorna a ID de autenticação para acesso a API.

*/
var Promise = require('promise');
var request = require('request').defaults({
  baseUrl: 'https://login.globo.com/api'
});


function loginAuth(authData) {
  if (typeof authData !== 'object') {
    throw new Error('Objeto de autenticação incorreto');
  } else {
    if (typeof authData.email !== 'string') {
      throw new Error('Email inválido');
    }
    if (typeof authData.password !== 'string') {
      throw new Error('Senha inválida');
    }
  }
  var promise = new Promise(function(resolve, reject) {
    request({
      method: 'POST',
      uri: '/authentication',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "payload": {
          "email": authData.email,
          "password": authData.password,
          "serviceId": 438 //Provavelmente o ID que identifica o Cartola?!
        }
      })

    }, function(err, res, data) {
      if (data && res && res.statusCode !== 200 || err) {
        reject(data)
      } else {
        try {
          data = JSON.parse(data);
          resolve(data);
        } catch (err) {
          reject(err)
        }
      }
    });
  });
  return promise;
}

module.exports = loginAuth;
