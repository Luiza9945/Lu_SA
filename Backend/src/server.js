import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { usuarioRouter } from './routes/UsuarioRoutes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// CORS para permitir apenas o Frontend rodando no Live Server (durante o desenvolvimento).
app.use(
  cors({
    origin: ['http://127.0.0.1:5502', 'http://localhost:5502'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);


// Serve o Frontend diretamente pelo Express para eliminar CORS/live-server.
const frontendDir = path.join(__dirname, '../../Frontend');
app.use(express.static(frontendDir));


app.get('/', (req, res) => {
  res.sendFile(path.join(frontendDir, 'login.html'));
});

app.use('/usuarios', usuarioRouter);

app.listen(port, () => {
  console.log(`Esta indo bem http://localhost:${port}`);
});

export default app;


