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

  Cartola.meuTimeInfo(function(data) {
    console.log("Nome: %s\nCartoleiro: %s", data.time.nome, data.time.nome_cartola)
  })

  Cartola.minhasLigas(function(data) {
    data.ligas.forEach(function(liga){
      console.log("Nome: %s\nDescricao: %s", liga.nome, liga.descricao)
    })
  })

  Cartola.clubes(function(data) {
    Object.keys(data).forEach(function(id){
      console.log("[%s] Nome: %s\nAbreviação: %s", data[id].id, data[id].nome, data[id].abreviacao);
    })
  })

})
