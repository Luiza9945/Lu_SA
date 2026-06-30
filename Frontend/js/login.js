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
      const resp = await fetch('/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const data = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        alert(data?.message || 'Login inválido.');
        return;
      }

      // backend retorna { message: ... }
      alert(data?.message || 'Login realizado com sucesso!');
      window.location.href = './home.html';
    } catch (err) {
      console.error(err);
      alert('Falha ao conectar no servidor.');
    }
  });
});

