var CartolaAPI = require('../lib/').api;
var CartolaAuth = require('../lib/').auth;

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
