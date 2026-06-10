import express from 'express';
import formaService from '../Service/usuarioService.js';

export const userRouter = express.Router();

// GET ALL
userRouter.get('/', async (req, res) => {
    try {
        const formas = await formaService.getAll();
        res.json(formas);
    } catch (error) {
        console.error('Erro ao listar usuario:', error);
        res.status(500).json({ message: error.message });
    }
});

// GET BY ID
userRouter.get('/:id', async (req, res) => {
    try {
        const forma = await formaService.getById(req.params.id);

        if (!forma) return res.status(404).json({ message: 'Não encontrado' }); // ✅

        res.json(forma);
    } catch (error) {
        console.error('Erro ao buscar forma por ID:', error);
        res.status(500).json({ message: error.message });
    }
});

// POST
userRouter.post('/', async (req, res) => {
    try {
        const forma = await formaService.create(req.body);
        res.status(201).json(forma);
    } catch (error) {
        console.error('Erro ao criar usuario:', error);
        res.status(500).json({ message: error.message });
    }
});

// PUT
userRouter.put('/:id', async (req, res) => {
    try {
        const forma = await formaService.update(req.params.id, req.body);

        if (!forma) return res.status(404).json({ message: 'Não encontrado' }); // ✅

        res.json(forma);
    } catch (error) {
        console.error('Erro ao atualizar usuarios:', error);
        res.status(500).json({ message: error.message });
    }
});

// PATCH
userRouter.patch('/:id', async (req, res) => {
    try {
        const forma = await formaService.patch(req.params.id, req.body);

        if (!forma) return res.status(404).json({ message: 'Não encontrado' }); // ✅

        res.json(forma);
    } catch (error) {
        console.error('Erro ao atualizar parcialmente o usuario:', error);
        res.status(500).json({ message: error.message });
    }
});

// DELETE
userRouter.delete('/:id', async (req, res) => {
    try {
        const forma = await formaService.delete(req.params.id);

        if (!forma) return res.status(404).json({ message: 'Não encontrado' }); // ✅

        res.json(forma);
    } catch (error) {
        console.error('Erro ao excluir usuario:', error);
        res.status(500).json({ message: error.message });
    }
});