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

    const usuarios =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado =
      usuarios.find(user =>
        (user.email === emailOuUsuario ||
          user.usuario === emailOuUsuario) &&
        user.senha === senha
      );

    if (!usuarioEncontrado) {
      alert("Usuário ou senha inválidos.");
      return;
    }

    // Salva sessão atual
    localStorage.setItem(
      "currentUser",
      JSON.stringify(usuarioEncontrado)
    );

    alert("Login realizado com sucesso!");

    window.location.href =
      "./home.html";
  });
});

