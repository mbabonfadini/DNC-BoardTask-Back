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


module.exports = router;
