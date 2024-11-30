// src/routes/chamadosRoutes.js
const express = require('express');
const chamadosController = require('../controllers/chamadosController');

const router = express.Router();

router.get('/', chamadosController.getAll);

router.get('/:id', chamadosController.getById);

router.get('/:id/detalhes', chamadosController.getChamadoDetalhes);

router.post('/', chamadosController.create);

router.put('/:id', chamadosController.update);
router.put('/feedback/:id', chamadosController.updateFeedback);
router.delete('/:id', chamadosController.delete);

module.exports = router;
