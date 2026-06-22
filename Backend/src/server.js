import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { usuarioRouter } from './routes/UsuarioRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

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


