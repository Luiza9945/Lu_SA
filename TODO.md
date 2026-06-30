# TODO - Remover CORS e servir Frontend via Express

## Informações coletadas
- Backend já usa `express.static(frontendDir)` e define `app.get('/')` para `login.html`.
- `Backend/src/routes/UsuarioRoutes.js` expõe rotas em `/usuarios` (GET `/usuarios`, POST `/usuarios/login`, POST `/usuarios/cadastro`, etc.).
- `Frontend/login.html` referencia `css/login.css` e `js/login.js` de forma relativa.
- `Frontend/js/login.js` faz `fetch('http://localhost:3000/usuarios/login', ...)` (URL absoluta).
- `Frontend/js/cadastro2.js` faz `fetch('http://localhost:3000/usuarios/cadastro', ...)` (URL absoluta).

## Plano (passos)
1. Ajustar `Backend/src/server.js` para servir corretamente todas as páginas estáticas do Frontend através do Express (ex.: `/login.html`, `/home.html`, etc.), sem rotas conflitarem com `/usuarios/:id`.
2. Remover qualquer dependência/código de CORS no Backend (procurar `cors` no repo e remover).
3. Corrigir todos os `fetch()` do frontend para usar caminhos relativos (ex.: `fetch('/usuarios/login')`).
4. Validar e corrigir caminhos relativos nos HTML (CSS/JS/imgs/páginas) para funcionar ao abrir via Express (ex.: `href="/login.html"` quando necessário).
5. Verificar referência a Live Server (porta 5502) e remover/substituir.
6. Rodar o backend e testar o fluxo completo via http://localhost:3000.
7. Gerar relatório final com arquivos modificados, alterações e motivo, e instruções de execução sem CORS/live-server.

