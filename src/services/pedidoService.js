let pedidos = [];
let nextId = 1;

const estadosValidos = ["recebido", "em_preparacao", "enviado", "entregue", "cancelado"];

const pedidoService = {
  cadastrar(data) {
    const { cliente, tipo, valor, prioridade } = data;

    // Validação de cliente
    if (!cliente || typeof cliente !== 'string' || cliente.trim() === '') {
      throw new Error("O campo 'cliente' é obrigatório e não pode ser vazio.");
    }

    // Validação de valor
    if (typeof valor !== 'number' || valor <= isNaN || valor <= 0) {
      throw new Error("O campo 'valor' deve ser numérico e maior que zero.");
    }

    // Validação de tipo e prioridade (ajuste conforme os tipos aceitos no seu README)
    if (!tipo || !prioridade) {
      throw new Error("Os campos 'tipo' e 'prioridade' são obrigatórios.");
    }

    const novoPedido = {
      id: nextId++,
      cliente: cliente.trim(),
      tipo,
      valor,
      prioridade,
      status: "recebido"
    };

    pedidos.push(novoPedido);
    return novoPedido;
  },

  listar() {
    return pedidos;
  },

  buscarPorId(id) {
    const pedido = pedidos.find(p => p.id === Number(id));
    if (!pedido) {
      const error = new Error("Pedido não encontrado.");
      error.status = 404;
      throw error;
    }
    return pedido;
  },

  atualizarStatus(id, novoStatus) {
    const pedido = this.buscarPorId(id);

    if (!novoStatus || !estadosValidos.includes(novoStatus)) {
      const error = new Error(`Status inválido. Estados permitidos: ${estadosValidos.join(', ')}`);
      error.status = 400;
      throw error;
    }

    // Regra simples de transição (exemplo: se cancelado ou entregue, travar alterações)
    if (pedido.status === "entregue" || pedido.status === "cancelado") {
      const error = new Error(`Não é possível alterar o status de um pedido que já está '${pedido.status}'.`);
      error.status = 400;
      throw error;
    }

    pedido.status = novoStatus;
    return pedido;
  }
};

module.exports = pedidoService;