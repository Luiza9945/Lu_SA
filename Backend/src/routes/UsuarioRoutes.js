import express from 'express';
import UsuarioService from '../Service/UsuarioService.js';

export const usuarioRouter = express.Router();

// GET /usuarios
usuarioRouter.get('/', async (req, res) => {
  try {
    const usuarios = await UsuarioService.getAll();
    return res.json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuarios:', error);
    return res.status(500).json({ message: error.message });
  }
});

// POST /login (rotas fixas devem vir antes de /:id)
usuarioRouter.post('/login', async (req, res) => {

    console.log('=== ROTA LOGIN EXECUTADA ===');
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: 'email e senha são obrigatórios' });
    }

    const result = await UsuarioService.login({ email, senha });

    if (!result.success) {
      return res.status(401).json({ message: result.message });
    }

    return res.json({ message: result.message });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: error.message });
  }
});

// POST /cadastro
usuarioRouter.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'nome, email e senha são obrigatórios' });
    }

    const usuario = await UsuarioService.cadastro({ nome, email, senha });
    return res.status(201).json(usuario);
  } catch (error) {
    if (error?.code === 'EMAIL_EXISTS') {
      return res.status(409).json({ message: error.message });
    }
    console.error('Erro no cadastro:', error);
    return res.status(500).json({ message: error.message });
  }
});

// GET /usuarios/:id
usuarioRouter.get('/:id', async (req, res) => {
  try {
    const usuario = await UsuarioService.getById(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Não encontrado' });
    return res.json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuario por id:', error);
    return res.status(500).json({ message: error.message });
  }
});

// POST /usuarios
usuarioRouter.post('/', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'nome, email e senha são obrigatórios' });
    }

    const usuario = await UsuarioService.create({ nome, email, senha });
    return res.status(201).json(usuario);
  } catch (error) {
    if (error?.code === 'EMAIL_EXISTS') {
      return res.status(409).json({ message: error.message });
    }
    console.error('Erro ao criar usuario:', error);
    return res.status(500).json({ message: error.message });
  }
});

// PUT /usuarios/:id
usuarioRouter.put('/:id', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'nome, email e senha são obrigatórios' });
    }

    const usuario = await UsuarioService.update(req.params.id, { nome, email, senha });
    if (!usuario) return res.status(404).json({ message: 'Não encontrado' });
    return res.json(usuario);
  } catch (error) {
    if (error?.code === 'EMAIL_EXISTS') {
      return res.status(409).json({ message: error.message });
    }
    console.error('Erro ao atualizar usuario:', error);
    return res.status(500).json({ message: error.message });
  }
});

// DELETE /usuarios/:id (UUID somente)
usuarioRouter.delete('/:id', async (req, res) => {
  try {
    const usuario = await UsuarioService.delete(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Não encontrado' });
    return res.json(usuario);
  } catch (error) {
    console.error('Erro ao excluir usuario:', error);
    return res.status(500).json({ message: error.message });
  }
});



