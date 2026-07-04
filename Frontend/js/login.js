document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const emailEl = document.getElementById('email');
  const senhaEl = document.getElementById('senha');

  if (!form || !emailEl || !senhaEl) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = emailEl.value.trim();
    const senha = senhaEl.value.trim();

    if (!email) {
      alert('Informe seu e-mail.');
      return;
    }

    if (!senha) {
      alert('Informe sua senha.');
      return;
    }

    try {
      const resp = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const data = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        alert(data?.message || 'Login inválido.');
        return;
      }

      // backend retorna { success, message }
      alert(data?.message || 'Login realizado com sucesso!');

      // Unificar sessão para o perfil-art.js (ele depende de localStorage.currentUser)
      try {
        // 1) Preferir localStorage.usuarios, se existir
        let usuarios = [];
        try {
          usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        } catch {
          usuarios = [];
        }

        let usuarioEncontrado = usuarios.find(u => u.email === email);

        // 2) Se não existir no localStorage, buscar no backend
        if (!usuarioEncontrado) {
          const respUsuarios = await fetch('http://localhost:3000/usuarios');
          if (respUsuarios.ok) {
            const lista = await respUsuarios.json();
            usuarioEncontrado = (lista || []).find(u => u.email === email);
          }
        }

        if (usuarioEncontrado) {
          localStorage.setItem('currentUser', JSON.stringify(usuarioEncontrado));
        } else {
          console.warn('Usuário não encontrado para montar currentUser no login. Email:', email);
          // Mantém o fluxo mesmo sem currentUser (o perfil vai redirecionar se não existir)
        }
      } catch (e) {
        console.warn('Falha ao montar currentUser após login:', e);
      }

      window.location.href = './home.html';

    } catch (err) {
      console.error(err);
      alert('Falha ao conectar no servidor.');
    }
  });
});

