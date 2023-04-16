const express = require('express');
const tratarErrosEsperados = require('../functions/tratarErrorEsperados');
const conectarBancoDados = require('../middlewares/conectarBD');
const EsquemaTarefa = require('../models/tarefa');
const authUser = require('../middlewares/authUser');
const router = express.Router();


router.post('/criar', authUser, conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ['Tarefas']
    const usuarioCriador = req.usuarioJwt.id;
    let { posicao, titulo, descricao, status, dataEntrega } = req.body;
    const respostaBD = await EsquemaTarefa.create({ posicao, titulo, descricao, status, dataEntrega, usuarioCriador});

    res.status(200).json({
      status: "OK",
      statusMensagem: "Tarefa criada com sucesso.",
      resposta: respostaBD
    })
  }
  catch (error) {
    return tratarErrosEsperados(res, error)
  }
});

router.put('/editar/:id', authUser, conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ['Tarefas']
    let idTarefa = req.params.id
    let { posicao, titulo, descricao, status, dataEntrega } = req.body;
    const usuarioLogado = req.usuarioJwt.id;

    const checkTarefa = await EsquemaTarefa.findOne({_id: idTarefa, usuarioCriador: usuarioLogado})
    if(!checkTarefa){
      throw new Error("Tarefa não encontrada ou pertence a outro usuário");
    }
    
    const tarefaAtualizada = await EsquemaTarefa.updateOne({_id: idTarefa}, { posicao, titulo, descricao, status, dataEntrega});
    if(tarefaAtualizada?.modifiedCount > 0){
      const dadosTarefa = await EsquemaTarefa.findOne({_id: idTarefa}).populate('usuarioCriador')

      res.status(200).json({
        status: "OK",
        statusMensagem: "Tarefa alterada com sucesso.",
        resposta: dadosTarefa
      })
    }
  }
  catch (error) {
    return tratarErrosEsperados(res, error)
  }
});

router.get('/obter/tarefas', authUser, conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ['Tarefas']
    // #swagger.description = "Endpoint para obter todas as tarefas do usuário logado."
    const usuarioLogado = req.usuarioJwt.id;

    const tarefas = await EsquemaTarefa.find({usuarioCriador: usuarioLogado}).populate('usuarioCriador')
    
      res.status(200).json({
        status: "OK",
        statusMensagem: "Tarefas encontradas com sucesso.",
        resposta: tarefas
      })
  }
  catch (error) {
    return tratarErrosEsperados(res, error)
  }
});


module.exports = router;
