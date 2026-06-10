import pg from 'pg' ;
import 'dotenv/config'

const { Pool } = pg
 
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT  // ✅ adiciona essa linha
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

pool.connect().then(() => {
  console.log("Conectado");
});

console.log(process.env.DB_PASSWORD);