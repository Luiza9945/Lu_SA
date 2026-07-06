import { pool } from '../config/db.js';

function toUsuarioRow(row) {
  if (!row) return null;
  return {
    id: row.id_usuario,
    nome: row.nome,
    usuario: row.user_name,
    categoria: row.categoria,
    biografia: row.biografia,
    email: row.email,
  };
}

const UsuarioService = {
  async getAll() {
    const { rows } = await pool.query(`
      SELECT id_user AS id_usuario, nome, user_name, categoria, biografia, email
      FROM usuario
      ORDER BY nome
    `);
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(`
      SELECT id_user AS id_usuario, nome, user_name, categoria, biografia, email
      FROM usuario
      WHERE id_user = $1
    `, [id]);
    return toUsuarioRow(rows[0]);
  },

  async create({ nome, email, senha, categoria, biografia }) {
    // (email) unique
    const exists = await pool.query(`SELECT 1 FROM usuario WHERE email = $1`, [email]);
    if (exists.rows.length > 0) {
      const err = new Error('Email já cadastrado');
      err.code = 'EMAIL_EXISTS';
      throw err;
    }

    // script.sql:
    // usuario: (nome, user_name, email, senha, categoria, biografia)
    const { rows } = await pool.query(`
      INSERT INTO usuario (nome, user_name, email, senha, categoria, biografia)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id_user AS id_usuario, nome, user_name, categoria, biografia, email
    `, [nome, nome, email, senha, categoria ?? 'user', biografia ?? null]);

    return toUsuarioRow(rows[0]);
  },

  async update(id, { nome, email, senha }) {
    const current = await this.getById(id);
    if (!current) return null;

    const emailExists = await pool.query(
      `SELECT 1 FROM usuario WHERE email = $1 AND id_user <> $2`,
      [email, id]
    );
    if (emailExists.rows.length > 0) {
      const err = new Error('Email já cadastrado');
      err.code = 'EMAIL_EXISTS';
      throw err;
    }

    const { rows } = await pool.query(`
      UPDATE usuario
      SET nome = $1,
          user_name = $2,
          email = $3,
          senha = $4
      WHERE id_user = $5
      RETURNING id_user AS id_usuario, nome, email
    `, [nome, nome, email, senha, id]);

    return toUsuarioRow(rows[0]);
  },

  async delete(id) {
    const { rows } = await pool.query(`
      DELETE FROM usuario
      WHERE id_user = $1
      RETURNING id_user AS id_usuario, nome, email
    `, [id]);

    return toUsuarioRow(rows[0]);
  },

  async login({ email, senha }) {
    const { rows } = await pool.query(`
      SELECT id_user, nome, user_name, categoria, biografia, email, senha
      FROM usuario
      WHERE email = $1
      LIMIT 1
    `, [email]);

    if (rows.length === 0) {
      return { success: false, message: 'Email ou senha inválidos' };
    }

    const user = rows[0];
    if (user.senha !== senha) {
      return { success: false, message: 'Email ou senha inválidos' };
    }

    // Retorna os dados do perfil para o frontend
    return {
      success: true,
      message: 'Login realizado com sucesso',
      user: toUsuarioRow({
        id_usuario: user.id_user,
        nome: user.nome,
        user_name: user.user_name,
        categoria: user.categoria,
        biografia: user.biografia,
        email: user.email
      })
    };
  },

  async cadastro({ nome, email, senha, categoria, biografia }) {
    // reutiliza create
    return this.create({ nome, email, senha, categoria, biografia });
  },
};

export default UsuarioService;


