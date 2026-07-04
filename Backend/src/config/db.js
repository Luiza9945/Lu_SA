import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

function requiredEnv(name) {
  const value = process.env[name];
  if (value === undefined || value === null || value === '') {
    throw new Error(`Variável de ambiente não definida: ${name}`);
  }
  return value;
}

export const pool = new Pool({
  user: requiredEnv('DB_USER'),
  host: requiredEnv('DB_HOST'),
  password: requiredEnv('DB_PASSWORD'),
  database: requiredEnv('DB_NAME'),
  port: Number(process.env.DB_PORT)
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  console.log('process.exit(-1) será executado');
  process.exit(-1);
});

pool
  .connect()
  .then(() => {
    console.log('Conectado');
  })
  .catch((err) => {
    console.error('Falha ao conectar no banco:', err);
    console.log('process.exit(1) será executado');
    process.exit(1);
  });


