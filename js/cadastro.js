document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const nomeEl = document.getElementById('nome');
  const emailEl = document.getElementById('email');
  const senhaEl = document.getElementById('senha');

  if (!form || !nomeEl || !emailEl || !senhaEl) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = nomeEl.value.trim();
    const email = emailEl.value.trim();
    const senha = senhaEl.value.trim();

    // ==== 1) Validações básicas ==== 
    if (!nome || nome.length < 3) {
      alert('Nome precisa ter pelo menos 3 caracteres.');
      return;
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      alert('Informe um e-mail válido.');
      return;
    }

    if (!senha || senha.length < 6) {
      alert('A senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    // ==== 2) Salvar no localStorage (para o login conseguir validar “se já existe”) ====
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // evita cadastro duplicado pelo e-mail
    const emailExiste = usuarios.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (emailExiste) {
      alert('Este e-mail já está cadastrado.');
      return;
    }

    const novoUsuario = {
      nome,
      email,
      senha, // (básico): não faça isso em produção real (use hash)
    };

    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cadastro realizado! Agora faça login.');

    // Depois de cadastrar, você pode redirecionar:
    window.location.href = 'login.html';
  });
});

