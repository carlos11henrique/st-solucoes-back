// src/controllers/salasController.js
const salasModel = require('../models/salasModel');

const salasController = {
  getAll: async (req, res) => {
    try {
      const salas = await salasModel.getAll();
      res.json(salas);
    } catch (error) {
      console.error('Erro ao buscar salas:', error); // Log detalhado do erro
      res.status(500).json({ error: 'Erro ao buscar salas' });
    }
  },

  getById: async (req, res) => {
    try {
      const sala = await salasModel.getById(req.params.id);
      if (!sala) return res.status(404).json({ error: 'Sala não encontrada' });
      res.json(sala);
    } catch (error) {
      console.error('Erro ao buscar sala:', error); // Log detalhado do erro
      res.status(500).json({ error: 'Erro ao buscar sala' });
    }
  },

  create: async (req, res) => {
    const { numero_sala, bloco_id } = req.body;
    
    if (!numero_sala || !bloco_id) {
      return res.status(400).json({ error: 'Número da sala e bloco_id são obrigatórios' });
    }

    try {
      console.log('Tentando criar sala:', numero_sala, bloco_id); // Log de entrada dos dados

      const salaExistente = await salasModel.getByNumeroBloco(numero_sala, bloco_id);
      if (salaExistente) {
        return res.status(400).json({ error: 'Já existe uma sala com esse número e bloco' });
      }

      const id = await salasModel.create(numero_sala, bloco_id);
      res.status(201).json({ id });
    } catch (error) {
      console.error('Erro ao criar sala:', error); // Log detalhado do erro
      res.status(500).json({ error: 'Erro ao criar sala', message: error.message || 'Erro desconhecido' });
    }
  },

  update: async (req, res) => {
    const { numero_sala, bloco_id } = req.body;

    if (!numero_sala || !bloco_id) {
      return res.status(400).json({ error: 'Número da sala e bloco_id são obrigatórios' });
    }

    try {
      const sala = await salasModel.getById(req.params.id);
      if (!sala) {
        return res.status(404).json({ error: 'Sala não encontrada' });
      }

      await salasModel.update(req.params.id, numero_sala, bloco_id);
      res.status(200).json({ message: 'Sala atualizada com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar sala:', error); // Log detalhado do erro
      res.status(500).json({ error: 'Erro ao atualizar sala' });
    }
  },

  delete: async (req, res) => {
    try {
      await salasModel.delete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      console.error('Erro ao deletar sala:', error); // Log detalhado do erro
      res.status(500).json({ error: 'Erro ao deletar sala' });
    }
  },
};

module.exports = salasController;
