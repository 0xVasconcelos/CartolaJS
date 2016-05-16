#CartolaJS  [![Build Status](https://img.shields.io/travis/lucaslg26/cartolajs.svg)](https://travis-ci.org/lucaslg26/cartolajs) [![npm version](http://img.shields.io/npm/v/cartolajs.svg)](https://npmjs.org/package/cartolajs) [![npm downloads](https://img.shields.io/npm/dm/cartolajs.svg)](https://npmjs.org/package/cartolajs) [![NPM](https://img.shields.io/npm/l/cartolajs.svg)](https://github.com/lucaslg26/cartolajs/blob/master/LICENSE.md) [![David](https://img.shields.io/david/lucaslg26/cartolajs.svg)] (https://david-dm.org/lucaslg26/cartolajs)[![Join the chat at https://gitter.im/lucaslg26/CartolaJS](https://badges.gitter.im/lucaslg26/CartolaJS.svg)](https://gitter.im/lucaslg26/CartolaJS?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)



## Sobre

API Wrapper do Cartola FC para Node.js!

Criado por [Lucas Vasconcelos](https://github.com/lucaslg26)

**NOTE:** Não suporta login do Facebook por enquanto!

## Como usar?
Execute o comando:

``` javascript
npm install cartolajs
```
Um uso simples para a API(ainda falta adicionar alguns métodos)

```javascript
var CartolaAPI = require('cartolajs').api;
var CartolaAuth = require('cartolajs').auth;

var Auth = new CartolaAuth({
  email: '',
  password: ''
})

Auth.done(function(data) {
  console.log("Token: %s", data.glbId)
  var Cartola = new CartolaAPI({
    glbId: data.glbId
  })
  Cartola.meuTimeInfo(function(data, err) {
    if (err) console.log(err)
    else
      console.log("Nome: %s\nCartoleiro: %s", data.time.nome, data.time.nome_cartola)
  })

  Cartola.minhasLigas(function(data, err) {
    if (err) console.log(err)
    else
      data.ligas.forEach(function(liga) {
        console.log("Nome: %s\nDescricao: %s", liga.nome, liga.descricao)
      })
  })

  Cartola.clubes(function(data, err) {
    if (err) console.log(err)
    else
      Object.keys(data).forEach(function(id) {
        console.log("[%s] Nome: %s\nAbreviação: %s", data[id].id, data[id].nome, data[id].abreviacao);
      })
  })
  Cartola.liga('dengo-kings-ufpa', function(data, err) {
    if (err) console.log(err)
    else
      console.log(data)
  })

})

Auth.catch(function(err) {
  console.log(err)
})
```
