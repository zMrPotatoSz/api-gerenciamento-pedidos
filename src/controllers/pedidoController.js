const pedidoService = require('../services/pedidoService');

const pedidoController = {
  criar(req, res) {
    try {
      const novoPedido = pedidoService.cadastrar(req.body);
      return res.status(201).json(novoPedido);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },

  listar(req, res) {
    try {
      const lista = pedidoService.listar();
      return res.status(200).json(lista);
    } catch (error) {
      return res.status(500).json({ erro: "Erro interno no servidor." });
    }
  },

  buscarPorId(req, res) {
    try {
      const pedido = pedidoService.buscarPorId(req.params.id);
      return res.status(200).json(pedido);
    } catch (error) {
      const status = error.status || 500;
      return res.status(status).json({ erro: error.message });
    }
  },

  atualizarStatus(req, res) {
    try {
      const { status } = req.body;
      const pedidoAtualizado = pedidoService.atualizarStatus(req.params.id, status);
      return res.status(200).json(pedidoAtualizado);
    } catch (error) {
      const status = error.status || 400;
      return res.status(status).json({ erro: error.message });
    }
  }
};

module.exports = pedidoController;