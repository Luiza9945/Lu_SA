document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const emailEl = document.getElementById('email');
  const senhaEl = document.getElementById('senha');

  if (!form || !emailEl || !senhaEl) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const emailOuUsuario = emailEl.value.trim();
    const senha = senhaEl.value.trim();

    // Validações básicas
    if (!emailOuUsuario) {
      alert('Informe seu e-mail ou usuário.');
      return;
    }

    if (!senha) {
      alert('Informe sua senha.');
      return;
    }

    // Se passou, aqui você faria a autenticação (localStorage/API)
    alert('Login validado!');

    // Para aprender depois:
    // - depois conecte com localStorage (comparar usuário/ senha)
    // - ou com backend (fetch)
  });
});

